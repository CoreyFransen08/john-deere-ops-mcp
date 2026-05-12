# GET /varieties

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/varieties/get`

> Search reference catalog varieties

---

## Description

This endpoint searches the reference catalog for varieties that match the given search criteria. This data can be used in a subsequent request to create a variety in an organization. Results are limited to 100 items.

Note: Either searchString, productName, or brandName is required as a parameter in the query to get returned results. If searchString AND productName and/or brandName is added to the query, searchString will be ignored. When using searchString, results will contain items with search value from name or companyName. When using productName, value must be exact match to companyName string. When using brandName, value must be exact match to companyName string, and is case sensitive. All results will be limited to 100 values.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/varieties
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| searchString<br>Required | string | Performs a fuzzy search on variety and manufacturer name. The search string must be at least 3 characters long.<br>Example: venture | query |
| cropName | string | Filters the results by crop id (see the /cropTypes API).<br>Example: SOYBEANS | query |
| productName<br>Required | string | Specifies the name of the variety from the global reference list.<br>Example: SH 5614 LL/STS | query |
| brandName<br>Required | string | Specifies the product manufacturer name of the variety based on the region being used.<br>Example: Southern Harvest | query |
| sourceSystemProductId | string | Specifies the source system product id of the variety based on the country of use.<br>Example: 79186 | query |
| countryCode | string | Specifies the region the variety data belongs to. Some data may not be available in certain regions and data will not be included in the response.<br>Example: USA | query |


## Sample Response

```
{
  "links": [
    {
      "@type": "Link",
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/varieties"
    },
    {
      "@type": "Link",
      "rel": "nextPage",
      "uri": "https://sandboxapi.deere.com/platform/varieties"
    }
  ],
  "total": 100,
  "values": [
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
    },
    {
      "@type": "ReferenceVariety",
      "id": "75138754-6381-49c7-be9e-9e08a847075a",
      "referenceId": "75138754-6381-49c7-be9e-9e08a847075a",
      "category": "VARIETY",
      "name": "Cornelius 155A",
      "companyName": "Cornelius Seed",
      "cropName": "ALFALFA",
      "countryCode": "USA",
      "sourceSystem": "3",
      "sourceSystemProductId": 105332,
      "createdTime": "2023-09-02T05:10:33.415Z",
      "modifiedTime": "2024-11-20T02:04:39.994Z"
    }
  ]
}
```

