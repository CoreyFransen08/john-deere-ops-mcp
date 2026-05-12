# GET /organizations/{organizationId}/varieties

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/organizations/{organizationId}/varieties/get`

> View varieties for an org

---

## Description

This endpoint will retrieve a collection of varieties for the specified org.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{organizationId}/varieties
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| organizationId<br>Required | integer | The identifier of the Organization.<br>Example: 6781 | path |
| status | string | Filters the list based on archive status. Accepted values are ARCHIVED, AVAILABLE, and ALL. The default behavior is to return only available (non-archived) varieties.<br>Example: AVAILABLE<br>Allowed Values: AVAILABLE,ARCHIVED,ALL | query |
| embed | array | An embeddable list of properties which are optional by default.<br>Allowed Values: documents,showMergedProducts | query |


## Sample Response [JSON]

```
{
  "links": [
    {
      "@type": "Link",
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/654321/varieties"
    },
    {
      "@type": "Link",
      "rel": "nextPage",
      "uri": "https://sandboxapi.deere.com/platform/organizations/654321/varieties"
    }
  ],
  "total": 20,
  "values": [
    {
      "@type": "Variety",
      "id": "8e1e0920-1265-4066-8067-8ce2ce5012b2",
      "name": "1299",
      "category": "VARIETY",
      "cropName": "Cornell",
      "companyName": "Curry Seed",
      "createdTime": "2024-12-04T07:52:51.267Z",
      "modifiedTime": "2024-12-06T07:52:51.267Z",
      "referenceGuid": "8e1e0920-1265-4066-8067-8ce2ce5012b2",
      "referenceId": "8e1e0920-1265-4066-8067-8ce2ce5012b2",
      "archived": false,
      "countryCode": "USA",
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
      ],
      "childProducts": [
        {
          "@type": "Variety",
          "id": "18b7bad8-2f0a-4036-b3f6-5abbe6b2f5dc",
          "name": "corn123",
          "companyName": "1.4GROUP",
          "cropName": "SOYBEANS",
          "archived": false,
          "category": "VARIETY",
          "createdTime": "2025-03-21T21:12:53.865Z",
          "modifiedTime": "2025-04-06T15:12:52.910Z",
          "countryCode": "USA",
          "cleanupStatus": "MERGED",
          "parentErid": "b0241592-c95a-4a8b-a2f9-3e58168ac291",
          "cleanupActionDate": "2025-09-22T11:24:43.855Z",
          "documentsList": [],
          "childProducts": []
        }
      ],
      "links": [
        {
          "@type": "Link",
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/organizations/356823/varieties/cf09acfc-9196-4dbb-9b38-1be02673c5ff"
        }
      ]
    },
    {
      "@type": "Variety",
      "id": "1a63a1fe-b00f-403f-81f7-c157e0234cc4",
      "name": "2C788A SXRA COR",
      "category": "VARIETY",
      "cropName": "CORN_WET",
      "companyName": "MYCOGEN SEEDS",
      "createdTime": "2024-12-04T07:52:51.267Z",
      "referenceGuid": "1a63a1fe-b00f-403f-81f7-c157e0234cc4",
      "referenceId": "8e1e0920-1265-4066-8067-8ce2ce5012b2",
      "archived": false,
      "countryCode": "USA",
      "documentsList": [
        {
          "@type": "Document",
          "erid": "4cb1e8c0-e801-4f19-b674-6362246be920",
          "docType": "24(c) Registration",
          "productErid": "388ab719-277d-4032-a2c3-40a297d8f482",
          "description": "CO-090003 R-4310 102119 For Use on Alfalfa Grown for Seed",
          "fileName": "ld7OD026.pdf",
          "expirationDate": "2017-03-22"
        }
      ],
      "links": [
        {
          "@type": "Link",
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/organizations/356823/varieties/c3a58145-acfc-4b73-bc1d-0d442697e053"
        }
      ]
    },
    {
      "@type": "Variety",
      "id": "bd489040-c98b-403e-ac6e-ab2d7d4ac3fa",
      "name": "33H83",
      "category": "VARIETY",
      "cropName": "CORN_WET",
      "companyName": "Pioneer",
      "createdTime": "2024-12-04T07:52:51.267Z",
      "referenceGuid": "bd489040-c98b-403e-ac6e-ab2d7d4ac3fa",
      "referenceId": "8e1e0920-1265-4066-8067-8ce2ce5012b2",
      "archived": false,
      "countryCode": "USA",
      "documentsList": [
        {
          "@type": "Document",
          "erid": "cf09acfc-9196-4dbb-9b38-1be02673c5ff",
          "docType": "24(c) Registration",
          "productErid": "388ab719-277d-4032-a2c3-40a297d8f482",
          "description": "CO-090003 R-4310 102119 For Use on Alfalfa Grown for Seed",
          "fileName": "ld7OD026.pdf",
          "expirationDate": "2017-03-22"
        }
      ],
      "links": [
        {
          "@type": "Link",
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/organizations/356823/varieties/b006726b-38a0-44a6-b723-a966c68170b6"
        }
      ]
    }
  ]
}
```

