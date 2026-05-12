# DELETE /organizations/{orgId}/operators

**Source:** John Deere Operations Center - Operators API
**Endpoint ID:** `#/organizations/{orgId}/operators/delete`

> Delete all Operators for a given org

---

## Description

This endpoint will delete every operator in the system for the provided organization ID

**OAuth Scope Required:** `ag3`

**Request URI**

```
DELETE https://sandboxapi.deere.com/platform/organizations/{orgId}/operators
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | Organization ID<br>Example: 123456 | path |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| total | integer | ---<br>Example: 1 |


## Sample Response

```
204 No Content
```

