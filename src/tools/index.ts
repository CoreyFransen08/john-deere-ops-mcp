import { registerEquipmentTools } from "./equipment";
import { registerFieldOperationTools } from "./field-operations";
import { registerFieldTools } from "./fields";
import { registerFileTools } from "./files";
import { registerGuidanceLineTools } from "./guidance-lines";
import { registerOrganizationTools } from "./organizations";
import { registerOperatorTools } from "./operators";
import { registerProductTools } from "./products";
import { registerWorkPlanTools } from "./work-plans";
import type { ToolRegistrationContext } from "./types";

export function registerJohnDeereTools(context: ToolRegistrationContext) {
  registerOrganizationTools(context);
  registerFieldTools(context);
  registerFieldOperationTools(context);
  registerGuidanceLineTools(context);
  registerProductTools(context);
  registerEquipmentTools(context);
  registerOperatorTools(context);
  registerWorkPlanTools(context);
  registerFileTools(context);
}
