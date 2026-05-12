# GET /organizations/{orgID}/fields/{id}/clients

**Source:** John Deere Operations Center - Fields API
**Endpoint ID:** `#/organizations/{orgID}/fields/{id}/clients/get`

> View Clients that Own a Field

---

## Description

View details about the client that owns the field. The response will link to the following resources:

fields: View the field the client belongs to.
farms: View the farms belonging to the client.
owningOrganization: View the org that owns the field.

**OAuth Scope Required:** `ag1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgID}/fields/{id}/clients
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | integer | The ID of the organization | path |
| fieldId<br>Required | string | field guid | path |
| x-deere-signature | string | x-deere-signature should be managed by the client per user per API. For a new user/new API, the first request will have a blank value for x-deere-signature. Changes can be tracked with the x-deere-signature returned in the response. If the response has not changed since the last API call, the value of x-deere-signature is not changed and the client should use the same String Token next time.<br>Example: 9r8392615e4b4e1c92018026f47109bb | header |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| @Type | string | ---<br>Example: Field |
| name | string | ---<br>Example: --- |
| farms | object | --- |
| clients | object | --- |
| boundaries | Array of object | --- |
| accessPoints | Array of object | --- |
| guidanceLines | Array of undefined | --- |
| archived | boolean | ---<br>Example: true |
| flags | Array of object | --- |
| id | string | ---<br>Example: 9369f3f6-2428-4bba-bf64-0a19cdaf007d |
| links | Array of object | --- |


## Sample Response [JSON]

```
{
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/6789/fields/a7cb723f-6707-46fb-a9ff-4e734e3daf58/clients"
    }
  ],
  "total": 1,
  "values": [
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
      "id": "f1161eba-7c82-4a80-9eeb-383451b4c46e"
    }
  ]
}
```

