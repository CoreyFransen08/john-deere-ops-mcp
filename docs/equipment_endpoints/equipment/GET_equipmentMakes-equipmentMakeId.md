# GET /equipmentMakes/{equipmentMakeId}

**Source:** John Deere Operations Center - Equipment API
**Endpoint ID:** `#/equipmentMakes/{equipmentMakeId}/get`

> View equipment by make Id

---

## Description

This resource allows the client to view equipment makes by an equipment make ID.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://equipmentapi.deere.com/isg/equipmentMakes/{equipmentMakeId}
```

**Accept:** `application/json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| equipmentMakeId<br>Required | integer | ID for Equipment Make<br>Example: 1111 | path |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| links | Array of Link | --- |
| values | Array of EquipmentMake | --- |


## Sample Response [JSON]

```
{
  "@type": "EquipmentMake",
  "name": "JOHN DEERE",
  "certified": false,
  "deereOrSubsidiary": true,
  "id": 1,
  "ERID": "0e8031fe-fe81-11ea-bec7-124fe3772e59"
}
```

