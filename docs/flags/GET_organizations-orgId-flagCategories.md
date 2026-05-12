# GET /organizations/{orgId}/flagCategories

**Source:** John Deere Operations Center - Flags API
**Endpoint ID:** `#/organizations/{orgId}/flagCategories/get`

> List Flags Category Collection

---

## Description

This resource will return a Flags Category Collection for Organization.

**OAuth Scope Required:** `ag1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgId}/flagCategories
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | Default | In |
| --- | --- | --- | --- | --- |
| orgId<br>Required | string | Organization Id where the Flag category belongs to<br>Example: 123456 | N/A | path |
| Accept-Language | string | Language category names are being returned by the endpoint.<br>Example: de-DE | en | header |
| embed | string | Embed additional attributes if required.<br>Example: preferences | N/A | query |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| categoryTitle | string | Name of the category.<br>Example: Rocks |
| archived | boolean | Whether or not the category is archived<br>Example: false |
| preferred | boolean | Shows/sets whether the category is a preferred one in the current org. This can be applied to both user-defined and reference flag categories in this org.<br>Example: true |
| id | GUID | GUID of a flag category.<br>Example: 688c20bb-9609-4590-95c9-649ba65c06df |
| createdDate | string | ---<br>Example: 2018-12-18T13:29:14.167Z |
| lastModifiedDate | string | ---<br>Example: 2018-12-18T13:29:30.924Z |


## Sample Response

```
{
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456/flagCategories"
    }
  ],
  "total": 1,
  "values": [
    {
      "@type": "FlagCategory",
      "categoryTitle": "LineWithWidth",
      "preferred": false,
      "id": "835b863c-1997-451d-8850-1123ff4ec0e3",
      "links": [
        {
          "@type": "Link",
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/flagCategories/835b863c-1997-451d-8850-1123ff4ec0e3"
        },
        {
          "@type": "Link",
          "rel": "organization",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456"
        },
        {
          "@type": "Link",
          "rel": "updateCategory",
          "uri": "https://sandboxapi.deere.com/platform/flagCategories/835b863c-1997-451d-8850-1123ff4ec0e3"
        },
        {
          "@type": "Link",
          "rel": "deleteCategory",
          "uri": "https://sandboxapi.deere.com/platform/flagCategories/835b863c-1997-451d-8850-1123ff4ec0e3"
        }
      ]
    }
  ]
}
```

