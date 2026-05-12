# GET /chemicals/{erid}

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/chemicals/{erid}/get`

> Get a single reference chemical

---

## Description

Single chemical from industry data sources, such as CDMS.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/chemicals/{erid}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| erid<br>Required | string | A unique identifier for an entity formatted as a uuid.<br>Example: cf09acfc-9196-4dbb-9b38-1be02673c5ff | path |


## Sample Response [JSON]

```
{
  "@type": "ReferenceChemical",
  "id": "8fb34898-64f5-5a1e-a698-34ab348220a7",
  "name": "Round Up",
  "companyName": "Monsanto",
  "registration": "a12e9i84",
  "materialClassification": "LIQUID",
  "category": "CHEMICAL",
  "countryCode": "USA",
  "type": "HERBICIDE",
  "restrictedUse": false,
  "sourceSystem": "3",
  "epaRegistration": "a12e9i84",
  "sourceSystemProductId": "905P24925",
  "createdTime": "2017-03-21T21:12:53.865Z",
  "modifiedTime": "2018-04-06T15:12:52.910Z"
}
```

