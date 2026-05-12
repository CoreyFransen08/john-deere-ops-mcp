# GET /chemicals

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/chemicals/get`

> Reference list of all known chemicals

---

## Description

List of all chemicals from industry data sources, such as CDMS.

Note: Either searchString, productName, or brandName is required as a parameter in the query to get returned results. If searchString AND productName and/or brandName is added to the query, searchString will be ignored. When using searchString, results will contain items with search value from name or companyName. When using productName, value must be exact match to companyName string. When using brandName, value must be exact match to companyName string, and is case sensitive. All results will be limited to 100 values.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/chemicals
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| searchString<br>Required | string | performs a fuzzy search on product name, manufacturer, and chemical type. The search string must be at least 3 characters long.<br>Example: Roundup | query |
| chemicalType | string | Specifies the registration number of the chemical based on the country or region/state of use.<br>Example: INSECTICIDE<br>Allowed Values: ADDITIVE,ADJUVANT,DEFOLIANT,FUNGICIDE,GROWTH_REGULATOR,HERBICIDE,INSECTICIDE,NITROGEN_STABILIZER | query |
| productName<br>Required | string | Specifies the name of the chemical in the global reference list.<br>Example: RoundUp | query |
| brandName<br>Required | string | Specifies the product manufacturer name of the chemical based on the region being used.<br>Example: MONSANTO AGRICULTURAL CO | query |
| registration | string | Specifies the registration number of the chemical based on the region of use.<br>Example: 89167-72-89391 | query |
| sourceSystemProductId | string | Specifies the source system product id of the chemical based on the country of use.<br>Example: 905P24930 | query |
| countryCode | string | Specifies the region the chemical data belongs to. Some data may not be available in certain regions and data will not be included in the response.<br>Example: USA | query |


## Sample Response [JSON]

```
{
  "links": [
    {
      "@type": "Link",
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/chemicals"
    },
    {
      "@type": "Link",
      "rel": "nextPage",
      "uri": "https://sandboxapi.deere.com/platform/chemicals"
    }
  ],
  "total": 100,
  "values": [
    {
      "@type": "ReferenceChemical",
      "id": "8fb34898-64f5-5a1e-a698-34ab348220a7",
      "name": "Round Up",
      "companyName": "Monsanto",
      "registration": "a12e9i84",
      "materialClassification": "LIQUID",
      "category": "CHEMICAL",
      "epaRegistration": "a12e9i84",
      "referenceId": "8fb34898-64f5-5a1e-a698-34ab348220a7",
      "createdTime": "2017-03-21T21:12:53.865Z",
      "modifiedTime": "2018-04-06T15:12:52.910Z",
      "countryCode": "USA",
      "type": "HERBICIDE",
      "restrictedUse": false,
      "sourceSystem": "3",
      "sourceSystemProductId": "905P24925"
    },
    {
      "@type": "ReferenceChemical",
      "id": "bef74fe4-95bf-4e00-9833-b5b8272177c8",
      "name": "SOURCE® Corn",
      "category": "CHEMICAL",
      "type": "HERBICIDE",
      "companyName": "Sound Agriculture",
      "epaRegistration": "EXEMPT",
      "registration": "EXEMPT",
      "materialClassification": "LIQUID",
      "createdTime": "2023-09-02T01:32:21.945933Z",
      "modifiedTime": "2023-11-15T16:40:15.451Z",
      "sourceSystem": "3",
      "sourceSystemProductId": "20265",
      "countryCode": "USA",
      "referenceId": "bef74fe4-95bf-4e00-9833-b5b8272177c8",
      "referenceGuid": "bef74fe4-95bf-4e00-9833-b5b8272177c8",
      "restrictedUse": false
    },
    {
      "@type": "ReferenceChemical",
      "id": "aa1ffc6e-edcd-4112-b62d-74cdad35fa03",
      "name": "Roundup Ultra®",
      "category": "CHEMICAL",
      "type": "HERBICIDE",
      "companyName": "BAYER CROPSCIENCE",
      "epaRegistration": "524-475",
      "registration": "524-475",
      "materialClassification": "LIQUID",
      "createdTime": "2023-09-02T01:22:00.669119Z",
      "modifiedTime": "2024-11-19T15:20:10.752Z",
      "sourceSystem": "3",
      "sourceSystemProductId": "856",
      "countryCode": "USA",
      "referenceId": "aa1ffc6e-edcd-4112-b62d-74cdad35fa03",
      "referenceGuid": "aa1ffc6e-edcd-4112-b62d-74cdad35fa03",
      "restrictedUse": false
    }
  ]
}
```

