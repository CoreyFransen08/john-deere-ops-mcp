# POST /organizations/{orgId}/workPlans

**Source:** John Deere Operations Center - Work Plans API
**Endpoint ID:** `#/organizations/{orgId}/workPlans/post`

> Create a Work Plan

---

## Description

This endpoint can be used to create work plans within the target organization. In order to do this, the authenticated user must have following permissions within the organization.
Work: access level 2
Locations: access level 1
Equipment: access level 1
Organization Management: access level 1

Note: All work plans created using this api will have PLANNED status by default.

**OAuth Scope Required:** `work2`

**Request URI**

```
POST https://sandboxapi.deere.com/platform/organizations/{orgId}/workPlans
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | Organization<br>Example: 1234 | path |


## Status Codes

| Code | Message | Description |
| --- | --- | --- |
| 201 | Created | Work Plan successfully created |
| 400 | Bad Request | Request is rejected due to invalid request body. Response body will contain more details on reason of failure |
| 403 | Forbidden | Authenticated user does not have required permission in target organization to create work plan |
| 409 | Conflict | Erid provided in request body already exists in target organization |


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
          "operationProducts": {
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

## Sample Request [JSON]: Create Tillage work plan [Minimum request payload]

```
{
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
      "operationInputs": []
    }
  ],
  "workPlanAssignments": [],
  "workOrder": "",
  "instructions": ""
}
```

## Sample Request [JSON]: Create Tillage work plan

```
{
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
      "operatorUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/operators/{OperatorId}",
      "equipmentImplementUris": [
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId2}",
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId3}"
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
      }
    ]
  },
  "workOrder": "Sample work order",
  "instructions": "Sample work instructions"
}
```

## Sample Request [JSON]: Create Seeding work plan [Minimum request payload]

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
            "inputUri": "https://sandboxapi.deere.com/platform/cropTypes/{CropName}",
            "inputType": "CROP",
            "varietySelectionMode": "NONE"
          }
        }
      ]
    }
  ],
  "workPlanAssignments": [],
  "workOrder": "",
  "instructions": ""
}
```

## Sample Request [JSON]: Create Seeding + Application work plan [Minimum request payload]

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
      "operationInputs": []
    }
  ],
  "workPlanAssignments": [],
  "workOrder": "",
  "instructions": ""
}
```

## Sample Request [JSON]: Create Seeding work plan

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
    }
  ],
  "workPlanAssignments": [
    {
      "equipmentMachineUri": "https://equipmentapi.deere.com/isg/equipment/{EquipmentId1}",
      "operatorUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/operators/{OperatorId}",
      "equipmentImplementUris": [
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId2}",
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId3}"
      ]
    },
    {
      "equipmentMachineUri": "https://equipmentapi.deere.com/isg/equipment/{EquipmentId4}",
      "operatorUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/operators/{OperatorId2}",
      "equipmentImplementUris": [
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId5}",
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId6}"
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
      }
    ]
  },
  "workOrder": "Sample work order",
  "instructions": "Sample work instructions"
}
```

## Sample Request [JSON]: Create Seeding + Application work plan

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
          "operationProducts": {
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
      "operatorUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/operators/{OperatorId}",
      "equipmentImplementUris": [
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId2}",
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId3}"
      ]
    },
    {
      "equipmentMachineUri": "https://equipmentapi.deere.com/isg/equipment/{EquipmentId4}",
      "operatorUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/operators/{OperatorId2}",
      "equipmentImplementUris": [
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId5}",
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId6}"
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
      }
    ]
  },
  "workOrder": "Sample work order",
  "instructions": "Sample work instructions"
}
```

## Sample Request [JSON]: Create Application work plan [Minimum request payload]

```
{
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
      "operationInputs": []
    }
  ],
  "workPlanAssignments": [],
  "workOrder": "",
  "instructions": ""
}
```

## Sample Request [JSON]: Create Application work plan

```
{
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
        },
        {
          "operationProduct": {
            "inputUri": "https://api.deere.com/platform/organizations/294130/tankMixes/bf6b0bf0-8f5b-442d-963a-e6629fc8a390",
            "inputType": "TANK_MIX",
            "varietySelectionMode": "NONE",
            "operationPrescription": {
              "fixedRate": {
                "valueAsDouble": 120,
                "unit": "gal1ac-1",
                "vrDomainId": "vrSolutionRateLiquid"
              }
            }
          }
        },
        {
          "operationProduct": {
            "inputUri": "https://api.deere.com/platform/organizations/294130/dryBlends/e2dc48f1-dd37-4dcb-ba87-8ec06955d5b5",
            "inputType": "DRY_BLEND",
            "varietySelectionMode": "NONE",
            "operationPrescription": {
              "fixedRate": {
                "valueAsDouble": 920.22,
                "unit": "kg1ha-1",
                "vrDomainId": "vrSolutionRateMass"
              }
            }
          }
        }
      ]
    }
  ],
  "workPlanAssignments": [
    {
      "equipmentMachineUri": "https://equipmentapi.deere.com/isg/equipment/{EquipmentId1}",
      "operatorUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/operators/{OperatorId}",
      "equipmentImplementUris": [
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId2}",
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId3}"
      ]
    },
    {
      "equipmentMachineUri": "https://equipmentapi.deere.com/isg/equipment/{EquipmentId4}",
      "operatorUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/operators/{OperatorId2}",
      "equipmentImplementUris": [
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId5}",
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId6}"
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
      }
    ]
  },
  "workOrder": "Sample work order",
  "instructions": "Sample work instructions"
}
```

## Sample Request [JSON]: Create Harvest work plan [Minimum request payload]

```
{
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
            "inputUri": "https://sandboxapi.deere.com/platform/cropTypes/{CropName}",
            "inputType": "CROP",
            "varietySelectionMode": "NONE"
          }
        }
      ]
    }
  ],
  "workPlanAssignments": [],
  "workOrder": "",
  "instructions": ""
}
```

## Sample Request [JSON]: Create Harvest work plan [varietySelectionMode = USE_VARIETY_LOCATOR]

```
{
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
      "operatorUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/operators/{OperatorId}",
      "equipmentImplementUris": [
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId2}",
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId3}"
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
      }
    ]
  },
  "workOrder": "Sample work order",
  "instructions": "Sample work instructions"
}
```

## Sample Request [JSON]: Create Harvest work plan [varietySelectionMode = USER_DEFINED]

```
{
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
            "inputUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/varieties/{VarietyId1}",
            "inputType": "VARIETY",
            "varietySelectionMode": "USER_DEFINED"
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
      "operatorUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/operators/{OperatorId}",
      "equipmentImplementUris": [
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId2}",
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId3}"
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
      }
    ]
  },
  "workOrder": "Sample work order",
  "instructions": "Sample work instructions"
}
```

## Sample Response [JSON]

```
{
  "links": {
    "rel": "self",
    "uri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/workPlans/{WorkPlanId}"
  },
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
      "operatorUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/operators/{OperatorId}",
      "equipmentImplementUris": [
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId2}",
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId3}"
      ]
    },
    {
      "equipmentMachineUri": "https://equipmentapi.deere.com/isg/equipment/{EquipmentId4}",
      "operatorUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/operators/{OperatorId2}",
      "equipmentImplementUris": [
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId5}",
        "https://equipmentapi.deere.com/isg/equipment/{EquipmentId6}"
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
      }
    ]
  },
  "workStatus": "PLANNED",
  "workOrder": "Sample work order",
  "instructions": "Sample work instructions",
  "sequenceNumber": 1500
}
```

## Sample Response [JSON]: Error

```
{
  "total": 4,
  "errors": [
    {
      "guid": "6d7c5648-a87a-4360-aa7d-fc063291389f",
      "message": "size must be between 1 and 2",
      "field": "operations",
      "@type": "Error"
    },
    {
      "guid": "b18e8f42-20fe-41d4-8164-f1a30fa221cb",
      "message": "must not be null",
      "field": "year",
      "@type": "Error"
    },
    {
      "guid": "f2ad44b7-c41d-4c1d-9377-8d3ebcb33ac8",
      "message": "must not be null",
      "field": "location",
      "@type": "Error"
    },
    {
      "guid": "fe094b6c-9c16-41c5-99c7-e0075146acd3",
      "message": "must not be null",
      "field": "workType",
      "@type": "Error"
    }
  ],
  "@type": "Errors"
}
```

