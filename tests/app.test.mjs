import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const script = await readFile(new URL("../app.js", import.meta.url), "utf8");
const vercel = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));

test("renders all primary learning surfaces", () => {
  for (const view of ["home", "missions", "projects", "safety", "quest", "teacher"]) {
    assert.match(html, new RegExp(`data-view-panel="${view}"`));
  }
});

test("includes eight missions and five final quest decisions", () => {
  assert.equal((script.match(/title: "/g) || []).length >= 13, true);
  assert.match(script, /const missions = \[/);
  assert.match(script, /const questQuestions = \[/);
  assert.match(html, /Five decisions/);
});

test("keeps child-facing data local and blocks sensitive browser capabilities", () => {
  assert.match(html, /No account or personal details needed/);
  assert.match(script, /localStorage/);
  const policy = vercel.headers[0].headers.find((header) => header.key === "Permissions-Policy");
  assert.equal(policy.value, "camera=(), microphone=(), geolocation=()");
  const csp = vercel.headers[0].headers.find((header) => header.key === "Content-Security-Policy");
  assert.match(csp.value, /connect-src 'none'/);
});

test("uses the requested brand and copyright", () => {
  assert.match(html, /AI Ninja Academy/);
  assert.match(html, /aininja\.academy/);
  assert.match(html, /© 2026 aininja\.academy/);
});
