# GET /organizations/{organizationId}/chemicals/{erid}

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/organizations/{organizationId}/chemicals/{erid}/get`

> Retrieve a specific chemical from an organization's asset list.

---

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{organizationId}/chemicals/{erid}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| organizationId<br>Required | integer | The identifier of the Organization.<br>Example: 6781 | path |
| erid<br>Required | string | A unique identifier for an entity formatted as a uuid.<br>Example: cf09acfc-9196-4dbb-9b38-1be02673c5ff | path |
| embed | array | An embeddable list of properties which are optional by default.<br>Allowed Values: activeIngredients,availableRegistrations,documents,showMergedProducts | query |


## Sample Response [JSON]

```
{
  "@type": "Chemical",
  "links": [
    {
      "@type": "Link",
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456/chemicals/85f76746-fba2-48d0-bf7c-e46a79b00327"
    }
  ],
  "id": "85f76746-fba2-48d0-bf7c-e46a79b00327",
  "name": "AMS-All ",
  "type": "ADJUVANT",
  "category": "CHEMICAL",
  "companyName": "Drexel Chemical Company",
  "epaRegistration": "EXEMPT",
  "registration": "EXEMPT",
  "materialClassification": "LIQUID",
  "createdTime": "2024-10-18T10:00:08.480Z",
  "modifiedTime": "2024-10-18T10:00:08.729004Z",
  "referenceId": "85f76746-fba2-48d0-bf7c-e46a79b00327",
  "referenceGuid": "85f76746-fba2-48d0-bf7c-e46a79b00327",
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
  "activeIngredients": [
    {
      "@type": "ActiveIngredient",
      "guid": "40ab45ee-96ef-4bfe-883a-fb65ced5b748",
      "name": "Ammonium sulfate",
      "percent": 40.25,
      "unit": "%",
      "value": 40.25
    }
  ],
  "availableRegistrations": [
    "EXEMPT"
  ],
  "documentsList": [
    {
      "@type": "Document",
      "erid": "4360eaf3-cd0e-486d-88d9-8153ca547084",
      "productErid": "85f76746-fba2-48d0-bf7c-e46a79b00327",
      "fileName": "ldC7J001.pdf",
      "docType": "Specimen Label",
      "description": "6422SP-0418"
    },
    {
      "@type": "Document",
      "erid": "8769a734-7a91-4b6d-b829-06e50e25ebc6",
      "productErid": "85f76746-fba2-48d0-bf7c-e46a79b00327",
      "fileName": "mpC7J002.pdf",
      "docType": "SDS",
      "description": "April 28, 2020"
    },
    {
      "@type": "Document",
      "erid": "d2c5f59f-1136-449e-9d62-017979f8a617",
      "productErid": "85f76746-fba2-48d0-bf7c-e46a79b00327",
      "fileName": "mpC7J004.pdf",
      "docType": "SDS",
      "description": "10/29/2024"
    }
  ],
  "childProducts": [
    {
      "@type": "Chemical",
      "links": [
        {
          "@type": "Link",
          "rel": "self",
          "uri": "https://apiqa.tal.deere.com/platform/organizations/377848/chemicals/5e069eca-e445-41af-b870-c78390f7e7cb"
        }
      ],
      "id": "5e069eca-e445-41af-b870-c78390f7e7cb",
      "name": "ABAMEC SC",
      "type": "ADDITIVE",
      "category": "CHEMICAL",
      "companyName": "1.4GROUP",
      "carrier": false,
      "archived": true,
      "createdTime": "2024-10-18T10:00:08.480Z",
      "modifiedTime": "2024-10-18T10:00:08.729004Z",
      "cleanupStatus": "MERGED,",
      "parentErid": "d8355ff0-2d14-4eee-8092-b30568cd4adb,",
      "cleanupActionDate": "2025-09-15T11:25:16.149Z,",
      "restrictedUse": false,
      "countryCode": "USA",
      "activeIngredients": [],
      "availableRegistrations": [],
      "documentsList": []
    }
  ]
}
```

