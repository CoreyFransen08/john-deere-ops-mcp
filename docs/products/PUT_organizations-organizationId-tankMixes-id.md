# PUT /organizations/{organizationId}/tankMixes/{id}

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/organizations/{organizationId}/tankMixes/{id}/put`

> Update a tank mix

---

## Description

This endpoint allows to update the metadata and the composition of a tank mix.

**OAuth Scope Required:** `eq2`

**Request URI**

```
PUT https://sandboxapi.deere.com/platform/organizations/{organizationId}/tankMixes/{id}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| organizationId<br>Required | integer | The identifier of the Organization.<br>Example: 6781 | path |
| id<br>Required | string | TankMixes id.<br>Example: 89220e2a-04af-4d03-82de-1ac9a4edfa4f | path |


## Request Details

| Field | Type | Description & Example |
| --- | --- | --- |
| @type | string | The type of the tank mix.<br>Example: TankMix |
| name<br>Required | string | The name of the tank mix.<br>Example: TankMix_with_All_Crop |
| notes | string | Notes about the Tank mix.<br>Example: Mix in the carrier last |
| solutionRate<br>Required | object | --- |
| @type | string | The type of the measurement.<br>Example: MeasurementAsDouble |
| valueAsDouble<br>Required | number | The value of the measurement as a double.<br>Example: 5 |
| vrDomainId<br>Required | string | The domain ID for the measurement.<br>Example: vrSolutionRateLiquid |
| unit<br>Required | string | The unit of measure for the value.<br>Example: gal1ac-1 |
| volume<br>Required | object | --- |
| @type | string | The type of the measurement.<br>Example: MeasurementAsDouble |
| valueAsDouble<br>Required | number | The volume value as a double.<br>Example: 1200 |
| vrDomainId<br>Required | string | The domain ID for the volume measurement.<br>Example: vrSolutionRateLiquid |
| unit<br>Required | string | The unit of measure for the volume.<br>Example: gal |
| carrier<br>Required | object | --- |
| @type | string | The type of the tank mix component.<br>Example: TankMixComponent |
| rate<br>Required | object | --- |
| @type | string | The type of the measurement.<br>Example: MeasurementAsDouble |
| valueAsDouble<br>Required | number | The rate value as a double.<br>Example: 4.465466816647919 |
| vrDomainId<br>Required | string | The domain ID for the rate measurement.<br>Example: vrSolutionRateLiquid |
| unit<br>Required | string | The unit of measure for the rate.<br>Example: gal1ac-1 |
| links<br>Required | Array of object | --- |
| @type | string | The type of the link.<br>Example: Link |
| rel<br>Required | string | The relationship of the link.<br>Example: fertilizer |
| uri<br>Required | string | The URI of the linked resource.<br>Example: https://sandboxapi.deere.com/platform/organizations/254751/fertilizers/57fb0c12-257d-496c-84ef-e300012387d1 |
| components<br>Required | Array of object | --- |
| @type | string | The type of the tank mix component.<br>Example: TankMixComponent |
| rate<br>Required | object | --- |
| @type | string | The type of the measurement.<br>Example: MeasurementAsDouble |
| valueAsDouble<br>Required | number | The rate value as a double.<br>Example: 3 |
| vrDomainId<br>Required | string | The domain ID for the rate measurement.<br>Example: vrSolutionRateMass |
| unit<br>Required | string | The unit of measure for the rate.<br>Example: kg1ha-1 |
| links<br>Required | Array of object | --- |
| @type | string | The type of the link.<br>Example: Link |
| rel<br>Required | string | The relationship of the link either fertilizer or chemical.<br>Example: fertilizer |
| uri<br>Required | string | The URI of the linked resource.<br>Example: https://sandboxapi.deere.com/platform/organizations/254751/fertilizers/00ae89c2-2213-4f34-aa57-40cd0191023b |
| archived | boolean | Whether or not this tank mix is actively used.<br>Example: false |
| materialClassification<br>Required | string | Material classification of the tank mix.<br>Example: LIQUID |
| targetCrops | Array of string | The name of the crop that this variety is associated with.<br>Example: CORN_WET,ALFALFA |


## Sample Request [JSON]

```
{
  "@type": "TankMix",
  "name": "TankMix_with_All_Crop",
  "orgUniqueId": "37eeb905-634f-43e4-9cca-dcc0f555f60e",
  "solutionRate": {
    "@type": "MeasurementAsDouble",
    "valueAsDouble": 5,
    "vrDomainId": "vrSolutionRateLiquid",
    "unit": "gal1ac-1"
  },
  "volume": {
    "@type": "MeasurementAsDouble",
    "valueAsDouble": 1200,
    "vrDomainId": "vrSolutionRateLiquid",
    "unit": "gal"
  },
  "carrier": {
    "@type": "TankMixComponent",
    "rate": {
      "@type": "MeasurementAsDouble",
      "valueAsDouble": 4.465466816647919,
      "vrDomainId": "vrSolutionRateLiquid",
      "unit": "gal1ac-1"
    },
    "links": [
      {
        "@type": "Link",
        "rel": "fertilizer",
        "uri": "https://sandboxapi.deere.com/platform/organizations/254751/fertilizers/57fb0c12-257d-496c-84ef-e300012387d1"
      }
    ]
  },
  "components": [
    {
      "@type": "TankMixComponent",
      "rate": {
        "@type": "MeasurementAsDouble",
        "valueAsDouble": 3,
        "vrDomainId": "vrSolutionRateMass",
        "unit": "kg1ha-1"
      },
      "links": [
        {
          "@type": "Link",
          "rel": "fertilizer",
          "uri": "https://sandboxapi.deere.com/platform/organizations/254751/fertilizers/00ae89c2-2213-4f34-aa57-40cd0191023b"
        }
      ]
    },
    {
      "@type": "TankMixComponent",
      "rate": {
        "@type": "MeasurementAsDouble",
        "valueAsDouble": 2,
        "vrDomainId": "vrSolutionRateLiquid",
        "unit": "l1ha-1"
      },
      "links": [
        {
          "@type": "Link",
          "rel": "chemical",
          "uri": "https://sandboxapi.deere.com/platform/organizations/254751/chemicals/0162de38-b270-472b-b20a-956900a6b8bf"
        }
      ]
    },
    {
      "@type": "TankMixComponent",
      "rate": {
        "@type": "MeasurementAsDouble",
        "valueAsDouble": 3,
        "vrDomainId": "vrSolutionRateLiquid",
        "unit": "l1ha-1"
      },
      "links": [
        {
          "@type": "Link",
          "rel": "chemical",
          "uri": "https://sandboxapi.deere.com/platform/organizations/254751/chemicals/01cfb82d-3618-4bf5-99eb-956900a6ec41"
        }
      ]
    }
  ],
  "sourceNode": "468fcde7-5d14-4bee-bedd-1a234234234",
  "archived": false,
  "materialClassification": "LIQUID",
  "targetCrops": [
    "ALFALFA",
    "CORN_WET"
  ],
  "links": [
    {
      "@type": "Link",
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/254751/tankMixes/37eeb905-634f-43e4-9cca-dcc0f555f60e"
    }
  ]
}
```

## Sample Response

```
204 No Content
```

