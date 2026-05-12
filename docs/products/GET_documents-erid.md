# GET /documents/{erid}

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/documents/{erid}/get`

> Document details w/ pdf file

---

## Description

Document details for a product with embedded pdf file (gzip+base64).

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/documents/{erid}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| erid<br>Required | string | A unique identifier for an entity formatted as a uuid.<br>Example: cf09acfc-9196-4dbb-9b38-1be02673c5ff | path |


## Sample Response [JSON]

```
{
  "@type": "Document",
  "erid": "cff5ba0b-1768-48a3-b3ec-dd62aac1cff3",
  "productErid": "7d9ec6a6-6b8f-4312-92c7-bc022b7f5351",
  "fileName": "ld8NF004.pdf",
  "docType": "Specimen Label",
  "description": "SAL 7/27/11",
  "pdfFile": "H4sIAAAAAAAAAIy7BVhduxI2XNy1aLFNcYe9cXd3l01xd3eKuzsUd5fiBYq7u0OLe6G4f+05175z7n+/f60nzySTWZPJ5J1kW..."
}
```

