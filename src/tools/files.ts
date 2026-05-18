import { z } from "zod";
import { jdFetch, jdFetchAll, jdRequest, jdUpload } from "../jd-api";
import type { ToolRegistrationContext } from "./types";

const FILE_NAME_CHAR = /[\p{N}\p{L}.,_ \-]/u;
const FILE_NAME_VALID = /^[\p{N}\p{L}.,_ \-]+$/u;

const FILE_FILTERS = ["ALL", "MACHINE"] as const;

const CONTENT_TYPES = [
  "application/zip",
  "application/x-zip",
  "application/x-zip-compressed",
  "application/octet-stream",
] as const;

function platformUri(path: string): string {
  return `https://sandboxapi.deere.com/platform${path}`;
}

function equipmentUri(equipmentId: string): string {
  return `https://equipmentapi.deere.com/isg/equipment/${equipmentId}`;
}

/**
 * Sanitize a filename to satisfy the JD Files API constraints:
 * 5-69 chars, only letters/numbers/spaces/.,_-.
 * Preserves the extension when possible.
 */
export function sanitizeFileName(name: string): string {
  let cleaned = "";
  for (const ch of name) cleaned += FILE_NAME_CHAR.test(ch) ? ch : "_";
  if (!cleaned) cleaned = "file.zip";

  const dot = cleaned.lastIndexOf(".");
  const ext = dot > 0 ? cleaned.slice(dot) : "";
  const base = dot > 0 ? cleaned.slice(0, dot) : cleaned;

  if (cleaned.length > 69) {
    const allowed = 69 - ext.length;
    cleaned = base.slice(0, Math.max(1, allowed)) + ext;
  }
  if (cleaned.length < 5) {
    cleaned = (base + "_file").slice(0, 64) + ext;
    while (cleaned.length < 5) cleaned += "_";
  }
  if (!FILE_NAME_VALID.test(cleaned)) {
    throw new Error("Failed to produce a valid filename.");
  }
  return cleaned;
}

function fileIdFromLocation(location: string | null): string {
  if (!location) throw new Error("No Location header returned for created file.");
  const match = location.match(/\/files\/([^/?#]+)/);
  if (!match) throw new Error(`Could not parse file id from Location: ${location}`);
  return match[1];
}

function transferIdFromLocation(location: string | null): string {
  if (!location) throw new Error("No Location header returned for file transfer.");
  const match = location.match(/\/fileTransfers\/([^/?#]+)/);
  if (!match) throw new Error(`Could not parse transfer id from Location: ${location}`);
  return match[1];
}

function decodeBase64(input: string): Uint8Array {
  const cleaned = input.replace(/\s+/g, "");
  const binary = atob(cleaned);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function summarizeFile(f: {
  id?: string;
  name?: string;
  type?: string;
  status?: string;
  nativeSize?: string | number;
  createdTime?: string;
  modifiedTime?: string;
  source?: string;
  transferPending?: boolean | string;
  archived?: boolean | string;
  format?: string;
  manufacturer?: string;
  links?: Array<{ rel: string; uri: string }>;
}) {
  return {
    id: f.id,
    name: f.name,
    type: f.type,
    status: f.status,
    nativeSize: f.nativeSize,
    createdTime: f.createdTime,
    modifiedTime: f.modifiedTime,
    source: f.source,
    transferPending: f.transferPending,
    archived: f.archived,
    format: f.format,
    manufacturer: f.manufacturer,
    links: (f.links || []).map((l) => l.rel),
  };
}

export function registerFileTools({ server, props, env, sql }: ToolRegistrationContext) {
  server.registerTool(
    "jd_list_org_files",
    {
      description:
        "List files in an Operations Center organization (setup, prescription, boundary, etc.).",
      inputSchema: {
        org_id: z.string().describe("The organization ID."),
        filter: z.enum(FILE_FILTERS).optional().describe("ALL (default) or MACHINE."),
      },
    },
    async ({ org_id, filter }) => {
      const params = new URLSearchParams();
      if (filter) params.set("filter", filter);
      const qs = params.toString();
      const values = await jdFetchAll<Parameters<typeof summarizeFile>[0]>(
        `/organizations/${org_id}/files${qs ? `?${qs}` : ""}`,
        props,
        env,
        sql,
        { cache: false }
      );
      const files = values.map(summarizeFile);
      return {
        content: [
          {
            type: "text" as const,
            text: files.length === 0 ? "No files found." : JSON.stringify(files, null, 2),
          },
        ],
      };
    }
  );

  server.registerTool(
    "jd_get_file",
    {
      description: "Get metadata for a single file, including links to machines it can be sent to.",
      inputSchema: {
        file_id: z.string().describe("The Ops Center file ID."),
      },
    },
    async ({ file_id }) => {
      const file = await jdFetch(`/files/${file_id}`, props, env, sql, { cache: false });
      return {
        content: [{ type: "text" as const, text: JSON.stringify(file, null, 2) }],
      };
    }
  );

  server.registerTool(
    "jd_create_file",
    {
      description:
        "Create a file ID in an organization. Returns the new fileId for use with jd_upload_file_bytes. Name will be sanitized to satisfy JD constraints (5-69 chars, letters/numbers/.,_- only).",
      inputSchema: {
        org_id: z.string().describe("The organization ID."),
        name: z.string().describe("Desired filename, e.g. back40.zip."),
      },
    },
    async ({ org_id, name }) => {
      const sanitized = sanitizeFileName(name);
      const result = await jdRequest(`/organizations/${org_id}/files`, props, env, {
        method: "POST",
        body: { name: sanitized },
      });
      const fileId = fileIdFromLocation(result.location);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              { fileId, name: sanitized, location: result.location, status: result.status },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  server.registerTool(
    "jd_upload_file_bytes",
    {
      description:
        "Upload binary content for a file ID created via jd_create_file. Pass the file contents as a base64-encoded string.",
      inputSchema: {
        file_id: z.string().describe("The file ID returned by jd_create_file."),
        base64_body: z.string().describe("Base64-encoded file contents."),
        content_type: z
          .enum(CONTENT_TYPES)
          .optional()
          .describe("Content-Type to send. Defaults to application/zip."),
      },
    },
    async ({ file_id, base64_body, content_type }) => {
      const bytes = decodeBase64(base64_body);
      const ct = content_type ?? "application/zip";
      const result = await jdUpload(`/files/${file_id}`, props, env, bytes, ct);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              { fileId: file_id, status: result.status, byteLength: bytes.byteLength, contentType: ct },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  server.registerTool(
    "jd_transfer_file_to_machine",
    {
      description:
        "Send an Ops Center file to a piece of equipment over the air (e.g. modem). Returns a transfer ID — poll status with jd_get_file_transfer.",
      inputSchema: {
        org_id: z.string().describe("The organization ID that owns the file."),
        file_id: z.string().describe("The Ops Center file ID."),
        equipment_id: z.string().optional().describe("Equipment ID. Used to build the equipment URI if equipment_uri is not provided."),
        equipment_uri: z.string().optional().describe("Full equipment URI. Takes precedence over equipment_id."),
      },
    },
    async ({ org_id, file_id, equipment_id, equipment_uri }) => {
      const equipUri = equipment_uri || (equipment_id ? equipmentUri(equipment_id) : undefined);
      if (!equipUri) throw new Error("equipment_id or equipment_uri is required.");

      const result = await jdRequest(`/organizations/${org_id}/fileTransfers`, props, env, {
        method: "POST",
        body: {
          links: [
            { rel: "file", uri: platformUri(`/files/${file_id}`) },
            { rel: "equipment", uri: equipUri },
          ],
        },
      });

      const transferId = transferIdFromLocation(result.location);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              { transferId, status: result.status, location: result.location, fileId: file_id, equipmentUri: equipUri },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  server.registerTool(
    "jd_get_file_transfer",
    {
      description: "Get the status of a file-to-machine transfer.",
      inputSchema: {
        transfer_id: z.string().describe("The transfer ID returned by jd_transfer_file_to_machine."),
      },
    },
    async ({ transfer_id }) => {
      const transfer = await jdFetch(`/fileTransfers/${transfer_id}`, props, env, sql, { cache: false });
      return {
        content: [{ type: "text" as const, text: JSON.stringify(transfer, null, 2) }],
      };
    }
  );
}
