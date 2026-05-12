# GET /organizations/{organizationId}/varieties/{erid}

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/organizations/{organizationId}/varieties/{erid}/get`

> View a specific variety

---

## Description

This endpoint will return the variety with the specified erid.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{organizationId}/varieties/{erid}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| organizationId<br>Required | integer | The identifier of the Organization.<br>Example: 6781 | path |
| erid<br>Required | string | A unique identifier for an entity formatted as a uuid.<br>Example: cf09acfc-9196-4dbb-9b38-1be02673c5ff | path |
| embed | array | An embeddable list of properties which are optional by default.<br>Allowed Values: documents,showMergedProducts | query |


## Sample Response [JSON]

```
{
  "@type": "Variety",
  "id": "8e1e0920-1265-4066-8067-8ce2ce5012b2",
  "name": "1299",
  "cropName": "Cornell",
  "companyName": "Curry Seed",
  "archived": false,
  "category": "VARIETY",
  "referenceGuid": "8e1e0920-1265-4066-8067-8ce2ce5012b2",
  "referenceId": "8e1e0920-1265-4066-8067-8ce2ce5012b2",
  "createdTime": "2017-03-21T21:12:53.865Z",
  "modifiedTime": "2017-03-22T21:12:53.870Z",
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
}
```

