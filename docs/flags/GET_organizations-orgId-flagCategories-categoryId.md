# GET /organizations/{orgId}/flagCategories/{categoryId}

**Source:** John Deere Operations Center - Flags API
**Endpoint ID:** `#/organizations/{orgId}/flagCategories/{categoryId}/get`

> Get flag category by id

---

## Description

This resource will return a flag category with the name translated into the specified language. The category can be a reference flagCategory, a master flagCategory created from a referenced flagCategory or a user-defined category.

**OAuth Scope Required:** `ag1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgId}/flagCategories/{categoryId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | Default | In |
| --- | --- | --- | --- | --- |
| Accept-Language | string | Language category names are being returned by the endpoint.<br>Example: de-DE | en | header |
| embed | string | Embed additional attributes if required.<br>Example: preferences | N/A | query |
| orgId<br>Required | string | OrgId to query for Org.<br>Example: 123456 | N/A | path |
| categoryId<br>Required | string | CategoryId to query for Category.<br>Example: 7ba95d7a-f798-46d0-9bf9-c39c31bcf984 | N/A | path |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| categoryTitle | string | Name of the category.<br>Example: Rocks |
| archived | boolean | Whether or not the category is archived<br>Example: false |
| preferred | boolean | Shows/sets whether the category is a preferred one in the current org. This can be applied to both user-defined and reference flag categories in this org.<br>Example: true |
| id | GUID | GUID of a flag category.<br>Example: 7c602ae8-4351-4640-9de8-88792bda83d7 |
| createdDate | datetime | ---<br>Example: 2018-12-28T09:17:10.694Z |
| lastModifiedDate | datetime | ---<br>Example: 2018-12-28T09:17:10.694Z |


## Sample Response [JSON]

```
{
  "@type": "FlagCategory",
  "categoryTitle": "Rocks",
  "sourceNode": "7ba95d7a-f798-46d0-9bf9-c39c31bcf984",
  "preferred": true,
  "id": "7c602ae8-4351-4640-9de8-88792bda83d7",
  "createdDate": "2018-12-28T09:17:10.694Z",
  "lastModifiedDate": "2018-12-28T09:17:10.694Z",
  "links": [
    {
      "@type": "Link",
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456/flagCategories/7c602ae8-4351-4640-9de8-88792bda83d7"
    },
    {
      "@type": "Link",
      "rel": "organization",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456"
    },
    {
      "@type": "Link",
      "rel": "updateCategory",
      "uri": "https://sandboxapi.deere.com/platform/flagCategories/7c602ae8-4351-4640-9de8-88792bda83d7"
    },
    {
      "@type": "Link",
      "rel": "deleteCategory",
      "uri": "https://sandboxapi.deere.com/platform/organizations/{orgId}/flagCategories/7c602ae8-4351-4640-9de8-88792bda83d7"
    }
  ]
}
```

