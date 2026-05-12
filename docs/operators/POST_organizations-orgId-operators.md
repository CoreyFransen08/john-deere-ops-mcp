# POST /organizations/{orgId}/operators

**Source:** John Deere Operations Center - Operators API
**Endpoint ID:** `#/organizations/{orgId}/operators/post`

> Create an Operator

---

## Description

This endpoint will create a new Operator in the system for the provided organization ID

**OAuth Scope Required:** `ag2`

**Request URI**

```
POST https://sandboxapi.deere.com/platform/organizations/{orgId}/operators
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | Organization ID<br>Example: 123456 | path |


## Request Details

| Field | Type | Description & Example |
| --- | --- | --- |
| name | string | Operator Name<br>Example: John Doe |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| total | integer | ---<br>Example: 1 |


## Sample Response

```
201 Created
Location: https://sandboxapi.deere.com/platform/operators/4r539261-5e4b-4e1c-9201-8026f47109bb
```

