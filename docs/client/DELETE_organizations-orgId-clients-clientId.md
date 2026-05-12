# DELETE /organizations/{orgId}/clients/{clientId}

**Source:** John Deere Operations Center - Clients API
**Endpoint ID:** `#/organizations/{orgId}/clients/{clientId}/delete`

> Delete a Client

---

## Description

This API is used to delete a client resource within the target organization. In order to do this, the authenticated user must have Locations Level 3 permission within the target organization.

**Request URI**

```
DELETE https://sandboxapi.deere.com/platform/organizations/{orgId}/clients/{clientId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Sample Response

```
204 No Content
```

