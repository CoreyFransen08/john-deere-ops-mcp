# GET /organizations/{orgId}/fields/{fieldId}/fieldOperations

**Source:** John Deere Operations Center - Field Operations API
**Endpoint ID:** `#/organizations/{orgId}/fields/{fieldId}/fieldOperations/get`

> List Field Operations

---

## Description

This resource returns logical data structures representing the agronomic operations performed in a field. Supported field operation types include Seeding, Application, and Harvest. A single field operation may potentially span consecutive days depending on the type of operation. Each field operation may have one or more measurements, listed as links from the field operation itself. Each field operation will include links to:

organization: The organization which owns this data.
field: The field in which this operation was performed.
self: The field operation.

**OAuth Scope Required:** `ag2`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgId}/fields/{fieldId}/fieldOperations
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | Owning Organization ID<br>Example: 12345 | path |
| fieldId<br>Required | GUID | Field ID<br>Example: d01111d6-1fa4-4659-943a-3df4a6b7933c | path |
| cropSeason | integer | Retrieve operations for a specific crop season (year).<br>Example: 2016 | query |
| fieldOperationType | string | Filter results by field operation type. Takes the values "APPLICATION", "HARVEST", "SEEDING", and "TILLAGE".<br>Example: HARVEST | query |
| startDate | string | Specify the starting date of the seven-day period in ISO-8601 format. Query Filter is inclusive.<br>Example: 2018-04-25T15:18:15.205Z | query |
| endDate | string | Specify the ending date of the seven-day period in ISO-8601 format. Query Filter is inclusive.<br>Example: 2018-04-26T15:18:15.205Z | query |
| embed | array | List available operation measurement types and totals.<br>Allowed Values: measurementTypes | query |
| workPlanIds | List Of GUID | Query by one or more workPlanIds(comma separated)<br>Example: ["d6166574-4ede-404e-8a68-85d4284b869d"] | query |
| x-deere-signature | string | x-deere-signature should be managed by the client per user per API. For a new user/new API, the first request will have a blank value for x-deere-signature. Changes can be tracked with the x-deere-signature returned in the response. If the response has not changed since the last API call, the value of x-deere-signature is not changed and the client should use the same String Token next time.<br>Example: 520122365ebb4870a344784570d202c7 | header |


## Headers

| Key | Type | Description & Example | In / Defaults |
| --- | --- | --- | --- |
| Accept-UOM-System | string | Unit of measure system to use for numeric values in the shapefiles. Accepted values are "METRIC", "ENGLISH", and "MIXED".If this header is not specified, the unit system will be determined by the organization preference of the owning organization.For all unit systems, the units are consistent with ADAPT's unit system.<br>Example: METRIC | header |
| Accept-Yield-Preference | string | Desired yield representation (unit) type. Accepted values are VOLUME or MASS.<br>Example: VOLUME | header |
| Round-Measurements | boolean | Set to true for standard Deere rounded measurements. Set to false for not rounded measurements. | header |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| id | string | Field Operation ID<br>Example: MjkyMDdfNT |
| x-deere-signature | string | A new x-deere-signature response header will be included if the response has changed since last api call.<br>Example: 520122365ebb4870a344784570d202c7 |
| fieldOperationType1 | string | Field Operation type.<br>Example: application |
| cropSeason | string | Crop season year.<br>Example: 2015 |
| adaptMachineType | string | The type of machine that generated the field operation. This may be "unknown".<br>Example: unknown |
| startDate | datetime | Starting date and time of this field operation..<br>Example: 2015-05-29T22:00:19.200Z |
| endDate | datetime | Ending date and time of this field operation.<br>Example: 2015-05-29T22:23:53.746Z |
| modifiedTime | datetime | Last time that anything was modified on this field operation.<br>Example: 2016-04-29T22:12:53.446Z |
| cropName | string | Crop Name.<br>Example: CORN_WET |
| varieties | array | List of seed varieties. Only available on harvest and seeding operation types. May contain guid, productType, name, brand, agencyRegistrationNumber, and tankMix<br>Example: [ { "@type": "Product", "productType": "SEED", "name": "aa1", "tankMix": false } ] |
| products | --- | Details of the product applied during this field operation. Includes name, tankmix, rate, carrier, and components data.<br>Example: See sample response below. |
| name | string | Name of the tank mix<br>Example: Tank Mix Use 1 |
| tankMix | boolean | Boolean flag as to whether the application operation was for a tank mix or not.<br>Example: true |
| rate | --- | Rate of the application. Includes value and unitId2 data.<br>Example: See sample response below. |
| value | number | Numeric value.<br>Example: 10 |
| unitId2 | string | Unit of value.<br>Example: gal1ac-1 |
| carrier | --- | Data on the product carrier. Includes name and rate.<br>Example: See sample response below. |
| components | --- | Data on the product component. Includes name and rate.<br>Example: See sample response below. |
| fieldOperationMachines | object | Machines utilized during this operation |


## Sample Response [JSON]

```
{
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fields/d61b83f4-3a12-431e-8010-596f2466dc27/fieldOperations"
    }
  ],
  "total": 2,
  "values": [
    {
      "@type": "FieldOperation",
      "fieldOperationType": "Tillage",
      "adaptMachineType": "unknown",
      "cropSeason": "2012",
      "modifiedTime": "2018-05-16T15:04:24.787Z",
      "startDate": "2012-04-03T14:12:13.000Z",
      "endDate": "2012-04-06T15:53:37.408Z",
      "fieldOperationMachines": [
        {
          "@type": "FieldOperationMachine",
          "erid": "t48a7dd0-as35-44e1-81b4-435d494f7cd5",
          "machineId": 637795,
          "operators": [
            {
              "@type": "Operator",
              "operatorId": "OPERATOR_ID",
              "license": "OPERATOR_LICENSE",
              "name": "OPERATOR_NAME"
            }
          ],
          "vin": "WXYEJKB73894JE3"
        }
      ],
      "id": "MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkMw",
      "links": [
        {
          "@type": "Link",
          "rel": "organization",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456"
        },
        {
          "@type": "Link",
          "rel": "field",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fields/d61b83f4-3a12-431e-8010-596f2466dc27"
        },
        {
          "@type": "Link",
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkMw"
        },
        {
          "@type": "Link",
          "rel": "measurementTypes",
          "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkMw/measurementTypes"
        },
        {
          "@type": "Link",
          "rel": "client",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456/clients/46234f43-0000-1000-4014-e1e1e11124e0"
        },
        {
          "@type": "Link",
          "rel": "farm",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456/farms/4641d448-0000-1000-4033-e1e1e11124e0"
        },
        {
          "@type": "Link",
          "rel": "workPlans",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456/workPlans/2fac815e-5696-4ff6-86a0-39093b7dbf7e"
        }
      ]
    },
    {
      "@type": "FieldOperation",
      "fieldOperationType": "application",
      "adaptMachineType": "unknown",
      "cropSeason": "2013",
      "modifiedTime": "2014-03-16T15:04:24.797Z",
      "startDate": "2013-07-03T16:36:08.000Z",
      "endDate": "2013-07-03T16:47:23.013Z",
      "products": {
        "@type": "Product",
        "name": "Tank Mix",
        "tankMix": true,
        "rate": {
          "@type": "EventMeasurement",
          "value": 12.5,
          "unitId": "gal1ac-1"
        },
        "carrier": {
          "@type": "Component",
          "name": "Water",
          "rate": {
            "@type": "EventMeasurement",
            "value": 12.5,
            "unitId": "gal1ac-1"
          }
        },
        "components": [
          {
            "@type": "Component",
            "name": "Touchdown Total",
            "rate": {
              "@type": "EventMeasurement",
              "value": 48,
              "unitId": "floz1ac-1"
            }
          },
          {
            "@type": "Component",
            "name": "FS MaxSupreme",
            "rate": {
              "@type": "EventMeasurement",
              "value": 32,
              "unitId": "floz1ac-1"
            }
          }
        ]
      },
      "id": "MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkNg",
      "links": [
        {
          "@type": "Link",
          "rel": "organization",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456"
        },
        {
          "@type": "Link",
          "rel": "field",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456/fields/d61b83f4-3a12-431e-8010-596f2466dc27"
        },
        {
          "@type": "Link",
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkNg"
        },
        {
          "@type": "Link",
          "rel": "measurementTypes",
          "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkNg/measurementTypes"
        },
        {
          "@type": "Link",
          "rel": "client",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456/clients/46234f43-0000-1000-4014-e1e1e11124e0"
        },
        {
          "@type": "Link",
          "rel": "farm",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456/farms/4641d448-0000-1000-4033-e1e1e11124e0"
        },
        {
          "@type": "Link",
          "rel": "shapeFile",
          "uri": "https://sandboxapi.deere.com/platform/fieldOperations/MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkNg"
        },
        {
          "@type": "Link",
          "rel": "shapeFileAsync",
          "uri": "https://sandboxapi.deere.com/platform/fieldOps/MjIzMDMxXzU4NDFkMDM2YTA2ZDkwMDk3MGYyNDJkNg"
        },
        {
          "@type": "Link",
          "rel": "workPlans",
          "uri": "https://sandboxapi.deere.com/platform/organizations/123456/workPlans/2fac815e-5696-4ff6-86a0-39093b7dbf7e"
        }
      ]
    }
  ]
}
```

