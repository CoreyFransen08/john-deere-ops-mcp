# PUT /organizations/{orgId}/farms/{farmId}

**Source:** John Deere Operations Center - Farms API
**Endpoint ID:** `#/organizations/{orgId}/farms/{farmId}/put`

> Update a Farm

---

## Description

Update farm by Id

**Request URI**

```
PUT https://sandboxapi.deere.com/platform/organizations/{orgId}/farms/{farmId}
```

**Accept:** ``

## Request Details

| Field | Type | Description & Example |
| --- | --- | --- |
| name | string | ---<br>Example: John Doe |
| archived | boolean | ---<br>Example: false |
| clientUri | string | Link to client resource<br>Example: https://sandboxapi.deere.com/platform/organizations/5555/clients/9369f3f6-2428-4bba-bf64-0a19cdaf007d |


## Sample Request [JSON]: Create Farm

```
{
  "name": "farmName",
  "archived": false,
  "links": [
    {
      "@type": "Link",
      "rel": "client",
      "links": "https://sandboxapi.deere.com/platform/organizations/{ordId}/clients/{clientId}"
    }
  ]
}
```

