const STORAGE_KEY = "aininja-kids-progress-v1";

const missions = [
  {
    title: "Meet the Robot Puppy",
    idea: "AI finds patterns quickly, but it can misunderstand and make confident mistakes.",
    story: "A robot puppy learns to fetch red balls, then fetches a red apple too. It noticed a pattern, not the meaning.",
    build: "Create a paper sorting robot. Test it with new cards and find one card that breaks its rule.",
    habit: "A pattern is a clue, not proof.",
    tag: "PATTERN DETECTIVE",
    explorer: "Use picture cards and explain the rule aloud.",
    builder: "Create a test table and record false positives."
  },
  {
    title: "Give the Robot a Good Map",
    idea: "A useful prompt explains the goal, facts, rules, and answer format.",
    story: "A treasure hunter needs more than “take me there.” A useful map gives a start, steps, turn, and finish.",
    build: "Repair vague prompts with the GOAL recipe and compare the first and improved results.",
    habit: "Clear instructions make results easier to test.",
    tag: "PROMPT MAP",
    explorer: "Use four color-coded GOAL cards.",
    builder: "Add constraints and a worked example."
  },
  {
    title: "Become a Truth Detective",
    idea: "AI can sound sure while being wrong, so important answers need evidence.",
    story: "A confident parrot says the moon is cheese. Saying it loudly does not make it true.",
    build: "Sort claims under red, yellow, or green lamps, then check two facts with reliable sources.",
    habit: "“I don’t know yet” is an intelligent answer.",
    tag: "FACT CHECK",
    explorer: "Use teacher-provided claims and source cards.",
    builder: "Compare two sources and explain which is stronger."
  },
  {
    title: "Pack the Privacy Backpack",
    idea: "Safe engineers decide what information should never enter a system.",
    story: "Before entering Robot Town, private details go in a zipped backpack—not the robot’s training box.",
    build: "Sort information into safe, ask an adult, or keep private. Repair an unsafe prompt with fictional details.",
    habit: "Share only what the job truly needs.",
    tag: "PRIVACY SHIELD",
    explorer: "Replace names and places with story characters.",
    builder: "Practice data minimization and explain each removal."
  },
  {
    title: "Build a Kind Idea Machine",
    idea: "AI can suggest options, but people must choose what is fair, useful, and kind.",
    story: "A magic crayon draws playgrounds, but a child notices that some have stairs and no ramp.",
    build: "Combine idea cards into a story generator, then run a kindness and inclusion check.",
    habit: "Many ideas still need thoughtful human choices.",
    tag: "FAIR DESIGN",
    explorer: "Build with character, goal, obstacle, helper, and ending cards.",
    builder: "Write a fairness rule and test missing viewpoints."
  },
  {
    title: "Cross with Tiny Steps",
    idea: "Engineers build one small working piece before adding the next.",
    story: "We cross a river by placing and testing one stepping stone at a time.",
    build: "Make a three-question SAFE quiz with a start screen, feedback, score, and ending.",
    habit: "Small working pieces beat one giant unfinished idea.",
    tag: "QUIZ BUILDER",
    explorer: "Build with linked slides or Scratch blocks.",
    builder: "Use variables and a reusable question block."
  },
  {
    title: "Build AI Safety Quest",
    idea: "A useful AI product needs a clear player, testable choices, and guardrails.",
    story: "Enter Robot City carrying a map, truth lamp, privacy backpack, and kindness shield.",
    build: "Create a branching game with five choices, three SAFE lessons, scoring, two endings, and reflection.",
    habit: "Safety belongs inside the design, not in tiny words at the end.",
    tag: "CAPSTONE BUILD",
    explorer: "Create one complete playable path, then add a second ending.",
    builder: "Add reusable blocks, edge cases, or adaptive hints."
  },
  {
    title: "Shake the Bridge",
    idea: "Engineers search for failures, learn from testers, and improve the most important problem.",
    story: "A bridge builder tests with toy elephants, mice, and wind before people cross.",
    build: "Watch another child play silently, record confusion, fix one issue, retest, and present.",
    habit: "A bug is a clue that helps the next version.",
    tag: "TEST LAB",
    explorer: "Use the seven-question peer test sheet.",
    builder: "Add edge cases and explain one design trade-off."
  }
];

const projects = [
  { symbol: "⌁", title: "Silly Prompt Repair Shop", copy: "Repair unclear prompts and name the missing GOAL ingredient.", time: "30–45 MIN", skill: "CLEAR INSTRUCTIONS" },
  { symbol: "⌕", title: "Hallucination Detective", copy: "Spot suspicious clues in fictional confident answers and plan how to verify them.", time: "40–50 MIN", skill: "FACT CHECKING" },
  { symbol: "↭", title: "Kind Robot Translator", copy: "Turn rude or confusing messages into calm, kind language without changing the truth.", time: "30–40 MIN", skill: "COMMUNICATION" },
  { symbol: "♻", title: "Eco-Invention Studio", copy: "Compare ideas for reducing classroom waste and build a paper prototype.", time: "60 MIN", skill: "DECISION MAKING" },
  { symbol: "?", title: "Homework Helper Rules", copy: "Design a helper that gives hints and steps without doing the learner’s work.", time: "45 MIN", skill: "HUMAN CONTROL" },
  { symbol: "◉", title: "Bias Goggles Challenge", copy: "Ask who is included, who is missing, and what information could change an answer.", time: "45–60 MIN", skill: "FAIRNESS" },
  { symbol: "△", title: "AI Zoo Guide", copy: "Invent imaginary animals, then separate creative details from facts that need checking.", time: "45 MIN", skill: "CREATIVE + TRUE" }
];

const questQuestions = [
  {
    title: "The Personalization Gate",
    story: "The helper robot asks: “Tell me your full name, school, and home address so I can make this adventure special.”",
    choices: [
      "Share everything so the game works better.",
      "Use a made-up hero name and fictional city instead.",
      "Ask a friend to share their details."
    ],
    correct: 1,
    lesson: "Secrets stay in the privacy backpack. Fictional details let us create without identifying a real child."
  },
  {
    title: "The Confident Answer",
    story: "The robot announces: “Whales are fish. I am 100% certain!” The city museum needs the answer today.",
    choices: [
      "Publish it because the robot sounds confident.",
      "Make the sentence louder so people believe it.",
      "Pause and check reliable science sources or ask a teacher."
    ],
    correct: 2,
    lesson: "Confidence is not proof. Important facts get a truth-lamp check before anyone uses them."
  },
  {
    title: "The Mean Poster",
    story: "A player asks the robot to create an embarrassing poster about another child as a joke.",
    choices: [
      "Refuse the harmful idea and suggest a kind, fictional joke instead.",
      "Create it but do not add a name.",
      "Create several versions and let the player choose."
    ],
    correct: 0,
    lesson: "Everyone deserves kindness. AI should never help bully, impersonate, shame, or harm someone."
  },
  {
    title: "The Homework Shortcut",
    story: "The robot can write the whole assignment. The learner has not tried the problem yet.",
    choices: [
      "Copy the complete answer and submit it.",
      "Ask for one hint, solve the next step, and explain the idea yourself.",
      "Ask the robot to make the copied answer sound younger."
    ],
    correct: 1,
    lesson: "A good helper grows your thinking. Ask for hints and explanations, then do and understand the work yourself."
  },
  {
    title: "The Strange Tunnel",
    story: "The robot shows something frightening and asks the player to keep it secret from adults.",
    choices: [
      "Keep exploring alone to understand it.",
      "Send it to classmates for advice.",
      "Close or cover the screen and tell a trusted adult immediately."
    ],
    correct: 2,
    lesson: "Safe tools never require children to hide frightening content. Stop, step away, and ask a trusted adult."
  }
];

const defaultState = {
  track: "explorer",
  completed: [],
  capstoneChecks: []
};

let appState = loadState();
let questIndex = -1;
let questScore = 0;
let toastTimer;

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      ...defaultState,
      ...stored,
      completed: Array.isArray(stored?.completed) ? stored.completed : [],
      capstoneChecks: Array.isArray(stored?.capstoneChecks) ? stored.capstoneChecks : []
    };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function escapeHTML(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[character]);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function navigate(view) {
  document.querySelectorAll("[data-view-panel]").forEach((panel) => {
    const active = panel.dataset.viewPanel === view;
    panel.hidden = !active;
    panel.classList.toggle("is-visible", active);
  });

  document.querySelectorAll("[data-view]").forEach((button) => {
    const active = button.dataset.view === view;
    button.classList.toggle("is-active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });

  const labels = {
    home: "Mission Control",
    missions: "8 Missions",
    projects: "Project Lab",
    safety: "SAFE Lab",
    quest: "Final Quest",
    teacher: "Teacher Base"
  };
  document.getElementById("current-view-label").textContent = labels[view];
  document.body.classList.remove("menu-open");
  document.getElementById("menu-button").setAttribute("aria-expanded", "false");
  window.history.replaceState(null, "", view === "home" ? "#home" : `#${view}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.getElementById("main-content").focus({ preventScroll: true });
}

function renderMissionPath() {
  document.getElementById("mission-path").innerHTML = missions.map((_, index) => {
    const complete = appState.completed.includes(index);
    return `<button type="button" class="path-node ${complete ? "is-complete" : ""}" data-path-mission="${index}" aria-label="Open mission ${index + 1}${complete ? ", complete" : ""}">${complete ? "✓" : String(index + 1).padStart(2, "0")}</button>`;
  }).join("");

  const total = appState.completed.length;
  document.getElementById("progress-count").textContent = total;
  document.getElementById("progress-fill").style.width = `${(total / missions.length) * 100}%`;
}

function renderMissions() {
  const trackLabel = appState.track === "explorer" ? "Explorer build" : "Builder stretch";
  document.getElementById("mission-list").innerHTML = missions.map((mission, index) => {
    const complete = appState.completed.includes(index);
    const trackCopy = mission[appState.track];
    return `
      <article class="mission-card ${complete ? "is-complete" : ""}" data-mission-card="${index}">
        <div class="mission-number">${complete ? "✓" : String(index + 1).padStart(2, "0")}</div>
        <div class="mission-copy">
          <h2>${mission.title}</h2>
          <p>${mission.idea}</p>
          <div class="mission-meta"><span>90 MIN</span><span>${mission.tag}</span><span>${trackLabel.toUpperCase()}</span></div>
        </div>
        <div class="mission-actions">
          <button class="details-button" type="button" data-details="${index}" aria-expanded="false">View plan</button>
          <button class="complete-button ${complete ? "is-complete" : ""}" type="button" data-complete="${index}">${complete ? "Completed" : "Mark complete"}</button>
        </div>
        <div class="mission-details">
          <div class="detail-box"><strong>Story</strong><p>${mission.story}</p></div>
          <div class="detail-box"><strong>Build</strong><p>${mission.build}</p></div>
          <div class="detail-box"><strong>${trackLabel}</strong><p>${trackCopy}<br /><br /><em>${mission.habit}</em></p></div>
        </div>
      </article>`;
  }).join("");
}

function renderProjects() {
  document.getElementById("project-grid").innerHTML = projects.map((project) => `
    <article class="project-card">
      <span class="project-symbol" aria-hidden="true">${project.symbol}</span>
      <h2>${project.title}</h2>
      <p>${project.copy}</p>
      <div class="project-footer"><span>${project.time}</span><span>${project.skill}</span></div>
    </article>`).join("");
}

function updateTrack() {
  document.querySelectorAll("[data-track]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.track === appState.track);
  });
  renderMissions();
}

function toggleMission(index) {
  const completed = new Set(appState.completed);
  if (completed.has(index)) {
    completed.delete(index);
    showToast(`Mission ${index + 1} moved back to in progress.`);
  } else {
    completed.add(index);
    showToast(`Mission ${index + 1} complete. Nice testing.`);
  }
  appState.completed = [...completed].sort((a, b) => a - b);
  saveState();
  renderMissionPath();
  renderMissions();
}

function runPromptCheck() {
  const input = document.getElementById("prompt-checker");
  const result = document.getElementById("prompt-result");
  const value = input.value.trim();
  result.classList.remove("is-safe", "is-warning");

  if (!value) {
    result.textContent = "Write a practice prompt first. Use fictional information—not real personal details.";
    return;
  }

  const patterns = [
    { test: /password|passcode|login/i, label: "a password or login detail" },
    { test: /my (?:full )?name is|i am called/i, label: "a real name" },
    { test: /address|where i live|home is/i, label: "a home address or location" },
    { test: /school(?:'s)? name|my school|classroom number/i, label: "school information" },
    { test: /phone(?: number)?|mobile number|call me/i, label: "a phone number" },
    { test: /email|e-mail/i, label: "an email address" },
    { test: /my photo|my face|picture of me|my voice/i, label: "a face, photo, or voice" },
    { test: /medical|diagnos|medicine|hurt myself|suicide/i, label: "a health or urgent safety topic" }
  ];
  const flags = patterns.filter((pattern) => pattern.test.test(value)).map((pattern) => pattern.label);

  if (flags.length) {
    result.classList.add("is-warning");
    result.textContent = `PAUSE — this may include ${flags.join(", ")}.\n\nKeep it in your privacy backpack. Remove the detail, use a fictional example, and ask a trusted adult if the topic is important or sensitive.`;
  } else {
    result.classList.add("is-safe");
    result.textContent = "SAFE CHECK PASSED — no obvious private-detail words were found. Now ask: Is every detail truly needed? Is it kind? Is an adult needed? Important answers still need proof.";
  }
}

function buildGoalPrompt() {
  const fields = ["goal-goal", "goal-objects", "goal-agreements", "goal-look"].map((id) => document.getElementById(id).value.trim());
  const output = document.getElementById("goal-output");
  const copyButton = document.getElementById("copy-prompt");

  if (fields.some((field) => !field)) {
    output.classList.remove("is-safe");
    output.classList.add("is-warning");
    output.textContent = "Your treasure map has an empty piece. Add the goal, useful facts, agreements, and the answer’s shape.";
    copyButton.hidden = true;
    return;
  }

  output.classList.remove("is-warning");
  output.classList.add("is-safe");
  output.textContent = `Goal: ${fields[0]}.\nContext: ${fields[1]}.\nRules: ${fields[2]}.\nPlease answer as: ${fields[3]}.`;
  copyButton.hidden = false;
}

function renderQuestQuestion() {
  const question = questQuestions[questIndex];
  const screen = document.getElementById("quest-screen");
  document.getElementById("quest-step-label").textContent = `CHALLENGE ${questIndex + 1} / ${questQuestions.length}`;
  document.getElementById("quest-progress-fill").style.width = `${((questIndex + 1) / questQuestions.length) * 100}%`;
  screen.innerHTML = `
    <span class="eyebrow">CHALLENGE ${String(questIndex + 1).padStart(2, "0")}</span>
    <h2>${question.title}</h2>
    <p>${question.story}</p>
    <div class="quest-choices">
      ${question.choices.map((choice, index) => `<button type="button" class="choice-button" data-quest-choice="${index}">${choice}</button>`).join("")}
    </div>
    <div id="quest-feedback" aria-live="polite"></div>`;
}

function answerQuest(selectedIndex) {
  const question = questQuestions[questIndex];
  const correct = selectedIndex === question.correct;
  const buttons = document.querySelectorAll("[data-quest-choice]");
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.correct) button.classList.add("is-correct");
    if (index === selectedIndex && !correct) button.classList.add("is-wrong");
  });

  if (correct) questScore += 1;
  document.getElementById("quest-score").textContent = questScore;
  document.getElementById("quest-feedback").innerHTML = `
    <div class="quest-feedback"><strong>${correct ? "Ninja choice." : "Good test—now improve the choice."}</strong><br />${question.lesson}</div>
    <button class="button button-primary quest-next" type="button" id="next-quest">${questIndex === questQuestions.length - 1 ? "See my ending" : "Next challenge"} <span aria-hidden="true">→</span></button>`;
}

function finishQuest() {
  const strongEnding = questScore >= 4;
  document.getElementById("quest-step-label").textContent = "SIMULATION COMPLETE";
  document.getElementById("quest-progress-fill").style.width = "100%";
  document.getElementById("quest-screen").innerHTML = `
    <div class="quest-emblem">${strongEnding ? "★" : "↻"}</div>
    <span class="eyebrow">${strongEnding ? "GUARDIAN ENDING" : "ENGINEER ENDING"}</span>
    <h2>${strongEnding ? "Robot City is protected" : "Robot City needs version two"}</h2>
    <p>${strongEnding
      ? `You earned ${questScore} of 5 stars and used the SAFE code when the city needed it.`
      : `You earned ${questScore} of 5 stars. Engineers learn by finding weak spots, fixing them, and testing again.`}</p>
    <div class="quest-feedback"><strong>Final reflection</strong><br />Before trusting an AI answer, what will you protect, check, or ask?</div>
    <button class="button button-primary button-large" type="button" id="restart-quest">Play again</button>`;
}

function updateCapstoneProgress() {
  const checked = document.querySelectorAll("[data-capstone-check]:checked");
  const total = document.querySelectorAll("[data-capstone-check]").length;
  document.getElementById("capstone-progress-fill").style.width = `${(checked.length / total) * 100}%`;
  document.getElementById("capstone-progress-label").textContent = `${checked.length} of ${total} ready`;
}

function initializeCapstoneChecks() {
  document.querySelectorAll("[data-capstone-check]").forEach((checkbox) => {
    checkbox.checked = appState.capstoneChecks.includes(checkbox.dataset.capstoneCheck);
  });
  updateCapstoneProgress();
}

document.addEventListener("click", async (event) => {
  const navButton = event.target.closest("[data-view]");
  if (navButton) navigate(navButton.dataset.view);

  const goButton = event.target.closest("[data-go]");
  if (goButton) navigate(goButton.dataset.go);

  const pathButton = event.target.closest("[data-path-mission]");
  if (pathButton) {
    navigate("missions");
    setTimeout(() => {
      const card = document.querySelector(`[data-mission-card="${pathButton.dataset.pathMission}"]`);
      card?.scrollIntoView({ behavior: "smooth", block: "center" });
      card?.classList.add("is-open");
      card?.querySelector("[data-details]")?.setAttribute("aria-expanded", "true");
    }, 80);
  }

  const detailsButton = event.target.closest("[data-details]");
  if (detailsButton) {
    const card = detailsButton.closest(".mission-card");
    const willOpen = !card.classList.contains("is-open");
    card.classList.toggle("is-open", willOpen);
    detailsButton.setAttribute("aria-expanded", String(willOpen));
    detailsButton.textContent = willOpen ? "Close plan" : "View plan";
  }

  const completeButton = event.target.closest("[data-complete]");
  if (completeButton) toggleMission(Number(completeButton.dataset.complete));

  const trackButton = event.target.closest("[data-track]");
  if (trackButton) {
    appState.track = trackButton.dataset.track;
    saveState();
    updateTrack();
    showToast(`${appState.track === "explorer" ? "Explorer" : "Builder"} track selected.`);
  }

  const questChoice = event.target.closest("[data-quest-choice]");
  if (questChoice) answerQuest(Number(questChoice.dataset.questChoice));

  if (event.target.closest("#next-quest")) {
    questIndex += 1;
    if (questIndex < questQuestions.length) renderQuestQuestion();
    else finishQuest();
  }

  if (event.target.closest("#restart-quest")) {
    questIndex = 0;
    questScore = 0;
    document.getElementById("quest-score").textContent = "0";
    renderQuestQuestion();
  }

  if (event.target.closest("#copy-prompt")) {
    const value = document.getElementById("goal-output").textContent;
    try {
      await navigator.clipboard.writeText(value);
      showToast("Prompt copied to your clipboard.");
    } catch {
      showToast("Select the prompt text and copy it manually.");
    }
  }
});

document.getElementById("menu-button").addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  document.getElementById("menu-button").setAttribute("aria-expanded", String(open));
});

document.getElementById("check-prompt").addEventListener("click", runPromptCheck);
document.getElementById("use-prompt-example").addEventListener("click", () => {
  document.getElementById("prompt-checker").value = "My name is Mia and I go to Bright Star School. Make me a study plan.";
  runPromptCheck();
});
document.getElementById("clear-prompt").addEventListener("click", () => {
  document.getElementById("prompt-checker").value = "";
  const result = document.getElementById("prompt-result");
  result.classList.remove("is-safe", "is-warning");
  result.textContent = "Your check will appear here. Remember: a tool can remind you, but a trusted adult helps you decide.";
});
document.getElementById("build-prompt").addEventListener("click", buildGoalPrompt);
document.getElementById("start-quest").addEventListener("click", () => {
  questIndex = 0;
  questScore = 0;
  document.getElementById("quest-score").textContent = "0";
  renderQuestQuestion();
});

document.querySelectorAll("[data-capstone-check]").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    appState.capstoneChecks = [...document.querySelectorAll("[data-capstone-check]:checked")].map((item) => item.dataset.capstoneCheck);
    saveState();
    updateCapstoneProgress();
  });
});

renderMissionPath();
renderMissions();
renderProjects();
updateTrack();
initializeCapstoneChecks();

const initialView = window.location.hash.replace("#", "");
if (["home", "missions", "projects", "safety", "quest", "teacher"].includes(initialView)) {
  navigate(initialView);
}

window.addEventListener("hashchange", () => {
  const view = window.location.hash.replace("#", "") || "home";
  if (["home", "missions", "projects", "safety", "quest", "teacher"].includes(view)) navigate(view);
});
