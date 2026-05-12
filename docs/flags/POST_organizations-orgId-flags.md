# POST /organizations/{orgId}/flags

**Source:** John Deere Operations Center - Flags API
**Endpoint ID:** `#/organizations/{orgId}/flags/post`

> Create a flag

---

## Description

This resource will create a flag in the given organization.

**OAuth Scope Required:** `ag3`

**Request URI**

```
POST https://sandboxapi.deere.com/platform/organizations/{orgId}/flags
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | Default | In |
| --- | --- | --- | --- | --- |
| orgId<br>Required | string | Organization Id where the Flag belongs to<br>Example: 123456 | N/A | path |


## Request Details

| Field | Type | Description & Example |
| --- | --- | --- |
| geometry<br>Required | object | Currently only three geometries types (Point, LineString and Polygon) are supported.<br>Example: See sample request below |
| notes | string | Free text notes.<br>Example: A big rock on the left after entering the field |
| archived | boolean | Indicates whether the flag is archived (true) or not (false). Archived flags SHALL not be returned by endpoints if not requested explicitely by clients.<br>Example: false |
| proximityAlertEnabled | boolean | Indicates whether the proximity alert is enabled (true) or not (false) for the Flag.<br>Example: false |
| links | Array of Link | --- |
| flagCategory<br>Required | --- | Flag Category Link.<br>Example: https://sandboxapi.deere.com/platform/organizations/ORG_ID/flagCategories/CATEGORYID |
| owningOrganization | --- | Organization Link.<br>Example: https://sandboxapi.deere.com/platform/organizations/ORG_ID |
| field | --- | Field Link.<br>Example: https://sandboxapi.deere.com/platform/organizations/ORG_ID/fields/FIELDS_ID |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| links | Array of undefined | --- |


## Sample Request [JSON]

```
{
  "@type": "Flag",
  "geometry": {
    "type": "Point",
    "coordinates": [
      -93.14959274063109,
      41.66881548411553
    ]
  },
  "notes": "SomeUnique123",
  "archived": false,
  "proximityAlertEnabled": false,
  "links": [
    {
      "@type": "Link",
      "rel": "flagCategory",
      "uri": "https://sandboxapi.deere.com/platform/flagCategories/CATEGORY_ID"
    },
    {
      "@type": "Link",
      "rel": "field",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fields/FIELDS_ID"
    }
  ]
}
```

## Sample Response

```
201 Created
Location: https://sandboxapi.deere.com/platform/flags/3e4f37a4-5667-49ae-9f6b-5a13e446dee6
```

