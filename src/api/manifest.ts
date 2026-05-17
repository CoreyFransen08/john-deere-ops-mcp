export type DeereApiHost = "sandboxapi.deere.com" | "equipmentapi.deere.com";

export type DeereApiMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type DeereEndpoint = {
  method: DeereApiMethod;
  host: DeereApiHost;
  path: string;
  apiPath: string;
};

const ENDPOINTS: DeereEndpoint[] = [
  ["DELETE", "equipmentapi.deere.com", "/isg/equipment/{id}"],
  ["GET", "equipmentapi.deere.com", "/isg/equipment/{id}"],
  ["PUT", "equipmentapi.deere.com", "/isg/equipment/{id}"],
  ["GET", "equipmentapi.deere.com", "/isg/equipment"],
  ["GET", "equipmentapi.deere.com", "/isg/equipmentISGTypes"],
  ["GET", "equipmentapi.deere.com", "/isg/equipmentMakes/{equipmentMakeId}/equipmentISGTypes/{equipmentISGTypeId}/equipmentModels/{equipmentModelId}"],
  ["GET", "equipmentapi.deere.com", "/isg/equipmentMakes/{equipmentMakeId}/equipmentISGTypes/{equipmentISGTypeId}/equipmentModels"],
  ["GET", "equipmentapi.deere.com", "/isg/equipmentMakes/{equipmentMakeId}/equipmentISGTypes/{equipmentISGTypeId}"],
  ["GET", "equipmentapi.deere.com", "/isg/equipmentMakes/{equipmentMakeId}/equipmentISGTypes"],
  ["GET", "equipmentapi.deere.com", "/isg/equipmentMakes/{equipmentMakeId}/equipmentTypes"],
  ["GET", "equipmentapi.deere.com", "/isg/equipmentMakes/{equipmentMakeId}"],
  ["GET", "equipmentapi.deere.com", "/isg/equipmentMakes"],
  ["GET", "equipmentapi.deere.com", "/isg/equipmentModels"],
  ["GET", "equipmentapi.deere.com", "/isg/equipmentTypes"],
  ["POST", "equipmentapi.deere.com", "/isg/organizations/{organizationId}/equipment/{principalId}/measurements"],
  ["POST", "equipmentapi.deere.com", "/isg/organizations/{organizationId}/equipment"],
  ["GET", "sandboxapi.deere.com", "/isg/activeIngredients"],
  ["POST", "sandboxapi.deere.com", "/platform/chemicals/{erid}/associateToOrg/{organizationId}"],
  ["GET", "sandboxapi.deere.com", "/platform/chemicals/{erid}/documents"],
  ["PATCH", "sandboxapi.deere.com", "/platform/chemicals/{erid}/setOverridesForOrg/{organizationId}"],
  ["GET", "sandboxapi.deere.com", "/platform/chemicals/{erid}"],
  ["GET", "sandboxapi.deere.com", "/platform/chemicals"],
  ["GET", "sandboxapi.deere.com", "/platform/cropTypes/{id}"],
  ["GET", "sandboxapi.deere.com", "/platform/cropTypes/{name}"],
  ["GET", "sandboxapi.deere.com", "/platform/cropTypes"],
  ["GET", "sandboxapi.deere.com", "/platform/documents/{erid}"],
  ["POST", "sandboxapi.deere.com", "/platform/fertilizers/{erid}/associateToOrg/{organizationId}"],
  ["GET", "sandboxapi.deere.com", "/platform/fertilizers/{erid}/documents"],
  ["PATCH", "sandboxapi.deere.com", "/platform/fertilizers/{erid}/setOverridesForOrg/{organizationId}"],
  ["GET", "sandboxapi.deere.com", "/platform/fertilizers/{erid}"],
  ["GET", "sandboxapi.deere.com", "/platform/fertilizers"],
  ["GET", "sandboxapi.deere.com", "/platform/fieldOperations/{operationId}/boundary"],
  ["GET", "sandboxapi.deere.com", "/platform/fieldOperations/{operationId}/measurementTypes/{measurementType}"],
  ["GET", "sandboxapi.deere.com", "/platform/fieldOperations/{operationId}/measurementTypes"],
  ["GET", "sandboxapi.deere.com", "/platform/fieldOperations/{operationId}"],
  ["GET", "sandboxapi.deere.com", "/platform/fieldOps/{operationId}"],
  ["GET", "sandboxapi.deere.com", "/platform/files/{fileId}"],
  ["PUT", "sandboxapi.deere.com", "/platform/files/{fileId}"],
  ["GET", "sandboxapi.deere.com", "/platform/files"],
  ["GET", "sandboxapi.deere.com", "/platform/fileTransfers/{id}"],
  ["GET", "sandboxapi.deere.com", "/platform/fileTransfers"],
  ["GET", "sandboxapi.deere.com", "/platform/machines/{principalId}/alerts"],
  ["GET", "sandboxapi.deere.com", "/platform/machines/{principalId}/breadcrumbs"],
  ["GET", "sandboxapi.deere.com", "/platform/machines/{principalId}/deviceStateReports"],
  ["GET", "sandboxapi.deere.com", "/platform/machines/{principalId}/engineHours"],
  ["GET", "sandboxapi.deere.com", "/platform/machines/{principalId}/hoursOfOperation"],
  ["GET", "sandboxapi.deere.com", "/platform/machines/{principalId}/locationHistory"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/chemicals/{erid}"],
  ["PUT", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/chemicals/{erid}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/chemicals"],
  ["POST", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/chemicals"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/cropTypes"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/dryBlends/{erid}"],
  ["PUT", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/dryBlends/{erid}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/dryBlends"],
  ["POST", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/dryBlends"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/fertilizers/{erid}"],
  ["PUT", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/fertilizers/{erid}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/fertilizers"],
  ["POST", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/fertilizers"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/productCompanies"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/tankMixes/{id}"],
  ["PUT", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/tankMixes/{id}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/tankMixes"],
  ["POST", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/tankMixes"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/varieties/{erid}"],
  ["PUT", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/varieties/{erid}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/varieties"],
  ["POST", "sandboxapi.deere.com", "/platform/organizations/{organizationId}/varieties"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/boundaries"],
  ["DELETE", "sandboxapi.deere.com", "/platform/organizations/{orgId}/clients/{clientId}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/clients/{clientId}"],
  ["PUT", "sandboxapi.deere.com", "/platform/organizations/{orgId}/clients/{clientId}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/clients/{id}/farms"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgID}/clients/{id}/fields"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/clients"],
  ["POST", "sandboxapi.deere.com", "/platform/organizations/{orgId}/clients"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/farms/{farmId}/clients"],
  ["DELETE", "sandboxapi.deere.com", "/platform/organizations/{orgId}/farms/{farmId}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/farms/{farmId}"],
  ["PUT", "sandboxapi.deere.com", "/platform/organizations/{orgId}/farms/{farmId}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgID}/farms/{id}/fields"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/farms"],
  ["POST", "sandboxapi.deere.com", "/platform/organizations/{orgId}/farms"],
  ["DELETE", "sandboxapi.deere.com", "/platform/organizations/{orgId}/fields/{fieldId}/boundaries/{boundaryId}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/fields/{fieldId}/boundaries/{boundaryId}"],
  ["PUT", "sandboxapi.deere.com", "/platform/organizations/{orgId}/fields/{fieldId}/boundaries/{boundaryId}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/fields/{fieldId}/boundaries"],
  ["POST", "sandboxapi.deere.com", "/platform/organizations/{orgId}/fields/{fieldId}/boundaries"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/fields/{fieldId}/farms"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/fields/{fieldId}/fieldOperations"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/fields/{fieldId}/flags"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/fields/{fieldId}/guidanceLines/{guidanceLineId}"],
  ["PUT", "sandboxapi.deere.com", "/platform/organizations/{orgId}/fields/{fieldId}/guidanceLines/{guidanceLineId}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/fields/{fieldId}/guidanceLines"],
  ["POST", "sandboxapi.deere.com", "/platform/organizations/{orgId}/fields/{fieldId}/guidanceLines"],
  ["DELETE", "sandboxapi.deere.com", "/platform/organizations/{orgId}/fields/{fieldId}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/fields/{fieldId}"],
  ["PUT", "sandboxapi.deere.com", "/platform/organizations/{orgId}/fields/{fieldId}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgID}/fields/{id}/clients"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/fields"],
  ["POST", "sandboxapi.deere.com", "/platform/organizations/{orgId}/fields"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/files"],
  ["POST", "sandboxapi.deere.com", "/platform/organizations/{orgId}/files"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/fileTransfers"],
  ["POST", "sandboxapi.deere.com", "/platform/organizations/{orgId}/fileTransfers"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/flagCategories/{categoryId}/flagCategoryPreferences"],
  ["DELETE", "sandboxapi.deere.com", "/platform/organizations/{orgId}/flagCategories/{categoryId}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/flagCategories/{categoryId}"],
  ["PUT", "sandboxapi.deere.com", "/platform/organizations/{orgId}/flagCategories/{categoryId}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/flagCategories"],
  ["POST", "sandboxapi.deere.com", "/platform/organizations/{orgId}/flagCategories"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/flagCategoryPreferences/{flagCategoryPreferencesId}"],
  ["PUT", "sandboxapi.deere.com", "/platform/organizations/{orgId}/flagCategoryPreferences/{flagCategoryPreferencesId}"],
  ["DELETE", "sandboxapi.deere.com", "/platform/organizations/{orgId}/flags/{flagId}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/flags/{flagId}"],
  ["PUT", "sandboxapi.deere.com", "/platform/organizations/{orgId}/flags/{flagId}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/flags"],
  ["POST", "sandboxapi.deere.com", "/platform/organizations/{orgId}/flags"],
  ["DELETE", "sandboxapi.deere.com", "/platform/organizations/{orgId}/operators/{id}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/operators/{id}"],
  ["PUT", "sandboxapi.deere.com", "/platform/organizations/{orgId}/operators/{id}"],
  ["DELETE", "sandboxapi.deere.com", "/platform/organizations/{orgId}/operators"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/operators"],
  ["POST", "sandboxapi.deere.com", "/platform/organizations/{orgId}/operators"],
  ["PUT", "sandboxapi.deere.com", "/platform/organizations/{orgId}/workPlans/{erid}/workPlanSequence"],
  ["DELETE", "sandboxapi.deere.com", "/platform/organizations/{orgId}/workPlans/{erid}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/workPlans/{erid}"],
  ["PUT", "sandboxapi.deere.com", "/platform/organizations/{orgId}/workPlans/{erid}"],
  ["GET", "sandboxapi.deere.com", "/platform/organizations/{orgId}/workPlans"],
  ["POST", "sandboxapi.deere.com", "/platform/organizations/{orgId}/workPlans"],
  ["POST", "sandboxapi.deere.com", "/platform/varieties/{erid}/associateToOrg/{organizationId}"],
  ["GET", "sandboxapi.deere.com", "/platform/varieties/{erid}/documents"],
  ["PATCH", "sandboxapi.deere.com", "/platform/varieties/{erid}/setOverridesForOrg/{organizationId}"],
  ["GET", "sandboxapi.deere.com", "/platform/varieties/{erid}"],
  ["GET", "sandboxapi.deere.com", "/platform/varieties"],
].map(([method, host, path]) => ({
  method,
  host,
  path,
  apiPath: toApiPath(host, path),
})) as DeereEndpoint[];

function toApiPath(host: string, path: string): string {
  const stripped = path.replace(/^\/(?:platform|isg)/, "");
  const apiPath = stripped || "/";
  return `/api${apiPath}`;
}

function pathToRegex(path: string): RegExp {
  const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^${escaped.replace(/\\\{[^/]+\\\}/g, "[^/]+")}$`);
}

const MATCHERS = ENDPOINTS.map((endpoint) => ({
  ...endpoint,
  pattern: pathToRegex(endpoint.path),
}));

export function listDeereEndpoints(): DeereEndpoint[] {
  return ENDPOINTS;
}

export function findDeereEndpoint(method: string, host: string, path: string): DeereEndpoint | null {
  const normalizedMethod = method.toUpperCase();
  const normalizedPath = path.replace(/\/+$/, "") || "/";

  return (
    MATCHERS.find(
      (endpoint) =>
        endpoint.method === normalizedMethod &&
        endpoint.host === host &&
        endpoint.pattern.test(normalizedPath)
    ) ?? null
  );
}
