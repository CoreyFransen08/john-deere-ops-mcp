# John Deere Operations Center - Files API

This archive contains markdown reference documents for all 9 endpoints in the Files API documentation.

Source: https://developer.deere.com/dev-docs/files

Coverage:
- Files (5 endpoints): list, view/download, upload/update, list-by-org, create file ID
- File Transfers (4 endpoints): submit, list-by-org, list, view single

## Endpoint Index

- **GET** `/files` - [GET_files.md](./GET_files.md)
- **GET** `/files/{fileId}` - [GET_files-fileId.md](./GET_files-fileId.md)
- **PUT** `/files/{fileId}` - [PUT_files-fileId.md](./PUT_files-fileId.md)
- **GET** `/organizations/{orgId}/files` - [GET_organizations-orgId-files.md](./GET_organizations-orgId-files.md)
- **POST** `/organizations/{orgId}/files` - [POST_organizations-orgId-files.md](./POST_organizations-orgId-files.md)
- **POST** `/organizations/{orgId}/fileTransfers` - [POST_organizations-orgId-fileTransfers.md](./POST_organizations-orgId-fileTransfers.md)
- **GET** `/organizations/{orgId}/fileTransfers` - [GET_organizations-orgId-fileTransfers.md](./GET_organizations-orgId-fileTransfers.md)
- **GET** `/fileTransfers` - [GET_fileTransfers.md](./GET_fileTransfers.md)
- **GET** `/fileTransfers/{id}` - [GET_fileTransfers-id.md](./GET_fileTransfers-id.md)
