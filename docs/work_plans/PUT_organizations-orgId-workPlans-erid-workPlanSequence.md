# PUT /organizations/{orgId}/workPlans/{erid}/workPlanSequence

**Source:** John Deere Operations Center - Work Plans API
**Endpoint ID:** `#/organizations/{orgId}/workPlans/{erid}/workPlanSequence/put`

> Prioritize a Work Plan

---

## Description

This endpoint will update the sequence number of a work plan with reference to other work plans within the target organization. In order to do this, the authenticated user must have following permission within the organization.
Work: access level 2

The Priority of a work plan can only be updated in the context of same the year and work type. To update priority, the client needs to send the uri of the previous work plan after which the current work plan should be executed. In order to put the current work plan on top (highest priority within the same year and work type) send the self uri in the payload.

**OAuth Scope Required:** `work2`

**Request URI**

```
PUT https://sandboxapi.deere.com/platform/organizations/{orgId}/workPlans/{erid}/workPlanSequence
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | Owning Organization ID<br>Example: 1234 | path |
| erid<br>Required | GUID | id of a work plan unique within target organization<br>Example: 43b12553-c5ca-42f7-ac5b-a44612e24cca | path |


## Status Codes

| Code | Message | Description |
| --- | --- | --- |
| 204 | No Content | The request succeeded. Work plan sequence is updated |
| 400 | Bad Request | Request is rejected due to invalid request body. Response body will contain more details on reason of failure |
| 403 | Forbidden | Authenticated user do not have required permission in target organization to update work plan sequence |
| 404 | Not Found | Server can not find requested work plan |


## Request Details

| Field | Type | Description & Example |
| --- | --- | --- |
| previousWorkPlanUri | string | URI of the previous work plan after which the current work plan should be executed.<br>Example: https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/workPlans/{WorkPlanId} |


## Sample Request [JSON]

```
{
  "previousWorkPlanUri": "https://sandboxapi.deere.com/platform/organizations/{OrganizationId}/workPlans/{WorkPlanId}"
}
```

## Sample Response [JSON]

```
204 No Content
```

