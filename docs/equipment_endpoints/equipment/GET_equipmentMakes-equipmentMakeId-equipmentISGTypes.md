# GET /equipmentMakes/{equipmentMakeId}/equipmentISGTypes

**Source:** John Deere Operations Center - Equipment API
**Endpoint ID:** `#/equipmentMakes/{equipmentMakeId}/equipmentISGTypes/get`

> Get equipment ISG types by make id

---

## Description

This operation retrieves a list of Equipment ISG Types for given makeId.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://equipmentapi.deere.com/isg/equipmentMakes/{equipmentMakeId}/equipmentISGTypes
```

**Accept:** `application/json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| equipmentMakeId<br>Required | integer | ID for Equipment Make<br>Example: 1111 | path |
| deprecated | string | Whether to filter isg types by the deprecated flag<br>Allowed Values: false,true,all | query |
| embed | array | List of embed data for the Equipment ISG Type<br>Example: equipmentModels,recordMetadata<br>Allowed Values: equipmentModels,recordMetadata | query |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| links | Array of Link | --- |
| values | Array of EquipmentIsgType | --- |


## Sample Response [JSON]

```
{
  "links": [],
  "values": [
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
  ]
}
```

