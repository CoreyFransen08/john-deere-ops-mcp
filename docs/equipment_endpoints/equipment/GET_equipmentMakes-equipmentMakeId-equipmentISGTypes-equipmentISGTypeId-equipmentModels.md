# GET /equipmentMakes/{equipmentMakeId}/equipmentISGTypes/{equipmentISGTypeId}/equipmentModels

**Source:** John Deere Operations Center - Equipment API
**Endpoint ID:** `#/equipmentMakes/{equipmentMakeId}/equipmentISGTypes/{equipmentISGTypeId}/equipmentModels/get`

> Get equipment models by make id and ISG type id

---

## Description

This operation retrieves a list of Equipment Models based on given makeId and ISGtypeId.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://equipmentapi.deere.com/isg/equipmentMakes/{equipmentMakeId}/equipmentISGTypes/{equipmentISGTypeId}/equipmentModels
```

**Accept:** `application/json`

## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| links | Array of Link | --- |
| values | Array of EquipmentModel | --- |


## Sample Response [JSON]

```
{
  "links": [],
  "values": [
    {
      "@type": "EquipmentModel",
      "name": "Model",
      "ERID": "5a734a92-a5a3-4e79-8bba-60c54428690e",
      "category": "Machine",
      "certified": true,
      "deprecated": false,
      "id": "121"
    }
  ]
}
```

