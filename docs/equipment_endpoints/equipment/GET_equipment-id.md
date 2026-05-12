# GET /equipment/{id}

**Source:** John Deere Operations Center - Equipment API
**Endpoint ID:** `#/equipment/{id}/get`

> View equipment details by Id

---

## Description

This resource allows the client to view the details of one piece of equipment.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://equipmentapi.deere.com/isg/equipment/{id}
```

**Accept:** ``

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| id<br>Required | integer | Example: 1111 | path |
| embed | string | embed 'pairingDetails' is only supported along with 'devices' or 'equipment' embeds<br>Allowed Values: devices,equipment,pairingDetails,icon,offsets,capabilities | query |


