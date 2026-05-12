# GET /organizations/{orgId}/operators

**Source:** John Deere Operations Center - Operators API
**Endpoint ID:** `#/organizations/{orgId}/operators/get`

> Retrieve all Operators for a given org

---

## Description

This endpoint will return list of operators in the system for the provided organization ID

**OAuth Scope Required:** `ag1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgId}/operators
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | Organization ID<br>Example: 123456 | path |
| embed | string | Include operator metadata in the response.<br>Example: showRecordMetadata | query |
| recordFilter | string | Filter operators by status. Possible values ACTIVE or ALL or ARCHIVED Default - ACTIVE<br>Example: ACTIVE | query |
| lastModifiedTime | dateTime | Start of the range for timestamp filtering<br>Example: 2019-01-01T00:00:00Z | query |


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
      "uri": "https://sandboxapi.deere.com/platform/organizations/12345/operators"
    }
  ],
  "total": 1,
  "values": [
    {
      "@type": "Operator",
      "links": [
        {
          "@type": "Link",
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/operators/0235d40e-02d0-44cb-a126-fff21173fc1f"
        }
      ],
      "name": "John Doe",
      "id": "0235d40e-02d0-44cb-a126-fff21173fc1f",
      "dateModified": "2018-04-30T10:23:50.000Z",
      "archived": false
    }
  ]
}
```

