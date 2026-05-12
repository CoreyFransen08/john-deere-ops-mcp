# GET /fieldOperations/{operationId}

**Source:** John Deere Operations Center - Field Operations API
**Endpoint ID:** `#/fieldOperations/{operationId}/get`

> View a Field Operation

---

## Description

View a single field operation. The response will include links to:

organization: The organization which owns this data.
field: The field in which this operation was performed.
self: The field operation.

**OAuth Scope Required:** `ag2`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/fieldOperations/{operationId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| operationId<br>Required | string | Operation ID<br>Example: MTIzNF81NjFiZGY1 | path |
| embed | array | List available operation measurement types and totals.<br>Allowed Values: measurementTypes | query |


## Headers

| Key | Type | Description & Example | In / Defaults |
| --- | --- | --- | --- |
| Accept-UOM-System | string | Unit of measure system to use for numeric values in the shapefiles. Accepted values are "METRIC", "ENGLISH", and "MIXED".If this header is not specified, the unit system will be determined by the organization preference of the owning organization.For all unit systems, the units are consistent with ADAPT's unit system.<br>Example: METRIC | header |
| Accept-Yield-Preference | string | Desired yield representation (unit) type. Accepted values are VOLUME or MASS.<br>Example: VOLUME | header |
| Round-Measurements | boolean | Set to true for standard Deere rounded measurements. Set to false for not rounded measurements. | header |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| orgId | string | The organization ID.<br>Example: 1234 |
| cropSeason | string | The year in which the grower logically assigned this operation. Note that operational activity may occur outside this calendar year.<br>Example: 2015 |
| fieldOperationType1 | string | A string indicating the type of operation (valid values include: seeding, application, harvest, or tillage).<br>Example: Harvest |
| cropName | string | A string indicating the type of crop used during this operation. Can be omitted based on operation type and original data source. Only available on harvest and seeding operation types.<br>Example: CORN_WET |
| modifiedTime | datetime | Last time that anything was modified on this field operation.<br>Example: 2018-11-17T11:53:00.000Z |
| varieties | array | List of seed varieties. Only available on harvest and seeding operation types. May contain guid, productType, name, brand, agencyRegistrationNumber, and tankMix<br>Example: [ { "@type": "Product", "productType": "SEED", "name": "aa1", "tankMix": false } ] |
| adaptMachineType | string | The type of machine that generated the field operation. This may be "unknown".<br>Example: unknown |
| fieldOperationMachines | object | Machines utilized during this operation |


## Sample Response [JSON]

```
{
  "@type": "FieldOperation",
  "fieldOperationType": "tillage",
  "adaptMachineType": "unknown",
  "cropSeason": "2012",
  "modifiedTime": "2018-05-16T15:04:24.787Z",
  "fieldOperationMachines": [
    {
      "@type": "FieldOperationMachine",
      "GUID": "t48a7dd0-as35-44e1-81b4-435d494f7cd5",
      "erid": "t48a7dd0-as35-44e1-81b4-435d494f7cd5",
      "machineId": 637795,
      "operators": [
        {
          "@type": "Operator",
          "operatorId": "OPERATOR_ID",
          "license": "OPERATOR_LICENSE",
          "name": "OPERATOR_NAME"
        }
      ],
      "vin": "WXYEJKB73894JE3"
    }
  ],
  "id": "MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkMw",
  "links": [
    {
      "@type": "Link",
      "rel": "organization",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456"
    },
    {
      "@type": "Link",
      "rel": "field",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fields/d61b83f4-3a12-431e-8010-596f2466dc27"
    },
    {
      "@type": "Link",
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkMw"
    },
    {
      "@type": "Link",
      "rel": "measurementTypes",
      "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkMw/measurementTypes"
    },
    {
      "@type": "Link",
      "rel": "tillageDepthTarget",
      "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkMw/measurementTypes/TillageDepthTarget"
    },
    {
      "@type": "Link",
      "rel": "tillageDepthResult",
      "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkMw/measurementTypes/TillageDepthResult"
    },
    {
      "@type": "Link",
      "rel": "tillagePressureTarget",
      "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkMw/measurementTypes/TillagePressureTarget"
    },
    {
      "@type": "Link",
      "rel": "tillagePressureResult",
      "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkMw/measurementTypes/TillagePressureResult"
    },
    {
      "@type": "Link",
      "rel": "tillageSpeedResult",
      "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkMw/measurementTypes/TillageSpeedResult"
    },
    {
      "@type": "Link",
      "rel": "client",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456/clients/46234f43-0000-1000-4014-e1e1e11124e0"
    },
    {
      "@type": "Link",
      "rel": "farm",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456/farms/4641d448-0000-1000-4033-e1e1e11124e0"
    },
    {
      "@type": "Link",
      "rel": "workPlans",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456/workPlans/2fac815e-5696-4ff6-86a0-39093b7dbf7e"
    }
  ]
}
```

