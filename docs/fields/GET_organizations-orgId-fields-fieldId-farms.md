# GET /organizations/{orgId}/fields/{fieldId}/farms

**Source:** John Deere Operations Center - Fields API
**Endpoint ID:** `#/organizations/{orgId}/fields/{fieldId}/farms/get`

> Get Farm by organization and fieldId

---

## Description

This api is designed to get farms within an organization and for provided fieldId

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgId}/fields/{fieldId}/farms
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| embed | array | list of objects to include | query |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| @type | string | ---<br>Example: Farm |
| name | string | ---<br>Example: John Doe |
| id | string | ---<br>Example: 9369f3f6-2428-4bba-bf64-0a19cdaf007d |
| archived | boolean | ---<br>Example: false |
| clientUri | string | ---<br>Example: https://apiqa.tal.deere.com/platform/organizations/5555/clients/22b84b4c-b651-d554-a02b-89829cd5239c |
| links | Array of object | --- |


## Sample Response [JSON]

```
{
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/6789/fields/c36a7ed3-3b96-4112-986d-a5760e871d2e/farms"
    }
  ],
  "total": 1,
  "values": [
    {
      "type": "Farm",
      "name": "farmName",
      "archived": false,
      "clientUri": "https://sandboxapi.deere.com/platform/organizations/592711/clients/061c0fb9-533-4537-9eaa-a4ed0bc13500",
      "links": [
        {
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/organizations/6789/clients/f1161eba-7c82-4a80-9eeb-383451b4c46e"
        },
        {
          "rel": "fields",
          "uri": "https://sandboxapi.deere.com/platform/organizations/6789/clients/f1161eba-7c82-4a80-9eeb-383451b4c46e/fields"
        },
        {
          "rel": "farms",
          "uri": "https://sandboxapi.deere.com/platform/organizations/6789/clients/f1161eba-7c82-4a80-9eeb-383451b4c46e/farms"
        },
        {
          "rel": "owningOrganization",
          "uri": "https://sandboxapi.deere.com/platform/organizations/6789"
        }
      ],
      "id": "f1161eba-7c82-4a80-9eeb-383451b4c46e"
    }
  ]
}
```

