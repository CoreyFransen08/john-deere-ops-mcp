# John Deere OAuth 2.0 Authentication Flow

Source: John Deere Precision Tech API documentation

## Overview

All John Deere Precision Tech API endpoints use OAuth 2.0 with the **authorization code grant type**. The flow has **five distinct phases**, and skipping any step — especially the organization connection step — results in 403 Forbidden errors on all organization-scoped endpoints.

---

## Phase 1: Create an Application

Register at [developer.deere.com](https://developer.deere.com):
- Requires a validated John Deere account
- Generates an **Application ID** (client_id) and **Secret** (client_secret)
- Register one or more **Redirect URIs** (callback URLs) — must match exactly (no encoding differences)

---

## Phase 2: Discover Endpoints (Well-Known URL)

```
GET https://signin.johndeere.com/oauth2/aus78tnlaysMraFhC1t7/.well-known/oauth-authorization-server
```

Returns the live `authorization_endpoint`, `token_endpoint`, and supported scopes. Always use these discovered values rather than hardcoding endpoint URLs.

Key endpoints from the response:
- `authorization_endpoint`: `https://signin.johndeere.com/oauth2/aus78tnlaysMraFhC1t7/v1/authorize`
- `token_endpoint`: `https://signin.johndeere.com/oauth2/aus78tnlaysMraFhC1t7/v1/token`
- `revocation_endpoint`: `https://signin.johndeere.com/oauth2/aus78tnlaysMraFhC1t7/v1/revoke`
- `end_session_endpoint`: `https://signin.johndeere.com/oauth2/aus78tnlaysMraFhC1t7/v1/logout`

---

## Phase 3: Acquire an Authorization Code

Redirect the user's browser to the authorization URL:

```
GET https://signin.johndeere.com/oauth2/aus78tnlaysMraFhC1t7/v1/authorize
  ?response_type=code
  &scope={scopes}
  &client_id={clientId}
  &state={state}
  &redirect_uri={redirect_uri}
```

**Scope guidance:** Only request scopes your application actually needs. The scopes requested here directly determine the connection permissions presented to the user during organization setup.

| Scope | Permission |
|-------|------------|
| `org1` | View Staff, Operators, and Partners |
| `org2` | View + Modify Staff, Operators, and Partners |
| `eq1` | View Equipment, Remote Display Access, Setup & WDT |
| `eq2` | View/Edit/Manage Equipment, Remote Display Access, Setup & WDT |
| `ag1` | View Locations (Clients, Farms, Fields) |
| `ag2` | View Locations + Analyze Production Data |
| `ag3` | View + Analyze + Manage Locations & Production Data |
| `files` | Files API Access |
| `finance1` | View Financials |
| `finance2` | View + Manage Financials |
| `work1` | View Work and Crop Plans |
| `work2` | View + Manage Work and Crop Plans |
| `offline_access` | Request a Refresh Token |

**Flow on the JD side:**
1. User is redirected to the JD sign-in page
2. User authenticates
3. User is presented with the scope acceptance screen (first time, or on scope changes)
4. After acceptance, JD redirects to `redirect_uri` with `?code={auth_code}&state={state}`

---

## Phase 4: Exchange Code for Tokens

```
POST https://signin.johndeere.com/oauth2/aus78tnlaysMraFhC1t7/v1/token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {base64(client_id:client_secret)}

grant_type=authorization_code
code={auth_code}
redirect_uri={redirect_uri}
```

Response includes `access_token`, `refresh_token` (if `offline_access` was requested), and `expires_in` (12 hours).

---

## Phase 5: Organization Connection (REQUIRED — Do Not Skip)

> **Critical:** Skipping this step causes 403 Forbidden on all organization-scoped endpoints.

After obtaining a valid access token, the client must verify and establish organization connections before making any data requests.

### Step 5a: Check organization connection status

```
GET https://sandboxapi.deere.com/platform/organizations
Authorization: Bearer {access_token}
Accept: application/vnd.deere.axiom.v3+json
```

**Not yet connected** — org response contains a `connections` link:

```json
{
  "@type": "Organization",
  "name": "Spahn Ranch",
  "id": "283480",
  "links": [
    { "rel": "self", "uri": "https://sandboxapi.deere.com/platform/organizations/283480" },
    { "rel": "connections", "uri": "https://connections.deere.com/connections/{clientId}/select-organizations" }
  ]
}
```

**Already connected** — org response contains a `manage_connections` link (no `connections` link):

```json
{
  "@type": "Organization",
  "name": "Spahn Ranch",
  "id": "283480",
  "links": [
    { "rel": "self", "uri": "https://sandboxapi.deere.com/platform/organizations/283480" },
    { "rel": "manage_connections", "uri": "https://connections.deere.com/connections/{clientId}/connections-dialog?orgId=283480" }
  ]
}
```

### Step 5b: Redirect user to the connections URL (if needed)

If any organization has a `connections` link, redirect the user's browser to:

```
https://connections.deere.com/connections/{clientId}/select-organizations?redirect_uri={encodedRedirectUri}
```

- `redirect_uri` **must** be URL-encoded
- `redirect_uri` **must** match one of the registered Redirect URIs on the application
- Only perform this redirect **once per session** to avoid redirect loops
- If the user does not complete selection, inform them that the connection was not completed and they may need to visit `connections.deere.com` manually

### Step 5c: User selects organizations

The user selects which organizations to grant the application access to.

### Step 5d: Handle the return redirect

After selection, JD redirects back to your `redirect_uri`. Re-check `GET /organizations` — `connections` links should be replaced by `manage_connections` links.

If a `connections` link still appears after the redirect, the user chose not to connect that organization. Do not redirect again.

---

## Phase 6: Call API Resources

With a valid access token and established organization connections, include the token in all API calls:

```
Authorization: Bearer {access_token}
Accept: application/vnd.deere.axiom.v3+json
```

---

## Phase 7: Refresh Tokens

Access tokens expire after **12 hours**. Refresh before expiry:

```
POST https://signin.johndeere.com/oauth2/aus78tnlaysMraFhC1t7/v1/token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {base64(client_id:client_secret)}

grant_type=refresh_token
refresh_token={refresh_token}
scope={scopes}
```

- Refresh tokens expire after **365 days** of inactivity
- As long as refreshes continue, the token remains active indefinitely
- If the user removes all organization connections at `connections.deere.com`, the refresh token is invalidated

---

## Complete Flow Diagram

```
Client App                    JD Auth Server              JD API
    |                               |                         |
    |-- GET /authorize -----------> |                         |
    |   (response_type, scope,      |                         |
    |    client_id, state,          |                         |
    |    redirect_uri)              |                         |
    |                               |                         |
    |        [user signs in]        |                         |
    |        [user accepts scopes]  |                         |
    |                               |                         |
    | <-- redirect ?code&state ---- |                         |
    |                               |                         |
    |-- POST /token ---------------> |                         |
    |   (grant_type=auth_code,      |                         |
    |    code, redirect_uri)        |                         |
    |                               |                         |
    | <-- access_token, ----------- |                         |
    |     refresh_token             |                         |
    |                               |                         |
    |-- GET /organizations ---------------------------------> |
    |                                                         |
    | <-- orgs with 'connections' links ------------------- |
    |                                                         |
    |-- redirect user to connections.deere.com               |
    |                                                         |
    |        [user selects organizations]                     |
    |                                                         |
    | <-- redirect back to redirect_uri                       |
    |                                                         |
    |-- GET /organizations ---------------------------------> |
    |                                                         |
    | <-- orgs with 'manage_connections' links ------------ |
    |                                                         |
    |-- GET /organizations/{orgId}/... -------------------- |
    |                                                         |
    | <-- data -------------------------------------------- |
```
