# DELETE /organizations/{orgId}/workPlans/{erid}

**Source:** John Deere Operations Center - Work Plans API
**Endpoint ID:** `#/organizations/{orgId}/workPlans/{erid}/delete`

> Delete a Work Plan

---

## Description

This endpoint will delete a single work plan based on its erid in the target organization. In order to do this, the authenticated user must have following permission within the organization.
Work: access level 2

**OAuth Scope Required:** `work2`

**Request URI**

```
DELETE https://sandboxapi.deere.com/platform/organizations/{orgId}/workPlans/{erid}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | Owning Organization ID<br>Example: 1234 | path |
| erid<br>Required | GUID | id of a work plan unique within target organization<br>Example: 43b12553-c5ca-42f7-ac5b-a44612e24cca | path |


## Status Codes

| Code | Message | Description |
| --- | --- | --- |
| 204 | No Content | The request succeeded. Work plan is deleted |
| 403 | Forbidden | Authenticated user does not have required permission in target organization to delete work plan |
| 404 | Not Found | Server can not find requested work plan |


## Sample Response [JSON]

```
204 No Content
```

