# POST /organizations/{orgId}/fileTransfers

**Source:** John Deere Operations Center - Files API
**Endpoint ID:** `#/organizations/{orgId}/fileTransfers/post`

> Submit a File Transfer Request

---

## Description

This resource allows you to select a file and machine, and use the client software to submit a file transfer request. After that, MyJohnDeere API v3's infrastructure transfers the selected file to the selected machine, where it becomes available for the machine operator to use. The response links to the following resources:
file: The file for which the transfer is being requested.
machine: The machine to which the transfer is being requested.

Note there is a 800MB file size limit. Files larger than 800MB cannot be transferred using this API.

**OAuth Scope Required:** `files`

**Request URI**

```
POST https://sandboxapi.deere.com/platform/organizations/{orgId}/fileTransfers
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | Organization<br>Example: 1234 | path |


## Request Details

| Field | Type | Description & Example |
| --- | --- | --- |
| links | Array of object | --- |
| rel<br>Required | string | ---<br>Allowed Values: file,equipment |
| uri<br>Required | string | --- |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| Location | string | The URL of the created resource.<br>Example: https://sandboxapi.deere.com/platform/fileTransfers/7482 |


## Sample Request [JSON]: Example with file and equipment link

```
{
  "links": [
    {
      "rel": "file",
      "uri": "https://sandboxapi.deere.com/platform/files/{fileId}"
    },
    {
      "rel": "equipment",
      "uri": "https://equipmentapi.deere.com/isg/equipment"
    }
  ]
}
```

