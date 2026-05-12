# POST /organizations/{orgId}/fields

**Source:** John Deere Operations Center - Fields API
**Endpoint ID:** `#/organizations/{orgId}/fields/post`

> Create field for an Organization

---

## Description

This API is used to create a new field resource within the target organization. In order to do this, the authenticated user must have Locations Level 3 permission within the target organization. The client and farm names in the request body may be either new or existing names. This is to support the following scenarios: * adding a new field to an existing client/farm * adding a new farm and field to an existing client * adding a brand new client/farm/field Client-specified identifiers: * An identifier may be specified for the new field * An identifier may be specified for new clients/farms * If associating to an existing client/farm, the existing guids may be specified in place of the name Note: All fields are created with an 'available' status.

**Request URI**

```
POST https://sandboxapi.deere.com/platform/organizations/{orgId}/fields
```

**Accept:** ``

## Request Details

| Field | Type | Description & Example |
| --- | --- | --- |
| @Type | string | ---<br>Example: Field |
| name | string | ---<br>Example: Land_Demo_1 |
| archived | boolean | ---<br>Example: true |
| Farms | object | --- |
| @Type | string | ---<br>Example: Farms |
| farms | Array of object | --- |
| @Type | string | ---<br>Example: Farm |
| name | string | ---<br>Example: SouthEast End |
| Clients | object | --- |
| @Type | string | ---<br>Example: Clients |
| clients | Array of object | --- |
| @Type | string | ---<br>Example: Client |
| name | string | ---<br>Example: SouthEast End_Client |


## Sample Request [JSON]: Create new field (Existing farm and client)

```
{
  "name": "UniqueFieldName",
  "archived": false,
  "farms": {
    "farms": [
      {
        "id": "ExistingFarmId"
      }
    ]
  },
  "clients": {
    "clients": [
      {
        "id": "ExistingClientId"
      }
    ]
  }
}
```

## Sample Request [JSON]: Create new field and farm (Existing client)

```
{
  "name": "UniqueFieldName",
  "archived": false,
  "farms": {
    "farms": [
      {
        "name": "UniqueFarmName"
      }
    ]
  },
  "clients": {
    "clients": [
      {
        "id": "ExistingClientId"
      }
    ]
  }
}
```

## Sample Request [JSON]: Create new field, farm and client

```
{
  "name": "UniqueFieldName",
  "archived": false,
  "farms": {
    "farms": [
      {
        "name": "UniqueFarmName"
      }
    ]
  },
  "clients": {
    "clients": [
      {
        "name": "UniqueClientName"
      }
    ]
  }
}
```

