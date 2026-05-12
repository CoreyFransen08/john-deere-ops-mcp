# GET /organizations/{orgId}/flagCategories/{categoryId}/flagCategoryPreferences

**Source:** John Deere Operations Center - Flags API
**Endpoint ID:** `#/organizations/{orgId}/flagCategories/{categoryId}/flagCategoryPreferences/get`

> List collection of FlagCategoryPreference

---

## Description

This endpoint will return a collection of FlagCategoryPreference objects associated with the given flag category. The object with the key "default" is created automatically on the 1st access to the flagCategory object by a client. The default preference object shall be initialized with default values:
prefKey: "default"
hexColor: "#FFFFFF"

**OAuth Scope Required:** `ag1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgId}/flagCategories/{categoryId}/flagCategoryPreferences
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | Default | In |
| --- | --- | --- | --- | --- |
| prefKey | string | CategoryId to query for preferences<br>Example: default | default | query |
| organizationId<br>Required | string | orgId to query for preferences.<br>Example: 123456 | N/A | path |
| categoryId<br>Required | string | CategoryId to query for preferences.<br>Example: 7ba95d7a-f798-46d0-9bf9-c39c31bcf984 | N/A | path |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| id | string | Id of the FlagCategoryPreferences resource.<br>Example: ac6a5bb5fae84b1da29459a8101295b0 |
| prefKey | string | Key name for the preference object to be identified by clients to support client-specific preferences<br>Example: default |
| hexColor | string | Color code for the flag category in hexadecimal format.<br>Example: #0BA74A |
| createdTime | datetime | ---<br>Example: 2018-07-01T21:00:11Z |
| modifiedTime | datetime | ---<br>Example: 2018-07-01T21:10:10Z |


## Sample Response [JSON]

```
{
  "id": "ac6a5bb5fae84b1da29459a8101295b0",
  "prefKey": "default",
  "hexColor": "#0BA74A",
  "createdTime": "2018-07-01T21:00:11Z",
  "modifiedTime": "2018-07-01T21:10:10Z",
  "links": [
    {
      "rel": "modifiedBy",
      "uri": "https://sandboxapi.deere.com/platform/users/rostaninoleg"
    }
  ]
}
```

