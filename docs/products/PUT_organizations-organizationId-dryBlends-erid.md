# PUT /organizations/{organizationId}/dryBlends/{erid}

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/organizations/{organizationId}/dryBlends/{erid}/put`

> Update a dry blend

---

## Description

Allows updates to be made to the name, archival status, and components of a dry blend.

**OAuth Scope Required:** `eq2`

**Request URI**

```
PUT https://sandboxapi.deere.com/platform/organizations/{organizationId}/dryBlends/{erid}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Request Details

| Field | Type | Description & Example |
| --- | --- | --- |
| DryBlend | object | --- |
| @type | string | The type of the dry blend.<br>Example: DryBlend |
| name<br>Required | string | The name of the dry blend.<br>Example: TestDryBlend |
| solutionRate<br>Required | object | --- |
| @type | string | The type of the measurement.<br>Example: MeasurementAsDouble |
| valueAsDouble<br>Required | number | The value of the measurement as a double.<br>Example: 0 |
| vrDomainId<br>Required | string | The domain ID for the measurement.<br>Example: vrSolutionRateMass |
| unit<br>Required | string | The unit of measure for the value.<br>Example: lb1ac-1 |
| materialClassification<br>Required | string | Material classification of the dry blend.<br>Example: DRY |
| archived | boolean | Whether or not this dry blend is actively used.<br>Example: false |
| notes | string | Notes about the dry blend.<br>Example: Mix in the carrier last |
| components<br>Required | Array of object | --- |
| @type | string | The type of the dry blend component.<br>Example: DryBlendComponent |
| rate<br>Required | object | --- |
| @type | string | The type of the measurement.<br>Example: MeasurementAsDouble |
| valueAsDouble<br>Required | number | The rate value as a double.<br>Example: 100 |
| vrDomainId<br>Required | string | The domain ID for the rate measurement.<br>Example: vrSolutionRateLiquid |
| unit<br>Required | string | The unit of measure for the rate.<br>Example: gal1ac-1 |
| links<br>Required | Array of object | --- |
| @type | string | The type of the link.<br>Example: Link |
| rel<br>Required | string | The relationship of the link either fertilizer or chemical.<br>Example: chemical |
| uri<br>Required | string | The URI of the linked resource.<br>Example: https://sandboxapi.deere.com/platform/organizations/254751/chemicals/0d373fc5-d2a0-4afc-be6e-f8f34eabaaac |
| targetCrops | Array of string | The name of the crop that this variety is associated with.<br>Example: CORN_WET,ALFALFA |


## Sample Request [JSON]

```
{
  "name": "TestDryBlend",
  "solutionRate": {
    "@type": "MeasurementAsDouble",
    "valueAsDouble": 0,
    "vrDomainId": "vrSolutionRateMass",
    "unit": "lb1ac-1"
  },
  "materialClassification": "DRY",
  "archived": false,
  "notes": "Mix in the carrier last",
  "components": [
    {
      "@type": "DryBlendComponent",
      "rate": {
        "@type": "MeasurementAsDouble",
        "valueAsDouble": 100,
        "vrDomainId": "vrSolutionRateLiquid",
        "unit": "gal1ac-1"
      },
      "links": [
        {
          "@type": "Link",
          "rel": "chemical",
          "uri": "https://sandboxapi.deere.com/platform/organizations/254751/chemicals/0d373fc5-d2a0-4afc-be6e-f8f34eabaaac"
        }
      ]
    },
    {
      "@type": "DryBlendComponent",
      "rate": {
        "@type": "MeasurementAsDouble",
        "valueAsDouble": 1.784,
        "vrDomainId": "vrSolutionRateMass",
        "unit": "lb1ac-1"
      },
      "links": [
        {
          "@type": "Link",
          "rel": "fertilizer",
          "uri": "https://sandboxapi.deere.com/platform/organizations/254751/fertilizers/b25de35e-6062-4ecb-917d-ed145ab378d1"
        }
      ]
    }
  ],
  "targetCrops": [
    "CORN_WET"
  ]
}
```

## Sample Response [JSON]: Header

```
204 No Content
```

