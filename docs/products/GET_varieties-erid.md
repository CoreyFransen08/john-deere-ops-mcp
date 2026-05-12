# GET /varieties/{erid}

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/varieties/{erid}/get`

> Get a single reference variety.

---

## Description

Single variety from industry data sources, such as CDMS.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/varieties/{erid}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| erid<br>Required | string | A unique identifier for an entity formatted as a uuid.<br>Example: cf09acfc-9196-4dbb-9b38-1be02673c5ff | path |


## Sample Response

```
{
  "@type": "ReferenceVariety",
  "id": "1f8c12b4-126f-11ec-82a8-0242ac130003",
  "referenceId": "1f8c12b4-126f-11ec-82a8-0242ac130003",
  "category": "VARIETY",
  "name": "S73-Z5 - 50lb bag",
  "companyName": "NK",
  "cropName": "SOYBEANS",
  "countryCode": "USA",
  "sourceSystem": "3",
  "sourceSystemProductId": "905P24925",
  "createdTime": "2017-03-21T21:12:53.865Z",
  "modifiedTime": "2018-04-06T15:12:52.910Z"
}
```

