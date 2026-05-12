# PATCH /chemicals/{erid}/setOverridesForOrg/{organizationId}

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/chemicals/{erid}/setOverridesForOrg/{organizationId}/patch`

> Sets organizational attributes such as isCarrier, archived, registration, etc

---

## Description

This endpoint will set attribute overrides while importing a reference chemical to your organization. The reference chemicals are immutable, however, they can still be archived or made available. Once set to true, the carrier attribute cannot be set to false. The registration of a reference chemical can be updated. The response headers from the GET endpoints will include the attributes that can be overridden.

**OAuth Scope Required:** `eq2`

**Request URI**

```
PATCH https://sandboxapi.deere.com/platform/chemicals/{erid}/setOverridesForOrg/{organizationId}
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
| key | string | Key for override parameter when setting overrides for a reference product<br>Example: archived<br>Allowed Values: isCarrier,archived,registration |
| value | string | Value for the override parameter<br>Example: true |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| key | string | Key for override parameter when setting overrides for a reference product<br>Example: isCarrier<br>Allowed Values: isCarrier,archived,registration (chemicals and fertilizers only) |
| success | boolean | Whether or not the override was successfully applied<br>Example: true |
| errors | object | --- |


## Sample Request [JSON]

```
{
  "overrides": [
    {
      "key": "archived",
      "value": true
    },
    {
      "key": "registration",
      "value": "EXEMPT"
    },
    {
      "key": "isCarrier",
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
  },
  {
    "key": "isCarrier",
    "success": true,
    "errors": []
  },
  {
    "key": "registration",
    "success": true,
    "errors": []
  }
]
```

