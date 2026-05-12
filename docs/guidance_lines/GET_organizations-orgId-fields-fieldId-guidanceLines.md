# GET /organizations/{orgId}/fields/{fieldId}/guidanceLines

**Source:** John Deere Operations Center - Guidance Lines API
**Endpoint ID:** `#/organizations/{orgId}/fields/{fieldId}/guidanceLines/get`

> View guidance lines for a field

---

## Description

This endpoint will retrieve a list of guidance lines for a field. By default, the call will return only active guidance lines.

Response Details
A collection of GuidanceLine Objects
Please Note: This API does not support eTags.

**OAuth Scope Required:** `ag1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgId}/fields/{fieldId}/guidanceLines
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | The organization owning the guidance lines.<br>Example: 127856 | path |
| fieldId<br>Required | GUID | The field that the guidance lines are associated with.<br>Example: 309b4c20-f33a-4c96-9a2c-913def198i0c | path |
| status | string | Whether to include archived guidance lines. Valid values are "archived", "available", or "all". Default is "available".<br>Example: archived | query |
| recordFilter | string | Filter results based on status; Will default to active<br>Example: active, archived, all | query |
| embed | string | Whether to return the track geometry for AB and Adaptive Curves. See Shapes Array<br>Example: shapes | query |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| links | Array of undefined | --- |
| total | integer | ---<br>Example: 1 |


## Sample Response [JSON]

```
{
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/127856/fields/309b4c20-f33a-4c96-9a2c-913def198i0c/guidanceLines"
    }
  ],
  "total": 1,
  "values": [
    {
      "@type": "ABLine",
      "heading": 102.71825663467035,
      "aPoint": {
        "@type": "Point",
        "lat": 41.74557323445754,
        "lon": -92.41092564370683
      },
      "bPoint": {
        "@type": "Point",
        "lat": 41.745060835194764,
        "lon": -92.40789413452148
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
      "tramSpacing": 0,
      "saveMethod": "dtiABLineMethodBPoint",
      "erid": "0b36bcd2-6464-4680-b204-b0d1f61c4aad",
      "id": "0b36bcd2-6464-4680-b204-b0d1f61c4aad",
      "name": "test",
      "lastModifiedTime": "2019-06-27T19:37:08.151Z",
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
      "links": [
        {
          "@type": "Link",
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/organizations/1263342/fields/24aa9f68-c699-4f92-9e3e-9def42b8e175/guidanceLines/0b36bcd2-6464-4680-b204-b0d1f61c4aad"
        },
        {
          "@type": "Link",
          "rel": "field",
          "uri": "https://sandboxapi.deere.com/platform/organizations/1263342/fields/24aa9f68-c699-4f92-9e3e-9def42b8e175"
        }
      ],
      "archived": false
    }
  ]
}
```

