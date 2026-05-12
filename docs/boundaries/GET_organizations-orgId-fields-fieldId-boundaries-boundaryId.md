# GET /organizations/{orgId}/fields/{fieldId}/boundaries/{boundaryId}

**Source:** John Deere Operations Center - Boundaries API
**Endpoint ID:** `#/organizations/{orgId}/fields/{fieldId}/boundaries/{boundaryId}/get`

> Get a specific boundary

---

## Description

This endpoint will retrieve a specific boundary.

**OAuth Scope Required:** `ag1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgId}/fields/{fieldId}/boundaries/{boundaryId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | Organization<br>Example: 654321 | path |
| fieldId<br>Required | GUID | Field Id<br>Example: e61b83f4-3a12-431e-8010-596f2466dc27 | path |
| boundaryId<br>Required | GUID | Boundary Id<br>Example: e7ab3a06-06ca-4d34-8cb7-6fd2a3640a3d | path |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| id | GUID | An identifier for this boundary, which is unique within a field context.<br>Example: bed69949-df25-4319-8f6c-94c62b466126 |
| name | string | Boundary name<br>Example: Unique_Boundary_name |
| modifiedTime | datetime | An ISO-8601 formatted timestamp of the last modification made to this boundary.<br>Example: 2017-11-16T15:43:27.496Z |
| createdTime | datetime | An ISO-8601 formatted timestamp of the time this boundary was created.<br>Example: 2017-11-16T15:43:27.496Z |
| area | --- | The sum of all exterior polygons.<br>Example: See sample response below. |
| workableArea | --- | Exteriors-interiors of the boundary.<br>Example: See sample response below. |
| sourceType | string | Describes the source of boundary (requires license to set).<br>Example: HandDrawn |
| multipolygons | array | A collection of polygons.<br>Example: See sample response below |
| extent | object | Coordinates of the extent of the boundary.<br>Example: See sample response below. |
| active | boolean | Whether or not this boundary is currently in use. A field with associated boundaries will have exactly one active boundary; however, a field may also exist with no boundaries.<br>Example: true |
| archived | boolean | Indicates whether or not this boundary is currently archived<br>Example: true |
| signalType | string | Signal Type used when defining boundary. See “dtSignalType” in the John Deere representation system for possible values.<br>Example: dtiSignalTypeRTK |
| irrigated | boolean | Indicates whether the contained area is irrigated.<br>Example: false |
| type1 | string | Boundary type<br>Example: exterior |
| passable | boolean | "True" indicates that the boundary can be crossed (Ex: a waterway). "False" indicates that the boundary cannot be crossed (ex: a boulder).<br>Example: true |


## Sample Response [JSON]

```
{
  "@type": "Boundary",
  "name": "Unique_Boundary_name",
  "sourceType": "HandDrawn",
  "createdTime": "2018-07-01T21:00:11Z",
  "modifiedTime": "2017-11-16T15:43:27.496Z",
  "area": {
    "@type": "MeasurementAsDouble",
    "valueAsDouble": 32.45477594323993,
    "unit": "ha"
  },
  "workableArea": {
    "@type": "MeasurementAsDouble",
    "valueAsDouble": 32.45477594323993,
    "unit": "ha"
  },
  "multipolygons": [
    {
      "@type": "Polygon",
      "rings": [
        {
          "@type": "Ring",
          "points": [
            {
              "@type": "Point",
              "lat": 41.65107816712308,
              "lon": -93.76798868179321
            },
            {
              "@type": "Point",
              "lat": 41.650821230227706,
              "lon": -93.76928965078696
            },
            {
              "@type": "Point",
              "lat": 41.65052211771455,
              "lon": -93.7704892896499
            },
            {
              "@type": "Point",
              "lat": 41.64998810424595,
              "lon": -93.77184439555037
            },
            {
              "@type": "Point",
              "lat": 41.64901785518664,
              "lon": -93.77358913421631
            },
            {
              "@type": "Point",
              "lat": 41.64780652027916,
              "lon": -93.77499124189404
            },
            {
              "@type": "Point",
              "lat": 41.646348170121755,
              "lon": -93.77597093582153
            },
            {
              "@type": "Point",
              "lat": 41.64513032597595,
              "lon": -93.7765281704435
            },
            {
              "@type": "Point",
              "lat": 41.64421554942042,
              "lon": -93.77667903900146
            },
            {
              "@type": "Point",
              "lat": 41.644111321787456,
              "lon": -93.76941561698914
            },
            {
              "@type": "Point",
              "lat": 41.64662075564981,
              "lon": -93.77200126647949
            },
            {
              "@type": "Point",
              "lat": 41.651158333570876,
              "lon": -93.76485586166382
            },
            {
              "@type": "Point",
              "lat": 41.65107816712308,
              "lon": -93.76798868179321
            }
          ],
          "type": "exterior",
          "passable": true
        }
      ]
    }
  ],
  "extent": {
    "@type": "Extent",
    "topLeft": {
      "@type": "Point",
      "lat": 41.607420743,
      "lon": -93.677587509
    },
    "bottomRight": {
      "@type": "Point",
      "lat": 41.604179741,
      "lon": -93.676643372
    }
  },
  "id": "519dcf9a-9931-4789-9eaa-3dc7399f2840",
  "links": [
    {
      "@type": "Link",
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fields/209b3c20-f33a-4c96-9a2c-613def198e0c/boundaries/519dcf9a-9931-4789-9eaa-3dc7399f2840"
    },
    {
      "@type": "Link",
      "rel": "owningOrganization",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456"
    },
    {
      "@type": "Link",
      "rel": "field",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fields/209b3c20-f33a-4c96-9a2c-613def198e0c"
    }
  ],
  "active": false,
  "archived": false,
  "irrigated": true,
  "signalType": "dtiSignalTypeRTK"
}
```

