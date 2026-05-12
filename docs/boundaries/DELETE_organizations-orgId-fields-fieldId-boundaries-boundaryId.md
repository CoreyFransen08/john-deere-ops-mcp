# DELETE /organizations/{orgId}/fields/{fieldId}/boundaries/{boundaryId}

**Source:** John Deere Operations Center - Boundaries API
**Endpoint ID:** `#/organizations/{orgId}/fields/{fieldId}/boundaries/{boundaryId}/delete`

> Delete a boundary

---

## Description

This endpoint will delete a boundary.

**OAuth Scope Required:** `ag3`

**Request URI**

```
DELETE https://sandboxapi.deere.com/platform/organizations/{orgId}/fields/{fieldId}/boundaries/{boundaryId}
```

**Accept:** `No Content`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | Organization<br>Example: 654321 | path |
| fieldId<br>Required | GUID | Field Id<br>Example: e61b83f4-3a12-431e-8010-596f2466dc27 | path |
| boundaryId<br>Required | GUID | Boundary Id<br>Example: e7ab3a06-06ca-4d34-8cb7-6fd2a3640a3d | path |


## Sample Response

```
204 No Content
```

