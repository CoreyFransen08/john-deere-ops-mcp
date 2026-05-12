# POST /fertilizers/{erid}/associateToOrg/{organizationId}

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/fertilizers/{erid}/associateToOrg/{organizationId}/post`

> Adds a single reference fertilizer to organization

---

## Description

This endpoint will associate a reference fertilizer to your organization from the global reference list. The reference fertilizers are immutable, however, they can still be archived or made available. If a reference fertilizer is created as a carrier, it cannot be changed thereafter. The registration of a reference fertilizer can also be updated. The response headers from the GET endpoints will include the attributes that can be overridden.

**OAuth Scope Required:** `eq2`

**Request URI**

```
POST https://sandboxapi.deere.com/platform/fertilizers/{erid}/associateToOrg/{organizationId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| erid<br>Required | string | A unique identifier for an entity formatted as a uuid.<br>Example: cf09acfc-9196-4dbb-9b38-1be02673c5ff | path |
| organizationId<br>Required | integer | The identifier of the Organization.<br>Example: 6781 | path |


## Sample Request [JSON]

```
{
  "countryCode": "USA",
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

