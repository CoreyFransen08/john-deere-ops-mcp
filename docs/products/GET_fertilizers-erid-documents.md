# GET /fertilizers/{erid}/documents

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/fertilizers/{erid}/documents/get`

> Reference list of documents for an associated fertilizer

---

## Description

List of all the documents for a fertilizer from industry data sources, such as CDMS.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/fertilizers/{erid}/documents
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| erid<br>Required | string | A unique identifier for an entity formatted as a uuid.<br>Example: cf09acfc-9196-4dbb-9b38-1be02673c5ff | path |


## Sample Response

```
{
  "links": [
    {
      "@type": "Link",
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/varieties/579f069a-3a0d-431d-a326-4fdbab12146c/documents"
    },
    {
      "@type": "Link",
      "rel": "nextPage",
      "uri": "https://sandboxapi.deere.com/platform/varieties/579f069a-3a0d-431d-a326-4fdbab12146c/documents"
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
      "erid": "5c2dd6b0-3f66-437c-910b-634c9e83e205",
      "productErid": "4dad43d3-4392-41c3-abcb-3eeed86bb3fb",
      "fileName": "mpCO7001.pdf",
      "docType": "SDS",
      "description": "April 6, 2020"
    }
  ]
}
```

