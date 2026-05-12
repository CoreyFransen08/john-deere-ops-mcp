# GET /chemicals/{erid}/documents

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/chemicals/{erid}/documents/get`

> Reference list of documents for an associated chemical

---

## Description

List of all the documents for a chemical from industry data sources, such as CDMS.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/chemicals/{erid}/documents
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| erid<br>Required | string | A unique identifier for an entity formatted as a uuid.<br>Example: cf09acfc-9196-4dbb-9b38-1be02673c5ff | path |


## Sample Response [JSON]

```
{
  "links": [
    {
      "@type": "Link",
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/chemicals/2efdaf0a-254c-4ba2-9a1f-b3c94f962224/documents"
    },
    {
      "@type": "Link",
      "rel": "next",
      "uri": "https://sandboxapi.deere.com/platform/chemicals/2efdaf0a-254c-4ba2-9a1f-b3c94f962224/documents"
    }
  ],
  "total": 100,
  "values": [
    {
      "@type": "Document",
      "erid": "1f8c12b4-126f-11ec-82a8-0242ac130003",
      "productErid": "388ab719-277d-4032-a2c3-40a297d8f482",
      "docType": "24(c) Registration",
      "description": "CO-090003 R-4310 102119 For Use on Alfalfa Grown for Seed",
      "fileName": "ld7OD026.pdf",
      "expirationDate": "2017-03-22"
    },
    {
      "@type": "Document",
      "erid": "6d0b01a5-05b7-4c2b-985b-c322939f92cb",
      "productErid": "388ab719-277d-4032-a2c3-40a297d8f482",
      "fileName": "mp6EE011.pdf",
      "docType": "SDS",
      "description": "2/26/2021"
    }
  ]
}
```

