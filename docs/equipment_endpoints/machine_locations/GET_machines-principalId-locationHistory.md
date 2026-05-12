# GET /machines/{principalId}/locationHistory

**Source:** John Deere Operations Center - Machine Locations API
**Endpoint ID:** `#/machines/{principalId}/locationHistory/get`

> Machine Location History

---

## Description

The machine location service allows the client to view a list of location reports for a machine.A location report will include the machine's longitude, latitude, and altitude.For each location report, the response will link to the /machines resource.

Please Note: This API does not support eTags.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/machines/{principalId}/locationHistory
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | Default | In |
| --- | --- | --- | --- | --- |
| principalId<br>Required | string | Principal Id of Machine/Equipment.<br>Example: 5432 | N/A | path |
| lastKnown | boolean | Includes the last known machine location.<br>Example: false | N/A | query |
| startDate | datetime | Retrieves results that occurred after a specified date.If start date is not passedin the API request then start Date is considered as end date minus 1 day. The format is in the ISO 8601 Standard.<br>Example: 2010-10-04T14:35:05.000Z | N/A | query |
| endDate | datetime | Retrieves results that occurred before a specified date. If end date is not passed in the API requestthen end Date is considered as start date plus 1 day. The format is in the ISO 8601 Standard.Also startDate and endDate time interval range should be <=1 month.Example if startDate=2020-10-01T00:00:00.000Z endDate should be <=2010-10-31T23:59:59.000Z<br>Example: 2010-10-04T14:38:35.000Z | N/A | query |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| point | N/A | Contains the <lat>, <lon>, and <altitude> tags.<br>Example: N/A |
| lat | double | The latitude of the machine's location.<br>Example: 41.688612 |
| lon | double | The longitude of the machine's location.<br>Example: -93.693612 |
| altitude | measurement AsDouble | The altitude of the machine's location. The value and unit of measurement are both included.<br>Example: See sample response below. |
| eventTimestamp | datetime | Timestamp of the machine location report. All timestamps follow the ISO 8601 standard format.<br>Example: 2012-11-07T18:42:07.186Z |
| gpsFixTimestamp | datetime | The last time the machine noted its GPS location.<br>Example: 2010-10-04T15:06:24.000Z |


## Sample Response [JSON]

```
{
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/machines/4321/locationHistory"
    }
  ],
  "total": 2,
  "values": [
    {
      "point": {
        "lat": 41.597164,
        "lon": -90.54383,
        "altitude": {
          "@type": "measurementAsDouble",
          "valueAsDouble": 0,
          "links": null,
          "unit": "meters"
        },
        "links": null
      },
      "eventTimestamp": "2010-10-20T22:32:16.000Z",
      "gpsFixTimestamp": "1970-01-01T00:00:00.000Z",
      "links": [
        {
          "rel": "machine",
          "uri": "https://sandboxapi.deere.com/platform/machines/4321"
        }
      ]
    },
    {
      "point": {
        "lat": 41.597305,
        "lon": -90.543884,
        "altitude": {
          "@type": "measurementAsDouble",
          "valueAsDouble": 0,
          "links": null,
          "unit": "meters"
        },
        "links": null
      },
      "eventTimestamp": "2010-10-04T15:06:34.000Z",
      "gpsFixTimestamp": "2010-10-04T15:06:24.000Z",
      "links": [
        {
          "rel": "machine",
          "uri": "https://sandboxapi.deere.com/platform/machines/4321"
        }
      ]
    }
  ]
}
```

