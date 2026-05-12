# PUT /organizations/{orgId}/fields/{fieldId}/guidanceLines/{guidanceLineId}

**Source:** John Deere Operations Center - Guidance Lines API
**Endpoint ID:** `#/organizations/{orgId}/fields/{fieldId}/guidanceLines/{guidanceLineId}/put`

> Update a GuidanceLine

---

## Description

This endpoint will update the GuidanceLines name.

**OAuth Scope Required:** `ag3`

**Request URI**

```
PUT https://sandboxapi.deere.com/platform/organizations/{orgId}/fields/{fieldId}/guidanceLines/{guidanceLineId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | The organization owning the guidance lines.<br>Example: 127856 | path |
| fieldId<br>Required | GUID | The field that the guidance lines are associated with.<br>Example: 309b4c20-f33a-4c96-9a2c-913def198i0c | path |
| guidanceLineId<br>Required | string | The identifier of this guidance line.<br>Example: 2fda92b1-7517-4b2a-8166-7616eb20eb02 | path |


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


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| total | integer | ---<br>Example: 1 |


## Sample Request [JSON]

```
{
  "@type": "ABLine",
  "aPoint": {
    "@type": "Point",
    "lat": -20.026227344199977,
    "lon": 46.57202165157014
  },
  "bPoint": {
    "@type": "Point",
    "lat": -20.03113688350134,
    "lon": 46.572675704956055
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
  "tramOffset": 0,
  "tramSpacing": 0,
  "name": "NewGuidanceLine",
  "lastModifiedTime": "2018-12-10T21:24:39.567Z",
  "archived": false
}
```

## Sample Response

```
204 No Content
```

