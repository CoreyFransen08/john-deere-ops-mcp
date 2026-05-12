# GET /equipmentMakes/{equipmentMakeId}/equipmentISGTypes/{equipmentISGTypeId}

**Source:** John Deere Operations Center - Equipment API
**Endpoint ID:** `#/equipmentMakes/{equipmentMakeId}/equipmentISGTypes/{equipmentISGTypeId}/get`

> Get equipment ISG type by make id and ISG type id

---

## Description

This operation retrieves a single Equipment ISG Type for given makeId and isgTypeId..

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://equipmentapi.deere.com/isg/equipmentMakes/{equipmentMakeId}/equipmentISGTypes/{equipmentISGTypeId}
```

**Accept:** `application/json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| equipmentMakeId<br>Required | integer | ID for Equipment Make<br>Example: 1111 | path |
| equipmentISGTypeId<br>Required | integer | ID for Equipment ISG Type<br>Example: 1111 | path |
| embed | array | List of embed data for the Equipment ISG Type<br>Example: equipmentModels,recordMetadata<br>Allowed Values: equipmentModels,recordMetadata | query |


## Sample Response [JSON]

```
{
  "@type": "EquipmentISGType",
  "name": "Scraper",
  "ERID": "5a734a92-a5a3-4e79-8bba-60c54428690e",
  "category": "Machine",
  "isgmarketSegment": "Construction",
  "deprecated": false,
  "allowsCustomModel": true,
  "id": "121"
}
```

