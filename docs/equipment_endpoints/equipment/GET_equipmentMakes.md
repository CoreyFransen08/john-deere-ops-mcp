# GET /equipmentMakes

**Source:** John Deere Operations Center - Equipment API
**Endpoint ID:** `#/equipmentMakes/get`

> Get equipment makes

---

## Description

This resource allows the client to view equipment makes and their associated IDs and names.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://equipmentapi.deere.com/isg/equipmentMakes
```

**Accept:** `application/json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| deprecated<br>Required | boolean | Deprecated value should be false<br>Example: false | path |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| values | Array of EquipmentMake | --- |


## Sample Response [JSON]

```
{
  "links": [],
  "values": [
    {
      "@type": "EquipmentMake",
      "name": "JOHN DEERE",
      "certified": false,
      "deereOrSubsidiary": true,
      "id": 1,
      "ERID": "0e8031fe-fe81-11ea-bec7-124fe3772e59"
    }
  ]
}
```

