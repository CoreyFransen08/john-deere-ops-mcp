# GET /organizations/{organizationId}/productCompanies

**Source:** John Deere Operations Center - Products API
**Endpoint ID:** `#/organizations/{organizationId}/productCompanies/get`

> Retrieve product companies for an org.

---

## Description

A unified list of custom and reference product companies in your organization.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/organizations/{organizationId}/productCompanies
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Sample Response [JSON]

```
{
  "links": [
    {
      "@type": "Link",
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456/productCompanies"
    },
    {
      "@type": "Link",
      "rel": "nextPage",
      "uri": "https://sandboxapi.deere.com/platform/organizations/123456/productCompanies"
    }
  ],
  "total": 1439,
  "values": [
    {
      "@type": "ProductCompany",
      "companyName": "Mosaic"
    },
    {
      "@type": "ProductCompany",
      "companyName": "Howard Fertilizer"
    },
    {
      "@type": "ProductCompany",
      "companyName": "Citizens LLC"
    },
    {
      "@type": "ProductCompany",
      "companyName": "Diamond K"
    },
    {
      "@type": "ProductCompany",
      "companyName": "The JC Smith Co"
    },
    {
      "@type": "ProductCompany",
      "companyName": "BH Hybrids"
    },
    {
      "@type": "ProductCompany",
      "companyName": "Garlic Research Labs"
    },
    {
      "@type": "ProductCompany",
      "companyName": "Atlantic - Pacific Agricultural Co., Inc."
    },
    {
      "@type": "ProductCompany",
      "companyName": "Crites Seeds Inc"
    },
    {
      "@type": "ProductCompany",
      "companyName": "Quality Borate Company"
    }
  ]
}
```

