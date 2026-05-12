# GET /organizations/{orgId}/fileTransfers

**Source:** John Deere Operations Center - Files API
**Endpoint ID:** `#/organizations/{orgId}/fileTransfers/get`

> Get File Transfer List by Organization

---

## Description

This resource will retrieve list of all File Transfer by an Organization. The response will contain links to the following resources:
file: View the file for which the transfer was requested.
machine: View the machine to which the transfer was requested.

Please Note: This API does not support eTags.

**OAuth Scope Required:** `files`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgId}/fileTransfers
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | Default | In |
| --- | --- | --- | --- | --- |
| orgId<br>Required | string | Organization<br>Example: 1234 | N/A | path |
| source | string | The source of the file transfer. Takes the values ORGANIZATION or MACHINE.<br>Example: ORGANIZATION | N/A | query |


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
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/1234/fileTransfers"
    }
  ],
  "total": 2,
  "values": [
    {
      "@type": "FileTransfer",
      "file": {
        "@type": "File",
        "name": "1H0S670SAE0765947_032020180053.zip",
        "type": "SETUP",
        "createdTime": "2018-03-20T05:53:47.476Z",
        "modifiedTime": "2018-03-20T21:10:41.325Z",
        "nativeSize": 80480,
        "source": "1H0S670SAE0765947",
        "status": "READY",
        "archived": false,
        "id": "73391610",
        "links": [
          {
            "@type": "Link",
            "rel": "self",
            "uri": "https://sandboxapi.deere.com/platform/files/73391611"
          }
        ]
      },
      "source": "HOST",
      "transferInitiationTime": "2018-03-20T18:52:22.155Z",
      "lastUpdatedTime": "2018-03-20T21:11:35.519Z",
      "status": "WDT_AVAILABLE_TO_DISPLAY",
      "id": "73416642",
      "links": [
        {
          "@type": "Link",
          "rel": "file",
          "uri": "https://sandboxapi.deere.com/platform/files/73391611"
        },
        {
          "@type": "Link",
          "rel": "machine",
          "uri": "https://sandboxapi.deere.com/platform/machines/8257"
        },
        {
          "@type": "Link",
          "rel": "owningOrganization",
          "uri": "https://sandboxapi.deere.com/platform/organizations/2551"
        },
        {
          "@type": "Link",
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/fileTransfers/73416642"
        }
      ]
    },
    {
      "@type": "FileTransfer",
      "file": {
        "@type": "File",
        "name": "1H0S670SAE0765947_032020180053.zip",
        "type": "SETUP",
        "createdTime": "2018-03-20T05:53:47.476Z",
        "modifiedTime": "2018-03-20T21:10:41.325Z",
        "nativeSize": 80480,
        "source": "1H0S670SAE0765947",
        "status": "READY",
        "archived": false,
        "id": "73391610",
        "links": [
          {
            "@type": "Link",
            "rel": "self",
            "uri": "https://sandboxapi.deere.com/platform/files/73391610"
          }
        ]
      },
      "source": "HOST",
      "transferInitiationTime": "2018-03-20T18:52:22.071Z",
      "lastUpdatedTime": "2018-03-20T21:11:34.379Z",
      "status": "WDT_AVAILABLE_TO_DISPLAY",
      "id": "73416640",
      "links": [
        {
          "@type": "Link",
          "rel": "file",
          "uri": "https://sandboxapi.deere.com/platform/files/73391611"
        },
        {
          "@type": "Link",
          "rel": "machine",
          "uri": "https://sandboxapi.deere.com/platform/machines/8257"
        },
        {
          "@type": "Link",
          "rel": "owningOrganization",
          "uri": "https://sandboxapi.deere.com/platform/organizations/2551"
        },
        {
          "@type": "Link",
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/fileTransfers/73416640"
        }
      ]
    }
  ]
}
```

