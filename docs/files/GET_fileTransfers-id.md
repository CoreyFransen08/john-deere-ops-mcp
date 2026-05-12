# GET /fileTransfers/{id}

**Source:** John Deere Operations Center - Files API
**Endpoint ID:** `#/fileTransfers/{id}/get`

> View a File Transfer Request

---

## Description

This resource allows the client to check the status of a file transfer request that has already been submitted. The response will contain links to the following resources:
file: View the file for which the transfer was requested.
machine: View the machine to which the transfer was requested.

**OAuth Scope Required:** `files`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/fileTransfers/{id}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | Default | In |
| --- | --- | --- | --- | --- |
| source | string | The source of the file transfer. Takes the values ORGANIZATION or MACHINE.<br>Example: ORGANIZATION | N/A | query |
| id<br>Required | string | File Transfer ID<br>Example: 1628996 | N/A | path |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| file | --- | Information on the transferred file, including name, type, created type, modified time, native size, source, status, and whether it was archived.<br>Example: See sample response below. |
| id | string | File Transfer ID<br>Example: 1628996 |
| source | string | File source. If the request parameter value for source is MACHINE, this response value will also be MACHINE. If the request parameter value for source is ORGANIZATION, this response value will be HOST.<br>Example: HOST |
| transferInitiationTime | datetime | Timestamp of when the file transfer was initiated.All timestamps are formatted according to the ISO 8601 standard.<br>Example: 2015-06-09T09:43:01.381Z |
| lastUpdatedTime | datetime | Timestamp of when the file transfer was last updated.All timestamps are formatted according to the ISO 8601 standard.<br>Example: 2015-06-09T09:43:01.384Z |
| status1 | string | Status of the file transfer.<br>Example: WDT_AVAILABLE_TO_DISPLAY |


## Sample Response [JSON]

```
{
  "file": {
    "name": "transferredFile1.zip",
    "type": "SETUP",
    "createdTime": "2015-06-09T09:42:55.817Z",
    "modifiedTime": "2015-06-09T09:43:01.693Z",
    "nativeSize": 9440,
    "source": "FitzwilliamDarcy",
    "status": "READY",
    "archived": false,
    "links": [
      {
        "rel": "self",
        "uri": "https://sandboxapi.deere.com/platform/files/15234"
      }
    ],
    "id": "15234"
  },
  "source": "HOST",
  "transferInitiationTime": "2015-06-09T09:43:01.381Z",
  "lastUpdatedTime": "2015-06-09T09:43:01.384Z",
  "status": "WDT_IN_PROCESS",
  "links": [
    {
      "rel": "file",
      "uri": "https://sandboxapi.deere.com/platform/files/15234"
    },
    {
      "rel": "machine",
      "uri": "https://sandboxapi.deere.com/platform/machines/8237"
    },
    {
      "rel": "owningOrganization",
      "uri": "https://sandboxapi.deere.com/platform/organizations/1234"
    },
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/fileTransfers/61243"
    }
  ],
  "id": "571637605"
}
```

