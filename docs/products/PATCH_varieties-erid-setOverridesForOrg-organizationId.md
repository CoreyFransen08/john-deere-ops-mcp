# PATCH /varieties/{erid}/setOverridesForOrg/{organizationId}

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/varieties/{erid}/setOverridesForOrg/{organizationId}/patch`

> Sets organizational attributes such as isCarrier, archived, registration, etc.

---

## Description

This endpoint will set attribute overrides while importing a reference variety to your organization. The reference varieties are immutable, however, they can still be archived or made available. The response headers from the GET endpoints will include the attributes that can be overridden.

**OAuth Scope Required:** `eq2`

**Request URI**

```
PATCH https://sandboxapi.deere.com/platform/varieties/{erid}/setOverridesForOrg/{organizationId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| erid<br>Required | string | A unique identifier for an entity formatted as a uuid.<br>Example: cf09acfc-9196-4dbb-9b38-1be02673c5ff | path |
| organizationId<br>Required | integer | The identifier of the Organization.<br>Example: 6781 | path |


## Request Details

| Field | Type | Description & Example |
| --- | --- | --- |
| overrides | Array of object | --- |
| key | string | Key for override parameter when setting overrides for a reference product<br>Example: archived<br>Allowed Values: archived |
| value | object | Value for override parameter, can be string, number or boolean<br>Example: true |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| key | string | Key for override parameter when setting overrides for a reference product<br>Example: archived<br>Allowed Values: archived |
| success | boolean | Whether or not the override was successfully applied<br>Example: true |
| errors | object | --- |


## Sample Request [JSON]

```
{
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

