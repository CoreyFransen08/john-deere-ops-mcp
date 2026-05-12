# GET /organizations/{organizationId}/fertilizers

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/organizations/{organizationId}/fertilizers/get`

> Retrieve unified list of custom and reference fertilizers in your organization.

---

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{organizationId}/fertilizers
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| organizationId<br>Required | integer | The identifier of the Organization.<br>Example: 6781 | path |
| status | string | Filters the list based on archive status. Accepted values are ARCHIVED, AVAILABLE, and ALL. The default behavior is to return only available (non-archived) varieties.<br>Example: AVAILABLE<br>Allowed Values: AVAILABLE,ARCHIVED,ALL | query |
| embed | array | An embeddable list of properties which are optional by default.<br>Allowed Values: activeIngredients,availableRegistrations,documents,showMergedProducts | query |


## Sample Response [JSON]

```
{
  "links": [
    {
      "@type": "Link",
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/356823/fertilizers"
    },
    {
      "@type": "Link",
      "rel": "nextPage",
      "uri": "https://sandboxapi.deere.com/platform/organizations/356823/fertilizers"
    }
  ],
  "total": 20,
  "values": [
    {
      "@type": "Fertilizer",
      "links": [
        {
          "@type": "Link",
          "rel": "self",
          "uri": "https://apiqa.tal.deere.com/platform/organizations/377848/fertilizers/4dad43d3-4392-41c3-abcb-3eeed86bb3fb"
        }
      ],
      "id": "4dad43d3-4392-41c3-abcb-3eeed86bb3fb",
      "name": "Corn Mix LS",
      "type": "FERTILIZER",
      "category": "FERTILIZER",
      "companyName": "WinField United",
      "epaRegistration": "EXEMPT",
      "registration": "EXEMPT",
      "createdTime": "2025-09-15T11:15:38.863123Z",
      "referenceId": "4dad43d3-4392-41c3-abcb-3eeed86bb3fb",
      "referenceGuid": "4dad43d3-4392-41c3-abcb-3eeed86bb3fb",
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
              "uri": "https://apiqa.tal.deere.com/platform/agencies/8fb34898-64f5-5a1e-a698-34ab348220a7",
              "registrationId": "EXEMPT"
            }
          ]
        }
      ],
      "activeIngredients": [],
      "availableRegistrations": [],
      "documentsList": [],
      "childProducts": [
        {
          "@type": "Fertilizer",
          "links": [
            {
              "@type": "Link",
              "rel": "self",
              "uri": "https://apiqa.tal.deere.com/platform/organizations/377848/fertilizers/3ae537ba-72ae-4446-98ca-882c54eb8fe1"
            }
          ],
          "id": "3ae537ba-72ae-4446-98ca-882c54eb8fe1",
          "name": "cornMixLS~1",
          "type": "FERTILIZER",
          "category": "FERTILIZER",
          "companyName": "1.4GROUP",
          "createdTime": "2025-09-15T09:28:08.079Z",
          "modifiedTime": "2025-09-23T11:25:38.471Z",
          "carrier": false,
          "archived": false,
          "restrictedUse": false,
          "countryCode": "USA",
          "cleanupStatus": "MERGED",
          "parentErid": "4dad43d3-4392-41c3-abcb-3eeed86bb3fb",
          "cleanupActionDate": "2025-09-23T11:25:38.521Z",
          "activeIngredients": [],
          "availableRegistrations": [],
          "documentsList": [],
          "childProducts": []
        }
      ]
    },
    {
      "@type": "Fertilizer",
      "links": [
        {
          "@type": "Link",
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/organizations/356823/fertilizers/e2f8093a-b1ec-4bd4-a8de-aa83855cbd15"
        }
      ],
      "id": "e2f8093a-b1ec-4bd4-a8de-aa83855cbd15",
      "type": "FERTILIZER",
      "category": "MANURE",
      "companyName": "Tide International USA,Inc.",
      "name": "Tide Propiconazole 41.8EC",
      "registration": "a12e9i84",
      "epaRegistration": "a12e9i84",
      "materialClassification": "DRY",
      "restrictedUse": false,
      "createdTime": "2018-04-30T08:30:19.326Z",
      "modifiedTime": "2018-04-26T15:13:32.890Z",
      "carrier": false,
      "archived": false,
      "carrierId": "87b4a1e7-210b-482c-8a7a-19e9f644e914",
      "referenceGuid": "87b4a1e7-210b-482c-8a7a-19e9f644e914",
      "referenceId": "87b4a1e7-210b-482c-8a7a-19e9f644e914",
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
      "liquidWeight": 3.14,
      "weightUnit": "lb/gal",
      "activeIngredients": [
        {
          "name": "Urea Nitrogen",
          "guid": "9ab0fd0d-7ed0-49bd-9a61-0277d89b61f4",
          "percent": 3.14,
          "unit": "%",
          "value": 3.14
        }
      ],
      "availableRegistrations": [
        "a12e9i84, 0000264-00783-AA-0067760"
      ],
      "documentsList": [
        {
          "@type": "Document",
          "erid": "08e930ee-4c31-41b6-b57e-8c0a8e1284a4",
          "docType": "24(c) Registration",
          "productErid": "388ab719-277d-4032-a2c3-40a297d8f482",
          "description": "CO-090003 R-4310 102119 For Use on Alfalfa Grown for Seed",
          "fileName": "ld7OD026.pdf",
          "expirationDate": "2017-03-22"
        }
      ]
    },
    {
      "@type": "Fertilizer",
      "links": [
        {
          "@type": "Link",
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/organizations/356823/fertilizers/6c42adb6-15ce-4f63-9528-c91470900e2c"
        }
      ],
      "id": "6c42adb6-15ce-4f63-9528-c91470900e2c",
      "name": "SOURCE Corn",
      "type": "FERTILIZER",
      "category": "FERTILIZER",
      "companyName": "Sound Agriculture",
      "epaRegistration": "EXEMPT",
      "registration": "EXEMPT",
      "materialClassification": "LIQUID",
      "createdTime": "2024-12-05T06:43:57.118Z",
      "referenceId": "6c42adb6-15ce-4f63-9528-c91470900e2c",
      "referenceGuid": "6c42adb6-15ce-4f63-9528-c91470900e2c",
      "carrier": false,
      "archived": false,
      "restrictedUse": false,
      "liquidWeight": 8.45,
      "weightUnit": "lbs/gal",
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
      "activeIngredients": [
        {
          "name": "Urea Nitrogen",
          "guid": "9ab0fd0d-7ed0-49bd-9a61-0277d89b61f4",
          "percent": 3.14,
          "unit": "%",
          "value": 3.14
        }
      ],
      "availableRegistrations": [
        "a12e9i84, 0000264-00783-AA-0067760"
      ],
      "documentsList": [
        {
          "@type": "Document",
          "erid": "08e930ee-4c31-41b6-b57e-8c0a8e1284a4",
          "docType": "24(c) Registration",
          "productErid": "388ab719-277d-4032-a2c3-40a297d8f482",
          "description": "CO-090003 R-4310 102119 For Use on Alfalfa Grown for Seed",
          "fileName": "ld7OD026.pdf",
          "expirationDate": "2017-03-22"
        }
      ]
    }
  ]
}
```

