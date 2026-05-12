# GET /organizations/{orgId}/operators/{id}

**Source:** John Deere Operations Center - Operators API
**Endpoint ID:** `#/organizations/{orgId}/operators/{id}/get`

> Retrieve a specific Operator in an org by Operator ID

---

## Description

This endpoint will return a specific operator in the system in an org for the provided Operator ID to the data of an operator in the request body

**OAuth Scope Required:** `ag1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgId}/operators/{id}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | Organization ID<br>Example: 123456 | path |
| id<br>Required | string | Operator ID<br>Example: 0235d40e-02d0-44cb-a126-fff21173fc1f | path |
| embed | string | Include operator metadata in the response.<br>Example: showRecordMetadata | query |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| id | string | Operator ID<br>Example: 0235d40e-02d0-44cb-a126-fff21173fc1f |
| name | string | Operator Name<br>Example: John Doe |
| dateModified | datetime | Datetime when the entity modified, it would be null on creation.<br>Example: 2019-03-22T08:48:20Z |
| archived | boolean | Archived Status<br>Example: true |


## Sample Response [JSON]

```
{
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/12345/operators/0235d40e-02d0-44cb-a126-fff21173fc1f"
    }
  ],
  "id": "0235d40e-02d0-44cb-a126-fff21173fc1f",
  "name": "John Doe",
  "dateModified": "2018-04-30T10:23:50.000Z",
  "archived": false
}
```

