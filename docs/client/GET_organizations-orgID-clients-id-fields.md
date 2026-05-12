# GET /organizations/{orgID}/clients/{id}/fields

**Source:** John Deere Operations Center - Clients API
**Endpoint ID:** `#/organizations/{orgID}/clients/{id}/fields/get`

> View a Client's Field

---

## Description

View the field to which a specific client belongs. For the client, the response links to the following resources:
boundaries: View the boundaries that belong to this field.
clients: View the client that belongs to this field.
farms: View the farms within this field.
owningOrganization: View the organization that owns the field.

**OAuth Scope Required:** `ag1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgID}/clients/{id}/fields
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | integer | The id of the organization<br>Example: 12345 | path |
| clientId<br>Required | GUID | Client ID<br>Example: f1161eba-7c82-4a80-9eeb-383451b4c46e | path |
| x-deere-signature | string | x-deere-signature should be managed by the client per user per API. For a new user/new API, the first request will have a blank value for x-deere-signature. Changes can be tracked with the x-deere-signature returned in the response. If the response has not changed since the last API call, the value of x-deere-signature is not changed and the client should use the same String Token next time.<br>Example: 9r8392615e4b4e1c92018026f47109bb | header |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| x-deere-signature | string | A new x-deere-signature response header will be included if the response has changed since last api call.<br>Example: 3b5392615e4b4e1c92013026f47109bb |
| id | GUID | Client ID<br>Example: f1161eba-7c82-4a80-9eeb-383451b4c46e |
| name | string | Client Name<br>Example: Aslan |


## Sample Response [JSON]

```
{
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/1234/clients/f1161eba-7c82-4a80-9eeb-383451b4c46e/fields"
    }
  ],
  "total": 1,
  "values": [
    {
      "name": "Narnia",
      "archived": false,
      "id": "a7cb723f-6707-46fb-a9ff-4e734e3daf58",
      "links": [
        {
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/organizations/1234/fields/a7cb723f-6707-46fb-a9ff-4e734e3daf58"
        },
        {
          "rel": "boundaries",
          "uri": "https://sandboxapi.deere.com/platform/organizations/1234/fields/a7cb723f-6707-46fb-a9ff-4e734e3daf58/boundaries"
        },
        {
          "rel": "clients",
          "uri": "https://sandboxapi.deere.comm/platform/organizations/1234/fields/a7cb723f-6707-46fb-a9ff-4e734e3daf58/clients"
        },
        {
          "rel": "farms",
          "uri": "https://sandboxapi.deere.com/platform/organizations/1234/fields/a7cb723f-6707-46fb-a9ff-4e734e3daf58/farms"
        },
        {
          "rel": "owningOrganization",
          "uri": "https://sandboxapi.deere.com/platform/organizations/1234"
        },
        {
          "rel": "contributionDefinition",
          "uri": "https://sandboxapi.deere.com/platform/contributionDefinitions/32a256ea-0000-4756-b000-b6dabda856ef        "
        }
      ]
    }
  ]
}
```

