# GET /machines/{principalId}/engineHours

**Source:** John Deere Operations Center - Machine Engine Hours API
**Endpoint ID:** `#/machines/{principalId}/engineHours/get`

> Engine Hours

---

## Description

The engine hours service returns the last reported number of hours that a machine's engine has recorded.Each response includes a timestamp for the report and the source of the report.For each returned engine hours report, the response will include a link to the machine's information.

Please Note - This API does not support eTags.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/machines/{principalId}/engineHours
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | Default | In |
| --- | --- | --- | --- | --- |
| principalId<br>Required | string | Principal ID of the machine/equipment.<br>Example: 5432 | N/A | path |
| startDate | datetime | Start date.<br>Example: 2015-02-03T9:00:00.000Z | N/A | query |
| endDate | datetime | End date.<br>Example: 2015-02-03T10:42:24.282Z | N/A | query |
| lastKnown | boolean | If true, returned only the last known engine hour reading. startDate and endDate are ignored.<br>Example: true | false | query |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| reading | measurementAsDouble | The number of hours the engine has been running.<br>Example: <valueAsDouble>523.5166666666667</valueAsDouble> |
| reportTime | datetime | Timestamp at which the report was created.<br>Example: 2010-10-04T14:35:05.000Z |
| source1 | string | Device which collected the data.<br>Example: CI |


## Sample Response [JSON]

```
{
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/machines/4321/engineHours"
    }
  ],
  "total": 2,
  "values": [
    {
      "reading": {
        "@type": "measurementAsDouble",
        "valueAsDouble": 1.1833333,
        "links": null,
        "unit": "Hours"
      },
      "reportTime": "2010-10-04T15:06:34.000Z",
      "source": "TM",
      "links": [
        {
          "rel": "machine",
          "uri": "https://sandboxapi.deere.com/platform/machines/4321"
        }
      ]
    },
    {
      "reading": {
        "@type": "measurementAsDouble",
        "valueAsDouble": 1.1833333,
        "links": null,
        "unit": "Hours"
      },
      "reportTime": "2010-10-04T15:04:33.000Z",
      "source": "TM",
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

