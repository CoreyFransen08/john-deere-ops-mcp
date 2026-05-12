# GET /equipment

**Source:** John Deere Operations Center - Equipment API
**Endpoint ID:** `#/equipment/get`

> Get equipment

---

## Description

This resource allows the client to view the list of a user's equipment. It can be called with a filter for specific organizations, machine or implement types, but can also be called without a filter to provide a list of all equipment accessible by the user across each organization the user has access to. Equipment will only be returned from organizations the user has access to and are connected to the calling application. If the client requests multiple organizations in the filter, and a user or the client does not have access to that organization, the entire response will be a 403 Forbidden. Please see the OAuth 2 documentation here for more details on obtaining a user token and connecting the user’s organizations to your application..

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://equipmentapi.deere.com/isg/equipment
```

**Accept:** ``

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| ids | array | List of OrganizationEquipment Ids (these ids are unique across all orgs)<br>Example: 1,2,3 | query |
| serialNumbers | array | List of serial numbers of the equipment<br>Example: A01775E760247,1DW410ETHFF669067 | query |
| organizationIds | array | List of OrganizationIds<br>Example: 1,2,3 | query |
| principalIds | array | List of PrincipalIds<br>Example: 1,2,3 | query |
| capableOf | string | Allowed Values: Connectivity,!Connectivity | query |
| categories | array | Example: Machine,Implement \| Machine \| Implement<br>Allowed Values: Machine,Implement | query |
| organizationRole.type | string | Allowed Values: Controlling,NonControlling | query |
| archived | boolean | true or false | query |
| embed | string | embed 'pairingDetails' is only supported along with 'devices' or 'equipment' embeds<br>Allowed Values: devices,equipment,icon,pairingDetails | query |
| pageOffset | integer | Refers to starting record value<br>Example: 200 | query |
| itemLimit | integer | Refers to number of items per page(default 100 max 5000)<br>Example: 200 | query |


