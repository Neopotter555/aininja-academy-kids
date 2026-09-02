const STORAGE_KEY = "aininja-kids-progress-v2";
const LEGACY_STORAGE_KEY = "aininja-kids-progress-v1";

const missions = [
  {
    title: "Meet the Robot Puppy",
    idea: "AI finds patterns quickly, while the human captain chooses the mission and checks the result.",
    story: "A robot puppy learns to fetch red balls, then fetches a red apple too. In the AI Coding Cockpit, the child is the captain—not the puppy.",
    build: "Create a paper sorting robot or Cosmic Hello App. Test it with a new example, fix one thing, and test again.",
    habit: "A pattern is a clue, not proof.",
    tag: "PATTERN + COCKPIT",
    explorer: "Use picture cards and a captain-and-robot checklist.",
    builder: "Define success criteria and record one failed test."
  },
  {
    title: "Map It, Then Check It",
    idea: "A useful prompt needs a clear map, and a confident answer still needs a truth check.",
    story: "A treasure hunter needs a detailed map. A loud parrot may still point to the wrong treasure.",
    build: "Repair a vague prompt with GOAL, then sort its answer under the red, yellow, or green truth lamp.",
    habit: "Clear instructions help; evidence decides.",
    tag: "PROMPT + TRUTH",
    explorer: "Use four GOAL cards and teacher-provided fact cards.",
    builder: "Add constraints, verification, a stop rule, and two-source checking."
  },
  {
    title: "Protect People and Build Kindly",
    idea: "Safe engineers protect private information and check whether ideas are fair and kind.",
    story: "Private details stay in a zipped backpack. A magic crayon must also remember ramps, different people, and kind choices.",
    build: "Repair an unsafe prompt with fictional details, then create and fairness-check a Kind Story Machine.",
    habit: "Share only what is needed, and ask who might be missing.",
    tag: "PRIVACY + FAIRNESS",
    explorer: "Sort privacy cards and build a kind story with picture pieces.",
    builder: "Practice data minimization and test the idea from a missing viewpoint."
  },
  {
    title: "Build in Tiny Loops",
    idea: "Engineers build, test, debug, and improve one small working piece at a time.",
    story: "Cross a river one stepping stone at a time. If one stone wobbles, follow its muddy footprints and fix that stone.",
    build: "Make the three-question SAFE Quiz foundation. Reproduce one bug, fix it, and repeat the same test.",
    habit: "Small working pieces beat one giant unfinished idea.",
    tag: "LOOP + DEBUG",
    explorer: "Use Show it, Find it, Fix it, Try again cards.",
    builder: "Use local saving, a test table, and one regression check."
  },
  {
    title: "Build AI Safety Quest",
    idea: "A useful product starts with one player, one mission, testable choices, and guardrails.",
    story: "Build one working lemonade stand before drawing a mall. Enter Robot City with a map, truth lamp, privacy backpack, and kindness shield.",
    build: "Create a branching game with five choices, three SAFE lessons, scoring, two endings, and reflection.",
    habit: "Safety belongs inside the design, not in tiny words at the end.",
    tag: "PRODUCT + CAPSTONE",
    explorer: "Create one complete playable path, then add a second ending.",
    builder: "Add reusable blocks, mock states, edge cases, or adaptive hints."
  },
  {
    title: "Test, Ship, and Showcase",
    idea: "Engineers use testers and a second pair of robot eyes, then show proof that the project works.",
    story: "A bridge builder tests with toy elephants, mice, wind, and a checker robot before people cross.",
    build: "Watch another child play, compare one reviewer opinion, fix the most important issue, retest, and present the evidence.",
    habit: "A bug is a clue that helps the next version.",
    tag: "REVIEW + SHIP",
    explorer: "Use the seven-question peer test sheet.",
    builder: "Add edge cases, a shipping checklist, and one explained design trade-off."
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

const adaptiveModules = [
  {
    title: "The AI Coding Cockpit",
    summary: "Choose the mission, guide the helper, and check the result.",
    story: "A spaceship has different seats: the captain chooses the destination, the robot helps fly, and the safety officer checks the journey.",
    build: "Create a Cosmic Hello App: one friendly input, one button, and one visible result. Open it, change one thing, and test again.",
    explorer: "Say the mission in one sentence and use a picture checklist: folder, inspect, tiny build, open, fix, retest.",
    builder: "Write success criteria before any code changes, then record evidence for each criterion.",
    safety: "A teacher manages coding tools and accounts. Learners use fictional names and content.",
    time: "SESSION 1"
  },
  {
    title: "The Loop",
    summary: "Ask, inspect, plan, patch, test, reflect, and repeat.",
    story: "A gardener does not shout “grow!” once. They plant, look, water a little, check, and care for the next leaf.",
    build: "Change the Cosmic Hello App in three tiny loops. After each loop, write what changed and what the test showed.",
    explorer: "Tell the robot what to build, watch it build, try it, and ask it to fix one thing.",
    builder: "Use the seven-step loop and define the next test before making another change.",
    safety: "Stop the loop when the goal changes, private data appears, or adult approval is needed.",
    time: "ALL SESSIONS"
  },
  {
    title: "Prompt Engineering That Works",
    summary: "A strong prompt has a goal, context, limits, examples, checks, and a stop rule.",
    story: "A treasure map needs a destination, starting point, boundaries, landmarks, a way to know you arrived, and a place to stop.",
    build: "Turn “Make me an app” into a testable brief for a one-page kids habit tracker that saves three sample habits locally.",
    explorer: "Use the four-part GOAL recipe and one example of the answer you want.",
    builder: "Add constraints, verification steps, and a clear stop rule to the project brief.",
    safety: "Prompts use invented data, never secrets, faces, voices, school details, or payment information.",
    time: "SESSION 2"
  },
  {
    title: "A Second Pair of Robot Eyes",
    summary: "Different coding agents can build, inspect, or challenge an idea from another angle.",
    story: "One robot builds a bridge; another gently shakes it and points to the weak plank. The human captain decides what to fix.",
    build: "Compare one builder answer with one reviewer answer. Mark agreements, disagreements, risks, and the evidence needed.",
    explorer: "Role-play two paper robots: Builder and Checker. The teacher operates any real AI tools.",
    builder: "Use teacher-approved Codex, Claude Code, or Fable 5, then resolve disagreements with tests—not votes.",
    safety: "External agents are teacher-managed. Never paste private student work, credentials, or unpublished personal material.",
    time: "SESSIONS 2 + 6"
  },
  {
    title: "Debugging Without Panic",
    summary: "Make the bug appear, read its footprints, fix one piece, and retest the same path.",
    story: "A bug leaves muddy footprints. Guessing searches the whole forest; debugging follows one print at a time.",
    build: "Use a prepared broken app. Reproduce the bug, capture the exact clue, fix the smallest cause, and add a return-check.",
    explorer: "Use four cards: Show it, Find it, Fix it, Try it again.",
    builder: "Write a reproducible test, isolate the smallest broken unit, patch it, and add a regression check.",
    safety: "Use prepared demo bugs. Do not experiment on live accounts, payments, school systems, or other people’s data.",
    time: "SESSION 4"
  },
  {
    title: "Shipping a Real Project",
    summary: "A project is done when another person can use it and the proof is visible.",
    story: "A toy is not ready for the shop because its maker says so. Another child must open it, understand it, and play safely.",
    build: "Run the ship checklist: app opens, main buttons work, phone text is readable, README exists, secrets are absent, and tests are recorded.",
    explorer: "Swap devices with a partner and use a picture-based six-check launch card.",
    builder: "Run automated checks, document known limits, and create a clean Git commit with verified scope.",
    safety: "Teacher approval is required before public sharing. Do not publish a child’s name, image, voice, or location.",
    time: "SESSION 6"
  },
  {
    title: "Building Tiny SaaS and Web Apps",
    summary: "Start with one user and one painful job before adding more screens.",
    story: "Build one working lemonade stand before drawing a giant shopping mall.",
    build: "Create a Mini SaaS Studio prototype with one dashboard flow, sample data, a pretend plan selector, admin sketch, and README.",
    explorer: "Build a clickable paper or slide prototype with no real login or payment.",
    builder: "Use local-only data and a mock checkout state; map where Supabase, Stripe, and Vercel could connect later.",
    safety: "No real payments, cards, production databases, or child accounts are used in class.",
    time: "SESSIONS 4 + 5"
  },
  {
    title: "The Teacher Loop",
    summary: "Show one idea, build one thing, repeat, celebrate proof, add one challenge, and loop.",
    story: "Teach one dance step, let everyone try it, cheer the movement, then add only the next step.",
    build: "In pairs, rehearse a ten-minute micro-lesson with a two-minute story and an eight-minute learner build.",
    explorer: "Use one metaphor, one demonstration, and one learner-created result.",
    builder: "Add success criteria, an edge case, peer feedback, and one measured improvement.",
    safety: "Praise thinking and iteration, not speed or a perfect AI answer. Always keep a non-AI path available.",
    time: "TEACHER ROUTINE"
  },
  {
    title: "Five Practice Labs",
    summary: "Choose a build that ends with a working click path, visible result, and learner explanation.",
    story: "A ninja earns skill badges by completing small missions—not by reading a giant instruction scroll.",
    build: "Choose one: Cosmic Hello App, Habit Rocket, Bug Detective Board, Mini SaaS Studio, or a teacher-led Fable 5 Risk Review.",
    explorer: "Complete Cosmic Hello, Habit Rocket, or Bug Detective with a partner and show one proof.",
    builder: "Complete Mini SaaS Studio or a structured risk review with success criteria, top risks, fixes, and verification evidence.",
    safety: "Use local sample data and mock services. The teacher owns any agent access and approves all public publishing.",
    time: "LAB CHOICES"
  }
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
    const current = localStorage.getItem(STORAGE_KEY);
    const legacy = !current ? localStorage.getItem(LEGACY_STORAGE_KEY) : null;
    const stored = JSON.parse(current || legacy || "null");
    const legacyCompleted = Array.isArray(stored?.completed) ? stored.completed : [];
    const migratedCompleted = legacy
      ? [
          legacyCompleted.includes(0),
          legacyCompleted.includes(1) && legacyCompleted.includes(2),
          legacyCompleted.includes(3) && legacyCompleted.includes(4),
          legacyCompleted.includes(5),
          legacyCompleted.includes(6),
          legacyCompleted.includes(7)
        ].flatMap((complete, index) => complete ? [index] : [])
      : legacyCompleted.filter((index) => Number.isInteger(index) && index >= 0 && index < missions.length);
    return {
      ...defaultState,
      ...stored,
      completed: migratedCompleted,
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
    missions: "6 Sessions",
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
    return `<button type="button" class="path-node ${complete ? "is-complete" : ""}" data-path-mission="${index}" aria-label="Open session ${index + 1}${complete ? ", complete" : ""}">${complete ? "✓" : String(index + 1).padStart(2, "0")}</button>`;
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
          <div class="mission-meta"><span>60 MIN</span><span>${mission.tag}</span><span>${trackLabel.toUpperCase()}</span></div>
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

function renderAdaptiveSyllabus() {
  const isExplorer = appState.track === "explorer";
  const trackLabel = isExplorer ? "Explorer adaptation" : "Builder adaptation";
  document.getElementById("adaptive-track-readout").textContent = isExplorer ? "EXPLORER · 10–12" : "BUILDER · 13–16";
  document.getElementById("adaptive-track-summary").textContent = isExplorer
    ? "Simple metaphors, guided builds, and short explanations for the Explorer track."
    : "Clear success criteria, stronger testing, and deeper build evidence for the Builder track.";
  document.getElementById("adaptive-module-list").innerHTML = adaptiveModules.map((module, index) => `
    <details class="syllabus-module" ${index === 0 ? "open" : ""}>
      <summary>
        <span class="module-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="module-heading"><strong>${module.title}</strong><span>${module.summary}</span></span>
        <span class="module-time">${module.time}</span>
      </summary>
      <div class="module-body">
        <div class="module-panel"><span>STORY</span><p>${module.story}</p></div>
        <div class="module-panel"><span>PRACTICAL BUILD</span><p>${module.build}</p></div>
        <div class="module-panel"><span>${trackLabel.toUpperCase()}</span><p>${module[appState.track]}</p></div>
        <div class="module-safety"><strong>Safety boundary:</strong> ${module.safety}</div>
      </div>
    </details>`).join("");
}

function updateTrack() {
  document.querySelectorAll("[data-track]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.track === appState.track);
  });
  renderMissions();
  renderAdaptiveSyllabus();
}

function toggleMission(index) {
  const completed = new Set(appState.completed);
  if (completed.has(index)) {
    completed.delete(index);
    showToast(`Session ${index + 1} moved back to in progress.`);
  } else {
    completed.add(index);
    showToast(`Session ${index + 1} complete. Nice testing.`);
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
