# POST /organizations/{organizationId}/equipment

**Source:** John Deere Operations Center - Equipment API
**Endpoint ID:** `#/organizations/{organizationId}/equipment/post`

> Create equipment

---

## Description

This resource allows the client to create a piece of equipment within a user’s organization.

Getting Started
The process of contributing equipment to John Deere can be broken down into three primary steps.
Determine the Equipment’s model IDs
Create the Equipment
Contribute Measurements. Please see the Equipment Measurements (POST) API for more information on uploading measurements for the created equipment.
Determining the Equipment’s model
Call the GET /equipmentMakes API endpoint to get a list of all equipment makes and a respective “id” of the equipment make you require.
Call the GET /equipmentMakes/{id}/equipmentISGTypes endpoint to get a list of associated equipment ISG types for that specific equipment make and obtain a respective “id” for a specific ISG type you require.
Call the GET /equipmentMakes/{id}/equipmentISGTypes/{id}/equipmentModels to obtain the final “id” of the equipment model you require.
Alternatively, you may call the GET /equipmentModels endpoint if you know the model name you are searching for. For example /equipmentModels?equipmentModelName=9RX*&embed=make,isgType which will include all models with search string results and include make and isgType “id” as well as model “id”.
Creating the Equipment
Make a POST request to the /organizations/{orgId}/equipment API to create the piece of equipment in the user’s org.
In this request you will provide the type of the equipment, a serialNumber (optional), name (displayed to the user in Operations Center), and the equipment model IDs.
type: Machine or Implement
serialNumber: A string identifier that is 30 characters or fewer. Must be unique within an organization.
name: The name displayed in Operation Center, 30 characters or fewer. Must be unique within an organization.
model: The id for the Model of the vehicle, found from the API in the previous step of this document.
A successful POST will result in a 201 Created response. The “location” header in the response will contain the URI to the new equipment, with the final segment being the organization specific machine ID (ie “https://equipmentapi.deere.com/isg/equipment/12345” is a link to the machine 12345).
If you attempt to create a machine with a serialNumber that already exists in that organization, you get a response code 400 Bad Request. The body will include the error information.

**OAuth Scope Required:** `eq2`

**Request URI**

```
POST https://equipmentapi.deere.com/isg/organizations/{organizationId}/equipment
```

**Accept:** `application/json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| organizationId<br>Required | integer | Example: 1234, | path |


## Request Details

| Field | Type | Description & Example |
| --- | --- | --- |
| name | string | Equipment Name.<br>Example: Cates 8360R 055358 |
| serialNumber<br>Required | string | Serial Number of the Equipment and passed on the query parameter<br>Example: Must be unique string. Max character count is 30. |
| model<br>Required | object | Model of the equipment. |
| id<br>Required | string | Unique id<br>Example: 3 \| 158df9ff-334a-4e0d-86cc-3adca17a9686 |
| @type<br>Required | string | EquipmentModel<br>Example: EquipmentModel |


## Sample Request [JSON]

```
{
  "@type": "Machine",
  "name": "Equipment Name",
  "serialNumber": "must_be_unique_string",
  "model": {
    "@type": "EquipmentModel",
    "id": 66280
  }
}
```

## Sample Response

```
201 Created
```

