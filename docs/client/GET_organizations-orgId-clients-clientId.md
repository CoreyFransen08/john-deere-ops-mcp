# GET /organizations/{orgId}/clients/{clientId}

**Source:** John Deere Operations Center - Clients API
**Endpoint ID:** `#/organizations/{orgId}/clients/{clientId}/get`

> View a Client

---

## Description

View a clients details. For each client, the response will link to the following resources:

fields: View the field the client belongs to.
farms: View the farm belonging to the client.
owningOrganization: View the org that owns the client.

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgId}/clients/{clientId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| embed | string | Populates response with data lineage information<br>Example: showRecordMetadata | query |


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
```

