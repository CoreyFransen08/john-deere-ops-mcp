# GET /equipmentMakes/{equipmentMakeId}/equipmentISGTypes/{equipmentISGTypeId}/equipmentModels/{equipmentModelId}

**Source:** John Deere Operations Center - Equipment API
**Endpoint ID:** `#/equipmentMakes/{equipmentMakeId}/equipmentISGTypes/{equipmentISGTypeId}/equipmentModels/{equipmentModelId}/get`

> Get equipment model by make id, ISG type id and model id

---

## Description

This operation retrieves a single Equipment Model based on given makeId, isgTypeId and modelId.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://equipmentapi.deere.com/isg/equipmentMakes/{equipmentMakeId}/equipmentISGTypes/{equipmentISGTypeId}/equipmentModels/{equipmentModelId}
```

**Accept:** `application/json`

## Sample Response [JSON]

```
{
  "@type": "EquipmentModel",
  "name": "Model",
  "ERID": "5a734a92-a5a3-4e79-8bba-60c54428690e",
  "category": "Machine",
  "certified": true,
  "deprecated": false,
  "id": "121"
}
```

