# PUT /organizations/{organizationId}/fertilizers/{erid}

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/organizations/{organizationId}/fertilizers/{erid}/put`

> Update a single fertilizer

---

## Description

Allows the fertilizer custom to be renamed, made active/archived, or flagged as a carrier.

**OAuth Scope Required:** `eq2`

**Request URI**

```
PUT https://sandboxapi.deere.com/platform/organizations/{organizationId}/fertilizers/{erid}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| organizationId<br>Required | integer | The identifier of the Organization.<br>Example: 6781 | path |
| erid<br>Required | string | A unique identifier for an entity formatted as a uuid.<br>Example: cf09acfc-9196-4dbb-9b38-1be02673c5ff | path |


## Sample Request [JSON]

```
{
  "@type": "Fertilizer",
  "name": "Tide Propiconazole 41.8EC",
  "companyName": "Tide International USA, Inc.",
  "type": "MANURE",
  "materialClassification": "DRY",
  "registration": "a12e9i84",
  "restrictedUse": false,
  "category": "FERTILIZER",
  "carrier": false,
  "archived": false,
  "liquidWeight": 3.14,
  "weightUnit": "lb/gal",
  "activeIngredients": [
    {
      "name": "Urea Nitrogen",
      "guid": "9ab0fd0d-7ed0-49bd-9a61-0277d89b61f4",
      "percent": 3.14,
      "unit": "%",
      "value": 3.14
    }
  ],
  "epaRegistration": "a12e9i84",
  "createdTime": "2017-03-21T21:12:53.865Z",
  "modifiedTime": "2018-04-06T15:12:52.910Z"
}
```

## Sample Response

```
204 No Content
```

