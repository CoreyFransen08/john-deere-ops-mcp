# PUT /organizations/{orgId}/flagCategoryPreferences/{flagCategoryPreferencesId}

**Source:** John Deere Operations Center - Flags API
**Endpoint ID:** `#/organizations/{orgId}/flagCategoryPreferences/{flagCategoryPreferencesId}/put`

> Update flag category preferences

---

## Description

This resource will update flag category preferences by Id and Org

**OAuth Scope Required:** `ag3`

**Request URI**

```
PUT https://sandboxapi.deere.com/platform/organizations/{orgId}/flagCategoryPreferences/{flagCategoryPreferencesId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | Default | In |
| --- | --- | --- | --- | --- |
| organizationId<br>Required | string | orgId to query for preferences.<br>Example: 123456 | N/A | path |
| flagCategoryPreferencesId<br>Required | string | flagCategoryPreferencesId to query for preferences.<br>Example: 688c20bb-9609-4590-95c9-649ba65c06df | N/A | path |


## Request Details

| Field | Type | Description & Example |
| --- | --- | --- |
| id | string | Id of the FlagCategoryPreferences resource.<br>Example: ac6a5bb5fae84b1da29459a8101295b0 |
| prefKey | string | Key name for the preference object to be identified by clients to support client-specific preferences<br>Example: default |
| hexColor | string | Color code for the flag category in hexadecimal format.<br>Example: #0BA74A |
| createdTime | datetime | ---<br>Example: 2018-07-01T21:00:11Z |
| modifiedTime | datetime | ---<br>Example: 2018-07-01T21:10:10Z |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| links | Array of undefined | --- |
| total | integer | Number of results in the list<br>Example: 70 |


## Sample Request [JSON]

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
      "uri": "https://sandboxapi.deere.com/platform/users/USERNAME"
    }
  ]
}
```

## Sample Response

```
204 No Content
```

