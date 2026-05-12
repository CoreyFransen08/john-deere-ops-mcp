# POST /varieties/{erid}/associateToOrg/{organizationId}

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/varieties/{erid}/associateToOrg/{organizationId}/post`

> Adds a single reference variety to organization

---

## Description

This endpoint will associate a reference variety to your organization from the global reference list. The reference varieties are immutable, however, they can still be archived or made available. The response headers from the GET endpoints will include the attributes that can be overridden.

**OAuth Scope Required:** `eq2`

**Request URI**

```
POST https://sandboxapi.deere.com/platform/varieties/{erid}/associateToOrg/{organizationId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| erid<br>Required | string | A unique identifier for an entity formatted as a uuid.<br>Example: cf09acfc-9196-4dbb-9b38-1be02673c5ff | path |
| organizationId<br>Required | integer | The identifier of the Organization.<br>Example: 6781 | path |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| key | string | Key for override parameter when setting overrides for a reference product<br>Example: archived<br>Allowed Values: archived |
| success | boolean | Whether or not the override was successfully applied<br>Example: true |
| errors | object | --- |


## Sample Request [JSON]

```
{
  "countryCode": "USA",
  "overrides": [
    {
      "key": "archived",
      "value": true
    }
  ]
}
```

## Sample Response

```
[
  {
    "key": "archived",
    "success": true,
    "errors": []
  }
]
```

