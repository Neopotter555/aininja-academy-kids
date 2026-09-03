import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const script = await readFile(new URL("../app.js", import.meta.url), "utf8");
const styles = await readFile(new URL("../styles.css", import.meta.url), "utf8");
const curriculum = await readFile(new URL("../curriculum/AI_ENGINEER_FOR_KIDS_CURRICULUM.md", import.meta.url), "utf8");
const curriculumPdf = await readFile(new URL("../curriculum/AI_ENGINEER_FOR_KIDS_CURRICULUM.pdf", import.meta.url));
const vercel = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));

test("renders all primary learning surfaces", () => {
  for (const view of ["home", "missions", "projects", "safety", "quest", "teacher"]) {
    assert.match(html, new RegExp(`data-view-panel="${view}"`));
  }
});

test("includes six sessions and five final quest decisions", () => {
  const missionSource = script.match(/const missions = \[([\s\S]*?)\n\];/u)?.[1] || "";
  const questSource = script.match(/const questQuestions = \[([\s\S]*?)\n\];/u)?.[1] || "";
  assert.equal((missionSource.match(/title: "/g) || []).length, 6);
  assert.equal((questSource.match(/title: "/g) || []).length, 5);
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

test("uses the robot in the hero while preserving the top-left logo", () => {
  assert.match(html, /class="brand-mark" src="\/assets\/aininja-logo\.jpg"/);
  assert.match(html, /src="\/assets\/ai-ninja-robot\.png"/);
  assert.match(html, /AI Ninja robot with the engineering loop: Think, build, test, ship/);
  for (const word of ["THINK", "BUILD", "TEST", "SHIP"]) {
    assert.match(html, new RegExp(`>${word}<\\/div>`));
  }
});

test("evolves the hero with a lightweight accessible AI engineering orbit", () => {
  assert.match(html, /id="learning-orbit-canvas" aria-hidden="true"/);
  assert.match(html, /AI ENGINEERING LOOP/);
  assert.match(script, /function setupLearningOrbit\(\)/);
  assert.match(script, /prefers-reduced-motion: reduce/);
  assert.match(script, /IntersectionObserver/);
});

test("uses the supplied AI Ninja robot puppy artwork in the story card", () => {
  assert.match(html, /src="\/assets\/ai-ninja-robot-puppy\.png"/);
  assert.match(html, /alt="Friendly AI Ninja robot puppy"/);
  assert.doesNotMatch(html, />🐕<\/div>/);
});

test("includes the adaptive AI Engineering 101 teacher syllabus", () => {
  assert.match(html, /ADAPTIVE SYLLABUS/);
  assert.match(html, /6 sessions total/);
  assert.match(html, /60 minutes per class/);
  assert.match(script, /const adaptiveModules = \[/);
  assert.match(script, /The AI Coding Cockpit/);
  assert.match(script, /Debugging Without Panic/);
  assert.match(script, /Five Practice Labs/);
  assert.match(script, /No real payments, cards, production databases, or child accounts/);
});

test("keeps the web app and downloadable syllabus at six 60-minute sessions", () => {
  assert.match(html, /Six practical 60-minute sessions/);
  assert.match(html, /60-MINUTE RHYTHM/);
  assert.match(curriculum, /Format: 6 sessions, 60 minutes each/);
  assert.equal((curriculum.match(/^### Session \d —/gmu) || []).length, 6);
  assert.doesNotMatch(curriculum, /90-minute|90 minutes|Eight-session|8 sessions|Ten-session|10-session|Four-week studio/i);
});

test("shows the teacher-only Codex age and consent note", () => {
  assert.match(html, /SPECIAL SAFETY NOTE · CODEX/);
  assert.match(html, /Ages 10–12 design\. The teacher operates\./);
  assert.match(html, /No personal Codex account and no direct operation/);
  assert.match(html, /parent or guardian permission and active teacher supervision/);
  assert.match(html, /Never share account credentials/);
  assert.match(html, /For Thailand workshops, collect written guardian permission/);
  assert.match(script, /With guardian permission and active teacher supervision/);
  assert.match(curriculum, /Special Codex access rule/);
  assert.match(curriculum, /Learners do not create personal Codex accounts/);
});

test("provides quick Teacher Base access and six complete teaching plans", () => {
  assert.match(html, /class="teacher-shortcut" type="button" data-go="teacher"/);
  assert.match(html, /WHAT YOU NEED/);
  assert.match(html, /Assign the same device every week/);
  assert.match(html, /stored only in this browser on this device/);
  assert.match(html, /teacher-session-list/);
  assert.match(script, /const teacherSessionPlans = \[/);
  const planSource = script.match(/const teacherSessionPlans = \[([\s\S]*?)\n\];/u)?.[1] || "";
  assert.equal((planSource.match(/number: "/g) || []).length, 6);
  for (const range of ["00–04", "04–10", "10–44", "44–52", "52–58", "58–60"]) {
    assert.match(planSource, new RegExp(range));
  }
  assert.match(script, /LEARNING OUTCOME/);
  assert.match(script, /MATERIALS/);
  assert.match(script, /LEARNER PROOF/);
  assert.match(curriculum, /What you need before class/);
  assert.match(curriculum, /Shared-device progress rule/);
});

test("makes every teacher preparation item checkable and device-persistent", () => {
  assert.equal((html.match(/data-prep-check=/g) || []).length, 6);
  assert.match(html, /id="reset-prep-checklist"/);
  assert.match(script, /prepChecks: \[\]/);
  assert.match(script, /function initializePrepChecklist\(\)/);
  assert.match(script, /\[data-prep-check\]:checked/);
});

test("blends the supplied Robot City artwork into the Final Quest console", () => {
  assert.match(styles, /url\("\/assets\/robot-city\.png"\)/);
  assert.match(styles, /center 62% \/ cover no-repeat/);
  assert.match(styles, /\.quest-screen::before/);
  assert.match(styles, /text-shadow: 0 3px 24px/);
});

test("downloads a designed PDF curriculum instead of Markdown", () => {
  assert.match(html, /href="\/curriculum\/AI_ENGINEER_FOR_KIDS_CURRICULUM\.pdf"/);
  assert.match(html, /download="AI_Ninja_Academy_Kids_Teacher_Curriculum\.pdf"/);
  assert.doesNotMatch(html, /href="\/curriculum\/AI_ENGINEER_FOR_KIDS_CURRICULUM\.md"/);
  assert.equal(curriculumPdf.subarray(0, 5).toString(), "%PDF-");
  assert.ok(curriculumPdf.length > 100000);
});
