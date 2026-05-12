# GET /fieldOperations/{operationId}/measurementTypes/{measurementType}

**Source:** John Deere Operations Center - Field Operations API
**Endpoint ID:** `#/fieldOperations/{operationId}/measurementTypes/{measurementType}/get`

> Field Operation Measurement

---

## Description

Field Operations include a variety of measurements collected when the operation is performed in the field. This endpoint returns an array of measurement types available for a given field operation. Two categories of measurements are available today:
Target: Target measurements refer to what the machine or implement attempted to perform in the field.
Result: Result measurements refer to what the machine or implement actually accomplished in the field.
For example, the SeedingRateTarget measurement describes the rate at which the equipment attempted to plant seeds, while the SeedingRateResult measurement describes the rate at which seeds were actually planted by the equipment. Target measurements may be consistent throughout the entire operation (the operator may have applied a single rate across an entire field) but result measurements will vary during the operation as they account for machine error, operator error, and environmental factors. The difference in rate and location are easily visible in the associated map image.

Note: The values included in the responses will depend on their availability as well as the field operation type (Seeding, Application Tank Mix, Application Single Product, Harvest Yield Contour, or Harvest Yield Result). To view the different responses for each field operation type, view the Field Operation Measurements documentation above. Please refer measurement types

Note: This API has two possible accept headers. One will give a response with totals, and the other will give a response with a Base64 encoded image. For the image layer, A map image is available for each measurement offering a visual depiction of the data. Argonomic data points are grouped either by label (such as variety name) or numerical range, and this information provided in the JSON response as a map legend.

**OAuth Scope Required:** `ag2`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/fieldOperations/{operationId}/measurementTypes/{measurementType}
```

**Accept:** `application/vnd.deere.axiom.v3+json, application/vnd.deere.axiom.v3.image+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| operationId<br>Required | string | Operation ID<br>Example: MTIzNF81NjFiZGY1 | path |
| measurementType | string | Measurement Type<br>Example: HarvestYield | header |


## Headers

| Key | Type | Description & Example | In / Defaults |
| --- | --- | --- | --- |
| Accept-UOM-System | string | Desired unit system. Takes ENGLISH or METRIC.<br>Example: ENGLISH | header |
| Accept-Yield-Preference | string | Desired yield representation (unit) type. Takes VOLUME or MASS.<br>Example: MASS | header |


## Response Details: application/vnd.deere.axiom.v3+json

| Field | Type | Description & Example |
| --- | --- | --- |
| measurementName | string | Measurement Name.<br>Note: This response details section correspond to header-application/vnd.deere.axiom.v3+json<br>Example: TillageDepthTarget |
| measurementCategory | string | Measurement Category.<br>Example: Target |
| area | --- | The area covered for this measurement. Includes value, and unitId2.<br>Example: See sample response below |
| averageDepth | --- | The average depth observed across the area covered. Includes value, and unitId.<br>Example: See sample response below |
| value | integer | Numeric measurement value.<br>Example: 15.24 |
| unitId2 | string | Unit of measurement.<br>Example: cm |


## Response Details: application/vnd.deere.axiom.v3.image+json

| Field | Type | Description & Example |
| --- | --- | --- |
| name | string | Field Operation name.<br>Note: This response details section correspond to header-application/vnd.deere.axiom.v3.image+json<br>Example: fieldOperationMapImage |
| declaredType | --- | ---<br>Example: See sample response below. |
| scope | --- | ---<br>Example: See sample response below. |
| image | Base64 encoded PNG image | The PNG image file.<br>Example: See sample response below. |
| legends | --- | The legend used to render the map image. Includes unitId2 and ranges.<br>Example: See sample response below. |
| extent | --- | Two coordinates that represent the corners of the image when overlaid onto a Web Mercator projection1. Includes minimumLatitude, minimumLongitude, maximumLatitude, and maximumLongitude.<br>Example: See sample response below. |
| unitId2 | string | Numeric values in the legend's ranges are measurements in this unit. The unit depends on the Accept-UOM-System header for the MapImage request.<br>Example: cm |
| ranges | --- | The ranges contained in the legend. Includes either a label (for non-numeric ranges), or minimum, maximum, hexColor, and percent.<br>Example: See sample response below. |
| label | string | A label associated with the legend item. May be omitted for ranges with numeric values.<br>Example: 15 |
| hexColor | string | The HEX color value of the legend item.<br>Example: #4B0082 |
| percent | number | The percentage of agronomic data points that are represented by this legend item. For example, 0.05 means that 5% of the operation's measurements fall into this legend range.<br>Example: 1 |
| nil | boolean | ---<br>Example: false |
| globalScope | boolean | ---<br>Example: true |
| typeSubstituted | boolean | ---<br>Example: false |


## Sample Response [JSON]: application/vnd.deere.axiom.v3+json

```
{
  "@type": "FieldOperationMeasurement",
  "measurementName": "TillageDepthTarget",
  "measurementCategory": "Target",
  "area": {
    "@type": "EventMeasurement",
    "value": 0.72,
    "unitId": "ha"
  },
  "averageDepth": {
    "@type": "EventMeasurement",
    "value": 15.24,
    "unitId": "cm"
  },
  "links": [
    {
      "@type": "Link",
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkNA/measurementTypes/TillageDepthTarget"
    },
    {
      "@type": "Link",
      "rel": "mapImage",
      "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkNA/measurementTypes/TillageDepthTarget"
    },
    {
      "@type": "Link",
      "rel": "organization",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456"
    },
    {
      "@type": "Link",
      "rel": "field",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fields/d61b83f4-3a12-431e-8010-596f2466dc27"
    },
    {
      "@type": "Link",
      "rel": "fieldOperation",
      "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkNA"
    }
  ]
}
```

## Sample Response [JSON]: application/vnd.deere.axiom.v3.image+json

```
{
  "name": "fieldOperationMapImage",
  "declaredType": "com.deere.api.axiom.generated.v3.FieldOperationMapImage",
  "scope": "javax.xml.bind.JAXBElement$GlobalScope",
  "value": {
    "image": "data:image/png;base64...",
    "legend": {
      "@type": "MapLegend",
      "unitId": "cm",
      "ranges": [
        {
          "@type": "MapLegendItem",
          "label": "15",
          "hexColor": "#4B0082",
          "percent": 1
        }
      ]
    },
    "extent": {
      "@type": "MapExtent",
      "minimumLatitude": 41.66625903184001,
      "maximumLatitude": 41.669542228078,
      "minimumLongitude": -93.15431597923825,
      "maximumLongitude": -93.15009035584056
    },
    "links": [
      {
        "@type": "Link",
        "rel": "self",
        "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkNA/measurementTypes/TillageDepthTarget"
      },
      {
        "@type": "Link",
        "rel": "organization",
        "uri": "https://sandboxapi.deere.com/platform/organizations/123456"
      },
      {
        "@type": "Link",
        "rel": "field",
        "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fields/d61b83f4-3a12-431e-8010-596f2466dc27"
      },
      {
        "@type": "Link",
        "rel": "fieldOperation",
        "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkNA"
      },
      {
        "@type": "Link",
        "rel": "measurementType",
        "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkNA/measurementTypes/TillageDepthTarget"
      }
    ]
  },
  "nil": false,
  "globalScope": true,
  "typeSubstituted": false
}
```

