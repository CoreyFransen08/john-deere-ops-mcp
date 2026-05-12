import { z } from "zod";
import { jdFetch, jdFetchAll, jdRequest } from "../jd-api";
import type { ToolRegistrationContext } from "./types";
import { PRODUCT_ENDPOINTS } from "./products";

const WORK_TYPES = ["dtiTillage", "dtiSeeding", "dtiApplication", "dtiHarvest"] as const;
const WORK_STATUSES = ["PLANNED", "IN_PROGRESS", "COMPLETED", "ALL"] as const;
const PRODUCT_INPUT_TYPES = ["CHEMICAL", "FERTILIZER", "CROP", "TANK_MIX", "VARIETY", "DRY_BLEND"] as const;
const VARIETY_SELECTION_MODES = ["USER_DEFINED", "USE_VARIETY_LOCATOR", "NONE"] as const;

const fixedRateSchema = z.object({
  value: z.number().describe("Fixed-rate numeric value."),
  unit: z.string().describe("Fixed-rate unit, e.g. floz1ac-1."),
  vr_domain_id: z.string().describe("John Deere VR domain ID, e.g. vrAppRateVolumeTarget."),
});

const operationProductSchema = z.object({
  input_type: z.enum(PRODUCT_INPUT_TYPES).describe("Input type for the operation product."),
  input_id: z.string().optional().describe("Product ID. For CROP, use crop_name instead when possible."),
  input_uri: z.string().optional().describe("Full product URI. Takes precedence over input_id."),
  crop_name: z.string().optional().describe("Crop type name for CROP inputs, e.g. ALFALFA."),
  variety_selection_mode: z
    .enum(VARIETY_SELECTION_MODES)
    .optional()
    .describe("Use USER_DEFINED or USE_VARIETY_LOCATOR for VARIETY; otherwise NONE."),
});

const operationInputSchema = z.object({
  operation_product: operationProductSchema.optional(),
  fixed_rate: fixedRateSchema.optional(),
  prescription_use: z.record(z.unknown()).optional().describe("Advanced John Deere prescriptionUse object."),
});

const operationSchema = z.object({
  operation_type: z.enum(WORK_TYPES).describe("Operation type for this operation."),
  operation_inputs: z.array(operationInputSchema).describe("Inputs for this operation."),
});

const assignmentSchema = z.object({
  equipment_machine_id: z.string().optional().describe("Machine equipment ID."),
  equipment_machine_uri: z.string().optional().describe("Full machine equipment URI."),
  operator_id: z.string().optional().describe("Operator ID."),
  operator_uri: z.string().optional().describe("Full operator URI."),
  equipment_implement_ids: z.array(z.string()).optional().describe("Implement equipment IDs."),
  equipment_implement_uris: z.array(z.string()).optional().describe("Full implement equipment URIs."),
});

type ProductInputType = (typeof PRODUCT_INPUT_TYPES)[number];
type WorkType = (typeof WORK_TYPES)[number];
type OperationProductInput = z.infer<typeof operationProductSchema>;
type OperationInput = z.infer<typeof operationInputSchema>;
type Operation = z.infer<typeof operationSchema>;
type Assignment = z.infer<typeof assignmentSchema>;

function platformUri(path: string): string {
  return `https://sandboxapi.deere.com/platform${path}`;
}

function equipmentUri(id: string): string {
  return `https://equipmentapi.deere.com/isg/equipment/${id}`;
}

function fieldUri(orgId: string, fieldId: string): string {
  return platformUri(`/organizations/${orgId}/fields/${fieldId}`);
}

function guidanceLineUri(orgId: string, fieldId: string, guidanceLineId: string): string {
  return `${fieldUri(orgId, fieldId)}/guidanceLines/${guidanceLineId}`;
}

function productUri(orgId: string, product: OperationProductInput): string {
  if (product.input_uri) return product.input_uri;
  if (product.input_type === "CROP") {
    const cropName = product.crop_name || product.input_id;
    if (!cropName) throw new Error("CROP inputs require crop_name or input_id.");
    return platformUri(`/cropTypes/${cropName}`);
  }

  if (!product.input_id) {
    throw new Error(`${product.input_type} inputs require input_id or input_uri.`);
  }

  const endpoint = PRODUCT_ENDPOINTS[product.input_type as Exclude<ProductInputType, "CROP">];
  return platformUri(`/organizations/${orgId}/${endpoint}/${product.input_id}`);
}

function buildOperationInput(orgId: string, input: OperationInput) {
  const operationInput: Record<string, unknown> = {};

  if (input.operation_product) {
    operationInput.operationProduct = {
      inputUri: productUri(orgId, input.operation_product),
      inputType: input.operation_product.input_type,
      varietySelectionMode:
        input.operation_product.variety_selection_mode ||
        (input.operation_product.input_type === "VARIETY" ? "USER_DEFINED" : "NONE"),
    };
  }

  if (input.fixed_rate || input.prescription_use) {
    const operationPrescription: Record<string, unknown> = {};
    if (input.fixed_rate) {
      operationPrescription.fixedRate = {
        valueAsDouble: input.fixed_rate.value,
        unit: input.fixed_rate.unit,
        vrDomainId: input.fixed_rate.vr_domain_id,
      };
    }
    if (input.prescription_use) {
      operationPrescription.prescriptionUse = input.prescription_use;
    }
    operationInput.operationPrescription = operationPrescription;
  }

  return operationInput;
}

function buildOperation(orgId: string, operation: Operation) {
  return {
    operationType: {
      representationDomainId: "dtOperationClass",
      instanceDomainId: operation.operation_type,
    },
    operationInputs: operation.operation_inputs.map((input) => buildOperationInput(orgId, input)),
  };
}

function buildAssignment(orgId: string, assignment: Assignment) {
  const machineUri = assignment.equipment_machine_uri || (assignment.equipment_machine_id ? equipmentUri(assignment.equipment_machine_id) : undefined);
  const operatorUri =
    assignment.operator_uri ||
    (assignment.operator_id ? platformUri(`/organizations/${orgId}/operators/${assignment.operator_id}`) : undefined);
  const implementUris =
    assignment.equipment_implement_uris ||
    assignment.equipment_implement_ids?.map((implementId) => equipmentUri(implementId));

  return {
    ...(machineUri ? { equipmentMachineUri: machineUri } : {}),
    ...(operatorUri ? { operatorUri } : {}),
    ...(implementUris ? { equipmentImplementUris: implementUris } : {}),
  };
}

function buildGuidanceSettings(
  orgId: string,
  fieldId: string,
  guidanceLineId?: string,
  guidanceLineFullUri?: string
) {
  const entityUri = guidanceLineFullUri || (guidanceLineId ? guidanceLineUri(orgId, fieldId, guidanceLineId) : undefined);
  if (!entityUri) return undefined;

  return {
    preferenceSettings: {
      includeLatestFieldOperation: "NONE",
      preferenceMode: "USER_SELECTED",
      entityType: "GUIDANCE_LINE",
      entityUri,
    },
    includeGuidance: [
      {
        entityType: "GUIDANCE_LINE",
        entityUri,
      },
    ],
  };
}

function summarizeWorkPlan(plan: {
  erid: string;
  location?: { fieldUri?: string };
  workType?: { instanceDomainId?: string };
  year?: number;
  operations?: unknown[];
  workPlanAssignments?: unknown[];
  workStatus?: string;
  workOrder?: string;
  instructions?: string;
  sequenceNumber?: number;
  links?: Array<{ rel: string }>;
}) {
  return {
    erid: plan.erid,
    fieldUri: plan.location?.fieldUri,
    workType: plan.workType?.instanceDomainId,
    year: plan.year,
    workStatus: plan.workStatus,
    workOrder: plan.workOrder,
    instructions: plan.instructions,
    sequenceNumber: plan.sequenceNumber,
    operations: plan.operations || [],
    assignmentCount: plan.workPlanAssignments?.length ?? 0,
    links: (plan.links || []).map((l) => l.rel),
  };
}

export function registerWorkPlanTools({ server, props, env, sql }: ToolRegistrationContext) {
  server.tool(
    "jd_list_work_plans",
    "List work plans for an organization, including planned application, seeding, tillage, and harvest work.",
    {
      org_id: z.string().describe("The organization ID."),
      year: z.string().optional().describe("Filter by calendar year, e.g. '2026'."),
      work_type: z
        .enum(WORK_TYPES)
        .optional()
        .describe("Filter by work type: dtiTillage, dtiSeeding, dtiApplication, or dtiHarvest."),
      work_status: z
        .enum(WORK_STATUSES)
        .optional()
        .describe("Filter by work status: PLANNED, IN_PROGRESS, COMPLETED, or ALL."),
      field_ids: z
        .array(z.string())
        .optional()
        .describe("Optional list of field IDs to filter work plans."),
    },
    async ({ org_id, year, work_type, work_status, field_ids }) => {
      const params = new URLSearchParams();
      if (year) params.set("year", year);
      if (work_type) params.set("workType", work_type);
      if (work_status) params.set("workStatus", work_status);
      if (field_ids?.length) params.set("fieldIds", field_ids.join(","));

      const qs = params.toString();
      const endpoint = `/organizations/${org_id}/workPlans${qs ? `?${qs}` : ""}`;
      console.log(`[work_plans] calling endpoint: ${endpoint}`);

      const values = await jdFetchAll<Parameters<typeof summarizeWorkPlan>[0]>(
        endpoint,
        props,
        env,
        sql,
        { cache: false }
      );
      const workPlans = values.map(summarizeWorkPlan);

      return {
        content: [
          {
            type: "text" as const,
            text:
              workPlans.length === 0
                ? "No work plans found for this organization."
                : JSON.stringify(workPlans, null, 2),
          },
        ],
      };
    }
  );

  server.tool(
    "jd_get_work_plan",
    "Get a single work plan by ERID.",
    {
      org_id: z.string().describe("The organization ID."),
      erid: z.string().describe("The work plan ERID."),
    },
    async ({ org_id, erid }) => {
      const workPlan = await jdFetch(
        `/organizations/${org_id}/workPlans/${erid}`,
        props,
        env,
        sql,
        { cache: false }
      );

      return {
        content: [{ type: "text" as const, text: JSON.stringify(workPlan, null, 2) }],
      };
    }
  );

  server.tool(
    "jd_create_work_plan",
    "Create a planned John Deere work plan from typed inputs.",
    {
      org_id: z.string().describe("The organization ID."),
      field_id: z.string().describe("The field ID where work will be executed."),
      year: z.number().int().describe("Calendar year for the work plan."),
      work_type: z.enum(WORK_TYPES).describe("Primary work type for the plan."),
      operations: z.array(operationSchema).min(1).max(2).describe("One or two operations for the work plan."),
      work_plan_assignments: z
        .array(assignmentSchema)
        .optional()
        .describe("Optional machine/operator/implement assignments."),
      guidance_line_id: z.string().optional().describe("Optional guidance line ID to include in guidanceSettings."),
      guidance_line_uri: z.string().optional().describe("Optional full guidance line URI."),
      guidance_settings: z
        .record(z.unknown())
        .optional()
        .describe("Advanced raw John Deere guidanceSettings object. Takes precedence over guidance_line_id."),
      work_order: z.string().max(255).optional().describe("Optional work order text."),
      instructions: z.string().max(255).optional().describe("Optional operator instructions."),
    },
    async ({
      org_id,
      field_id,
      year,
      work_type,
      operations,
      work_plan_assignments,
      guidance_line_id,
      guidance_line_uri,
      guidance_settings,
      work_order,
      instructions,
    }) => {
      const payload = {
        location: {
          fieldUri: fieldUri(org_id, field_id),
        },
        workType: {
          representationDomainId: "dtOperationClass",
          instanceDomainId: work_type as WorkType,
        },
        year,
        operations: operations.map((operation) => buildOperation(org_id, operation)),
        workPlanAssignments: (work_plan_assignments || []).map((assignment) =>
          buildAssignment(org_id, assignment)
        ),
        ...(guidance_settings
          ? { guidanceSettings: guidance_settings }
          : {
              guidanceSettings: buildGuidanceSettings(
                org_id,
                field_id,
                guidance_line_id,
                guidance_line_uri
              ),
            }),
        workOrder: work_order || "",
        instructions: instructions || "",
      };

      if (payload.guidanceSettings === undefined) {
        delete (payload as { guidanceSettings?: unknown }).guidanceSettings;
      }

      const result = await jdRequest(`/organizations/${org_id}/workPlans`, props, env, {
        method: "POST",
        body: payload,
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                status: result.status,
                location: result.location,
                workPlan: result.data,
                submitted: {
                  fieldId: field_id,
                  year,
                  workType: work_type,
                  operationCount: operations.length,
                  assignmentCount: work_plan_assignments?.length ?? 0,
                  hasGuidance: Boolean(guidance_settings || guidance_line_id || guidance_line_uri),
                },
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );
}
