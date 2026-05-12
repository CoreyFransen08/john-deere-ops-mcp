# GET /organizations/{orgId}/farms

**Source:** John Deere Operations Center - Farms API
**Endpoint ID:** `#/organizations/{orgId}/farms/get`

> View Farms in an Org

---

## Description

Retrieve all of the farms for an organization

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgId}/farms
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| embed | string | Embed additional traceability record metadata to response<br>Example: showRecordMetadata | query |
| recordFilter | string | Allows filtering based on archived status<br>Example: archived<br>Allowed Values: available,archived,all | query |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| @type | string | ---<br>Example: Farm |
| name | string | Farm Name<br>Example: John Doe |
| id | string | Farm Id<br>Example: 9369f3f6-2428-4bba-bf64-0a19cdaf007d |
| archived | boolean | Archived Status<br>Example: false |
| clientUri | string | Client Uri<br>Example: https://sandboxapi.deere.com/platform/organizations/5555/clients/22b84b4c-b651-d554-a02b-89829cd5239c |
| links | Array of object | --- |


## Sample Response [JSON]

```
{
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/6789/farms"
    }
  ],
  "total": 2,
  "values": [
    {
      "name": "FarmName",
      "clientUri": "https://sandboxapi.deere.com/platform/organizations/592715/clients/e45d1773-cb82-468-96ac-ba65917dd274,",
      "archived": false,
      "id": "f1161eba-7c82-4a80-9eeb-383451b4c46e",
      "links": [
        {
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/organizations/6789/farms/f1161eba-7c82-4a80-9eeb-383451b4c46e"
        },
        {
          "rel": "fields",
          "uri": "https://sandboxapi.deere.com/platform/organizations/6789/farms/f1161eba-7c82-4a80-9eeb-383451b4c46e/fields"
        },
        {
          "rel": "farms",
          "uri": "https://sandboxapi.deere.com/platform/organizations/6789/farms/f1161eba-7c82-4a80-9eeb-383451b4c46e/clients"
        },
        {
          "rel": "owningOrganization",
          "uri": "https://sandboxapi.deere.com/platform/organizations/6789"
        }
      ]
    }
  ]
}
```

