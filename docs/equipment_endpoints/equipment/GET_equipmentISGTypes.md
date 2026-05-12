# GET /equipmentISGTypes

**Source:** John Deere Operations Center - Equipment API
**Endpoint ID:** `#/equipmentISGTypes/get`

> Get equipment ISG types

---

## Description

This operation retrieves a list of Equipment ISG Types based on the supplied query parameters.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://equipmentapi.deere.com/isg/equipmentISGTypes
```

**Accept:** `application/json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| X-Deere-Originator | string | Originating system of the request<br>Example: DataSync | header |
| category | array | List of type categories for the Equipment Model<br>Example: machine,implement<br>Allowed Values: machine,implement | query |
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
      "allowsCustomModel": true,
      "id": "121",
      "deprecated": false
    }
  ]
}
```

