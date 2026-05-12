# GET /organizations/{organizationId}/dryBlends/{erid}

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/organizations/{organizationId}/dryBlends/{erid}/get`

> Retrieves a specific dry blend

---

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{organizationId}/dryBlends/{erid}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| embed | array | The list of Rels, for which objects should be included in the response payload.<br>Allowed Values: product | query |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| @type | string | The type of the dry blend.<br>Example: DryBlend |
| links | Array of object | --- |
| erid | string | The unique identifier for the dry blend.<br>Example: af20cf1a-2def-47ce-9861-35f51afc1ad8 |
| name | string | The name of the dry blend.<br>Example: dryblend_alfa |
| solutionRate | object | --- |
| materialClassification | string | Material classification of the dry blend.<br>Example: DRY |
| archived | boolean | Whether or not this dry blend is actively used.<br>Example: false |
| notes | string | Notes about the dry blend.<br>Example: notes |
| components | Array of object | --- |
| targetCrops | Array of string | The name of the crop that this variety is associated with.<br>Example: CORN_WET,ALFALFA |


## Sample Response [JSON]

```
{
  "@type": "DryBlend",
  "links": [
    {
      "@type": "Link",
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/350519/dryBlends/af20cf1a-2def-47ce-9861-35f51afc1ad8"
    }
  ],
  "erid": "af20cf1a-2def-47ce-9861-35f51afc1ad8",
  "name": "dryblend_alfa",
  "solutionRate": {
    "@type": "MeasurementAsDouble",
    "valueAsDouble": 10,
    "vrDomainId": "vrSolutionRateMass",
    "unit": "lb1ac-1"
  },
  "materialClassification": "DRY",
  "archived": false,
  "notes": "notes",
  "components": [
    {
      "@type": "DryBlendComponent",
      "rate": {
        "@type": "MeasurementAsDouble",
        "valueAsDouble": 5,
        "vrDomainId": "vrSolutionRateMass",
        "unit": "lb1ac-1"
      },
      "product": {
        "@type": "Chemical",
        "links": [
          {
            "@type": "Link",
            "rel": "self",
            "uri": "https://sandboxapi.deere.com/platform/organizations/350519/chemicals/a3aaa1b4-6c5b-4b04-ac39-6d316be7fd8d"
          }
        ],
        "id": "a3aaa1b4-6c5b-4b04-ac39-6d316be7fd8d",
        "name": "TELIA",
        "type": "FUNGICIDE",
        "category": "CHEMICAL",
        "companyName": "BASF",
        "epaRegistration": "EXEMPT",
        "registration": "EXEMPT",
        "modifiedTime": "2024-08-21T09:25:24.220763Z",
        "carrierId": "58984d7a-126e-4d31-98e9-1ed65a582d91",
        "referenceId": "a3aaa1b4-6c5b-4b04-ac39-6d316be7fd8d",
        "referenceGuid": "a3aaa1b4-6c5b-4b04-ac39-6d316be7fd8d",
        "carrier": true,
        "archived": false,
        "restrictedUse": false,
        "countryCode": "USA",
        "agencyRegistrations": [
          {
            "@type": "AgencyRegistration",
            "links": [
              {
                "@type": "Link",
                "rel": "agency",
                "uri": "https://sandboxapi.deere.com/platform/agencies/8fb34898-64f5-5a1e-a698-34ab348220a7"
              }
            ],
            "registrationId": "EXEMPT"
          }
        ],
        "activeIngredients": [],
        "availableRegistrations": [],
        "documentsList": []
      },
      "links": [
        {
          "@type": "Link",
          "rel": "chemical",
          "uri": "https://sandboxapi.deere.com/platform/organizations/350519/chemicals/a3aaa1b4-6c5b-4b04-ac39-6d316be7fd8d"
        }
      ]
    },
    {
      "@type": "DryBlendComponent",
      "rate": {
        "@type": "MeasurementAsDouble",
        "valueAsDouble": 5,
        "vrDomainId": "vrSolutionRateMass",
        "unit": "lb1ac-1"
      },
      "product": {
        "@type": "Chemical",
        "links": [
          {
            "@type": "Link",
            "rel": "self",
            "uri": "https://sandboxapi.deere.com/platform/organizations/350519/chemicals/dfbe700e-87cb-4362-a23b-ff5afd1ccd4a"
          }
        ],
        "id": "dfbe700e-87cb-4362-a23b-ff5afd1ccd4a",
        "name": "Maybach",
        "type": "FUNGICIDE",
        "category": "CHEMICAL",
        "companyName": "BASF",
        "epaRegistration": "EXEMPT",
        "registration": "EXEMPT",
        "referenceId": "dfbe700e-87cb-4362-a23b-ff5afd1ccd4a",
        "referenceGuid": "dfbe700e-87cb-4362-a23b-ff5afd1ccd4a",
        "carrier": false,
        "archived": false,
        "restrictedUse": false,
        "countryCode": "USA",
        "agencyRegistrations": [
          {
            "@type": "AgencyRegistration",
            "links": [
              {
                "@type": "Link",
                "rel": "agency",
                "uri": "https://sandboxapi.deere.com/platform/agencies/8fb34898-64f5-5a1e-a698-34ab348220a7"
              }
            ],
            "registrationId": "EXEMPT"
          }
        ],
        "activeIngredients": [],
        "availableRegistrations": [],
        "documentsList": []
      },
      "links": [
        {
          "@type": "Link",
          "rel": "chemical",
          "uri": "https://sandboxapi.deere.com/platform/organizations/350519/chemicals/dfbe700e-87cb-4362-a23b-ff5afd1ccd4a"
        }
      ]
    }
  ],
  "targetCrops": [
    "ALFALFA"
  ]
}
```

