#!/usr/bin/env node
import { spawn, spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const wranglerConfigPath = resolve(repoRoot, "wrangler.jsonc");
const packageJsonPath = resolve(repoRoot, "package.json");
const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
const npxCmd = process.platform === "win32" ? "npx.cmd" : "npx";

function header(text) {
	console.log(`\n── ${text} ──`);
}

function fail(message, detail) {
	console.error(`\nSetup failed: ${message}`);
	if (detail) console.error(detail);
	process.exit(1);
}

function runInherit(cmd, args, opts = {}) {
	const result = spawnSync(cmd, args, {
		cwd: repoRoot,
		stdio: "inherit",
		shell: false,
		...opts,
	});
	if (result.status !== 0) {
		fail(`\`${cmd} ${args.join(" ")}\` exited with code ${result.status}`);
	}
}

function runCapture(cmd, args) {
	const result = spawnSync(cmd, args, {
		cwd: repoRoot,
		encoding: "utf8",
		shell: false,
	});
	if (result.status !== 0) {
		fail(
			`\`${cmd} ${args.join(" ")}\` exited with code ${result.status}`,
			result.stderr || result.stdout,
		);
	}
	return result.stdout;
}

function runTee(cmd, args) {
	return new Promise((resolveTee) => {
		const child = spawn(cmd, args, {
			cwd: repoRoot,
			stdio: ["inherit", "pipe", "pipe"],
			shell: false,
		});
		let stdoutBuf = "";
		let stderrBuf = "";
		child.stdout.on("data", (chunk) => {
			const s = chunk.toString();
			stdoutBuf += s;
			process.stdout.write(s);
		});
		child.stderr.on("data", (chunk) => {
			const s = chunk.toString();
			stderrBuf += s;
			process.stderr.write(s);
		});
		child.on("close", (code) => {
			resolveTee({ code, stdout: stdoutBuf, stderr: stderrBuf });
		});
	});
}

function pipeStdinValue(cmd, args, value) {
	return new Promise((resolvePipe) => {
		const child = spawn(cmd, args, {
			cwd: repoRoot,
			stdio: ["pipe", "inherit", "inherit"],
			shell: false,
		});
		child.stdin.write(value);
		child.stdin.write("\n");
		child.stdin.end();
		child.on("close", (code) => resolvePipe(code));
	});
}

async function promptVisible(question) {
	const rl = createInterface({ input, output });
	const answer = (await rl.question(question)).trim();
	rl.close();
	return answer;
}

async function promptMasked(question) {
	process.stdout.write(question);
	return new Promise((resolvePrompt) => {
		const wasRaw = input.isTTY ? input.isRaw : false;
		if (input.isTTY) input.setRawMode(true);
		input.resume();
		input.setEncoding("utf8");
		let buf = "";
		const onData = (ch) => {
			switch (ch) {
				case "\n":
				case "\r":
				case "":
					if (input.isTTY) input.setRawMode(wasRaw);
					input.pause();
					input.removeListener("data", onData);
					process.stdout.write("\n");
					resolvePrompt(buf.trim());
					return;
				case "":
					process.stdout.write("\n");
					process.exit(130);
					return;
				case "":
				case "\b":
					if (buf.length > 0) {
						buf = buf.slice(0, -1);
						process.stdout.write("\b \b");
					}
					return;
				default:
					buf += ch;
					process.stdout.write("*");
			}
		};
		input.on("data", onData);
	});
}

function patchKvNamespaceId(newId) {
	const original = readFileSync(wranglerConfigPath, "utf8");
	const pattern =
		/("binding"\s*:\s*"OAUTH_KV"\s*,\s*"id"\s*:\s*")[^"]*(")/;
	if (!pattern.test(original)) {
		fail(
			"Could not locate OAUTH_KV binding in wrangler.jsonc to patch its id.",
			"Edit wrangler.jsonc manually and set the OAUTH_KV id to: " + newId,
		);
	}
	const updated = original.replace(pattern, `$1${newId}$2`);
	writeFileSync(wranglerConfigPath, updated);
}

function extractKvId(stdoutText) {
	const idMatch = stdoutText.match(/id\s*=\s*"([0-9a-f]+)"/i);
	if (idMatch) return idMatch[1];
	const jsonMatch = stdoutText.match(/"id"\s*:\s*"([0-9a-f]+)"/i);
	if (jsonMatch) return jsonMatch[1];
	return null;
}

function extractWorkerUrl(text) {
	const match = text.match(/https:\/\/[a-z0-9-]+\.[a-z0-9-]+\.workers\.dev/i);
	return match ? match[0] : null;
}

async function main() {
	if (!existsSync(wranglerConfigPath) || !existsSync(packageJsonPath)) {
		fail(
			"This script must be run from the repo root (wrangler.jsonc + package.json not found).",
		);
	}

	console.log("John Deere Ops MCP — setup");
	console.log(
		"This will install dependencies, log you into Cloudflare, create a KV namespace,",
	);
	console.log("set the required secrets, and deploy the Worker.\n");

	header("1/6 Installing dependencies");
	runInherit(npmCmd, ["install"]);

	header("2/6 Cloudflare login");
	runInherit(npxCmd, ["wrangler", "login"]);

	header("3/6 Creating KV namespace (OAUTH_KV)");
	const kvOut = runCapture(npxCmd, [
		"wrangler",
		"kv",
		"namespace",
		"create",
		"OAUTH_KV",
	]);
	process.stdout.write(kvOut);
	const kvId = extractKvId(kvOut);
	if (!kvId) {
		fail(
			"Could not parse the new KV namespace id from Wrangler output.",
			"Paste the id into wrangler.jsonc under the OAUTH_KV binding manually, then re-run setup skipping this step.",
		);
	}
	patchKvNamespaceId(kvId);
	console.log(`Patched wrangler.jsonc: OAUTH_KV id = ${kvId}`);

	header("4/6 John Deere credentials");
	console.log(
		"Get these from developer.deere.com → My Applications → your app.",
	);
	const jdClientId = await promptVisible("JD_CLIENT_ID (Application ID): ");
	if (!jdClientId) fail("JD_CLIENT_ID is required.");
	const jdClientSecret = await promptMasked("JD_CLIENT_SECRET: ");
	if (!jdClientSecret) fail("JD_CLIENT_SECRET is required.");
	const cookieKey = randomBytes(32).toString("hex");
	console.log("Generated COOKIE_ENCRYPTION_KEY (64-char random hex).");

	header("5/6 Pushing secrets to Cloudflare");
	const secrets = [
		["JD_CLIENT_ID", jdClientId],
		["JD_CLIENT_SECRET", jdClientSecret],
		["COOKIE_ENCRYPTION_KEY", cookieKey],
	];
	for (const [name, value] of secrets) {
		console.log(`\nSetting ${name}…`);
		const code = await pipeStdinValue(
			npxCmd,
			["wrangler", "secret", "put", name],
			value,
		);
		if (code !== 0) fail(`wrangler secret put ${name} failed (code ${code}).`);
	}

	header("6/6 Deploying Worker");
	const { code: deployCode, stdout: deployOut } = await runTee(npxCmd, [
		"wrangler",
		"deploy",
	]);
	if (deployCode !== 0) fail(`wrangler deploy failed (code ${deployCode}).`);

	const workerUrl = extractWorkerUrl(deployOut);
	console.log("\n" + "=".repeat(64));
	if (workerUrl) {
		console.log("Deployment complete.\n");
		console.log(`MCP endpoint (use this in your MCP client):`);
		console.log(`  ${workerUrl}/mcp\n`);
		console.log(
			"Before connecting, register this redirect URI at developer.deere.com",
		);
		console.log("(My Applications → your app → Redirect URIs):");
		console.log(`  ${workerUrl}/callback\n`);
		console.log("Example MCP client config:");
		console.log(
			JSON.stringify(
				{
					mcpServers: {
						"john-deere": {
							command: "npx",
							args: ["mcp-remote", `${workerUrl}/mcp`],
						},
					},
				},
				null,
				2,
			),
		);
	} else {
		console.log(
			"Deployment finished, but the Worker URL could not be parsed from the output above.",
		);
		console.log(
			"Find the https://*.workers.dev URL in the deploy output and append /mcp for your MCP client,",
		);
		console.log(
			"and /callback for the redirect URI you must register at developer.deere.com.",
		);
	}
	console.log("=".repeat(64) + "\n");
}

main().catch((err) => fail("Unexpected error", err?.stack || String(err)));
