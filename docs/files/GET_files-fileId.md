# GET /files/{fileId}

**Source:** John Deere Operations Center - Files API
**Endpoint ID:** `#/files/{fileId}/get`

> View/Download A File

---

## Description

This resource allows the client to view or download a file.

Note: Only files smaller than 50 MB can be downloaded at once. Larger files will need to be downloaded in chunks. To download in chunks, you can use the Range request header, or the offset and size request parameters. If both are used, the request header will take precedence.

To view a file's metadata, choose the application/vnd.deere.axiom.v3+json Accept Header. To download the file to the client software, choose a /zip or octet-stream Accept Header. The following example will show a GET call to view a files metadata. The response will contain links to the following resources:

owningOrganization: View the org that owns the file.
partnerships: View a list of the partnerships through which the file is shared, if applicable.
initiateFileTransfer: Request to send this file to a specified machine.
wdtCapableMachines: View a list of machines in the org which can receive this file.

Request Header

To download the file in chunks of bytes, you can use the range header with the following form: Range:bytes=startIndex-endIndex

Sample Header: Range:bytes=0-1000

**OAuth Scope Required:** `files,ag3`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/files/{fileId}
```

**Accept:** ``

## Parameters

| Parameter | Type | Description & Example | Default | In |
| --- | --- | --- | --- | --- |
| offset<br>Required | integer | Allows client to download file in chunks. -1 will download entire file. For smaller pieces, enter offset point (in bytes) in this parameter.<br>Example: -1 | N/A |  |
| size<br>Required | integer | Allows client to download file in chunks. -1 will download entire file. For smaller pieces, enter size (in bytes) in this parameter.<br>Example: -1 | N/A |  |
| fileId<br>Required | string | File Id.<br>Example: 577499742 | N/A | path |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| id | string | The id of the file.<br>Example: 577499742 |
| name | string | The name of the file.<br>Example: back40.zip |
| type1 | string | The type of the file.<br>Example: SETUP |
| createdTime2 | datetime | Time at which the file was created.<br>Example: 2015-02-03T10:42:24.282Z |
| modifiedTime2 | datetime | Time at which the file was last modified.<br>Example: 2015-02-03T10:42:24.282Z |
| nativeSize | integer | Size of the file.<br>Example: 72946 |
| source | string | Account with which the file was created.<br>Example: JohnDoe |
| transferPending | boolean | Indicates whether the file is currently in a pending transfer to a machine.<br>Example: false |
| visibleViaShare | string | Indicates whether you own the file, or it was shared with you. The value will be either "owned" or "manual".<br>Example: owned |
| shared | boolean | Indicates whether the file is shared with another org.<br>Example: false |
| status | string | Indicates whether the file can be transferred to a machine. Possible values are: Upload Pending, Ready, and In Progress.<br>Example: UPLOAD_PENDING |
| archived | boolean | Indicates whether the file has been archived.<br>Example: false |
| newDEPRECATED | boolean | Indicates whether the file is new.<br>Example: false |


## Sample Response [JSON]

```
{
  "id": "577499742",
  "name": "back40.zip",
  "type": "SETUP",
  "createdTime": "2015-02-03T10:42:24.282Z",
  "modifiedTime": "2015-02-03T10:42:24.282Z",
  "nativeSize": "72946",
  "source": "JohnDoe",
  "transferPending": "false",
  "visibleViaShare": "owned",
  "shared": "false",
  "status": "UPLOAD_PENDING",
  "archived": "false",
  "assigned": "false",
  "new": "false",
  "links": [
    {
      "rel": "owningOrganization",
      "uri": "https://sandboxapi.deere.com/platform/organizations/2101"
    },
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/files/466578633"
    }
  ]
}
```

