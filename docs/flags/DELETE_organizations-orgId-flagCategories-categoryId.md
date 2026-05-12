# DELETE /organizations/{orgId}/flagCategories/{categoryId}

**Source:** John Deere Operations Center - Flags API
**Endpoint ID:** `#/organizations/{orgId}/flagCategories/{categoryId}/delete`

> Delete a flag category

---

## Description

This resource will delete a single empty category based on the categoryId and orgId.

**OAuth Scope Required:** `ag3`

**Request URI**

```
DELETE https://sandboxapi.deere.com/platform/organizations/{orgId}/flagCategories/{categoryId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | Default | In |
| --- | --- | --- | --- | --- |
| orgId<br>Required | string | OrgId to query for Category<br>Example: 2101 | N/A | path |
| categoryId<br>Required | string | CategoryId to query for Category.<br>Example: 688c20bb-9609-4590-95c9-649ba65c06df | N/A | path |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| total | integer | ---<br>Example: 1 |


## Sample Response

```
204 No Content
```

