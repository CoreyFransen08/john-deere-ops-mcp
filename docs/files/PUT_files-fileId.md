# PUT /files/{fileId}

**Source:** John Deere Operations Center - Files API
**Endpoint ID:** `#/files/{fileId}/put`

> Upload/Update A File

---

## Description

This resource allows the client to upload or update a file. The client must create a file ID before uploading a file.

Note: In your sample request for uploading a file, the content-type can be any of the following:
application/octet-stream
application/zip
application/x-zip
application/x-zip-compressed
multipart/form-data
multipart/mixed

**OAuth Scope Required:** `files,ag3`

**Request URI**

```
PUT https://sandboxapi.deere.com/platform/files/{fileId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Status Codes

| Code | Message | Description |
| --- | --- | --- |
| 204 | No Content | The file was updated. |
| 400 | Must be between 1 and 45 characters<br>Should not contain invalid characters. | File names must be between 1 and 45 characters and may only contain international alphanumeric characters, spaces, and any of the following: ".,-_". Specifically, it must match the following Unicode regular expression: ^[\p{N}\p{L}.,_ \-]+$ |


## Request Details

| Field | Type | Description & Example |
| --- | --- | --- |
| name | string | ---<br>Example: RW8360R907628_12062012.zip |
| archived | boolean | Indicates whether the file has been archived.<br>Example: false |
| delayProcessing | boolean | If set to true, then processing of the file will be delayed until this is toggled to false.<br>Example: false |
| contextMetadata | object | Contextual metadata for the file, such as frequency, report type, machines, and fields<br>Example: [object Object] |
| customMetadata | object | Additional custom metadata for the file<br>Example: [object Object] |


## Response Details: application/vnd.deere.axiom.v3+json

| Field | Type | Description & Example |
| --- | --- | --- |
| total | integer | ---<br>Example: 1 |


## Sample Request [JSON]: Upload a file

```
PUT: https://sandboxapi.deere.com/platform/files/fileID

Accept: application/vnd.deere.axiom.v3+json
Authorization: OAuth realm="",oauth_timestamp="1406138640", oauth_nonce="I2sX0Z", oauth_consumer_key="com.deere.example", oauth_token="a5633e06-bd09-43a5-942a-2e1255681ca9", oauth_version="1.0", oauth_signature_method="HMAC-SHA1", oauth_signature="CX7E9KJra9ok5WpIejjFpafh8lE%3D"
Content-Type: application/octet-stream
```

## Sample Request [JSON]: Update a file

```
{
  "id": "fileID",
  "archived": true,
  "delayProcessing": false
}
```

## Sample Response

```
204 No Content

Pragma: no-cache
Date: Wed, 23 Jul 2014 18:04:00 GMT
Server: Apache-Coyote/1.1
X-Deere-Handling-Server: ldxtc1
X-Deere-Elapsed-Ms: 645
Transfer-Encoding: chunked
Content-Language: en-US
Content-Type: application/vnd.deere.axiom.v3+json;charset=UTF-8
Cache-Control: no-cache, no-store, max-age=0
Connection: Keep-Alive
Keep-Alive: timeout=5, max=100
Expires: Thu, 01 Jan 1970 00:00:00 GMT
```

