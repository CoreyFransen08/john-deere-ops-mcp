# GET /fileTransfers

**Source:** John Deere Operations Center - Files API
**Endpoint ID:** `#/fileTransfers/get`

> List File Transfer Requests

---

## Description

This resource allows the client to check the status of a file transfer request that has already been submitted. The response will contain links to the following resources:
file: View the file for which the transfer was requested.
machine: View the machine to which the transfer was requested.

**OAuth Scope Required:** `files`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/fileTransfers
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| source | string | The source of the file transfer. Takes the values ORGANIZATION or MACHINE.<br>Example: ORGANIZATION | query |
| x-deere-signature | string | x-deere-signature should be managed by the client per user per API. For a new user/new API, the first request will have a blank value for x-deere-signature. Changes can be tracked with the x-deere-signature returned in the response. If the response has not changed since the last API call, the value of x-deere-signature is not changed and the client should use the same String Token next time.<br>Example: 877280ba-c8fe-49f0-a0ea-b6855cebd36f.1639958400000 | header |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| x-deere-signature | string | A new x-deere-signature response header will be included if the response has changed since last api call.<br>Example: 877280ba-c8fe-49f0-a0ea-b6855cebd36f.1639958400000 |
| file | object | Information on the transferred file, including name, type, created type, modified time, native size, source, status, and whether it was archived.<br>Example: See sample response below. |
| id | string | File Transfer ID<br>Example: 51234 |
| source | string | File source. If the request parameter value for source is MACHINE, this response value will also be MACHINE. If the request parameter value for source is ORGANIZATION, this response value will be HOST.<br>Example: HOST |
| transferInitiationTime | string | Timestamp of when the file transfer was initiated.All timestamps are formatted according to the ISO 8601 standard.<br>Example: 2018-03-20T18:52:22.155Z |
| lastUpdatedTime | string | Timestamp of when the file transfer was last updated.All timestamps are formatted according to the ISO 8601 standard.<br>Example: 2018-03-20T21:11:35.519Z |
| status1 | string | Status of the file transfer.<br>Example: WDT_IN_PROCESS |


## Sample Response [JSON]

```
{
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/fileTransfers"
    }
  ],
  "total": 2,
  "values": [
    {
      "file": {
        "name": "transferedFile1.zip",
        "type": "SETUP",
        "createdTime": "2014-01-13T12:15:51.159Z",
        "modifiedTime": "2014-01-13T12:16:09.443Z",
        "nativeSize": 927025,
        "source": "FitzwilliamDarcy",
        "status": "READY",
        "archived": false,
        "links": [
          {
            "rel": "self",
            "uri": "https://sandboxapi.deere.com/platform/files/7456"
          }
        ],
        "id": "51234"
      },
      "source": "HOST",
      "transferInitiationTime": "2014-01-13T12:16:15.924Z",
      "lastUpdatedTime": "2014-01-13T12:16:15.924Z",
      "status": "WDT_IN_PROCESS",
      "links": [
        {
          "rel": "file",
          "uri": "https://sandboxapi.deere.com/platform/files/612"
        },
        {
          "rel": "machine",
          "uri": "https://sandboxapi.deere.com/platform/machines/1523"
        },
        {
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/fileTransfers/6234"
        }
      ],
      "id": "4799048"
    },
    {
      "file": {
        "name": "transferedFile2.zip",
        "type": "SETUP",
        "createdTime": "2015-01-17T15:15:55.732Z",
        "modifiedTime": "2015-01-17T15:15:56.242Z",
        "nativeSize": 6813,
        "source": "LydiaBennett",
        "status": "READY",
        "archived": false,
        "links": [
          {
            "rel": "self",
            "uri": "https://sandboxapi.deere.com/platform/files/12345"
          }
        ],
        "id": "1219063"
      },
      "source": "HOST",
      "transferInitiationTime": "2013-01-17T15:18:41.512Z",
      "lastUpdatedTime": "2013-05-02T20:06:43.732Z",
      "status": "WDT_OPERATOR_REJECTED",
      "links": [
        {
          "rel": "file",
          "uri": "https://sandboxapi.deere.com/platform/files/615"
        },
        {
          "rel": "machine",
          "uri": "https://sandboxapi.deere.com/platform/machines/243"
        },
        {
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/fileTransfers/7354"
        }
      ],
      "id": "1219096"
    }
  ]
}
```

