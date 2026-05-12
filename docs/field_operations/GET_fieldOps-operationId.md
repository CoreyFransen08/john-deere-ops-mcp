# GET /fieldOps/{operationId}

**Source:** John Deere Operations Center - Field Operations API
**Endpoint ID:** `#/fieldOps/{operationId}/get`

> Asynchronous Shapefile Download

---

## Description

An ESRI Shapefile is available for each Field Operation. Please see the shapefiles overview for details on the shapefile format and how to consume it.

The expected response codes are:

202 Accepted – The request was received and is being processed. Call back later to check for completion.
This API does not currently support webhooks. To check for completion, repeat the same API call until you get an HTTP 307.
Processing may take up to 30 minutes, depending on the size of data. Applications should poll the API using a backoff loop. Polling intervals should start at 5 seconds and double with each attempt: secondsToWait = 5 * 2 ^ (numberOfAttempts - 1)
307 Temporary Redirect – The shapefile is ready to download. This response contains a location header. The location is a pre-signed URL that is valid for no less than one hour. To download the file, perform a GET request to the URL in the location header. Do not apply OAuth signing or other authorization to this request - it will cause the call to fail.
406 Not Acceptable - A shapefile cannot be generated.
Note the initial call for a shapefile may receive either a 202 or a 307 response, depending upon whether an up-to-date file already exists for the specified field operation.

For a sample integration, see our Java sample code.

**OAuth Scope Required:** `ag2`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/fieldOps/{operationId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| operationId<br>Required | string | Operation ID<br>Example: MTIzNF81NjFiZGY1 | path |
| splitShapeFile | boolean | If true, this will download the shapefile in small 20MB pieces<br>Example: false | query |
| shapeType | string | Choose between point-based and polygon-based shapefiles. Accepted values are "Point" and "Polygon".<br>Example: Polygon<br>Allowed Values: Point,Polygon | query |
| resolution | string | Choose a data resolution for the shapefile. Accepted values are "EachSection", "EachSensor", and "OneHertz".<br>Example: EachSensor<br>Allowed Values: EachSection,EachSensor,OneHertz | query |
| Accept-UOM-System | string | Unit of measure system to use for numeric values in the shapefiles. Accepted values are "METRIC", "ENGLISH", and "MIXED".If this header is not specified, the unit system will be determined by the organization preference of the owning organization.For all unit systems, the units are consistent with ADAPT's unit system.<br>Example: METRIC | header |
| Accept-Yield-Preference | string | Desired yield representation (unit) type. Accepted values are VOLUME or MASS.<br>Example: VOLUME | header |


