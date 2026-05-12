# DELETE /equipment/{id}

**Source:** John Deere Operations Center - Equipment API
**Endpoint ID:** `#/equipment/{id}/delete`

> Delete equipment

---

## Description

This resource allows the client to delete a piece of equipment within a user’s organization. Clients will only be able to delete a piece of equipment that was contributed via the POST /equipment API. John Deere controlled equipment can only be managed via the Equipment application in Operations Center.

**OAuth Scope Required:** `eq2`

**Request URI**

```
DELETE https://equipmentapi.deere.com/isg/equipment/{id}
```

**Accept:** `application/json`

## Parameters

| Parameter | Type | Description & Example | In |
| --- | --- | --- | --- |
| id<br>Required | integer | Example: 1111 | path |


## Sample Response

```
204 No Content
```

