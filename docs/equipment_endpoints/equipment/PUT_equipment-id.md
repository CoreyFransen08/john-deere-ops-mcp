# PUT /equipment/{id}

**Source:** John Deere Operations Center - Equipment API
**Endpoint ID:** `#/equipment/{id}/put`

> Update equipment

---

## Description

This resource allows the client to update a piece of equipment within a user’s organization. Clients will only be able to update a piece of equipment that was contributed via the POST /equipment API. John Deere controlled equipment can only be managed via the Equipment application in Operations Center.

**OAuth Scope Required:** `eq2`

**Request URI**

```
PUT https://equipmentapi.deere.com/isg/equipment/{id}
```

**Accept:** `application/json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| id<br>Required | integer | Example: 1111 | path |


## Request Details

| Field | Type | Description & Example |
| --- | --- | --- |
| id<br>Required | string | Unique id<br>Example: 1 \| fcdc83cb-8840-4215-84b5-1769889db932 |
| name | string | Equipment Name.<br>Example: Cates 8360R 055358 |
| serialNumber<br>Required | string | Serial Number of the Equipment and passed on the query parameter<br>Example: Must be unique string. Max character count is 30. |
| make | object | Make of the equipment. |
| id | string | Unique id<br>Example: 1 \| fcdc83cb-8840-4215-84b5-1769889db932 |
| @type | string | EquipmentMake<br>Example: EquipmentMake |
| type | object | Type of the equipment. |
| id | string | Unique id<br>Example: 2 \| 82115264-9385-460c-bfbe-177a59445fd9 |
| @type | string | EquipmentType<br>Example: EquipmentType |
| model | object | Model of the equipment. |
| id | string | Unique id<br>Example: 3 \| 158df9ff-334a-4e0d-86cc-3adca17a9686 |
| @type | string | EquipmentModel<br>Example: EquipmentModel |
| icon | object | --- |


## Sample Request [JSON]

```
{
  "@type": "Machine",
  "id": 1,
  "name": "Equipment Name",
  "serialNumber": "1T0750LXCNF012345",
  "make": [
    {
      "@type": "EquipmentMake",
      "id": 1
    }
  ],
  "type": [
    {
      "@type": "EquipmentType",
      "id": 414
    }
  ],
  "model": [
    {
      "@type": "EquipmentModel",
      "id": 585917
    }
  ],
  "icon": [
    {
      "@type": "EquipmentIcon",
      "name": "crawler-loader",
      "iconStyle": {
        "primaryColor": "#F2A900",
        "secondaryColor": "#808082"
      }
    }
  ]
}
```

## Sample Response

```
204 No Content
```

