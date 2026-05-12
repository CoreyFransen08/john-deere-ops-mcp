# GET /organizations/{orgId}/workPlans/{erid}

**Source:** John Deere Operations Center - Work Plans API
**Endpoint ID:** `#/organizations/{orgId}/workPlans/{erid}/get`

> Get a Work Plan

---

## Description

Get a single work plan by erid in the target organization. In order to do this, the authenticated user must have following permissions within the organization.
Work: access level 1
Locations: access level 1
Equipment: access level 1
Organization Management: access level 1

**OAuth Scope Required:** `work1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgId}/workPlans/{erid}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | Owning Organization ID<br>Example: 1234 | path |
| erid<br>Required | GUID | id of a work plan unique within target organization<br>Example: 43b12553-c5ca-42f7-ac5b-a44612e24cca | path |


## Status Codes

| Code | Message | Description |
| --- | --- | --- |
| 200 | Ok | The request succeeded. Work plan is returned in response body |
| 400 | Bad Request | Request is rejected due to invalid request parameter values. Response body will contain more details on reason of failure |
| 403 | Forbidden | Authenticated user does not have required permission in target organization to get work plan |
| 404 | Not Found | Server can not find requested work plan |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| erid | GUID | Id of work plan unique within organization<br>Example: 9c28ef53-da68-4a85-916e-74c1a5b4491d |
| location | object | Indicates location where work will be executed |
| workType | object | Defined type can be used to specify representation domain and instance domain |
| year | integer | calendar year<br>Example: 2021 |
| operations | Array of object | ---<br>MaxLength: 2 MinLength: 1 |
| workPlanAssignments | Array of object | Array of work plan assignments. Each work plan assignment will have machine, operator and implements<br>Example: See sample response |
| guidanceSettings | object | Guidance settings for work plan<br>Example: See sample response |
| workOrder | string | This attribute can be used to group related work on multiple fields. Max length possible is 255 characters<br>Example: sample work order<br>MaxLength: 255 |
| instructions | string | This attribute can be used to provide instructions to operator executing work. Max length possible is 255 characters<br>Example: sample work instructions<br>MaxLength: 255 |
| workStatus | string | Indicates status of work plan. This is read only field. Possible values are, PLANNED, IN_PROGRESS, COMPLETED<br>Example: PLANNED |
| sequenceNumber | number | Indicates priority of work plan. This is read only field. Sequence number will be calculated by POST API. Lower sequence number indicates higher priority. Newly created work plan will have higher priority than old work plans within the context of the same work type and year<br>Example: 10 |


## Sample Response [JSON]

```
{
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/workPlans/{WorkPlanId}"
    }
  ],
  "erid": "{WorkPlanId}",
  "location": {
    "fieldUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/fields/{FieldId}"
  },
  "workType": {
    "representationDomainId": "dtOperationClass",
    "instanceDomainId": "dtiSeeding"
  },
  "year": 2025,
  "operations": [
    {
      "operationType": {
        "representationDomainId": "dtOperationClass",
        "instanceDomainId": "dtiSeeding"
      },
      "operationInputs": [
        {
          "operationProduct": {
            "inputUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/varieties/{VarietyId1}",
            "inputType": "VARIETY",
            "varietySelectionMode": "USER_DEFINED"
          },
          "operationPrescription": {
            "fixedRate": {
              "valueAsDouble": 15000,
              "unit": "seeds1ha-1",
              "vrDomainId": "vrSeedRateSeedsTarget"
            }
          }
        },
        {
          "operationProduct": {
            "inputUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/varieties/{VarietyId2}",
            "inputType": "VARIETY",
            "varietySelectionMode": "USER_DEFINED"
          },
          "operationPrescription": {
            "prescriptionUse": {
              "fileUri": "https://sandboxapi.deere.com/platform/files/{FileId1}",
              "unit": "seeds1ha-1",
              "vrDomainId": "vrSeedRateSeedsTarget",
              "prescriptionLayerUri": "https://api.deere.com/isg/organizations/{OrganizationId}/prescriptions/{PrescriptionId}/prescriptionLayers/{PrescriptionLayerId}",
              "multiplier": {
                "valueAsDouble": 50,
                "unit": "prcnt",
                "vrDomainId": "vrPrescriptionRateMultiplier"
              },
              "multiplierMode": "USER_DEFINED",
              "lookAhead": {
                "valueAsDouble": 2,
                "unit": "sec",
                "vrDomainId": "vrPrescriptionLookAheadTime"
              },
              "lookAheadMode": "USER_DEFINED"
            }
          }
        },
        {
          "operationProduct": {
            "inputUri": "https://sandboxapi.deere.com/platform/cropTypes/{CropName}",
            "inputType": "CROP",
            "varietySelectionMode": "NONE"
          }
        }
      ]
    },
    {
      "operationType": {
        "representationDomainId": "dtOperationClass",
        "instanceDomainId": "dtiApplication"
      },
      "operationInputs": [
        {
          "operationProduct": {
            "inputUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/chemicals/{ChemicalId}",
            "inputType": "CHEMICAL",
            "varietySelectionMode": "NONE"
          },
          "operationPrescription": {
            "fixedRate": {
              "valueAsDouble": 60,
              "unit": "l1ha-1",
              "vrDomainId": "vrAppRateVolumeTarget"
            }
          }
        },
        {
          "operationProduct": {
            "inputUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/chemicals/{FertilizerId}",
            "inputType": "FERTILIZER",
            "varietySelectionMode": "NONE"
          },
          "operationPrescription": {
            "prescriptionUse": {
              "fileUri": "https://sandboxapi.deere.com/platform/files/{FileId2}",
              "unit": "kg1ha-1",
              "vrDomainId": "vrAppRateMassTarget",
              "prescriptionLayerUri": "https://api.deere.com/isg/organizations/{OrganizationId}/prescriptions/{PrescriptionId}/prescriptionLayers/{PrescriptionLayerId}",
              "multiplier": {
                "valueAsDouble": 50,
                "unit": "prcnt",
                "vrDomainId": "vrPrescriptionRateMultiplier"
              },
              "multiplierMode": "USER_DEFINED",
              "lookAhead": {
                "valueAsDouble": 2,
                "unit": "sec",
                "vrDomainId": "vrPrescriptionLookAheadTime"
              },
              "lookAheadMode": "USER_DEFINED"
            }
          }
        }
      ]
    }
  ],
  "workPlanAssignments": [
    {
      "equipmentMachineUri": "https://equipmentapi.deere.com/isg/equipment/{EquipmentId1}",
      "equipmentImplementUris": [
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId1}",
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId1}"
      ]
    },
    {
      "equipmentMachineUri": "https://equipmentapi.deere.com/isg/equipment/{EquipmentId2}",
      "equipmentImplementUris": [
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId2}",
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId2}"
      ]
    }
  ],
  "guidanceSettings": {
    "preferenceSettings": {
      "includeLatestFieldOperation": "NONE",
      "preferenceMode": "USER_SELECTED",
      "entityType": "GUIDANCE_LINE",
      "entityUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/fields/{FieldId}/guidanceLines/{GuidanceId}"
    },
    "includeGuidance": [
      {
        "entityType": "GUIDANCE_LINE",
        "entityUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/fields/{FieldId}/guidanceLines/{GuidanceId}"
      },
      {
        "entityType": "GUIDANCE_PLAN",
        "entityUri": "https://api.deere.com/isg/organizations/{OrganizationId}/guidancePlans/{GuidancePlanId}"
      },
      {
        "entityType": "SOURCE_OPERATION",
        "entityUri": "https://sandboxapi.deere.com/platform/fieldOperations/{FieldOperationId}"
      }
    ]
  },
  "workStatus": "PLANNED",
  "workOrder": "Sample work order",
  "instructions": "Sample work instructions",
  "sequenceNumber": 1500
}
```

