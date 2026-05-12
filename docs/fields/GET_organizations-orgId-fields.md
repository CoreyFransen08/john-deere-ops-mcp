# GET /organizations/{orgId}/fields

**Source:** John Deere Operations Center - Fields API
**Endpoint ID:** `#/organizations/{orgId}/fields/get`

> Retrieve all of the Fields for an Organization

---

## Description

Retrieve all of the Fields for an Organization

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgId}/fields
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| clientName | string | client name | query |
| farmName | string | farm name | query |
| fieldName | string | field name | query |
| embed | array | list of objects to include | query |
| recordFilter | string | Filters by resource state (whether or not the resource is archived)<br>Allowed Values: AVAILABLE,ARCHIVED,ALL | query |
| Accept-UOM-System | string | Indicates a preference for returned measurements to be in English vs Metric<br>Allowed Values: METRIC,ENGLISH | header |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| @Type | string | ---<br>Example: Field |
| name | string | ---<br>Example: --- |
| farms | object | --- |
| clients | object | --- |
| boundaries | Array of object | --- |
| accessPoints | Array of object | --- |
| guidanceLines | Array of undefined | --- |
| archived | boolean | ---<br>Example: true |
| flags | Array of object | --- |
| id | string | ---<br>Example: 9369f3f6-2428-4bba-bf64-0a19cdaf007d |
| links | Array of object | --- |


## Sample Response [JSON]

```
{
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fields"
    }
  ],
  "total": 1,
  "values": [
    {
      "@type": "Field",
      "name": "01",
      "archived": false,
      "id": "d61b83f4-3a12-431e-8010-596f2466dc27",
      "lastModifiedTime": "2020-09-21T15:41:15.205Z",
      "links": [
        {
          "@type": "Link",
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fields/d61b83f4-3a12-431e-8010-596f2466dc27"
        },
        {
          "@type": "Link",
          "rel": "clients",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fields/d61b83f4-3a12-431e-8010-596f2466dc27/clients"
        },
        {
          "@type": "Link",
          "rel": "notes",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fields/d61b83f4-3a12-431e-8010-596f2466dc27/notes"
        },
        {
          "@type": "Link",
          "rel": "farms",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fields/d61b83f4-3a12-431e-8010-596f2466dc27/farms"
        },
        {
          "@type": "Link",
          "rel": "owningOrganization",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456"
        },
        {
          "@type": "Link",
          "rel": "boundaries",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fields/d61b83f4-3a12-431e-8010-596f2466dc27/boundaries"
        },
        {
          "@type": "Link",
          "rel": "simplifiedBoundaries",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fields/d61b83f4-3a12-431e-8010-596f2466dc27/boundaries"
        },
        {
          "@type": "Link",
          "rel": "activeBoundary",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fields/d61b83f4-3a12-431e-8010-596f2466dc27 /boundaries/e7ab3a06-06ca-4d34-8cb7-6fd2a3640a3d"
        },
        {
          "@type": "Link",
          "rel": "fieldOperation",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fields/d61b83f4-3a12-431e-8010-596f2466dc27 /fieldOperations"
        },
        {
          "@type": "Link",
          "rel": "mapLayerSummaries",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fields/d61b83f4-3a12-431e-8010-596f2466dc27/mapLayerSummaries"
        },
        {
          "@type": "Link",
          "rel": "contributionDefinition",
          "uri": "https://sandboxapi.deere.com/platform/contributionDefinitions/32a256ea-0000-4756-b000-b6dabda856ef"
        }
      ]
    }
  ]
}
```

