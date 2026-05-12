# GET /cropTypes/{id}

**Source:** John Deere Operations Center - Crop Types API
**Endpoint ID:** `#/cropTypes/{id}/get`

> View a specific cropType

---

## Description

This endpoint will return details of specific cropType.

**OAuth Scope Required:** `ag1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/cropTypes/{id}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| id<br>Required | string | This is the crop type Id<br>Example: 173 | path |
| x-deere-signature | GUID | x-deere-signature should be managed by the client per user per API. For a new user/new API, the first request will have a blank value for x-deere-signature. Changes can be tracked with the x-deere-signature returned in the response. If the response has not changed since the last API call, the value of x-deere-signature is not changed and the client should use the same GUID next time.<br>Example: 9r8392615e4b4e1c12458026f47109bb | header |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| x-deere-signature | string | A new x-deere-signature response header will be included if the response has changed since last api call.<br>Example: 9b5392615e4b4e1c92013026f47109bb |
| id | string | The primary identifier for the operation.<br>Example: 1 |
| name | string | This is the crop type name.<br>Example: CORN_WET |
| translatedName | string | This is the crop type name translated using the Accept-Language header.<br>Example: Corn |
| color | string | This is the color associated with the crop type.<br>Example: #FFE119 |
| lastModifiedTime | string | This is the zoned last modified time of the crop type.<br>Example: 2021-10-14T11:55:00Z |
| Density | --- | --- |
| Moisture | --- | --- |
| Supported Equipment Types (REPLACES HARVEST MACHINE TYPE) | --- | --- |


## Sample Response [JSON]

```
{
  "@type": "CropType",
  "name": "CORN_WET",
  "translatedName": "Corn",
  "color": "#FFE119",
  "densityFactor": {
    "@type": "Density",
    "value": 25.4,
    "unit": "kg1bu-1"
  },
  "standardPayableMoisture": {
    "@type": "Moisture",
    "value": 15,
    "unit": "%"
  },
  "supportedEquipmentTypes": [
    {
      "@type": "SupportedEquipmentType",
      "erid": "d9d1c11f-35e0-43af-84ae-696d9ea3c18b",
      "equipmentTypeProtoEnum": "ET_CORN_HEAD"
    },
    {
      "@type": "SupportedEquipmentType",
      "erid": "d8dce5b0-cc8d-4c34-afac-27d93793bd86",
      "equipmentTypeProtoEnum": "ET_COMBINE"
    },
    {
      "@type": "SupportedEquipmentType",
      "erid": "57c1e304-bf44-4c50-bf3e-0e910d528b92",
      "equipmentTypeProtoEnum": "ET_BALER"
    }
  ],
  "lastModifiedTime": "2021-10-14T11:55:00Z",
  "id": "173",
  "links": [
    {
      "@type": "Link",
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/cropTypes/CORN_WET"
    }
  ]
}
```

