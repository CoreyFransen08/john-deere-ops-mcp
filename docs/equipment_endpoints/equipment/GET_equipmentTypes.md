# GET /equipmentTypes

**Source:** John Deere Operations Center - Equipment API
**Endpoint ID:** `#/equipmentTypes/get`

> Get equipment types

---

## Description

This resource allows the client to view equipment types and their associated IDs and names.

Note: This endpoint is deprecated and should no longer be used.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://equipmentapi.deere.com/isg/equipmentTypes
```

**Accept:** `application/json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| deprecated<br>Required | boolean | Deprecated value should be false<br>Example: false | path |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| links | Array of Link | --- |
| values | Array of EquipmentType | --- |


## Sample Response [JSON]

```
{
  "links": [],
  "values": [
    {
      "@type": "EquipmentType",
      "name": "Scraper",
      "ERID": "15e10ade-33ae-40a1-9b06-7800c7581a17",
      "category": "Implement",
      "marketSegment": "Construction",
      "allowsCustomModel": true,
      "id": "121",
      "icon": {
        "@type": "EquipmentIcon",
        "name": "generic-fuel-trailer",
        "iconStyle": {
          "primaryColor": "#7E7E7E",
          "secondaryColor": "#D3D3D3"
        }
      }
    }
  ]
}
```

