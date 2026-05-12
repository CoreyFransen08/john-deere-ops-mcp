# GET /fertilizers

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/fertilizers/get`

> Reference list of all known fertilizers

---

## Description

List of all fertilizers from industry data sources, such as CDMS.

Note: Either searchString, productName, or brandName is required as a parameter in the query to get returned results. If searchString AND productName and/or brandName is added to the query, searchString will be ignored. When using searchString, results will contain items with search value from name or companyName. When using productName, value must be exact match to companyName string. When using brandName, value must be exact match to companyName string, and is case sensitive. All results will be limited to 100 values.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/fertilizers
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| searchString<br>Required | string | performs a fuzzy search on product name, manufacturer, and fertilizer type. The search string must be at least 3 characters long.<br>Example: Manure | query |
| fertilizerType | string | Specifies the registration number of the fertilizer based on the country or region/state of use.<br>Example: FERTILIZER<br>Allowed Values: FERTILIZER,MANURE | query |
| productName<br>Required | string | Specifies the name of the fertilizer in the global reference list.<br>Example: ProNatural® Calcium Plus 1-0-0 | query |
| brandName<br>Required | string | Specifies the product manufacturer name of the fertilizer based on the region being used.<br>Example: Wilbur-Ellis Company LLC | query |
| registration | string | Specifies the registration number of the fertilizer based on the region of use.<br>Example: EXEMPT | query |
| sourceSystemProductId | string | Specifies the source system product id of the fertilizer based on the country of use.<br>Example: 13328 | query |
| countryCode | string | Specifies the region the fertilizer data belongs to. Some data may not be available in certain regions and data will not be included in the response.<br>Example: USA | query |


## Sample Response

```
{
  "links": [
    {
      "@type": "Link",
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/fertilizers"
    },
    {
      "@type": "Link",
      "rel": "nextPage",
      "uri": "https://sandboxapi.deere.com/platform/fertilizers"
    }
  ],
  "total": 100,
  "values": [
    {
      "@type": "Fertilizer",
      "id": "beaa8d07-1cef-4eea-99b6-19f129e988ed",
      "referenceId": "beaa8d07-1cef-4eea-99b6-19f129e988ed",
      "name": "Round Up",
      "companyName": "Monsanto",
      "registration": "a12e9i84",
      "materialClassification": "LIQUID",
      "category": "FERTILIZER",
      "countryCode": "USA",
      "epaRegistration": "a12e9i84",
      "createdTime": "2017-03-21T21:12:53.865Z",
      "modifiedTime": "2018-04-06T15:12:52.910Z",
      "type": "MANURE",
      "restrictedUse": false,
      "sourceSystem": "3",
      "sourceSystemProductId": "905P24925"
    },
    {
      "@type": "Fertilizer",
      "id": "4dad43d3-4392-41c3-abcb-3eeed86bb3fb",
      "referenceId": "4dad43d3-4392-41c3-abcb-3eeed86bb3fb",
      "name": "Corn Mix LS",
      "companyName": "WinField United",
      "registration": "EXEMPT",
      "materialClassification": "LIQUID",
      "category": "FERTILIZER",
      "countryCode": "USA",
      "epaRegistration": "EXEMPT",
      "createdTime": "2023-11-02T22:49:10.585718Z",
      "modifiedTime": "2024-11-19T17:51:38.225Z",
      "type": "FERTILIZER",
      "restrictedUse": false,
      "sourceSystem": "3",
      "sourceSystemProductId": 13977
    }
  ]
}
```

