# PUT /organizations/{organizationId}/varieties/{erid}

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/organizations/{organizationId}/varieties/{erid}/put`

> Update a single variety

---

## Description

This endpoint allows the custom variety to be renamed, made active/archived, or associated to a different manufacturer or crop type.

**OAuth Scope Required:** `eq2`

**Request URI**

```
PUT https://sandboxapi.deere.com/platform/organizations/{organizationId}/varieties/{erid}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| organizationId<br>Required | integer | The identifier of the Organization.<br>Example: 6781 | path |
| erid<br>Required | string | A unique identifier for an entity formatted as a uuid.<br>Example: cf09acfc-9196-4dbb-9b38-1be02673c5ff | path |


## Sample Request [JSON]

```
{
  "name": "1299",
  "companyName": "Curry Seed",
  "cropName": "SOYBEANS",
  "archived": true,
  "createdTime": "2019-03-28T14:59:57.000Z",
  "modifiedTime": "2019-03-27T14:59:57.000Z"
}
```

## Sample Response

```
204 No Content
The update was completed successfully.
```

