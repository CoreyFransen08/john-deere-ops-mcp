# PUT /organizations/{orgId}/clients/{clientId}

**Source:** John Deere Operations Center - Clients API
**Endpoint ID:** `#/organizations/{orgId}/clients/{clientId}/put`

> Update a Client

---

## Description

This API is used to update an existing client resource within the target organization. In order to do this, the authenticated user must have Locations Level 3 permission within the target organization.

**Request URI**

```
PUT https://sandboxapi.deere.com/platform/organizations/{orgId}/clients/{clientId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Request Details

| Field | Type | Description & Example |
| --- | --- | --- |
| name | string | New Client Name<br>Example: UniqueClientName |
| archived | string | Archived status (false = active)<br>Example: false |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| total | integer | ---<br>Example: 1 |


## Sample Request [JSON]: Update client

```
{
  "name": "UniqueClientName",
  "archived": true
}
```

## Sample Response

```
204 No Content
```

