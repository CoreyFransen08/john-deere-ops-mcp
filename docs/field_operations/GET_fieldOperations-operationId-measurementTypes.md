# GET /fieldOperations/{operationId}/measurementTypes

**Source:** John Deere Operations Center - Field Operations API
**Endpoint ID:** `#/fieldOperations/{operationId}/measurementTypes/get`

> Field Operation Measurements

---

## Description

Field Operations include a variety of measurements collected when the operation is performed in the field. This endpoint returns an array of measurement types available for a given field operation. Two categories of measurements are available today:
Target: Target measurements refer to what the machine or implement attempted to perform in the field.
Result: Result measurements refer to what the machine or implement actually accomplished in the field.
For example, the SeedingRateTarget measurement describes the rate at which the equipment attempted to plant seeds, while the SeedingRateResult measurement describes the rate at which seeds were actually planted by the equipment. Target measurements may be consistent throughout the entire operation (the operator may have applied a single rate across an entire field) but result measurements will vary during the operation as they account for machine error, operator error, and environmental factors. The difference in rate and location are easily visible in the associated map image.

Note: The values included in the responses will depend on their availability as well as the field operation type (Seeding, Application Tank Mix, Application Single Product, Harvest Yield Contour, or Harvest Yield Result). Please refer measurement types. "carting" operations as well as construction operations "constructionmilling", "constructionpaving", "constructioncompacting", "constructioncrushing", "constructionstabilizingrecycling" are not supported at this time.

**OAuth Scope Required:** `ag2`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/fieldOperations/{operationId}/measurementTypes
```

**Accept:** `application/vnd.deere.axiom.v3+json`

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


## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| operationId<br>Required | string | Operation ID<br>Example: MzA0Nl81Njg0Z | path |
| measurementType<br>Required | string | Measurement Type<br>Example: SeedingVarietiesResult | path |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| measurementName | string | Measurement Name.<br>Example: SeedingVarietiesResult |
| measurementCategory | string | Measurement Category.<br>Example: Result |
| area | --- | The area covered for this measurement. Includes value, and unitId2.<br>Example: See "Seeding" sample responses below. |
| totalMaterial | --- | The total amount of seeds applied during the operation. Includes value and unitId2.<br>Example: See "Seeding" sample responses below. |
| averageMaterial | --- | The average amount of seeds applied during the operation. Includes value and unitId2.<br>Example: See "Seeding" sample responses below. |
| varietyTotals | --- | An array of the same measurements, broken down by variety. See the table below for details.<br>Example: See "Seeding" sample responses below. |


## Response Details: Variety Totals

| Field | Type | Description & Example |
| --- | --- | --- |
| name | string | Variety name.<br>Example: 33B54 |
| area | --- | The area covered for this measurement. Includes value and unitId2.<br>Example: See "Seeding" sample response below. |
| totalMaterial | --- | The total amount of seeds applied during the operation. Includes value and unitId2.<br>Example: See "Seeding" sample response below. |
| averageMaterial | --- | The average amount of seeds applied during the operation. Includes value and unitId2.<br>Example: See sample responses below. |


## Response Details: All Measurements

| Field | Type | Description & Example |
| --- | --- | --- |
| value | int | Numeric measurement value.<br>Example: 333178 |
| unitId2 | string | Unit of measurement.<br>Example: seeds1ha-1 |


## Sample Response [JSON]: Seeding

```
{
  "@type": "FieldOperationMeasurement",
  "measurementName": "SeedingVarietiesResult",
  "measurementCategory": "Result",
  "area": {
    "@type": "EventMeasurement",
    "value": 38.07,
    "unitId": "ha"
  },
  "totalMaterial": {
    "@type": "EventMeasurement",
    "value": 12016203,
    "unitId": "seeds"
  },
  "averageMaterial": {
    "@type": "EventMeasurement",
    "value": 315631,
    "unitId": "seeds1ha-1"
  },
  "varietyTotals": [
    {
      "@type": "VarietyTotal",
      "name": "4204",
      "area": {
        "@type": "EventMeasurement",
        "value": 24.24,
        "unitId": "ha"
      },
      "totalMaterial": {
        "@type": "EventMeasurement",
        "value": 7408062,
        "unitId": "seeds"
      },
      "averageMaterial": {
        "@type": "EventMeasurement",
        "value": 305619,
        "unitId": "seeds1ha-1"
      }
    },
    {
      "@type": "VarietyTotal",
      "name": "4302",
      "area": {
        "@type": "EventMeasurement",
        "value": 13.83,
        "unitId": "ha"
      },
      "totalMaterial": {
        "@type": "EventMeasurement",
        "value": 4608141,
        "unitId": "seeds"
      },
      "averageMaterial": {
        "@type": "EventMeasurement",
        "value": 333178,
        "unitId": "seeds1ha-1"
      }
    }
  ],
  "links": [
    {
      "@type": "Link",
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MzA0Nl81Njg0Z/measurementTypes/SeedingVarietiesResult"
    },
    {
      "@type": "Link",
      "rel": "mapImage",
      "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MzA0Nl81Njg0Z/measurementTypes/SeedingVarietiesResult"
    },
    {
      "@type": "Link",
      "rel": "organization",
      "uri": "https://sandboxapi.deere.com/platform/organizations/1234"
    },
    {
      "@type": "Link",
      "rel": "field",
      "uri": "https://sandboxapi.deere.com/platform/organizations/1234/fields/c95d5d46-1ce7-4e6b-ac8f-f5ff67324f14"
    },
    {
      "@type": "Link",
      "rel": "fieldOperation",
      "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MzA0Nl81Njg0Z"
    }
  ]
}
```

## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| total | integer | Number of results in the list<br>Example: 70 |


