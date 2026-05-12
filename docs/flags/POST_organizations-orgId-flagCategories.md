# POST /organizations/{orgId}/flagCategories

**Source:** John Deere Operations Center - Flags API
**Endpoint ID:** `#/organizations/{orgId}/flagCategories/post`

> Create a custom category

---

## Description

This resource will create a custom category in the given organization.

**OAuth Scope Required:** `ag3`

**Request URI**

```
POST https://sandboxapi.deere.com/platform/organizations/{orgId}/flagCategories
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | Default | In |
| --- | --- | --- | --- | --- |
| orgId<br>Required | string | Organization Id where the Flag category belongs to<br>Example: 123456 | N/A | path |


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
  "preferred": true,
  "archived": false
}
```

## Sample Response

```
201 Created
Location: https://sandboxapi.deere.com/platform/flagCategories/fc602ae8-4351-4640-9de8-88792bda83d7
```

