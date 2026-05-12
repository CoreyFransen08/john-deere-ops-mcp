# PUT /organizations/{orgId}/workPlans/{erid}

**Source:** John Deere Operations Center - Work Plans API
**Endpoint ID:** `#/organizations/{orgId}/workPlans/{erid}/put`

> Update a Work Plan

---

## Description

This endpoint will update an existing work plan within the target organization. In order to do this, the authenticated user must have following permissions within the organization.
Work: access level 2
Locations: access level 1
Equipment: access level 1
Organization Management: access level 1

Following attributes of work plan can not be updated.

erid
location
workType
year
sequenceNumber
workStatus

**OAuth Scope Required:** `work2`

**Request URI**

```
PUT https://sandboxapi.deere.com/platform/organizations/{orgId}/workPlans/{erid}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | Owning Organization ID<br>Example: 1234 | path |
| erid<br>Required | GUID | id of a work plan unique within target organization<br>Example: 43b12553-c5ca-42f7-ac5b-a44612e24cca | path |


## Status Codes

| Code | Message | Description |
| --- | --- | --- |
| 204 | No Content | The request succeeded. Work plan is updated |
| 400 | Bad Request | Request is rejected due to invalid request body. Response body will contain more details on reason of failure |
| 403 | Forbidden | Authenticated user does not have required permission in target organization to update work plan |
| 404 | Not Found | Server can not find requested work plan |


## Request Details

| Field | Type | Description & Example |
| --- | --- | --- |
| erid | GUID | Id of work plan unique within organization<br>Example: 9c28ef53-da68-4a85-916e-74c1a5b4491d |
| location | object | Indicates location where work will be executed |
| fieldUri | uri | Reference of field where work will be executed<br>Example: https://sandboxapi.deere.com/platform/organizations/1234/fields/5cb79090-e850-11ea-adc1-0242ac120005 |
| workType | object | Defined type can be used to specify representation domain and instance domain |
| representationDomainId | string | Domain Id of representation system used to validate value and unit of fixed rate<br>Example: dtOperationClass |
| instanceDomainId | string | Domain Id of representation system used to validate value and unit of fixed rate<br>Example: dtiTillage |
| year | integer | calendar year<br>Example: 2021 |
| operations | Array of object | ---<br>MaxLength: 2 MinLength: 1 |
| operationType | object | Defined type can be used to specify representation domain and instance domain |
| representationDomainId | string | Domain Id of representation system used to validate value and unit of fixed rate<br>Example: dtOperationClass |
| instanceDomainId | string | Domain Id of representation system used to validate value and unit of fixed rate<br>Example: dtiTillage |
| operationInputs | Array of object | --- |
| operationProduct | object | Operation Product can be used to add details of crop or product being used in operation |
| inputType | string | Indicates type of Input. Accepted values are, CHEMICAL, FERTILIZER, CROP, TANK_MIX, VARIETY, DRY_BLEND<br>Example: CHEMICAL |
| inputUri | uri | Uri of Input<br>Example: https://sandboxapi.deere.com/platform/organizations/1234/chemicals/e1095e88-e921-11ea-adc1-0242ac12000 |
| varietySelectionMode | string | For the inputType VARIETY, the accepted values for varietySelectionMode are USER_DEFINED and USE_VARIETY_LOCATOR. For other input types (CROP, TANK_MIX, DRY_BLEND, CHEMICAL, FERTILIZER), use NONE.<br>Allowed Values: USER_DEFINED,USE_VARIETY_LOCATOR,NONE |
| operationPrescription | object | Operation Prescription can be used to specify fixed rate or prescription reference |
| fixedRate | object | MeasurementAsDouble objects are used to specify values in their respective vrDomain and unit |
| valueAsDouble | number | Numeric value for fixed rate<br>Example: 50.5 |
| unit | string | Unit of fixed rate<br>Example: kg |
| vrDomainId | string | Domain Id of representation system used to validate value and unit of fixed rate<br>Example: vrAppRateMassTarget |
| prescriptionUse | object | PrescriptionUse can be used to specify prescription and unit details |
| fileUri | uri | Uri of prescription file to use for work plan<br>Example: https://sandboxapi.deere.com/platform/files/1111 |
| unit | string | Unit for rates included in prescription<br>Example: kg1ha-1 |
| vrDomainId | string | The corresponding domainId from the EIC/Adapt representation system.<br>Example: vrAppRateMassTarget |
| prescriptionLayerUri | uri | Uri of prescription layer<br>Example: https://api.deere.com/isg/organizations/1234/prescriptions/a64fa135-d20e-48e1-9a83-c19e5207bf47/prescriptionLayers/43ff80d4-9312-42b6-94d3-57d8233c0266 |
| multiplier | object | Users can choose to decrease/increase the Rx rate by defining a multiplier, VR domain is vrPrescriptionRateMultiplier |
| valueAsDouble | number | Numeric value for fixed rate<br>Example: 50.5 |
| unit | string | Unit of fixed rate<br>Example: kg |
| vrDomainId | string | Domain Id of representation system used to validate value and unit of fixed rate<br>Example: vrAppRateMassTarget |
| multiplierMode | string | Mode for multiplier, default is KEEP_MACHINE_SETTING<br>Example: USER_DEFINED |
| lookAhead | object | To compensate for mechanical delays the display looks ahead to command the rate earlier, VR domain is vrPrescriptionLookAheadTime |
| valueAsDouble | number | Numeric value for fixed rate<br>Example: 50.5 |
| unit | string | Unit of fixed rate<br>Example: kg |
| vrDomainId | string | Domain Id of representation system used to validate value and unit of fixed rate<br>Example: vrAppRateMassTarget |
| lookAheadMode | string | Mode for look ahead, default is KEEP_MACHINE_SETTING<br>Example: USER_DEFINED |
| workPlanAssignments | Array of object | Array of work plan assignments. Each work plan assignment will have machine, operator and implements<br>Example: See sample response |
| equipmentMachineUri | uri | Uri of machine<br>Example: https://equipmentapi.deere.com/isg/equipment/1111 |
| operatorUri | uri | Uri of operator<br>Example: https://sandboxapi.deere.com/platform/organizations/1234/operators/6708408a-e918-11ea-adc1-0242ac120002 |
| equipmentImplementUris | [uri] | Array of implement uris<br>Example: [https://equipmentapi.deere.com/isg/equipment/2222] |
| guidanceSettings | object | Guidance settings for work plan<br>Example: See sample response |
| preferenceSettings | object | Preference settings for guidance |
| includeLatestFieldOperation | string | Decide to include rowMap derived from base field operation or only include manually selected guidance<br>Example: NONE |
| preferenceMode | string | Manually set preferred entity, or use rowMap from latest field operation as default<br>Example: USER_SELECTED |
| entityType | string | Indicates type of entity for guidance, when user selected<br>Example: GUIDANCE_LINE |
| entityUri | uri | Uri of entity for guidance, when user selected<br>Example: https://sandboxapi.deere.com/platform/organizations/1234/fields/5cb79090-e850-11ea-adc1-0242ac120005/guidanceLines/58e37f70-e86d-11ea-adc1-0242ac120002 |
| includeGuidance | Array of object | --- |
| entityType | string | Indicates type of entity for guidance<br>Example: GUIDANCE_LINE |
| entityUri | uri | Uri of entity for guidance<br>Example: https://sandboxapi.deere.com/platform/organizations/1234/fields/5cb79090-e850-11ea-adc1-0242ac120005/guidanceLines/58e37f70-e86d-11ea-adc1-0242ac120002 |
| workOrder | string | This attribute can be used to group related work on multiple fields. Max length possible is 255 characters<br>Example: sample work order<br>MaxLength: 255 |
| instructions | string | This attribute can be used to provide instructions to operator executing work. Max length possible is 255 characters<br>Example: sample work instructions<br>MaxLength: 255 |
| workStatus | string | Indicates status of work plan. This is read only field. Possible values are, PLANNED, IN_PROGRESS, COMPLETED<br>Example: PLANNED |
| sequenceNumber | number | Indicates priority of work plan. This is read only field. Sequence number will be calculated by POST API. Lower sequence number indicates higher priority. Newly created work plan will have higher priority than old work plans within the context of the same work type and year<br>Example: 10 |


## Sample Request [JSON]: Sample JSON

```
{
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
            "inputUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/chemicals/{ChemicalId1}",
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
            "inputUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/fertilizers/{FertilizerId1}",
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
  "workOrder": "Sample work order",
  "instructions": "Sample work instructions"
}
```

## Sample Request [JSON]: Update tillage work plan

```
{
  "erid": "{WorkPlanId}",
  "location": {
    "fieldUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/fields/{FieldId}"
  },
  "workType": {
    "representationDomainId": "dtOperationClass",
    "instanceDomainId": "dtiTillage"
  },
  "year": 2025,
  "operations": [
    {
      "operationType": {
        "representationDomainId": "dtOperationClass",
        "instanceDomainId": "dtiTillage"
      },
      "operationInputs": [
        {
          "operationPrescription": {
            "fixedRate": {
              "valueAsDouble": 10,
              "unit": "cm",
              "vrDomainId": "vrTillageDepthTarget"
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
  "workOrder": "Sample work order",
  "instructions": "Sample work instructions"
}
```

## Sample Request [JSON]: Update seeding work plan

```
{
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
  "workOrder": "Sample work order",
  "instructions": "Sample work instructions"
}
```

## Sample Request [JSON]: Update Seeding + Application work plan

```
{
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
            "inputUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/chemicals/{ChemicalId1}",
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
            "inputUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/fertilizers/{FertilizerId1}",
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
  "workOrder": "Sample work order",
  "instructions": "Sample work instructions"
}
```

## Sample Request [JSON]: Update Application work plan

```
{
  "erid": "{WorkPlanId}",
  "location": {
    "fieldUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/fields/{FieldId}"
  },
  "workType": {
    "representationDomainId": "dtOperationClass",
    "instanceDomainId": "dtiApplication"
  },
  "year": 2025,
  "operations": [
    {
      "operationType": {
        "representationDomainId": "dtOperationClass",
        "instanceDomainId": "dtiApplication"
      },
      "operationInputs": [
        {
          "operationProduct": {
            "inputUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/chemicals/{ChemicalId1}",
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
            "inputUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/fertilizers/{FertilizerId1}",
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
  "workOrder": "Sample work order",
  "instructions": "Sample work instructions"
}
```

## Sample Request [JSON]: Update Harvest work plan

```
{
  "erid": "{WorkPlanId}",
  "location": {
    "fieldUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/fields/{FieldId}"
  },
  "workType": {
    "representationDomainId": "dtOperationClass",
    "instanceDomainId": "dtiHarvest"
  },
  "year": 2025,
  "operations": [
    {
      "operationType": {
        "representationDomainId": "dtOperationClass",
        "instanceDomainId": "dtiHarvest"
      },
      "operationInputs": [
        {
          "operationProduct": {
            "inputType": "VARIETY",
            "varietySelectionMode": "USE_VARIETY_LOCATOR"
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
  "workOrder": "Sample work order",
  "instructions": "Sample work instructions"
}
```

## Sample Response [JSON]

```
204 No Content
```

