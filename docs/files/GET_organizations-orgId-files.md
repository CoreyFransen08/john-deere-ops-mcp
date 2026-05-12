# GET /organizations/{orgId}/files

**Source:** John Deere Operations Center - Files API
**Endpoint ID:** `#/organizations/{orgId}/files/get`

> List an Org's Files

---

## Description

View a list of an org's files. This resource allows for pagination. For each returned file, the response will link to the following resources:

owningOrganization: View the org that owns the file.
partnerships: View the partnerships through which the file is shared, if applicable.
initiateFileTransfer: Submit a transfer request for the specified file.
machinesEligibleToReceiveFile: List of WDT-capable machines that the specified file can be sent to.
sendFileToMachine: The same as "initiateFileTransfer."
wdtCapableMachines: The same as "machinesEligibleToReceiveFile."

**OAuth Scope Required:** `files,ag3`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgId}/files
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | Default | In |
| --- | --- | --- | --- | --- |
| filter | string | Takes ALL or MACHINE. ALL shows all the files in the org. MACHINE shows only the files sent from a machine to the host.<br>Example: MACHINE | ALL | query |
| startDate | datetime | Takes a timestamp (in UTC) that indicates when the file was created. Timestamp format is the ISO 8601 standard.<br>Example: 2013-01-04T14:08:51.104Z | N/A | query |
| endDate | dateTime | Takes a timestamp (in UTC) that indicates when the file was created. Timestamp format is the ISO 8601 standard<br>Example: 2015-02-03T10:42:24.282Z | N/A | query |
| fileType1 | integer | Takes a number that identifies the file type.<br>Example: 0 | N/A | query |
| archived | boolean | Allows client to filter files according to whether they have been archived. TRUE returns only archived files.<br>Example: true | false | query |
| status | string | Allows client to filter files according to whether they are transferable to machines. Takes TRANSFERABLE and NON_TRANSFERABLE.<br>Example: TRANSFERABLE | N/A | query |
| orgId<br>Required | string | Organization<br>Example: 5343535 | N/A | path |
| x-deere-signature | string | x-deere-signature should be managed by the client per user per API. For a new user/new API, the first request will have a blank value for x-deere-signature. Changes can be tracked with the x-deere-signature returned in the response. If the response has not changed since the last API call, the value of x-deere-signature is not changed and the client should use the same String Token next time.<br>Example: 520122365ebb4870a344784570d202c7 |  | header |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| x-deere-signature | string | A new x-deere-signature response header will be included if the response has changed since last api call.<br>Example: 520122365ebb4870a344784570d202c7 |
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
| format | string | Indicates the plugin type.<br>Example: IntegraVersaPlugin |
| manufacturer | string | Indicates the manufacturer.<br>Example: AgLeader |


## Sample Response [JSON]

```
{
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/files"
    }
  ],
  "total": 1,
  "values": {
    "links": [
      {
        "rel": "self",
        "uri": "https://sandboxapi.deere.com/platform/files"
      }
    ],
    "total": 1,
    "values": [
      {
        "links": [
          {
            "rel": "owningOrganization",
            "uri": "https://sandboxapi.deere.com/platform/organizations/1234"
          },
          {
            "rel": "partnerships",
            "uri": "https://sandboxapi.deere.com/platform/files/466578633/partnerships"
          },
          {
            "rel": "self",
            "uri": "https://sandboxapi.deere.com/platform/files/466578633"
          }
        ],
        "id": "577499742",
        "name": "back40.zip",
        "type": "SETUP",
        "createdTime": "2013-01-04T14:08:51.104Z",
        "modifiedTime": "2013-01-04T14:08:51.104Z",
        "nativeSize": "72946",
        "source": "JohnDoe",
        "transferPending": "false",
        "visibleViaShare": "owned",
        "shared": "false",
        "status": "UPLOAD_PENDING",
        "archived": "false",
        "assigned": "false",
        "new": "false"
      }
    ]
  }
}
```

