# POST /organizations/{orgId}/fields/{fieldId}/guidanceLines

**Source:** John Deere Operations Center - Guidance Lines API
**Endpoint ID:** `#/organizations/{orgId}/fields/{fieldId}/guidanceLines/post`

> Create a guidance line

---

## Description

This endpoint will create a guidance line and associate it to a given field. This operation currently only supports the creation of AB Lines.

**OAuth Scope Required:** `ag3`

**Request URI**

```
POST https://sandboxapi.deere.com/platform/organizations/{orgId}/fields/{fieldId}/guidanceLines
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | The organization owning the guidance lines.<br>Example: 127856 | path |
| fieldId<br>Required | GUID | The field that the guidance lines are associated with.<br>Example: 309b4c20-f33a-4c96-9a2c-913def198i0c | path |


## Request Details

| Field | Type | Description & Example |
| --- | --- | --- |
| @type | string | Identifies the subclass of guidance line.<br>Example: ABLine |
| name | string | The common name used by an end user to identify this guidance line.<br>Example: North West |
| archived | boolean | Archived guidance lines will not be available for use in Setup Builder.<br>Example: false |
| tramOffset | number | Defines the number of tram lines in relation to the main track. Valid values are 0 - 20<br>Example: 0 |
| tramSpacing | number | The spacing between tram lines.<br>Example: 0 |
| aPoint | object | The coordinate representing the A point of an AB Line.<br>Example: { "@type": "Point", "lat": 41.74557323445754, "lon": -92.41092564370683 } |
| bPoint | object | The coordinate representing the B point of an AB Line. Alternatively, the heading can be supplied instead and this value will be calculated by the API.<br>Example: { "@type": "Point", "lat": 41.745060835194764, "lon": -92.40789413452148 } |
| heading | number | The radial heading for the AB Line (with North being 0 Degrees). You cannot specify both a bPoint and a heading. The omitted value will be calculated.<br>Example: 122.2365 |
| eastShift | object | The shift in the east direction.<br>Example: { "@type": "MeasurementAsDouble", "valueAsDouble": 0, "vrDomainId": "vrEastShiftComponent", "unit": "cm" } |
| northShift | object | The shift in the north direction.<br>Example: { "@type": "MeasurementAsDouble", "valueAsDouble": 0, "vrDomainId": "vrNorthShiftComponent", "unit": "cm" } |
| spatialProjection | object | Spatial Projection used for guidance object. See “dtProjectionType” in the John Deere representation system for possible values.<br>Example: { "@type": "SpatialProjection", "projectionType": "dtiProjectionDeere", "elevation": { "@type": "MeasurementAsDouble", "valueAsDouble": 0, "vrDomainId": "vrElevation", "unit": "m" } } |
| fieldUri | string | Client associated with farm.<br>Example: https://sandboxapi.deere.com/platform/organizations/5555/fields/9369f3f6-2428-4bba-bf64-0a19cdaf007d |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| links | Array of undefined | --- |
| total | integer | ---<br>Example: 1 |


## Sample Request [JSON]

```
{
  "@type": "ABLine",
  "aPoint": {
    "@type": "Point",
    "lat": 41.48958,
    "lon": -90.49263851
  },
  "bPoint": {
    "@type": "Point",
    "lat": 41.48965382,
    "lon": -90.49263851
  },
  "eastShift": {
    "@type": "MeasurementAsDouble",
    "valueAsDouble": 0,
    "vrDomainId": "vrEastShiftComponent",
    "unit": "cm"
  },
  "northShift": {
    "@type": "MeasurementAsDouble",
    "valueAsDouble": 0,
    "vrDomainId": "vrNorthShiftComponent",
    "unit": "cm"
  },
  "spatialProjection": {
    "@type": "SpatialProjection",
    "projectionType": "dtiProjectionDeere",
    "elevation": {
      "@type": "MeasurementAsDouble",
      "valueAsDouble": 0.5,
      "vrDomainId": "vrElevation",
      "unit": "m"
    }
  },
  "fieldUri": "https://sandboxapi.deere.com/platform/organizations/5555/fields/11111111-2222-3333-4444-555555555555",
  "tramOffset": 0,
  "tramSpacing": 1,
  "name": "North West",
  "archived": false,
  "links": [
    {
      "@type": "Link",
      "rel": "field",
      "uri": "https://sandboxapi.deere.com/platform/organizations/orgId/fields/309b4c20-f33a-4c96-9a2c-913def198i0c"
    }
  ]
}
```

## Sample Response

```
201 Created

Location: https://sandboxapi.deere.com/platform/organizations/127856/fields/309b4c20-f33a-4c96-9a2c-913def198i0c/guidanceLines/2fda92b1-7517-4b2a-8166-7616eb20eb02
```

