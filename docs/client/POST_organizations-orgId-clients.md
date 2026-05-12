# POST /organizations/{orgId}/clients

**Source:** John Deere Operations Center - Clients API
**Endpoint ID:** `#/organizations/{orgId}/clients/post`

> Create a Client

---

## Description

This API is used to create a new client resource within the target organization. In order to do this, the authenticated user must have Locations Level 3 permission within the target organization.

Note: All clients are created with an "active" status.

**OAuth Scope Required:** `ag3`

**Request URI**

```
POST https://sandboxapi.deere.com/platform/organizations/{orgId}/clients
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgID<br>Required | string | The ID of the organization<br>Example: 123456 | path |


## Request Details

| Field | Type | Description & Example |
| --- | --- | --- |
| name | string | New Client Name<br>Example: UniqueClientName |
| archived | string | Archived status (false = active)<br>Example: false |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| total | integer | ---<br>Example: 1 |


## Sample Request [JSON]: Create new client

```
{
  "name": "UniqueClientName",
  "archived": false
}
```

## Sample Response

```
201 Created
Location: https://sandboxapi.deere.com/platform/organizations/12345/clients/4r539261-5e4b-4e1c-9201-8026f47109bb
```

