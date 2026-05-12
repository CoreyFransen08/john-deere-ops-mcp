# POST /organizations/{organizationId}/equipment/{principalId}/measurements

**Source:** John Deere Operations Center - Equipment Measurements API
**Endpoint ID:** `#/organizations/{organizationId}/equipment/{principalId}/measurements/post`

> Contribute measurements for a given equipment (NEW)

---

## Description

This resource allows the client to provide metadata for a third-party managed piece of equipment in Operations Center.

Getting Started
The process of contributing equipment measurement data to John Deere can be broken down into three primary steps.
Determine the Equipment’s make, type, and model IDs
Create the Equipment. Please see the Equipment API for more information on creating equipment.
Contribute Measurements
Determining the Equipment’s make, type, and model
Call the GET /equipmentMakes API endpoint to get a list of all equipment makes and a respective “id” of the equipment make you require.
Call the GET /equipmentMakes/{id}/equipmentTypes endpoint to get a list of associated equipment types for that specific equipment make and obtain a respective “id” for a specific type you require.
Call the GET /equipmentMakes/{id}/equipmentTypes/{id}/equipmentModels to obtain the final “id” of the equipment model you require.
Alternatively, you may call the GET /equipmentModels endpoint if you know the model name you are searching for. For example /equipmentModels?equipmentModelName=9RX*&embed=make,type which will include all models with search string results and include make and type 'id' as well as model 'id'.
Create the Equipment
Make a POST request to the /organizations/{orgId}/equipment API to create the piece of equipment in the user’s org.
In this request you will provide the type of the equipment, a serialNumber (optional), name (displayed to the user in Operations Center), and the equipment make, type, and model IDs.
type: Machine or Implement
serialNumber: A string identifier that is 30 characters or fewer. Must be unique within an organization.
name: The name displayed in Operation Center, 30 characters or fewer. Must be unique within an organization.
make: The ID for the Make of the vehicle, found from the previous step of this document.
type: The ID for the Type of the vehicle, found from the API in previous step of this document.
model: The id for the Model of the vehicle, found from the API in the previous step of this document.
A successful POST will result in a 201 Created response. The “location” header in the response will contain the URI to the new equipment, with the final segment being the organization specific machine ID (ie 'https://equipmentapi.deere.com/isg/equipment/12345' is a link to the machine 12345).
Once the equipment is created, you will need to follow the location header link provided above and obtain the 'principalId' of the equipment which will be used in the measurements POST URL.
If you attempt to create a machine with a vin that already exists in that organization, you get a response code 400 Bad Request. The body will include the error information.
If you attempt to create a machine with a name that already exists within the organization, you will receive a 400 Bad Request response. The body will include the error information.
Contribute Measurements
First, you must call the returned URL for the equipment created in above steps to view the new machine record, to obtain the “principalId” of the machine. Then, make a POST call to the /organizations/{organizationId}/equipment/{principalId}/measurements API endpoint to provide metadata for the equipment that you created in the previous steps.
A properly formatted message will result in a 204 No Content response indicating that the measurement has been taken for processing. After a short delay (generally less than 30 seconds) you should see the icon on the Operations Center map reflecting the new information.
You MUST pass the “principalId” of the equipment (obtained from querying the equipment record in the GET /equipment endpoint) otherwise the API will return an error. We check to ensure the calling application and user has access to the current controlling organization of the equipment prior to accepting the measurements. Measurement will only be shown in the current controlling organization of the equipment.

**OAuth Scope Required:** `eq2`

**Request URI**

```
POST https://equipmentapi.deere.com/isg/organizations/{organizationId}/equipment/{principalId}/measurements
```

**Accept:** `application/json`

**Content-Type:** `application/json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| organizationId<br>Required | integer | The identifier of the organization<br>Example: 1234 | path |
| principalId<br>Required | integer | The master record identifier of the equipment<br>Example: 1234 | path |


## Request Details

| Field | Type | Description & Example |
| --- | --- | --- |
| timestamp | string | Timestamp that the provided set of measurements were recorded. This will be valuable in determining the correct order of measurements in case they are provided out of order. |
| measurements | Array of Measurement | --- |
| Speed | --- | --- |
| Heading | --- | --- |
| FuelLevel | --- | --- |
| Latitude | object | --- |
| Longitude | object | --- |
| EngineState | object | --- |
| Odometer | object | --- |
| EngineHours | object | --- |
| EngineSpeed | --- | --- |
| PTOStatus | --- | --- |


## Sample Request [JSON]

```
[
  {
    "timestamp": "2024-05-20T18:44:17.299Z",
    "measurements": [
      {
        "name": "vehicleSpeed",
        "value": 19.5,
        "unit": "kph"
      },
      {
        "name": "latitude",
        "value": 41.51655,
        "unit": "degrees"
      },
      {
        "name": "longitude",
        "value": -93.502778,
        "unit": "degrees"
      },
      {
        "name": "engineState",
        "value": "On"
      },
      {
        "name": "odometer",
        "value": 132992,
        "unit": "km"
      },
      {
        "name": "engineHours",
        "value": 21350.8,
        "unit": "hours"
      },
      {
        "name": "heading",
        "value": 89.9,
        "unit": "degrees"
      },
      {
        "name": "fuelLevelPercentage",
        "value": 35.7,
        "unit": "percent"
      },
      {
        "name": "PTOstatus",
        "value": "On"
      },
      {
        "name": "EngineSpeed",
        "value": 19.5,
        "unit": "rpm"
      }
    ]
  }
]
```

## Sample Response

```
204 No Content
```

