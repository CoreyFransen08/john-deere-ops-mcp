# GET /organizations/{organizationId}/tankMixes

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/organizations/{organizationId}/tankMixes/get`

> Retrieve tank mixes for an org

---

## Description

This endpoint will retrieve tank mixes for an org.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{organizationId}/tankMixes
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| organizationId<br>Required | integer | The identifier of the Organization.<br>Example: 6781 | path |
| embed | array | The list of Rels, for which objects should be included in the response payload.<br>Allowed Values: chemical | query |
| recordFilter | string | Filter results based on status<br>Example: active, archived, all | query |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| x-deere-signature | string | A new x-deere-signature response header will be included if the response has changed since last api call.<br>Example: 3b5392615e4b4e1c92013026f47109bb |
| @type | string | The type of the tank mix.<br>Example: TankMix |
| name | string | The name of the tank mix.<br>Example: TankMix_with_All_Crop |
| orgUniqueIdDEPRECATED | string | The unique identifier for the organization.<br>Example: 0585cd6d-898a-4298-ac09-a61db88d9e7d |
| solutionRate | object | --- |
| volume | object | --- |
| carrier | object | --- |
| components | Array of object | --- |
| notes | string | Notes about the tank mix.<br>Example: this is tankmix notes |
| archived | boolean | Whether or not this tank mix is actively used.<br>Example: false |
| createdTimeDEPRECATED | string | The time when the tank mix was created.<br>Example: 2024-11-07T06:47:39.246Z |
| modifiedTimeDEPRECATED | string | The time when the tank mix was modified.<br>Example: 2024-11-07T06:47:39.246Z |
| materialClassification | string | Material classification of the tank mix.<br>Example: LIQUID |
| targetCrops | Array of string | The name of the crop that this variety is associated with.<br>Example: CORN_WET,ALFALFA |
| links | Array of object | --- |


## Sample Response [JSON]

```
{
  "links": [
    {
      "@type": "Link",
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456/tankMixes"
    },
    {
      "@type": "Link",
      "rel": "nextPage",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456/tankMixes"
    }
  ],
  "total": 20,
  "values": [
    {
      "@type": "TankMix",
      "name": "TankMix_with_All_Crop",
      "orgUniqueId": "0585cd6d-898a-4298-ac09-a61db88d9e7d",
      "solutionRate": {
        "@type": "MeasurementAsDouble",
        "valueAsDouble": 100,
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
          "valueAsDouble": 90,
          "vrDomainId": "vrSolutionRateLiquid",
          "unit": "gal1ac-1"
        },
        "chemical": {
          "@type": "Fertilizer",
          "links": [
            {
              "@type": "Link",
              "rel": "self",
              "uri": "https://sandboxapi.deere.com/platform/organizations/132456/fertilizers/3678dedb-55d4-4c6a-a93a-24e909c70bfd"
            }
          ],
          "id": "3678dedb-55d4-4c6a-a93a-24e909c70bfd",
          "name": "28-0-0 UAN",
          "type": "FERTILIZER",
          "category": "FERTILIZER",
          "companyName": "---",
          "epaRegistration": "EXEMPT",
          "registration": "EXEMPT",
          "materialClassification": "LIQUID",
          "createdTime": "2024-11-07T06:47:38.220Z",
          "carrierId": "274bbd7b-24ae-11ee-9389-123df1de64f7",
          "referenceId": "3678dedb-55d4-4c6a-a93a-24e909c70bfd",
          "referenceGuid": "3678dedb-55d4-4c6a-a93a-24e909c70bfd",
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
            "rel": "fertilizer",
            "uri": "https://sandboxapi.deere.com/platform/organizations/132456/fertilizers/3678dedb-55d4-4c6a-a93a-24e909c70bfd"
          }
        ]
      },
      "components": [
        {
          "@type": "TankMixComponent",
          "rate": {
            "@type": "MeasurementAsDouble",
            "valueAsDouble": 10,
            "vrDomainId": "vrSolutionRateLiquid",
            "unit": "gal1ac-1"
          },
          "chemical": {
            "@type": "Chemical",
            "links": [
              {
                "@type": "Link",
                "rel": "self",
                "uri": "https://sandboxapi.deere.com/platform/organizations/123456/chemicals/a3aaa1b4-6c5b-4b04-ac39-6d316be7fd8d"
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
              "uri": "https://sandboxapi.deere.com/platform/organizations/123456/chemicals/a3aaa1b4-6c5b-4b04-ac39-6d316be7fd8d"
            }
          ]
        }
      ],
      "notes": "",
      "archived": false,
      "createdTime": "2024-11-07T06:47:39.246Z",
      "modifiedTime": "2024-11-07T06:47:39.246Z",
      "materialClassification": "LIQUID",
      "targetCrops": [
        "ALFALFA",
        "CORN_WET"
      ],
      "links": [
        {
          "@type": "Link",
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456/tankMixes/0585cd6d-898a-4298-ac09-a61db88d9e7d"
        }
      ]
    },
    {
      "@type": "TankMix",
      "name": "214_tankmix",
      "orgUniqueId": "2a9a49ff-fd46-4a1f-a83d-7ce27f9c831e",
      "solutionRate": {
        "@type": "MeasurementAsDouble",
        "valueAsDouble": 100,
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
          "valueAsDouble": 100,
          "vrDomainId": "vrSolutionRateLiquid",
          "unit": "gal1ac-1"
        },
        "chemical": {
          "@type": "Fertilizer",
          "links": [
            {
              "@type": "Link",
              "rel": "self",
              "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fertilizers/3678dedb-55d4-4c6a-a93a-24e909c70bfd"
            }
          ],
          "id": "3678dedb-55d4-4c6a-a93a-24e909c70bfd",
          "name": "28-0-0 UAN",
          "type": "FERTILIZER",
          "category": "FERTILIZER",
          "companyName": "---",
          "epaRegistration": "EXEMPT",
          "registration": "EXEMPT",
          "materialClassification": "LIQUID",
          "createdTime": "2024-11-07T06:47:38.220Z",
          "carrierId": "274bbd7b-24ae-11ee-9389-123df1de64f7",
          "referenceId": "3678dedb-55d4-4c6a-a93a-24e909c70bfd",
          "referenceGuid": "3678dedb-55d4-4c6a-a93a-24e909c70bfd",
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
            "rel": "fertilizer",
            "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fertilizers/3678dedb-55d4-4c6a-a93a-24e909c70bfd"
          }
        ]
      },
      "components": [
        {
          "@type": "TankMixComponent",
          "rate": {
            "@type": "MeasurementAsDouble",
            "valueAsDouble": 0,
            "vrDomainId": "vrSolutionRateLiquid",
            "unit": "gal1ac-1"
          },
          "chemical": {
            "@type": "Chemical",
            "links": [
              {
                "@type": "Link",
                "rel": "self",
                "uri": "https://sandboxapi.deere.com/platform/organizations/123456/chemicals/dfbe700e-87cb-4362-a23b-ff5afd1ccd4a"
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
              "uri": "https://sandboxapi.deere.com/platform/organizations/123456/chemicals/dfbe700e-87cb-4362-a23b-ff5afd1ccd4a"
            }
          ]
        }
      ],
      "notes": "",
      "archived": false,
      "createdTime": "2024-11-07T06:48:29.403Z",
      "materialClassification": "LIQUID",
      "targetCrops": [
        "ALMONDS"
      ],
      "links": [
        {
          "@type": "Link",
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456/tankMixes/2a9a49ff-fd46-4a1f-a83d-7ce27f9c831e"
        }
      ]
    }
  ]
}
```

