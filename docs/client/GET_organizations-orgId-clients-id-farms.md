# GET /organizations/{orgId}/clients/{id}/farms

**Source:** John Deere Operations Center - Clients API
**Endpoint ID:** `#/organizations/{orgId}/clients/{id}/farms/get`

> View a Client's Farms

---

## Description

View a list of farms belonging to a specified client. For each farm, the response will link to the following resources:
fields: View the fields in this farm
farms: View the clients that own this farm.
owningOrganization: View the Organization that owns the farm.

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{orgId}/clients/{id}/farms
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| farmId | string | --- |
| farmName | string | --- |
| clientId | string | --- |
| clientName | string | --- |
| clientUri | string | --- |
| orgId | integer | --- |
| archived | boolean | --- |
| sourceModifiedDate | string | --- |
| sourceCreatedDate | string | --- |
| createdContributionId | string | Id of the system which created the farm |
| modifiedContributionId | string | Id of the system which last modified the farm like AppId |
| createdSourceNode | string | The node which created the farm |
| modifiedSourceNode | string | The node which last modified the Farm |
| createdBy | string | The Id of the entity which created the farm |
| modifiedBy | string | The Id of the entity which last modified the farm |


## Sample Response [JSON]

```
{
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/6789/clients/590f875c-9504-461e-94f3-b80a52372023/farms"
    }
  ],
  "total": 2,
  "values": [
    {
      "name": "FarmName",
      "clientUri": "https://sandboxapi.deere.com/platform/organizations/592715/clients/e45d1773-cb82-468-96ac-ba65917dd274,",
      "archived": false,
      "id": "f1161eba-7c82-4a80-9eeb-383451b4c46e",
      "links": [
        {
          "rel": "self",
          "uri": "https://sandboxapi.deere.com/platform/organizations/6789/farms/f1161eba-7c82-4a80-9eeb-383451b4c46e"
        },
        {
          "rel": "fields",
          "uri": "https://sandboxapi.deere.com/platform/organizations/6789/farms/f1161eba-7c82-4a80-9eeb-383451b4c46e/fields"
        },
        {
          "rel": "farms",
          "uri": "https://sandboxapi.deere.com/platform/organizations/6789/farms/f1161eba-7c82-4a80-9eeb-383451b4c46e/clients"
        },
        {
          "rel": "owningOrganization",
          "uri": "https://sandboxapi.deere.com/platform/organizations/6789"
        }
      ]
    }
  ]
}
```

