# PUT /organizations/{orgId}/flagCategories/{categoryId}

**Source:** John Deere Operations Center - Flags API
**Endpoint ID:** `#/organizations/{orgId}/flagCategories/{categoryId}/put`

> Update flag category by organization and flag category Id

---

## Description

This resource will update flag category by Id.

**OAuth Scope Required:** `ag3`

**Request URI**

```
PUT https://sandboxapi.deere.com/platform/organizations/{orgId}/flagCategories/{categoryId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | Default | In |
| --- | --- | --- | --- | --- |
| orgId<br>Required | string | Organization Id.<br>Example: 123456 | N/A | path |
| categoryId<br>Required | string | CategoryId to query for Category.<br>Example: 688c20bb-9609-4590-95c9-649ba65c06df | N/A | path |


## Request Details

| Field | Type | Description & Example |
| --- | --- | --- |
| categoryTitle | string | Name of the category.<br>Example: Rocks |
| archived | boolean | Whether or not the category is archived<br>Example: false |
| preferred | boolean | Shows/sets whether the category is a preferred one in the current org. This can be applied to both user-defined and reference flag categories in this org.<br>Example: true |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| total | integer | ---<br>Example: 1 |


## Sample Request [JSON]

```
{
  "@type": "FlagCategory",
  "categoryTitle": "Rocks",
  "archived": false,
  "preferred": true
}
```

## Sample Response

```
204 No Content
```

