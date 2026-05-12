# DELETE /organizations/{orgId}/operators/{id}

**Source:** John Deere Operations Center - Operators API
**Endpoint ID:** `#/organizations/{orgId}/operators/{id}/delete`

> Delete a specific Operator in an org by Operator ID

---

## Description

This endpoint will delete a specific operator in the system in an org for the provided Operator ID

**OAuth Scope Required:** `ag3`

**Request URI**

```
DELETE https://sandboxapi.deere.com/platform/organizations/{orgId}/operators/{id}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | Organization ID<br>Example: 123456 | path |
| id<br>Required | string | Operator ID<br>Example: 0235d40e-02d0-44cb-a126-fff21173fc1f | path |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| total | integer | ---<br>Example: 1 |


## Sample Response

```
204 No Content
```

