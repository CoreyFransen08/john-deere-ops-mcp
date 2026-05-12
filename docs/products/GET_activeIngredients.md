# GET /activeIngredients

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/activeIngredients/get`

> List of available active ingredients

---

## Description

Returns a list of all available active ingredients.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/isg/activeIngredients
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| entityType | string | Filters the results by the provided entity type. Example: CHEMICAL<br>Allowed Values: CHEMICAL,FERTILIZER | query |


## Sample Response [JSON]

```
{
  "links": [
    {
      "@type": "Link",
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/isg/activeIngredients"
    }
  ],
  "total": 4,
  "values": [
    {
      "@type": "ActiveIngredient",
      "id": "30ca101c-e78f-4e45-a248-1ce9622c7f10",
      "name": "Urea Nitrogen"
    },
    {
      "@type": "ActiveIngredient",
      "id": "e022ec44-43de-43ab-92e2-2c60da7762b9",
      "name": "1-aminocyclopropanecarboxylic acid"
    },
    {
      "@type": "ActiveIngredient",
      "id": "fa79f870-7aa1-48e7-9d1e-4cf98d68ca57",
      "name": "1-aminocyclopropanecarboxylic acid (ACC)"
    },
    {
      "@type": "ActiveIngredient",
      "id": "962bd78a-0029-4c6a-b2dd-2efab3f53285",
      "name": "1-Methylcyclopropene"
    }
  ]
}
```

