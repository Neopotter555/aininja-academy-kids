#!/usr/bin/env python3
"""Generate the printable AI Ninja Academy teacher curriculum."""

from __future__ import annotations

import html
import os
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "curriculum" / "AI_ENGINEER_FOR_KIDS_CURRICULUM.md"
OUTPUT = ROOT / "curriculum" / "AI_ENGINEER_FOR_KIDS_CURRICULUM.pdf"
TMP_DIR = ROOT / "tmp" / "pdfs"
TMP_OUTPUT = TMP_DIR / "AI_ENGINEER_FOR_KIDS_CURRICULUM.pdf"
LOGO = ROOT / "assets" / "aininja-logo.jpg"

PAGE_W, PAGE_H = A4
BLACK = colors.HexColor("#090A0C")
INK = colors.HexColor("#17191D")
MUTED = colors.HexColor("#5F6670")
ORANGE = colors.HexColor("#F04B23")
ORANGE_DARK = colors.HexColor("#B93619")
ORANGE_PALE = colors.HexColor("#FFF0EA")
CREAM = colors.HexColor("#FBF8F4")
PAPER = colors.HexColor("#FFFFFF")
LINE = colors.HexColor("#DDE0E4")
SOFT = colors.HexColor("#F1F3F5")
GREEN = colors.HexColor("#2E9B66")


SESSION_PLANS = {
    1: {
        "title": "Meet the Robot Puppy",
        "outcome": "Learners explain that AI follows patterns while people choose the goal, judge the result, and stay responsible.",
        "materials": "Robot Puppy story card; red-object sorting cards; markers and paper; Cosmic Hello starter or slides; one team device.",
        "proof": "A working sort or Cosmic Hello result, one surprising test, and one improvement.",
        "timing": [
            ("00-04", "Story + movement", "Act out the Robot Puppy fetching red objects, including one funny wrong choice."),
            ("04-10", "Teacher demo", "Show one pattern helper and deliberately test it with an unseen example."),
            ("10-44", "Build challenge", "Build a paper sorting robot or Cosmic Hello App, write one success rule, and test three inputs."),
            ("44-52", "Swap + test", "Another team tries one normal input and one surprising input without coaching."),
            ("52-58", "Fix one thing", "Improve one instruction, rule, label, or button and repeat the failed test."),
            ("58-60", "Exit ticket", "Finish: A pattern is a clue, but the human still has to..."),
        ],
    },
    2: {
        "title": "Map It, Then Check It",
        "outcome": "Learners repair a vague request with GOAL and separate confident language from checked evidence.",
        "materials": "Four GOAL prompt cards; red, yellow, and green truth cards; two teacher-provided fact sources; prompt worksheet; one team device.",
        "proof": "A complete GOAL prompt, a truth-lamp rating, and a written verification step.",
        "timing": [
            ("00-04", "Story + movement", "Use a treasure map and loud parrot to separate clear directions from confidence."),
            ("04-10", "Teacher demo", "Turn Tell me about space into a GOAL prompt, then flag one unsupported answer."),
            ("10-44", "Build challenge", "Repair three prompts, choose the strongest, and check its result with provided sources."),
            ("44-52", "Swap + test", "A partner follows the prompt literally and marks the answer red, yellow, or green."),
            ("52-58", "Fix one thing", "Add one missing limit, example, source, or stop rule and check again."),
            ("58-60", "Exit ticket", "Name one clue that an AI answer needs a truth check."),
        ],
    },
    3: {
        "title": "Protect People and Build Kindly",
        "outcome": "Learners remove private details, use fictional data, and test whether an idea includes and respects people.",
        "materials": "Privacy Backpack cards; fictional character cards; kindness and fairness checklist; Kind Story Machine template; paper or team device.",
        "proof": "A repaired safe prompt and a kind story tested from one missing person's viewpoint.",
        "timing": [
            ("00-04", "Story + movement", "Mime zipping private details into a backpack and drawing a ramp with a magic crayon."),
            ("04-10", "Teacher demo", "Repair a prompt containing a real school and address, then show one unfair story choice."),
            ("10-44", "Build challenge", "Sort privacy cards, rewrite unsafe prompts, and build a Kind Story Machine."),
            ("44-52", "Swap + test", "Ask: Who is included, who is missing, and could this embarrass or exclude someone?"),
            ("52-58", "Fix one thing", "Remove one unnecessary detail or add one kinder, more inclusive choice."),
            ("58-60", "Exit ticket", "Say one detail that always stays in the privacy backpack."),
        ],
    },
    4: {
        "title": "Build in Tiny Loops",
        "outcome": "Learners create the three-question SAFE Quiz foundation and use a repeatable debugging loop.",
        "materials": "SAFE Quiz starter; Show-Find-Fix-Try Again cards; prepared broken example; three-case test sheet; one team device.",
        "proof": "One playable quiz path, a reproduced bug, a small fix, and a passed repeat test.",
        "timing": [
            ("00-04", "Story + movement", "Cross an imaginary river one stepping stone at a time and find the wobbly stone."),
            ("04-10", "Teacher demo", "Make a prepared bug appear, read its clue, change one cause, and rerun the test."),
            ("10-44", "Build challenge", "Build three SAFE questions with choices, feedback, and a score, then test the main path."),
            ("44-52", "Swap + test", "Partners use the three-case test sheet and record the exact step where anything breaks."),
            ("52-58", "Fix one thing", "Repair the smallest cause and repeat the same case before trying anything new."),
            ("58-60", "Exit ticket", "Point to the evidence that the fix worked."),
        ],
    },
    5: {
        "title": "Build AI Safety Quest",
        "outcome": "Learners turn their quiz foundation into a branching safety game with guardrails and reflection.",
        "materials": "Session 4 SAFE Quiz; quest storyboard; five-choice question bank; capstone checklist; icons or art cards; one team device.",
        "proof": "A playable path with five decisions, three SAFE lessons, scoring, two endings, and a final reflection.",
        "timing": [
            ("00-04", "Story + movement", "Open the Robot City map and choose the player, mission, and safety tools."),
            ("04-10", "Teacher demo", "Connect one choice to feedback, a score change, and two possible next paths."),
            ("10-44", "Build challenge", "Expand the quiz into five decisions, complete one path, then add a second ending."),
            ("44-52", "Swap + test", "A partner plays without explanation and checks clarity, safety, scoring, and both endings."),
            ("52-58", "Fix one thing", "Improve the most confusing choice or weakest safety lesson and replay that path."),
            ("58-60", "Exit ticket", "Explain where a human remains in control inside the game."),
        ],
    },
    6: {
        "title": "Test, Ship, and Showcase",
        "outcome": "Learners use peer evidence to improve the Quest, complete a safe launch check, and explain their choices.",
        "materials": "Completed AI Safety Quest; peer-test sheet; launch checklist; engineer log; presentation screen; team device.",
        "proof": "A recorded peer test, one verified fix, a completed launch checklist, and a two-minute showcase.",
        "timing": [
            ("00-04", "Story + movement", "Test an imaginary bridge with a mouse, elephant, wind, and checker robot."),
            ("04-10", "Teacher demo", "Model useful feedback: exact step, observed result, and expected result."),
            ("10-44", "Build challenge", "Rotate through peer tests, choose the highest-impact issue, fix it, and run the launch check."),
            ("44-52", "Swap + retest", "The original tester repeats the failed path and signs only when evidence is visible."),
            ("52-58", "Showcase", "Demonstrate one decision, one safety lesson, and the before-and-after fix."),
            ("58-60", "Exit ticket", "Finish: We know our game is ready because..."),
        ],
    },
}


def clean_text(value: str) -> str:
    replacements = {
        "\u2013": "-", "\u2014": "-", "\u2011": "-", "\u2192": "->",
        "\u2018": "'", "\u2019": "'", "\u201c": '"', "\u201d": '"',
        "\u00a0": " ", "\u2026": "...", "\u00b7": "|",
    }
    for old, new in replacements.items():
        value = value.replace(old, new)
    return value


def inline(value: str) -> str:
    value = html.escape(clean_text(value.strip()))
    value = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", value)
    value = re.sub(r"`(.+?)`", r"<font name='Courier'>\1</font>", value)
    return value


styles = getSampleStyleSheet()
BODY = ParagraphStyle("Body", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.3, leading=13.4, textColor=INK, spaceAfter=6)
SMALL = ParagraphStyle("Small", parent=BODY, fontSize=7.6, leading=10.3, textColor=MUTED)
LABEL = ParagraphStyle("Label", parent=SMALL, fontName="Helvetica-Bold", fontSize=7.2, leading=9, textColor=ORANGE_DARK, spaceAfter=2)
H2 = ParagraphStyle("H2", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=19, leading=22, textColor=INK, spaceBefore=12, spaceAfter=8)
H3 = ParagraphStyle("H3", parent=styles["Heading3"], fontName="Helvetica-Bold", fontSize=13.5, leading=17, textColor=INK, spaceBefore=11, spaceAfter=5, borderColor=ORANGE, borderWidth=0, borderPadding=(0, 0, 0, 9))
H4 = ParagraphStyle("H4", parent=BODY, fontName="Helvetica-Bold", fontSize=10.5, leading=14, textColor=ORANGE_DARK, spaceBefore=6, spaceAfter=3)
QUOTE = ParagraphStyle("Quote", parent=BODY, fontName="Helvetica-Oblique", fontSize=10, leading=14.5, leftIndent=12, rightIndent=8, textColor=INK, borderColor=ORANGE, borderWidth=0, borderPadding=(5, 0, 5, 11), backColor=ORANGE_PALE)
CODE = ParagraphStyle("Code", parent=BODY, fontName="Courier", fontSize=8.2, leading=12, leftIndent=10, textColor=INK, backColor=SOFT, borderPadding=8)
TABLE_TEXT = ParagraphStyle("TableText", parent=SMALL, fontSize=7.2, leading=9.2, textColor=INK)
TABLE_HEAD = ParagraphStyle("TableHead", parent=TABLE_TEXT, fontName="Helvetica-Bold", textColor=PAPER)
WHITE_TITLE = ParagraphStyle("WhiteTitle", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=34, leading=37, textColor=PAPER, alignment=TA_LEFT, spaceAfter=10)
WHITE_SUB = ParagraphStyle("WhiteSub", parent=BODY, fontName="Helvetica", fontSize=14, leading=20, textColor=colors.HexColor("#D8DADF"), spaceAfter=18)
WHITE_BODY = ParagraphStyle("WhiteBody", parent=BODY, fontSize=10.5, leading=15, textColor=PAPER)
COVER_LABEL = ParagraphStyle("CoverLabel", parent=LABEL, fontSize=8, leading=10, textColor=colors.HexColor("#FF8A6E"), spaceAfter=8)
TOC = ParagraphStyle("TOC", parent=BODY, fontName="Helvetica-Bold", fontSize=11, leading=15, textColor=INK)


def page_chrome(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(CREAM)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setFillColor(BLACK)
    canvas.rect(0, PAGE_H - 16 * mm, PAGE_W, 16 * mm, fill=1, stroke=0)
    canvas.drawImage(str(LOGO), 14 * mm, PAGE_H - 12.5 * mm, 8 * mm, 8 * mm, preserveAspectRatio=True, mask="auto")
    canvas.setFont("Helvetica-Bold", 8)
    canvas.setFillColor(PAPER)
    canvas.drawString(25 * mm, PAGE_H - 9.4 * mm, "AI NINJA ACADEMY | TEACHER EDITION")
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(14 * mm, 10 * mm, "AI Engineer for Kids | aininja.academy")
    canvas.drawRightString(PAGE_W - 14 * mm, 10 * mm, f"{doc.page - 1:02d}  |  © 2026 aininja.academy")
    canvas.setStrokeColor(LINE)
    canvas.line(14 * mm, 13 * mm, PAGE_W - 14 * mm, 13 * mm)
    canvas.restoreState()


def cover_chrome(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(BLACK)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setFillColor(ORANGE)
    canvas.rect(0, 0, 7 * mm, PAGE_H, fill=1, stroke=0)
    canvas.setStrokeColor(colors.HexColor("#2B2E33"))
    for y in (52, 86, 120, 154, 188, 222):
        canvas.line(16 * mm, y * mm, PAGE_W - 16 * mm, y * mm)
    canvas.restoreState()


def make_doc() -> BaseDocTemplate:
    doc = BaseDocTemplate(
        str(TMP_OUTPUT), pagesize=A4, leftMargin=15 * mm, rightMargin=15 * mm,
        topMargin=22 * mm, bottomMargin=18 * mm,
        title="AI Engineer for Kids - Teacher Curriculum",
        author="AI Ninja Academy",
        subject="Six-session practical AI safety and engineering curriculum for ages 10-16",
    )
    cover_frame = Frame(18 * mm, 18 * mm, PAGE_W - 36 * mm, PAGE_H - 36 * mm, id="cover", showBoundary=0)
    body_frame = Frame(15 * mm, 17 * mm, PAGE_W - 30 * mm, PAGE_H - 41 * mm, id="body", showBoundary=0)
    doc.addPageTemplates([
        PageTemplate(id="Cover", frames=[cover_frame], onPage=cover_chrome, autoNextPageTemplate="Body"),
        PageTemplate(id="Body", frames=[body_frame], onPage=page_chrome),
    ])
    return doc


def paragraph(text: str, style=BODY):
    return Paragraph(inline(text), style)


def callout(label: str, title: str, copy: str, color=ORANGE):
    data = [[Paragraph(inline(label.upper()), LABEL)], [Paragraph(inline(title), H3)], [Paragraph(inline(copy), BODY)]]
    table = Table(data, colWidths=[PAGE_W - 38 * mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PAPER),
        ("BOX", (0, 0), (-1, -1), 0.8, LINE),
        ("LINEBEFORE", (0, 0), (0, -1), 4, color),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, 0), 10),
        ("BOTTOMPADDING", (0, -1), (-1, -1), 10),
    ]))
    return table


def cover_story():
    chips = Table([["AGES 10-16", "6 x 60 MIN", "80% HANDS-ON", "NO EXPERIENCE"]], colWidths=[38 * mm] * 4)
    chips.setStyle(TableStyle([
        ("FONT", (0, 0), (-1, -1), "Helvetica-Bold", 7),
        ("TEXTCOLOR", (0, 0), (-1, -1), PAPER),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#1B1D21")),
        ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#3A3D43")),
        ("INNERGRID", (0, 0), (-1, -1), 0.6, colors.HexColor("#3A3D43")),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    return [
        Image(str(LOGO), width=30 * mm, height=30 * mm),
        Spacer(1, 18 * mm),
        Paragraph("TEACHER CURRICULUM | 2026 EDITION", COVER_LABEL),
        Paragraph("AI Engineer<br/>for Kids", WHITE_TITLE),
        Paragraph("Think clearly. Build safely. Make a game.", WHITE_SUB),
        chips,
        Spacer(1, 20 * mm),
        Paragraph("THE COURSE PROMISE", COVER_LABEL),
        Paragraph("Six practical sessions help young people guide AI, question its answers, protect private information, and improve ideas one small step at a time.", WHITE_BODY),
        Spacer(1, 12 * mm),
        Table([[Paragraph("FINAL BUILD", COVER_LABEL), Paragraph("AI SAFETY QUEST", WHITE_BODY)]], colWidths=[38 * mm, 115 * mm], style=TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#15171A")),
            ("BOX", (0, 0), (-1, -1), 0.8, colors.HexColor("#44474E")),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("LEFTPADDING", (0, 0), (-1, -1), 10),
            ("TOPPADDING", (0, 0), (-1, -1), 10),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ])),
        Spacer(1, 25 * mm),
        Paragraph("aininja.academy", ParagraphStyle("CoverURL", parent=WHITE_BODY, fontName="Helvetica-Bold", fontSize=12, textColor=colors.HexColor("#FF8A6E"))),
        PageBreak(),
    ]


def quick_start_story():
    rows = [
        ["01", "Course promise", "One playable AI Safety Quest game"],
        ["02", "Delivery", "Six 60-minute sessions | teams of 2-3"],
        ["03", "Class rhythm", "Story, demo, build, test, fix, exit"],
        ["04", "Safety rule", "Teacher operates Codex for ages 10-12"],
        ["05", "Progress", "Use the same device and browser each week"],
    ]
    data = [[Paragraph("", TABLE_HEAD), Paragraph("QUICK START", TABLE_HEAD), Paragraph("TEACHER DECISION", TABLE_HEAD)]]
    for number, label, value in rows:
        data.append([Paragraph(number, LABEL), Paragraph(inline(label), ParagraphStyle("QuickLabel", parent=BODY, fontName="Helvetica-Bold")), Paragraph(inline(value), BODY)])
    table = Table(data, colWidths=[15 * mm, 40 * mm, 117 * mm], repeatRows=1)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), BLACK),
        ("GRID", (0, 0), (-1, -1), 0.5, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("BACKGROUND", (0, 1), (-1, -1), PAPER),
    ]))
    toc_items = [
        "Course promise and delivery", "Memory stories and SAFE code", "Child-friendly engineer loop",
        "Six complete lesson plans", "Optional project bank", "Final project rubric",
        "Adaptive AI Engineering 101", "Teacher safety and assessment",
    ]
    return [
        Paragraph("START HERE", LABEL),
        Paragraph("Teacher quick start", H2),
        paragraph("Everything needed to run the workshop is arranged as a practical teaching guide. Read the safety note, prepare one device per team, then open the lesson plan for the session you are teaching."),
        Spacer(1, 4 * mm), table, Spacer(1, 8 * mm),
        callout("Shared-device rule", "Assign the same device every week", "Progress is stored only in the current browser on the current device. Label each laptop, keep each team on the same browser, avoid incognito mode, and keep the paper engineer log as the backup record.", GREEN),
        Spacer(1, 8 * mm),
        Paragraph("INSIDE THIS GUIDE", LABEL),
        ListFlowable([ListItem(Paragraph(inline(item), TOC), leftIndent=4 * mm) for item in toc_items], bulletType="bullet", start="circle", leftIndent=6 * mm, bulletColor=ORANGE),
        PageBreak(),
    ]


def session_snapshot(number: int):
    plan = SESSION_PLANS[number]
    overview = Table([
        [Paragraph("LEARNING OUTCOME", LABEL), Paragraph("MATERIALS", LABEL)],
        [Paragraph(inline(plan["outcome"]), BODY), Paragraph(inline(plan["materials"]), BODY)],
        [Paragraph("LEARNER PROOF", LABEL), ""],
        [Paragraph(inline(plan["proof"]), BODY), ""],
    ], colWidths=[86 * mm, 86 * mm])
    overview.setStyle(TableStyle([
        ("SPAN", (0, 2), (1, 2)),
        ("SPAN", (0, 3), (1, 3)),
        ("BACKGROUND", (0, 0), (-1, -1), PAPER),
        ("BOX", (0, 0), (-1, -1), 0.7, LINE),
        ("INNERGRID", (0, 0), (-1, 1), 0.5, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 9),
        ("RIGHTPADDING", (0, 0), (-1, -1), 9),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("BACKGROUND", (0, 0), (-1, 0), ORANGE_PALE),
        ("BACKGROUND", (0, 2), (-1, 2), ORANGE_PALE),
    ]))
    timing_data = [[Paragraph("TIME", TABLE_HEAD), Paragraph("ACTIVITY", TABLE_HEAD), Paragraph("WHAT HAPPENS", TABLE_HEAD)]]
    for time, title, detail in plan["timing"]:
        timing_data.append([Paragraph(time, LABEL), Paragraph(inline(title), ParagraphStyle("TimingTitle", parent=TABLE_TEXT, fontName="Helvetica-Bold")), Paragraph(inline(detail), TABLE_TEXT)])
    timing = Table(timing_data, colWidths=[18 * mm, 34 * mm, 120 * mm], repeatRows=1)
    timing.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), BLACK),
        ("GRID", (0, 0), (-1, -1), 0.5, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [PAPER, SOFT]),
    ]))
    return [overview, Spacer(1, 5 * mm), Paragraph("MINUTE-BY-MINUTE RUN SHEET", LABEL), timing, Spacer(1, 5 * mm)]


def table_flow(rows: list[list[str]]):
    if not rows:
        return Spacer(1, 1)
    columns = len(rows[0])
    if columns > 4:
        headers = rows[0]
        cards = []
        for row in rows[1:]:
            card_rows = []
            for label, value in zip(headers, row):
                card_rows.append([Paragraph(inline(label), LABEL), Paragraph(inline(value), TABLE_TEXT)])
            card = Table(card_rows, colWidths=[35 * mm, 137 * mm])
            card.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, -1), PAPER),
                ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 3),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ]))
            cards.extend([card, Spacer(1, 2 * mm)])
        return cards
    usable = 172 * mm
    widths = [usable / columns] * columns
    if columns == 2:
        widths = [43 * mm, 129 * mm]
    elif columns == 3:
        widths = [24 * mm, 52 * mm, 96 * mm]
    data = []
    for r_index, row in enumerate(rows):
        style = TABLE_HEAD if r_index == 0 else TABLE_TEXT
        data.append([Paragraph(inline(cell), style) for cell in row])
    table = Table(data, colWidths=widths, repeatRows=1)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), BLACK),
        ("GRID", (0, 0), (-1, -1), 0.5, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [PAPER, SOFT]),
    ]))
    return table


def parse_markdown(source: str):
    lines = source.splitlines()
    story = []
    index = 0
    in_code = False
    code_lines = []
    section_breaks = {
        "The two memory stories", "Six-session curriculum", "Optional project bank",
        "Final project rubric", "Adaptive AI Engineering 101 syllabus",
        "Teacher safety and facilitation rules", "Assessment without heavy theory",
        "What success looks like",
    }
    while index < len(lines):
        raw = lines[index]
        stripped = raw.strip()
        if stripped.startswith("```"):
            if in_code:
                story.append(Paragraph("<br/>".join(html.escape(clean_text(x)) for x in code_lines), CODE))
                story.append(Spacer(1, 3 * mm))
                code_lines = []
            in_code = not in_code
            index += 1
            continue
        if in_code:
            code_lines.append(raw)
            index += 1
            continue
        if not stripped:
            index += 1
            continue
        if stripped.startswith("|") and index + 1 < len(lines) and re.match(r"^\|?\s*:?-+", lines[index + 1].strip()):
            table_lines = [stripped]
            index += 2
            while index < len(lines) and lines[index].strip().startswith("|"):
                table_lines.append(lines[index].strip())
                index += 1
            rows = [[cell.strip() for cell in line.strip("|").split("|")] for line in table_lines]
            rendered = table_flow(rows)
            story.extend(rendered if isinstance(rendered, list) else [rendered])
            story.append(Spacer(1, 4 * mm))
            continue
        heading = re.match(r"^(#{1,4})\s+(.+)$", stripped)
        if heading:
            level = len(heading.group(1))
            text = clean_text(heading.group(2))
            if level == 1 or (level == 2 and text == "Project-first course for ages 10-16"):
                index += 1
                continue
            if level == 2 and text in section_breaks and story:
                story.append(PageBreak())
            session_match = re.match(r"Session\s+(\d)\s+-\s+(.+)", text)
            if session_match:
                number = int(session_match.group(1))
                if number != 1:
                    story.append(PageBreak())
                story.append(Paragraph(f"SESSION {number:02d} | 60 MINUTES", LABEL))
                story.append(Paragraph(inline(session_match.group(2)), H2))
                story.extend(session_snapshot(number))
            else:
                style = H2 if level == 2 else H3 if level == 3 else H4
                if level == 2:
                    story.append(Paragraph("TEACHER GUIDE", LABEL))
                story.append(Paragraph(inline(text), style))
            index += 1
            continue
        bullet = re.match(r"^[-*]\s+(.+)$", stripped)
        numbered = re.match(r"^(\d+)\.\s+(.+)$", stripped)
        if bullet:
            items = []
            while index < len(lines):
                match = re.match(r"^[-*]\s+(.+)$", lines[index].strip())
                if not match:
                    break
                items.append(ListItem(Paragraph(inline(match.group(1)), BODY), leftIndent=4 * mm))
                index += 1
            story.append(ListFlowable(items, bulletType="bullet", leftIndent=6 * mm, bulletColor=ORANGE, spaceAfter=5))
            continue
        if numbered:
            items = []
            while index < len(lines):
                match = re.match(r"^(\d+)\.\s+(.+)$", lines[index].strip())
                if not match:
                    break
                items.append(ListItem(Paragraph(inline(match.group(2)), BODY), leftIndent=5 * mm))
                index += 1
            story.append(ListFlowable(items, bulletType="1", leftIndent=7 * mm, bulletFontName="Helvetica-Bold", bulletColor=ORANGE_DARK, spaceAfter=5))
            continue
        if stripped.startswith(">"):
            story.append(Paragraph(inline(stripped[1:].strip()), QUOTE))
            story.append(Spacer(1, 3 * mm))
            index += 1
            continue
        paragraph_lines = [stripped]
        index += 1
        while index < len(lines):
            nxt = lines[index].strip()
            if not nxt or nxt.startswith(("#", "|", "```", ">")) or re.match(r"^[-*]\s+", nxt) or re.match(r"^\d+\.\s+", nxt):
                break
            paragraph_lines.append(nxt)
            index += 1
        story.append(Paragraph(inline(" ".join(paragraph_lines)), BODY))
    return story


def main():
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    source = SOURCE.read_text(encoding="utf-8")
    story = cover_story() + quick_start_story() + parse_markdown(source)
    doc = make_doc()
    doc.build(story)
    os.replace(TMP_OUTPUT, OUTPUT)
    print(f"Generated {OUTPUT}")


if __name__ == "__main__":
    main()
