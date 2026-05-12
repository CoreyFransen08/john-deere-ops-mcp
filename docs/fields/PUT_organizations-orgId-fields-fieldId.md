# PUT /organizations/{orgId}/fields/{fieldId}

**Source:** John Deere Operations Center - Fields API
**Endpoint ID:** `#/organizations/{orgId}/fields/{fieldId}/put`

> Update field

---

## Description

Update the field name, the archived status, or the associated client or farm. If the client and/or farm does not exist, it will be created.

**Request URI**

```
PUT https://sandboxapi.deere.com/platform/organizations/{orgId}/fields/{fieldId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

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


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| name | string | New Field Name<br>Example: UniqueFieldName |
| archived | string | Archived status (false = active)<br>Example: false |
| farms.name | string | Existing or Unique (new) farm name<br>Example: FarmName |
| farms.id | GUID | Farm ID<br>Example: e61b83f4-3a12-431e-8010-596f2466dc27 |
| clients.name | string | Existing or Unique (new) client name<br>Example: ClientName |
| clients.id | GUID | Client ID<br>Example: e61b83f4-3a12-431e-8010-596f2466dc27 |


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

## Sample Response [JSON]: Update field (Existing farm and client)

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

## Sample Response [JSON]: Update field and create farm (Existing client)

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

## Sample Response [JSON]: Update field, create new farm and client

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

