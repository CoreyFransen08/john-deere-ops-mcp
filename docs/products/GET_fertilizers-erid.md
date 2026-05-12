# GET /fertilizers/{erid}

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/fertilizers/{erid}/get`

> Single reference fertilizer

---

## Description

Single fertilizer from industry data sources, such as CDMS.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/fertilizers/{erid}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| erid<br>Required | string | A unique identifier for an entity formatted as a uuid.<br>Example: cf09acfc-9196-4dbb-9b38-1be02673c5ff | path |


## Sample Response

```
{
  "@type": "Fertilizer",
  "id": "beaa8d07-1cef-4eea-99b6-19f129e988ed",
  "referenceId": "beaa8d07-1cef-4eea-99b6-19f129e988ed",
  "name": "Round Up",
  "companyName": "Monsanto",
  "registration": "a12e9i84",
  "epaRegistration": "a12e9i84",
  "materialClassification": "LIQUID",
  "category": "FERTILIZER",
  "countryCode": "USA",
  "createdTime": "2017-03-21T21:12:53.865Z",
  "modifiedTime": "2018-04-06T15:12:52.910Z",
  "type": "MANURE",
  "restrictedUse": false,
  "sourceSystem": "3",
  "sourceSystemProductId": "905P24925"
}
```

