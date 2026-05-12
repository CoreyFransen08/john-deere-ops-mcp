# GET /organizations/{orgId}/flags/{flagId}

**Source:** John Deere Operations Center - Flags API
**Endpoint ID:** `#/organizations/{orgId}/flags/{flagId}/get`

> List a flag by org id and Flag id

---

## Description

This endpoint will return a flag for a given org and Flag id.

**OAuth Scope Required:** `ag1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgId}/flags/{flagId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | Default | In |
| --- | --- | --- | --- | --- |
| orgId<br>Required | string | Org Id to query for Flag<br>Example: 2101 | N/A | path |
| flagId<br>Required | string | flagId to query for flag<br>Example: 688c20bb-9609-4590-95c9-649ba65c06df | N/A | path |
| Accept-Language | string | If embedding flag category, language that category name shall be returned within a flag, e.g., "de-DE"<br>Example: de-DE | en | header |
| embed | string | Embed additional attributes if required to reduce the number of requests<br>Example: flagCategory, flagCategoryWithPreferences, field, showRecordMetadata | N/A | query |
| startTime | string | Flags created after start time (in UTC) will be returned<br>Example: 2018-08-01T00:00:00Z | N/A | query |
| endTime | string | Flags created before end time (in UTC) will be returned<br>Example: 2018-08-01T00:00:00Z | now | query |
| categoryIDs | string | Specify a comma-separated list of category GUIDs to retrieve<br>Example: 688c20bb-9609-4590-95c9-649ba65c06df,0aed8e88-c27c-424b-8b66-babfe7fcf5ee | N/A | query |
| categoryNames | string | Specify a comma-separated list of category names to retrieve. Instead/together with names, aliases for well known categories can be used<br>Example: ROCKS,WEEDS | N/A | query |
| recordFilter | string | Request flags by archived status<br>Example: active, archived, all | active | query |
| flagScopes | string | Specify whether to request global flags, field-related flags or both<br>Example: global, field, all | all | query |
| shapeTypes | string | Clients which cannot handle specific geometry types can select only supported ones. Request flags with geometry only of type<br>Example: Point | Point, LineString, Polygon | query |
| simple | boolean | Populates simplified geometry<br>Example: false | false | query |
| metadataOnly | boolean | Does not populate geometry, overrides simple if both are true<br>Example: false | false | query |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| geometry | --- | Currently only three geometries types (Point, LineString and Polygon) are supported.<br>Example: See sample response below |
| notes | string | Free text notes.<br>Example: A big rock on the left after entering the field |
| archived | boolean | Indicates whether the flag is archived (true) or not (false). Archived flags SHALL not be returned by endpoints if not requested explicitely by clients.<br>Example: false |
| proximityAlertEnabled | boolean | Indicates whether the proximity alert is enabled (true) or not (false) for the Flag.<br>Example: false |
| id | string | GUID of a flag.<br>Example: 688c20bb-9609-4590-95c9-649ba65c06df |
| createdTime | datetime | Date and time of flag creation in UTC.<br>Example: 2018-07-01T21:00:11Z |
| lastModifiedTime | datetime | Date and time of last flag modification in UTC.<br>Example: 2018-07-01T21:10:10Z |


## Sample Response [JSON]

```
{
  "@type": "Flag",
  "geometry": "{\"type\": \"Point\", \"coordinates\": [-93.14959274063109, 41.66881548411553] }",
  "notes": "A big rock on the left after entering the field",
  "archived": false,
  "proximityAlertEnabled": false,
  "links": [
    {
      "rel": "owningOrganization",
      "uri": "https://sandboxapi.deere.com/platform/organizations/1234"
    },
    {
      "rel": "flagCategoryWithPrefrences",
      "uri": "https://sandboxapi.deere.com/platform/organizations/1234/flagCategories/47a229fc-aa09-4618-956c-1c29ae884326"
    },
    {
      "rel": "createdBy",
      "uri": "https://sandboxapi.deere.com/platform/users/johndeeresystem"
    },
    {
      "rel": "lastModifiedBy",
      "uri": "https://sandboxapi.deere.com/platform/users/john"
    },
    {
      "rel": "field",
      "uri": "https://sandboxapi.deere.com/platform/organizations/1234/fields/7b387eaa-187f-4bd8-acbc-c81748b6ad3b"
    }
  ],
  "id": "688c20bb-9609-4590-95c9-649ba65c06df",
  "createdTime": "2018-07-01T21:00:11Z",
  "lastModifiedTime": "2018-07-01T21:10:10Z"
}
```

