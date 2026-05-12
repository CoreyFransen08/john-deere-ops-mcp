# GET /organizations/{orgId}/fields/{fieldId}/guidanceLines/{guidanceLineId}

**Source:** John Deere Operations Center - Guidance Lines API
**Endpoint ID:** `#/organizations/{orgId}/fields/{fieldId}/guidanceLines/{guidanceLineId}/get`

> Retrieve a specific guidance line

---

## Description

This endpoint will return the subclass of guidance line represented by the specified ID.

Response Details
See GuidanceLine Object Definition

**OAuth Scope Required:** `ag1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgId}/fields/{fieldId}/guidanceLines/{guidanceLineId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | The organization owning the guidance lines.<br>Example: 127856 | path |
| fieldId<br>Required | GUID | The field that the guidance lines are associated with.<br>Example: 309b4c20-f33a-4c96-9a2c-913def198i0c | path |
| guidanceLineId<br>Required | string | The identifier of this guidance line.<br>Example: 2fda92b1-7517-4b2a-8166-7616eb20eb02 | path |
| embed | string | Whether to return the track geometry for AB and Adaptive Curves. See Shapes Array<br>Example: shapes | query |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| links | Array of undefined | --- |
| total | integer | ---<br>Example: 1 |


## Sample Response [JSON]

```
{
  "@type": "ABLine",
  "heading": 0,
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
  "tramOffset": 0,
  "tramSpacing": 1,
  "saveMethod": "dtiABLineMethodBPoint",
  "erid": "2fda92b1-7517-4b2a-8166-7616eb20eb02",
  "id": "2fda92b1-7517-4b2a-8166-7616eb20eb02",
  "fieldUri": "https://sandboxapi.deere.com/platform/organizations/5555/fields/11111111-2222-3333-4444-555555555555",
  "name": "North West",
  "lastModifiedTime": "2017-09-18T17:06:41.484Z",
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
  "archived": false,
  "links": [
    {
      "@type": "Link",
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/127856/fields/309b4c20-f33a-4c96-9a2c-913def198i0c/guidanceLines/2fda92b1-7517-4b2a-8166-7616eb20eb02"
    },
    {
      "@type": "Link",
      "rel": "field",
      "uri": "https://sandboxapi.deere.com/platform/organizations/127856/fields/309b4c20-f33a-4c96-9a2c-913def198i0c"
    }
  ]
}
```

