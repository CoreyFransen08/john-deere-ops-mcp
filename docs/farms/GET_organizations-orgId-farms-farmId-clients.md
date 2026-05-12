# GET /organizations/{orgId}/farms/{farmId}/clients

**Source:** John Deere Operations Center - Farms API
**Endpoint ID:** `#/organizations/{orgId}/farms/{farmId}/clients/get`

> View Clients that Own a Farm

---

## Description

Get clients by organization and farmId

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgId}/farms/{farmId}/clients
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| links | Array of object | --- |
| name | string | --- |
| id | string | --- |
| archived | boolean | --- |


## Sample Response [JSON]

```
{
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/6789/farms/d9e5d785-6a0f-4b38-83b9-297a5a87675f/clients"
    }
  ],
  "total": 2,
  "values": [
    {
      "name": "Captain Nemo",
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
      "id": "f1161eba-7c82-4a80-9eeb-383451b4c46e",
      "archived": false
    },
    {
      "name": "Aslan",
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
      "id": "f1161eba-7c82-4a80-9eeb-383451b4c46e",
      "archived": false
    }
  ]
}
```

