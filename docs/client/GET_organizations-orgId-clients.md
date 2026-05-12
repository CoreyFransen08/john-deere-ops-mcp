# GET /organizations/{orgId}/clients

**Source:** John Deere Operations Center - Clients API
**Endpoint ID:** `#/organizations/{orgId}/clients/get`

> List Clients in an Org

---

## Description

Retrieve all of the clients for an organization

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgId}/clients
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | integer | The id of the organization<br>Example: 12345 | path |
| embed | string | Populates response with data lineage information<br>Example: showRecordMetadata | query |
| recordFilter | string | Filter clients by status. Possible values ACTIVE or ALL or ARCHIVED Default - ACTIVE<br>Example: ACTIVE | query |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| @type | string | Type<br>Example: Client |
| name | string | Client Name<br>Example: John Doe |
| id | string | Client ID<br>Example: 9369f3f6-2428-4bba-bf64-0a19cdaf007d |
| links | Array of object | Links |
| archived | boolean | Archived status<br>Example: true |


## Sample Response [JSON]

```
{
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/6789/clients"
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

