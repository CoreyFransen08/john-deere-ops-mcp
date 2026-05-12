# POST /organizations/{orgId}/files

**Source:** John Deere Operations Center - Files API
**Endpoint ID:** `#/organizations/{orgId}/files/post`

> Create A File ID

---

## Description

The POST call below shows the creation of file id "55" in organization "73" in Operation Center. The response "location" header will return the new file ID in the link returned. The client software will then use the new file ID, to upload the file.

**OAuth Scope Required:** `files,ag3`

**Request URI**

```
POST https://sandboxapi.deere.com/platform/organizations/{orgId}/files
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | Organization<br>Example: 73 | path |
| name<br>Required | string | File name.<br>Example: back40Seeding.zip | body |
| delayProcessing | boolean | Set to false to force the file to be processed if it would otherwise delay processing. Can only be used with a copyFrom link.<br>Example: false | body |
| links | Array of Links | Currently only supports a copyFrom rel, which can be passed to copy another file into the destination organization.<br>Example: [{"rel": "copyFrom", "uri": "/files/12345"}] | body |


## Status Codes

| Code | Message | Description |
| --- | --- | --- |
| 201 | Created | The file was successfully created. |
| 400 | Must be between 5 and 69 characters<br>Should not contain invalid characters. | File names must be between 5 and 69 characters and may only contain international alphanumeric characters, spaces, and any of the following: ".,-_". Specifically, it must match the following Unicode regular expression: ^[\p{N}\p{L}.,_ \-]+$ |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| total | integer | ---<br>Example: 1 |


## Sample Request [JSON]

```
{
  "name": "back40Seeding.zip"
}
```

## Sample Response

```
HTTP/1.1: 201 Created

Date: Wed, 31 Aug 2016 16:18:22 GMT
Content-Encoding: gzip
X-Deere-Handling-Server: ldxx90tc5
X-Frame-Options: SAMEORIGIN
X-Deere-Elapsed-Ms: 257
Vary: Accept-Encoding
Content-Type: text/plain
Location: https://sandboxapi.deere.com/platform/files/55
Cache-Control: max-age=0, no-cache
Connection: keep-alive
Content-Length: 20
Expires: Wed, 31 Aug 2016 16:18:22 GMT
```

