# GET /machines/{principalId}/hoursOfOperation

**Source:** John Deere Operations Center - Machine Hours of Operation API
**Endpoint ID:** `#/machines/{principalId}/hoursOfOperation/get`

> Hours of Operation

---

## Description

The Hours of Operation service allows the user to view the durations for which the engine was on or off during a specified time period. You will also be able to view the last known state of the machine's engine. Each request returns a link to machine, which will return a state report for the specified machine.
Note: When the terminal is powered off, hours of operation are not recorded.

Please Note: This API does not support eTags.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/machines/{principalId}/hoursOfOperation
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | Default | In |
| --- | --- | --- | --- | --- |
| principalId<br>Required | string | PrincipalId of Machine/Equipment.<br>Example: 5432 | N/A | path |
| organizationId | string | Organization Id of the Machine/Equipment.<br>Example: 98765 | N/A | query |
| startDate | datetime | Filters hours of operation starting from a specified date. Request date as UTC Timestamp.<br>Example: 2013-04-29T00:00:00Z | N/A | query |
| endDate | datetime | Filters hours of operation before a specified date. Request date as UTC Timestamp.<br>Example: 2013-04-30T23:30:00Z | N/A | query |
| detailedState | string | Current Supported DetailedStates (Send one at a time) - RearPTOEngagement, GenericMachineUtilization, GenericEngineUtilization, RoadbuildingMachineState, AutonomyMachineState and FrontWheelDriveActuatorState<br>Example: FrontWheelDriveActuatorState |  | query |
| summarizeDuration | string | Only EngagedStates of RearPTOEngagement and FWDActuatorState are returned after merging, if the duration between 2 consecutive EngagedStates is less than provided value.<br>Example: 5 |  | query |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| startDate | datetime | Time at which the machine started. Returns a UTC Timestamp.<br>Example: 2013-04-29T00:00:00Z |
| endDate | datetime | Time at which the machine stopped. Returns a UTC Timestamp.<br>Example: 2013-04-30T23:30:00Z |
| engineState | integer | The returned value indicates the current state of the engine1<br>Example: 1 |
| detailedState | string | The returned value indicates the user queried definedType value.<br>Example: PTO Status On |


## Sample Response [JSON]

```
{
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/machines/5432/hoursOfOperation"
    }
  ],
  "total": 2,
  "values": [
    {
      "links": [
        {
          "rel": "machine",
          "uri": "https://sandboxapi.deere.com/platform/machines/5432"
        }
      ],
      "startDate": "2013-04-29T00:00:00Z",
      "endDate": "2013-04-30T00:00:00Z",
      "engineState": 0,
      "detailedState": "PTO Status On"
    },
    {
      "links": [
        {
          "rel": "machine",
          "uri": "https://sandboxapi.deere.com/platform/machines/5432"
        }
      ],
      "startDate": "2013-04-29T00:00:00Z",
      "endDate": "2013-04-30T00:00:00Z",
      "engineState": 0,
      "detailedState": "PTO Status On"
    }
  ]
}
```

