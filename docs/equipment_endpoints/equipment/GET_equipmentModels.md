# GET /equipmentModels

**Source:** John Deere Operations Center - Equipment API
**Endpoint ID:** `#/equipmentModels/get`

> Get equipment models

---

## Description

This resource allows the client to view equipment models in our reference database and their associated IDs and names.

**Request URI**

```
GET https://equipmentapi.deere.com/isg/equipmentModels
```

**Accept:** `application/json`

## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| values | Array of EquipmentModel | --- |


## Sample Response [JSON]

```
{
  "links": [],
  "values": [
    {
      "@type": "EquipmentModel",
      "name": "9RX420",
      "category": "Machine",
      "certified": true,
      "id": "217373",
      "ERID": "d3d0bd20-e09f-11ee-92e2-0e5cd6a962d7",
      "make": [
        {
          "@type": "EquipmentMake",
          "name": "JOHN DEERE",
          "certified": true,
          "deereOrSubsidiary": true,
          "id": 1,
          "ERID": "0e8031fe-fe81-11ea-bec7-124fe3772e59"
        }
      ],
      "type": [
        {
          "@type": "EquipmentType",
          "name": "Combine",
          "id": 222,
          "ERID": "80619ff7-11fa-11ee-bb58-0e5cd6a962d7"
        }
      ],
      "isgType": [
        {
          "@type": "EquipmentISGType",
          "name": "Combine",
          "id": 2,
          "ERID": "d8dce5b0-cc8d-4c34-afac-27d93793bd86"
        }
      ]
    },
    {
      "@type": "EquipmentModel",
      "name": "9RX -870",
      "category": "Machine",
      "certified": false,
      "id": "787077",
      "ERID": "f3d97337-e566-439a-8f6b-4a1c76be055d",
      "make": [
        {
          "@type": "EquipmentMake",
          "name": "JOHN DEERE",
          "certified": false,
          "deereOrSubsidiary": true,
          "id": 1,
          "ERID": "db18bdc4-025a-11eb-97e4-0e8d658c7ba3"
        }
      ],
      "type": [
        {
          "@type": "EquipmentType",
          "name": "Four-wheel Drive Tractor",
          "id": 145,
          "ERID": "6e816bfb-955f-4687-a362-1133ab26cef9"
        }
      ],
      "isgType": [
        {
          "@type": "EquipmentISGType",
          "name": "Tractor",
          "id": 1,
          "ERID": "82115264-9385-460c-bfbe-177a59445fd9"
        }
      ]
    }
  ]
}
```

