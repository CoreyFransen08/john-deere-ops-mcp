# POST /organizations/{orgId}/fields/{fieldId}/boundaries

**Source:** John Deere Operations Center - Boundaries API
**Endpoint ID:** `#/organizations/{orgId}/fields/{fieldId}/boundaries/post`

> Create a Boundary

---

## Description

Create a boundary with a geometry collection for a field.

**OAuth Scope Required:** `ag3`

**Request URI**

```
POST https://sandboxapi.deere.com/platform/organizations/{orgId}/fields/{fieldId}/boundaries
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | Organization ID<br>Example: 1234 | path |
| fieldId<br>Required | GUID | Field GUID<br>Example: a7cb723f-6707-46fb-a9ff-4e734e3daf58 | path |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| name | string | Boundary Name.<br>Example: Boundary_Unique_Name |
| active | boolean | Indicates whether the boundary is active in this field.<br>Example: false |
| archive | boolean | Indicates whether the boundary is archived.<br>Example: false |
| irrigated | boolean | Indicates whether the boundary is irrigated.<br>Example: false |
| multipolygons | --- | Polygon representation of the new boundary.<br>Example: See sample request below. |
| sourceType | string | Describes the source of boundary (requires license to set).<br>Example: External |
| signalType | string | Signal Type used when defining boundary. See “dtSignalType” in the John Deere representation system for possible values.<br>Example: dtiSignalTypeRTK |


## Sample Request [JSON]

```
{
  "@type": "Boundary",
  "name": "Boundary_Unique_Name",
  "sourceType": "External",
  "multipolygons": [
    {
      "@type": "Polygon",
      "rings": [
        {
          "@type": "Ring",
          "points": [
            {
              "@type": "Point",
              "lat": -17.011617912472012,
              "lon": 73.90490448264597
            },
            {
              "@type": "Point",
              "lat": -17.323201320401324,
              "lon": 74.16699984419307
            },
            {
              "@type": "Point",
              "lat": -17.634784728330636,
              "lon": 74.2718379888119
            },
            {
              "@type": "Point",
              "lat": -17.16740961643667,
              "lon": 74.00974262726481
            },
            {
              "@type": "Point",
              "lat": -16.959687344483797,
              "lon": 73.85248541033656
            },
            {
              "@type": "Point",
              "lat": -17.011617912472012,
              "lon": 73.90490448264597
            }
          ],
          "type": "exterior",
          "passable": true
        }
      ]
    }
  ],
  "active": false,
  "archived": false,
  "irrigated": false,
  "signalType": "dtiSignalTypeRTK"
}
```

## Sample Response

```
201 Created
Location: https://sandboxapi.deere.com/platform/organizations/123456/fields/109b3c20-f33a-4c96-9a2c-613def198e0c/boundaries/96d79d34-89be-4f2b-b041-6b0181bc65db
```

