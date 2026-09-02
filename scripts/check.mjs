import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";

const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "vercel.json",
  "manifest.webmanifest",
  "assets/aininja-logo.jpg",
  "assets/og.png",
  "curriculum/AI_ENGINEER_FOR_KIDS_CURRICULUM.md"
];

await Promise.all(requiredFiles.map((file) => access(file, constants.R_OK)));

const [html, css, script, curriculum] = await Promise.all([
  readFile("index.html", "utf8"),
  readFile("styles.css", "utf8"),
  readFile("app.js", "utf8"),
  readFile("curriculum/AI_ENGINEER_FOR_KIDS_CURRICULUM.md", "utf8")
]);

const checks = [
  [html.includes("AI Ninja Academy"), "brand name"],
  [html.includes("© 2026 aininja.academy"), "copyright"],
  [html.includes("AI Safety Quest"), "final project"],
  [html.includes("THE SAFE CODE"), "SAFE framework"],
  [css.includes("--background: #08090a"), "theme token"],
  [css.includes("prefers-reduced-motion"), "reduced-motion support"],
  [script.includes("const missions = ["), "mission data"],
  [script.includes("const questQuestions = ["), "playable quest data"],
  [script.includes("const adaptiveModules = ["), "adaptive teacher syllabus"],
  [html.includes("Ages 10–12 design. The teacher operates."), "teacher Codex age note"],
  [curriculum.includes("Format: 6 sessions, 60 minutes each"), "six-session curriculum"],
  [curriculum.includes("Special Codex access rule"), "downloadable Codex age rule"],
  [(curriculum.match(/^### Session \d —/gmu) || []).length === 6, "six curriculum session plans"],
  [script.includes("localStorage"), "local-only progress"],
  [!html.includes("http://") && !html.includes("https://"), "no external page dependencies"]
];

const failed = checks.filter(([passed]) => !passed);
if (failed.length) {
  console.error(`Checks failed: ${failed.map(([, label]) => label).join(", ")}`);
  process.exit(1);
}

console.log(`Site check passed: ${checks.length} contracts verified.`);
