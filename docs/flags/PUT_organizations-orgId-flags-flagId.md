# PUT /organizations/{orgId}/flags/{flagId}

**Source:** John Deere Operations Center - Flags API
**Endpoint ID:** `#/organizations/{orgId}/flags/{flagId}/put`

> Update flag by id

---

## Description

This resource will update flag by Organization and Flag Id.

**OAuth Scope Required:** `ag3`

**Request URI**

```
PUT https://sandboxapi.deere.com/platform/organizations/{orgId}/flags/{flagId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | Default | In |
| --- | --- | --- | --- | --- |
| orgId<br>Required | string | Organization Id<br>Example: 123456 | N/A | path |
| flagId<br>Required | string | flagId to query for flag<br>Example: 688c20bb-9609-4590-95c9-649ba65c06df | N/A | path |


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


## Sample Request [JSON]

```
{
  "@type": "Flag",
  "id": "FlagId",
  "notes": "SomeRandomString",
  "geometry": {
    "type": "Point",
    "coordinates": [
      -95.14959274063109,
      42.668815484
    ]
  },
  "archived": false,
  "proximityAlertEnabled": false,
  "links": [
    {
      "@type": "Link",
      "rel": "owningOrganization",
      "uri": "https://sandboxapi.deere.com/platform/organizations/ORG_ID"
    },
    {
      "@type": "Link",
      "rel": "flagCategory",
      "uri": "https://sandboxapi.deere.com/platform/organizations/ORG_ID/flagCategories/CATEGORYID"
    },
    {
      "@type": "Link",
      "rel": "field",
      "uri": "https://sandboxapi.deere.com/platform/organizations/ORG_ID/fields/FIELDS_ID"
    }
  ]
}
```

## Sample Response

```
204 No Content
```

