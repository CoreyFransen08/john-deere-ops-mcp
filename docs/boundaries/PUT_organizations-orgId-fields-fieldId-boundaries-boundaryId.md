# PUT /organizations/{orgId}/fields/{fieldId}/boundaries/{boundaryId}

**Source:** John Deere Operations Center - Boundaries API
**Endpoint ID:** `#/organizations/{orgId}/fields/{fieldId}/boundaries/{boundaryId}/put`

> Update a boundary

---

## Description

This endpoint will update a boundary. The shape of the object must include name, active, irrigated, sourceType, and multipolygons. All these fields can be updated, however a license is required to set sourceType to a value other than "External". If the boundary is set to active, it will mark all other boundaries in this field inactive.

**OAuth Scope Required:** `ag3`

**Request URI**

```
PUT https://sandboxapi.deere.com/platform/organizations/{orgId}/fields/{fieldId}/boundaries/{boundaryId}
```

**Accept:** `application/vnd.deere.axiom.v3+json`

**Content-Type:** `application/vnd.deere.axiom.v3+json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| orgId<br>Required | string | Organization<br>Example: 654321 | path |
| fieldId<br>Required | GUID | Field Id<br>Example: e61b83f4-3a12-431e-8010-596f2466dc27 | path |
| boundaryId<br>Required | GUID | Boundary Id<br>Example: e7ab3a06-06ca-4d34-8cb7-6fd2a3640a3d | path |


## Request Details

| Field | Type | Description & Example |
| --- | --- | --- |
| name | string | Boundary Name.<br>Example: Boundary01 |
| active | boolean | Indicates whether the boundary is active in this field.<br>Example: false |
| archive | boolean | Indicates whether the boundary is archived.<br>Example: false |
| irrigated | boolean | Indicates whether the boundary is irrigated.<br>Example: false |
| multipolygons | --- | Polygon representation of the new boundary.<br>Example: See sample request below. |
| sourceType | string | Describes the source of boundary (requires license to set).<br>Example: External |
| signalType | string | Signal Type used when defining boundary. See “dtSignalType” in the John Deere representation system for possible values.<br>Example: dtiSignalTypeRTK |


## Response Details

| Field | Type | Description & Example |
| --- | --- | --- |
| total | integer | ---<br>Example: 1 |


## Sample Response

```
200 OK
```

