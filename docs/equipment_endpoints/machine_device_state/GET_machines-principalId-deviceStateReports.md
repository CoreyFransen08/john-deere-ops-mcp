# GET /machines/{principalId}/deviceStateReports

**Source:** John Deere Operations Center - Machine Device State Reports API
**Endpoint ID:** `#/machines/{principalId}/deviceStateReports/get`

> Terminal Device State Reports

---

## Description

A device state report is generated from a terminal at a specified time. The report contains the following information:
Engine State
Power State
Model State
RSSI Value (signal strength of the terminal)
Local Information
GPS State/Error
WIFI Info/Error
GSM/WIFI Antenna Type
Wifi SSID
BatteryVoltage
LastBootType
LastBootTimestamp
VehiclePowerState
This report is specific to, and identified by, the terminal, regardless of which machine it is connected to. Device state report information is collected from the machine terminal. A device state report is created for each machine call-in.

Each requested DSR (one report for a single terminal request, and two or more for a multiple terminal request) links to

Machine: Request a Device State Report from the specified machine. If the terminal is not linked to a machine, this link will not appear.
Terminal: Request a Device State Report from the specified terminal.

Please Note: This API does not support eTags.

**OAuth Scope Required:** `eq1`

**Request URI**

```
GET https://sandboxapi.deere.com/platform/machines/{principalId}/deviceStateReports
```

**Accept:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | Default | In |
| --- | --- | --- | --- | --- |
| principalId<br>Required | string | Principal ID of the machine/equipment.<br>Example: 5432 | N/A | path |
| lastKnown | boolean | If true, startDate and endDate won't be used. Send true to fetch lastKnown call History.<br>Example: true | false | query |
| startDate1 | datetime | Return DSR from the specified startDate.<br>Example: 2010-10-04T14:35:05.000Z | 2 months old from CurrentTime | query |
| endDate1 | datetime | Return DSR till the specified endDate.<br>Example: 2010-10-04T14:38:35.000Z | Current Time | query |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| time | datetime | UTC Timestamp of the DSR.<br>Example: 2025-04-04T14:35:05.000Z |
| gatewayType1 | byte | This number identifies the type of gateway the report traveled through.<br>Example: 2 |
| location | Point | Shows the latitude, longitude, and altitude at the time of this report.<br>Example: See sample response below. |
| minRSSI | measurementAsDouble | The minimum signal strength of the machine at the time of the report.<br>Example: See sample response below. |
| maxRSSI | measurementAsDouble | The maximum signal strength of the machine at the time of the report.<br>Example: See sample response below. |
| averageRSSI | measurementAsDouble | The average signal strength of the machine at the time of the report.<br>Example: See sample response below. |
| gpsFixTimestamp | datetime | UTC Timestamp, of the GPS position of the Machine.<br>Example: 2025-04-04T14:35:05.000Z |
| engineState | byte | This number identifies the power state of the engine.<br>Example: 1 |
| terminalPowerState | byte | This number identifies the power state of the terminal.<br>Example: 1 |
| batteryLevel | measurementAsInteger | Battery level of the terminal.<br>Example: See sample response below. |
| cellModemState | byte | This number indicates whether any errors were occurring on the Cell Modem at the time of this report.<br>Example: 0 |
| cellModemAntennaState | byte | This number indicates whether any errors were occurring on the Cell Modem Antenna at the time of this report.<br>Example: 1 |
| gpsModemState | byte | This number indicates whether any errors were occurring on the GPS Modem at the time of this report.<br>Example: 1 |
| gpsAntennaState | byte | This number indicates whether any errors were occurring on the GPS Antenna at the time of this report.<br>Example: 1 |
| network | byte | Identifies the sattelite or cellular network through which the report was sent by the terminal.<br>Example: 1 |
| rssi | integer | Last reported RSSI (signal strength) of the network.<br>Example: 7 |
| gpsError | byte | This number identifies any gps error occured<br>Example: 4 |
| gpsFirmwareLevelError | byte | This number identifies any gps firmware error<br>Example: 1 |
| tetheringStatus | byte | This number identifies wifi tethering status<br>Example: 0 |
| apStatus | byte | This number identifies wifi access point(ap) status<br>Example: 1 |
| m2mMode | byte | This number identifies wifi machine to machine(m2m) mode<br>Example: 1 |
| tetheringConnected | byte | This number identifies wifi tethering connection<br>Example: 1 |
| apConnected | byte | This number identifies wifi access point connection<br>Example: 1 |
| m2mConnected | byte | This number identifies wifi machine to machine connection<br>Example: 1 |
| gsmAntennaType | byte | This number identifies gsm Antenna type<br>Example: 7 |
| wifiAntennaType | byte | This number identifies wifi Antenna type<br>Example: 3 |
| antennaFailure | byte | This number identifies the antenna failure state<br>Example: 1 |
| failedToTether | byte | This number identifies the Tethering failure state<br>Example: 0 |
| failedToM2M | byte | This number identifies the machine to machine connection failure state<br>Example: 0 |
| cellModemError | byte | This number identifies any cell modem error ocurred<br>Example: 0 |
| cellModemFirmwareLevelError | byte | This number identifies any cell modem firmware level error ocurred<br>Example: 0 |
| wifiSSID | string | SSID being used for tethering at the time the message is generated<br>Example: vatican |
| batteryVoltage | double | This number identifies the MTG Battery Voltage (Unswitched Power Supply) in Hundredths of a Volt<br>Example: 12.64 |
| lastBootType | integer | This number identifies if the device was cold booted or warm booted<br>Example: 2 |
| lastBootTimestamp | datetime | UTC Timestamp, when the device was booted up last time<br>Example: 2005-04-04T14:35:05.000Z |
| machineId | integer | This number identifies the principalId for which this records was generated<br>Example: 123456 |
| vehiclePowerState | byte | This number identifies the Vehicle Power State at the time this record is generated<br>Example: 2 |


## Sample Response [JSON]

```
{
  "links": [
    {
      "rel": "self",
      "uri": "https://sandboxapi.deere.com/platform/machines/5432/deviceStateReports"
    }
  ],
  "total": 1,
  "values": [
    {
      "@type": "DeviceStateReport",
      "time": "2010-10-04T14:35:05.000Z",
      "gatewayType": 2,
      "location": {
        "@type": "Point",
        "lat": "41.597164",
        "lon": "-90.54383",
        "altitude": {
          "@type": "measurementAsDouble",
          "unit": "meters",
          "valueAsDouble": "0.0"
        }
      },
      "minRSSI": {
        "@type": "measurementAsDouble",
        "unit": "dbM",
        "valueAsDouble": "0.0"
      },
      "maxRSSI": {
        "@type": "measurementAsDouble",
        "unit": "dbM",
        "valueAsDouble": "0.0"
      },
      "averageRSSI": {
        "@type": "measurementAsDouble",
        "unit": "dbM",
        "valueAsDouble": "0.0"
      },
      "gpsFixTimestamp": "2010-10-04T14:35:05.000Z",
      "engineState": 0,
      "terminalPowerState": 0,
      "batteryLevel": {
        "@type": "measurementAsInteger",
        "unit": "Percent",
        "valueAsInteger": "0"
      },
      "cellModemState": 0,
      "cellModemAntennaState": 0,
      "gpsModemState": 0,
      "gpsAntennaState": 0,
      "network": 0,
      "rssi": 0,
      "gpsError": 0,
      "gpsFirmwareLevelError": 0,
      "tetheringStatus": 0,
      "apStatus": 0,
      "m2mMode": 0,
      "tetheringConnected": 0,
      "apConnected": 0,
      "m2mConnected": 0,
      "gsmAntennaType": 1,
      "wifiAntennaType": 3,
      "antennaFailure": 0,
      "failedToTether": 0,
      "failedToM2M": 0,
      "cellModemError": 0,
      "cellModemFirmwareLevelError": 0,
      "wifiSSID": "vatican",
      "batteryVoltage": 50,
      "lastBootType": 2,
      "lastBootTimestamp": "2005-04-04T14:35:05.000Z",
      "machineId": 2,
      "vehiclePowerState": 2
    }
  ]
}
```

