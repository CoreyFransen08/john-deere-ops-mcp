export function fileToolPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>File Tool — John Deere Ops Center</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f4f4f4;min-height:100vh;padding:24px;color:#222}
    .wrap{max-width:880px;margin:0 auto}
    header{display:flex;align-items:center;gap:14px;margin-bottom:22px}
    .badge{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;background:#367c2b;border-radius:50%;flex-shrink:0}
    .badge svg{width:22px;height:22px;fill:#fff}
    h1{font-size:22px;font-weight:600;line-height:1.2}
    .sub{font-size:13px;color:#666;margin-top:2px}
    .card{background:#fff;border-radius:10px;padding:24px;box-shadow:0 2px 16px rgba(0,0,0,.06);margin-bottom:18px}
    label{display:block;font-size:13px;font-weight:600;color:#333;margin-bottom:6px}
    select,input[type=text]{width:100%;padding:9px 11px;border:1px solid #d0d0d0;border-radius:6px;font-size:14px;background:#fff}
    select:focus,input:focus{outline:none;border-color:#367c2b}
    .tabs{display:flex;gap:0;border-bottom:1px solid #e0e0e0;margin-bottom:18px}
    .tab{padding:10px 18px;font-size:14px;font-weight:600;color:#666;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px}
    .tab.active{color:#367c2b;border-bottom-color:#367c2b}
    .drop{border:2px dashed #c0c0c0;border-radius:8px;padding:38px 20px;text-align:center;background:#fafafa;cursor:pointer;transition:.15s}
    .drop:hover,.drop.over{border-color:#367c2b;background:#f0f7ee}
    .drop p{font-size:14px;color:#555;margin:6px 0 0}
    .drop strong{color:#367c2b}
    .btn{display:inline-block;background:#367c2b;color:#fff;border:0;padding:10px 22px;border-radius:6px;font-size:14px;font-weight:600;cursor:pointer;text-decoration:none}
    .btn:hover:not(:disabled){background:#2d6a24}
    .btn:disabled{background:#aaa;cursor:not-allowed}
    .btn.ghost{background:#fff;color:#367c2b;border:1px solid #367c2b}
    .btn.ghost:hover:not(:disabled){background:#f0f7ee}
    .btn.small{padding:6px 12px;font-size:13px}
    .row{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
    .log{background:#0e0e0e;color:#cce6c2;font-family:'SF Mono','Monaco',Menlo,monospace;font-size:12px;padding:14px 16px;border-radius:6px;max-height:240px;overflow:auto;white-space:pre-wrap;margin-top:14px}
    .log .err{color:#ff7a7a}
    .log .ok{color:#9bd97e}
    .status{display:inline-block;padding:3px 9px;border-radius:11px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.3px}
    .status.ready{background:#deeed8;color:#2d6a24}
    .status.pending{background:#fff3cf;color:#8a6900}
    .status.failed{background:#ffd4d4;color:#a32020}
    table{width:100%;border-collapse:collapse;font-size:13px}
    th,td{text-align:left;padding:9px 10px;border-bottom:1px solid #eee}
    th{background:#fafafa;font-weight:600;color:#555;font-size:12px;text-transform:uppercase;letter-spacing:.3px}
    tr:hover{background:#fafafa}
    .empty{padding:28px;text-align:center;color:#888;font-size:13px}
    .hide{display:none}
    .toolbar{display:flex;gap:10px;align-items:center;margin-bottom:14px;flex-wrap:wrap}
    .toolbar .spacer{flex:1}
    .grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    @media (max-width:600px){.grid2{grid-template-columns:1fr}}
    .note{font-size:12px;color:#777;margin-top:6px;line-height:1.5}
    .err-banner{background:#fff3f3;border:1px solid #ffd4d4;color:#a32020;padding:10px 14px;border-radius:6px;font-size:13px;margin-bottom:14px}
  </style>
</head>
<body>
<div class="wrap">
  <header>
    <div class="badge"><svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg></div>
    <div>
      <h1>Ops Center File Tool</h1>
      <div class="sub">Round-trip RX, boundary, and setup zips through Ops Center, then download or push them to a machine.</div>
    </div>
  </header>

  <div id="auth-banner" class="card hide">
    <p>You're not signed in to Ops Center. <a href="/api/auth/login?returnTo=/file-tool" class="btn small">Sign in</a></p>
  </div>

  <div id="main" class="hide">
    <div class="card">
      <label for="org">Organization</label>
      <select id="org"><option>Loading…</option></select>
    </div>

    <div class="tabs">
      <div class="tab active" data-tab="upload">Upload & round-trip</div>
      <div class="tab" data-tab="existing">Pick existing</div>
    </div>

    <!-- UPLOAD TAB -->
    <div id="tab-upload" class="card">
      <div id="drop" class="drop">
        <strong>Drop a file here</strong>
        <p>or <span style="text-decoration:underline;cursor:pointer">click to browse</span> — zip up to 800 MB</p>
        <input id="file-input" type="file" class="hide">
      </div>

      <div id="upload-meta" class="hide" style="margin-top:16px">
        <div class="grid2">
          <div>
            <label>File name</label>
            <input id="upload-name" type="text">
            <div class="note">JD requires 5-69 chars. Disallowed characters are replaced with underscores.</div>
          </div>
          <div>
            <label>Size</label>
            <input id="upload-size" type="text" readonly>
          </div>
        </div>
        <div class="row" style="margin-top:14px">
          <button id="upload-go" class="btn">Upload to Ops Center</button>
          <button id="upload-cancel" class="btn ghost">Cancel</button>
        </div>
      </div>

      <div id="upload-result" class="hide" style="margin-top:18px">
        <div class="row">
          <span class="status" id="up-status">…</span>
          <span id="up-file-name" style="font-weight:600"></span>
          <span class="spacer" style="flex:1"></span>
          <a id="up-download" class="btn small hide">Download repackaged</a>
          <button id="up-send" class="btn ghost small hide">Send to machine</button>
        </div>
      </div>

      <div id="upload-log" class="log hide"></div>
    </div>

    <!-- EXISTING TAB -->
    <div id="tab-existing" class="card hide">
      <div class="toolbar">
        <button id="reload" class="btn ghost small">Reload</button>
        <div class="spacer"></div>
      </div>
      <div id="files-list"><div class="empty">Pick an organization to load files.</div></div>
    </div>

    <!-- SEND-TO-MACHINE PANEL -->
    <div id="send-panel" class="card hide">
      <label>Send "<span id="send-file-name"></span>" to equipment</label>
      <div class="grid2" style="margin-top:8px">
        <select id="equipment-pick"><option>Loading…</option></select>
        <div class="row">
          <button id="send-go" class="btn">Send</button>
          <button id="send-cancel" class="btn ghost">Cancel</button>
        </div>
      </div>
      <div id="send-log" class="log hide"></div>
    </div>
  </div>
</div>

<script>
const ACCEPT_JSON = "application/vnd.deere.axiom.v3+json";
const FILE_NAME_VALID = /^[\\p{N}\\p{L}.,_ \\-]+$/u;

function $(id){ return document.getElementById(id); }
function show(el){ el.classList.remove("hide"); }
function hide(el){ el.classList.add("hide"); }

function logTo(boxId, msg, kind){
  const box = $(boxId);
  show(box);
  const line = document.createElement("div");
  if (kind) line.className = kind;
  line.textContent = "[" + new Date().toLocaleTimeString() + "] " + msg;
  box.appendChild(line);
  box.scrollTop = box.scrollHeight;
}

function sanitizeName(name){
  let cleaned = "";
  for (const ch of name) cleaned += /[\\p{N}\\p{L}.,_ \\-]/u.test(ch) ? ch : "_";
  if (!cleaned) cleaned = "file.zip";
  const dot = cleaned.lastIndexOf(".");
  const ext = dot > 0 ? cleaned.slice(dot) : "";
  const base = dot > 0 ? cleaned.slice(0, dot) : cleaned;
  if (cleaned.length > 69){
    const allowed = 69 - ext.length;
    cleaned = base.slice(0, Math.max(1, allowed)) + ext;
  }
  if (cleaned.length < 5){
    cleaned = (base + "_file").slice(0, 64) + ext;
    while (cleaned.length < 5) cleaned += "_";
  }
  return cleaned;
}

function fmtBytes(n){
  if (n < 1024) return n + " B";
  if (n < 1024*1024) return (n/1024).toFixed(1) + " KB";
  if (n < 1024*1024*1024) return (n/1024/1024).toFixed(1) + " MB";
  return (n/1024/1024/1024).toFixed(2) + " GB";
}

function contentTypeFor(name){
  return /\\.zip$/i.test(name) ? "application/zip" : "application/octet-stream";
}

async function jdJson(path, opts){
  const init = Object.assign({ credentials: "same-origin", headers: { Accept: ACCEPT_JSON } }, opts || {});
  const res = await fetch(path, init);
  if (res.status === 401){
    location.href = "/api/auth/login?returnTo=/file-tool";
    throw new Error("Not authenticated.");
  }
  if (!res.ok){
    const text = await res.text();
    throw new Error("Request failed (" + res.status + "): " + text);
  }
  const ct = res.headers.get("content-type") || "";
  return { json: ct.includes("json") ? await res.json() : null, location: res.headers.get("Location"), status: res.status };
}

async function checkAuth(){
  const res = await fetch("/api/auth/me", { credentials: "same-origin" });
  if (!res.ok) return false;
  return true;
}

async function loadOrgs(){
  const { json } = await jdJson("/api/organizations");
  const orgs = (json && json.values) || [];
  const sel = $("org");
  sel.innerHTML = "";
  if (!orgs.length){
    sel.innerHTML = '<option value="">No organizations connected</option>';
    return;
  }
  for (const o of orgs){
    const opt = document.createElement("option");
    opt.value = o.id;
    opt.textContent = o.name + " (" + o.id + ")";
    sel.appendChild(opt);
  }
}

// ── Upload tab ────────────────────────────────────────────────────────────
let pendingFile = null;
let lastUploadedFileId = null;

function resetUpload(){
  pendingFile = null;
  lastUploadedFileId = null;
  hide($("upload-meta"));
  hide($("upload-result"));
  hide($("upload-log"));
  $("upload-log").innerHTML = "";
  $("up-download").classList.add("hide");
  $("up-send").classList.add("hide");
  $("file-input").value = "";
}

function pickFile(file){
  pendingFile = file;
  $("upload-name").value = sanitizeName(file.name);
  $("upload-size").value = fmtBytes(file.size);
  show($("upload-meta"));
  hide($("upload-result"));
  hide($("upload-log"));
  $("upload-log").innerHTML = "";
}

async function pollFileStatus(fileId, log){
  let delay = 1000;
  for (let i = 0; i < 20; i++){
    await new Promise(r => setTimeout(r, delay));
    const { json } = await jdJson("/api/files/" + encodeURIComponent(fileId));
    const status = (json && json.status) || "UNKNOWN";
    logTo(log, "  poll #" + (i+1) + " → " + status);
    if (status === "READY") return json;
    if (status === "FAILED" || status === "ERROR") throw new Error("File processing failed: " + status);
    delay = Math.min(delay * 1.4, 5000);
  }
  throw new Error("Timed out waiting for file to reach READY.");
}

async function runUpload(){
  if (!pendingFile) return;
  const orgId = $("org").value;
  if (!orgId) { alert("Pick an organization first."); return; }
  const name = $("upload-name").value;
  if (!FILE_NAME_VALID.test(name) || name.length < 5 || name.length > 69){
    alert("File name must be 5-69 chars, letters/numbers/.,_- only.");
    return;
  }

  $("upload-go").disabled = true;
  $("upload-cancel").disabled = true;
  hide($("upload-result"));
  $("upload-log").innerHTML = "";

  try {
    logTo("upload-log", "Creating file in org " + orgId + "…");
    const created = await jdJson("/api/organizations/" + encodeURIComponent(orgId) + "/files", {
      method: "POST",
      headers: { Accept: ACCEPT_JSON, "Content-Type": ACCEPT_JSON },
      body: JSON.stringify({ name }),
    });
    const fileId = (created.location || "").match(/\\/files\\/([^/?#]+)/);
    if (!fileId) throw new Error("No fileId in Location header");
    const id = fileId[1];
    logTo("upload-log", "  fileId = " + id, "ok");

    logTo("upload-log", "Uploading " + fmtBytes(pendingFile.size) + " (" + contentTypeFor(name) + ")…");
    const putRes = await fetch("/api/files/" + encodeURIComponent(id), {
      method: "PUT",
      credentials: "same-origin",
      headers: { "Content-Type": contentTypeFor(name), Accept: ACCEPT_JSON },
      body: pendingFile,
    });
    if (!putRes.ok){
      const text = await putRes.text();
      throw new Error("PUT failed (" + putRes.status + "): " + text);
    }
    logTo("upload-log", "  upload OK", "ok");

    logTo("upload-log", "Waiting for Ops Center to process…");
    const meta = await pollFileStatus(id, "upload-log");
    logTo("upload-log", "Ready ✓", "ok");

    lastUploadedFileId = id;
    $("up-file-name").textContent = meta.name || name;
    const st = $("up-status");
    st.textContent = meta.status || "READY";
    st.className = "status ready";
    const dl = $("up-download");
    dl.href = "/api/files/" + encodeURIComponent(id) + "?offset=-1&size=-1";
    dl.setAttribute("download", meta.name || name);
    dl.classList.remove("hide");
    $("up-send").classList.remove("hide");
    show($("upload-result"));
  } catch (e){
    logTo("upload-log", String(e.message || e), "err");
  } finally {
    $("upload-go").disabled = false;
    $("upload-cancel").disabled = false;
  }
}

// ── Existing tab ──────────────────────────────────────────────────────────
async function loadExistingFiles(){
  const orgId = $("org").value;
  const box = $("files-list");
  if (!orgId){ box.innerHTML = '<div class="empty">Pick an organization to load files.</div>'; return; }
  box.innerHTML = '<div class="empty">Loading…</div>';
  try {
    const { json } = await jdJson("/api/organizations/" + encodeURIComponent(orgId) + "/files");
    const files = (json && json.values) || [];
    if (!files.length){ box.innerHTML = '<div class="empty">No files in this org.</div>'; return; }
    const rows = files.map(f => {
      const status = f.status || "";
      const cls = status === "READY" ? "ready" : status.includes("PENDING") ? "pending" : status.includes("FAIL") ? "failed" : "";
      return '<tr>' +
        '<td>' + escapeHtml(f.name || "(unnamed)") + '</td>' +
        '<td>' + escapeHtml(f.type || "") + '</td>' +
        '<td>' + (f.nativeSize ? fmtBytes(Number(f.nativeSize)) : "") + '</td>' +
        '<td><span class="status ' + cls + '">' + escapeHtml(status) + '</span></td>' +
        '<td style="white-space:nowrap">' +
          '<a class="btn small" href="/api/files/' + encodeURIComponent(f.id) + '?offset=-1&size=-1" download="' + escapeHtml(f.name || f.id) + '">Download</a> ' +
          '<button class="btn ghost small" data-send="' + escapeHtml(f.id) + '" data-name="' + escapeHtml(f.name || f.id) + '">Send to machine</button>' +
        '</td>' +
      '</tr>';
    }).join("");
    box.innerHTML = '<table><thead><tr><th>Name</th><th>Type</th><th>Size</th><th>Status</th><th></th></tr></thead><tbody>' + rows + '</tbody></table>';
    box.querySelectorAll("button[data-send]").forEach(b => {
      b.addEventListener("click", () => openSendPanel(b.getAttribute("data-send"), b.getAttribute("data-name")));
    });
  } catch (e){
    box.innerHTML = '<div class="err-banner">' + escapeHtml(String(e.message || e)) + '</div>';
  }
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
}

// ── Send to machine panel ─────────────────────────────────────────────────
let sendingFileId = null;

async function openSendPanel(fileId, fileName){
  sendingFileId = fileId;
  $("send-file-name").textContent = fileName;
  $("send-log").innerHTML = "";
  hide($("send-log"));
  show($("send-panel"));
  const sel = $("equipment-pick");
  sel.innerHTML = "<option>Loading equipment…</option>";
  try {
    const orgId = $("org").value;
    const { json } = await jdJson("/api/equipment?organizationIds=" + encodeURIComponent(orgId));
    const items = (json && json.values) || [];
    sel.innerHTML = "";
    if (!items.length){ sel.innerHTML = '<option value="">No equipment found</option>'; return; }
    for (const eq of items){
      const opt = document.createElement("option");
      const uri = (eq.links || []).find(l => l.rel === "self")?.uri || ("https://equipmentapi.deere.com/isg/equipment/" + eq.id);
      opt.value = uri;
      opt.textContent = (eq.name || "Equipment " + eq.id) + (eq.category ? " — " + eq.category : "");
      sel.appendChild(opt);
    }
  } catch (e){
    sel.innerHTML = '<option value="">' + escapeHtml(String(e.message || e)) + '</option>';
  }
  $("send-panel").scrollIntoView({ behavior: "smooth", block: "center" });
}

async function runSend(){
  if (!sendingFileId) return;
  const orgId = $("org").value;
  const equipUri = $("equipment-pick").value;
  if (!equipUri){ alert("Pick a machine."); return; }
  $("send-go").disabled = true;
  try {
    logTo("send-log", "Submitting transfer…");
    const res = await jdJson("/api/organizations/" + encodeURIComponent(orgId) + "/fileTransfers", {
      method: "POST",
      headers: { Accept: ACCEPT_JSON, "Content-Type": ACCEPT_JSON },
      body: JSON.stringify({
        links: [
          { rel: "file", uri: "https://sandboxapi.deere.com/platform/files/" + sendingFileId },
          { rel: "equipment", uri: equipUri },
        ],
      }),
    });
    const m = (res.location || "").match(/\\/fileTransfers\\/([^/?#]+)/);
    if (!m) throw new Error("No transferId in Location");
    const transferId = m[1];
    logTo("send-log", "  transferId = " + transferId, "ok");
    // Poll status briefly
    let delay = 1500;
    for (let i = 0; i < 15; i++){
      await new Promise(r => setTimeout(r, delay));
      const { json } = await jdJson("/api/fileTransfers/" + encodeURIComponent(transferId));
      const status = (json && (json.status || json.state)) || "UNKNOWN";
      logTo("send-log", "  poll #" + (i+1) + " → " + status);
      if (status === "COMPLETED" || status === "SUCCESS"){ logTo("send-log", "Done ✓", "ok"); break; }
      if (status === "FAILED" || status === "ERROR"){ logTo("send-log", "Transfer failed", "err"); break; }
      delay = Math.min(delay * 1.3, 5000);
    }
  } catch (e){
    logTo("send-log", String(e.message || e), "err");
  } finally {
    $("send-go").disabled = false;
  }
}

// ── Wire up ───────────────────────────────────────────────────────────────
document.querySelectorAll(".tab").forEach(t => {
  t.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    const which = t.getAttribute("data-tab");
    $("tab-upload").classList.toggle("hide", which !== "upload");
    $("tab-existing").classList.toggle("hide", which !== "existing");
    if (which === "existing") loadExistingFiles();
  });
});

const drop = $("drop");
const fileInput = $("file-input");
drop.addEventListener("click", () => fileInput.click());
drop.addEventListener("dragover", e => { e.preventDefault(); drop.classList.add("over"); });
drop.addEventListener("dragleave", () => drop.classList.remove("over"));
drop.addEventListener("drop", e => {
  e.preventDefault(); drop.classList.remove("over");
  if (e.dataTransfer.files[0]) pickFile(e.dataTransfer.files[0]);
});
fileInput.addEventListener("change", e => { if (e.target.files[0]) pickFile(e.target.files[0]); });

$("upload-go").addEventListener("click", runUpload);
$("upload-cancel").addEventListener("click", resetUpload);
$("reload").addEventListener("click", loadExistingFiles);
$("up-send").addEventListener("click", () => {
  if (lastUploadedFileId) openSendPanel(lastUploadedFileId, $("up-file-name").textContent);
});
$("send-go").addEventListener("click", runSend);
$("send-cancel").addEventListener("click", () => { hide($("send-panel")); sendingFileId = null; });
$("org").addEventListener("change", () => {
  if (!$("tab-existing").classList.contains("hide")) loadExistingFiles();
});

(async () => {
  const ok = await checkAuth();
  if (!ok){ show($("auth-banner")); return; }
  show($("main"));
  try { await loadOrgs(); } catch (e){ alert(e.message); }
})();
</script>
</body>
</html>`;
}
