# PUT /organizations/{organizationId}/chemicals/{erid}

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/organizations/{organizationId}/chemicals/{erid}/put`

> Update a single chemical

---

## Description

Allows the custom chemical to be renamed, made active/archived, or flagged as a carrier.

**OAuth Scope Required:** `eq2`

**Request URI**

```
PUT https://sandboxapi.deere.com/platform/organizations/{organizationId}/chemicals/{erid}
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
  "@type": "Chemical",
  "name": "Tide Propiconazole 41.8EC",
  "registration": "a12e9i84",
  "companyName": "Tide International USA, Inc.",
  "type": "MANURE",
  "materialClassification": "GAS",
  "carrier": false,
  "archived": false,
  "restrictedUse": false,
  "referenceGuid": "87b4a1e7-210b-482c-8a7a-19e9f644e914",
  "liquidWeight": 3.14,
  "weightUnit": "lb/gal",
  "epaRegistration": "a12e9i84",
  "createdTime": "2017-03-20T21:12:53.870Z",
  "modifiedTime": "2017-03-22T21:12:53.870Z",
  "agencyRegistrations": [
    {
      "@type": "AgencyRegistration",
      "links": [
        {
          "@type": "Link",
          "rel": "agency",
          "uri": "https://sandboxapi.deere.com/platform/agencies/8fb34898-64f5-5a1e-a698-34ab348220a7"
        }
      ],
      "registrationId": "a12e9i84"
    }
  ]
}
```

## Sample Response

```
204 No Content
```

