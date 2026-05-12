# GET /machines/{principalId}/breadcrumbs

**Source:** John Deere Operations Center - Machine Locations API
**Endpoint ID:** `#/machines/{principalId}/breadcrumbs/get`

> Machine Breadcrumbs

---

## Description

This resource allows the client to get the following details of a Machine:

Speed
Fuel Level
Direction of Machine (heading)
Machine State
Machine State Defined Type Id
Correlation Id
Location
Altitude
Origin
Created TimeStamp

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/machines/{principalId}/breadcrumbs
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| principalId<br>Required | string | principalId of Machine/Equipment.<br>Example: 7099 | path |
| orgId | string | OrganizationId<br>Example: 2551 | query |
| startDate | datetime | UTC format Start Date.If null, 'current time - 24 hours' will be treated as startDate.<br>Example: 2019-01-16T00:00:00.000Z | query |
| endDate | datetime | UTC format End Date. If null, current time will be treated as endDate.<br>Example: 2019-01-16T23:59:59.999Z | query |
| lastKnown | boolean | Default value: false. Valid values: true or false. If true, then date parameters are not used and the last known location of the machine will be sent in the response.<br>Example: true | query |
| Accept-Language | string | Accept Language. If not provided, the default Locale is US. Else, Locale will be searched on the basis of language.<br>Example: true | header |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| machineState | object | Human readable title for the machine state |
| origin | string | The origin of the breadcrumb<br>Example: BREADCRUMB<br>Allowed Values: JDLINK,BREADCRUMB |
| links | Array of object | --- |


## Sample Response [JSON]

```
{
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/machines/7099/breadcrumbs"
    }
  ],
  "total": 1,
  "values": [
    {
      "@type": "Breadcrumb",
      "createTimestamp": "2018-12-18T08:30:03.789Z",
      "speed": {
        "@type": "measurementAsDouble",
        "valueAsDouble": 35,
        "unit": "km1hr-1"
      },
      "heading": {
        "@type": "measurementAsInteger",
        "valueAsInteger": "33"
      },
      "machineState": {
        "@type": "Breadcrumb$MachineState",
        "rawState": 1
      },
      "fuelLevel": {
        "@type": "measurementAsDouble",
        "valueAsDouble": 19,
        "unit": "prcnt"
      },
      "principalId": {
        "description": "Principal/Equipment id of which the location corresponds to.",
        "type": "integer",
        "example": 123456
      },
      "origin": "BREADCRUMB",
      "correlationId": "1162b8ad-bbca-4c91-8c0e-2f2794b250a1",
      "point": {
        "@type": "Point",
        "lat": 18.513935,
        "lon": 73.927629,
        "altitude": {
          "@type": "measurementAsDouble",
          "valueAsDouble": 0,
          "unit": "m"
        }
      },
      "eventTimestamp": "2018-11-18T08:40:51.000Z",
      "links": [
        {
          "@type": "Link",
          "rel": "machine",
          "uri": "https://sandboxapi.deere.com/platform/machines/7099"
        }
      ]
    }
  ]
}
```

