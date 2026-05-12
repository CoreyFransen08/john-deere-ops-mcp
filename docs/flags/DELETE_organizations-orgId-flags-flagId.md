# DELETE /organizations/{orgId}/flags/{flagId}

**Source:** John Deere Operations Center - Flags API
**Endpoint ID:** `#/organizations/{orgId}/flags/{flagId}/delete`

> Delete a flag for a given org

---

## Description

This resource will delete a single flag based on its Id and org id

**OAuth Scope Required:** `ag3`

**Request URI**

```
DELETE https://sandboxapi.deere.com/platform/organizations/{orgId}/flags/{flagId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | Default | In |
| --- | --- | --- | --- | --- |
| flagId<br>Required | string | flagId to query for flag<br>Example: 688c20bb-9609-4590-95c9-649ba65c06df | N/A | path |
| orgId<br>Required | string | Org Id to query for Flag<br>Example: 2101 | N/A | path |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| total | integer | ---<br>Example: 1 |


## Sample Response

```
204 No Content
```

