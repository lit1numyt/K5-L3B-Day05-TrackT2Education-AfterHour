# LAB5 — Track 2: Education

## Study Assistant prototype

This repository now includes a responsive React/Vite prototype for the AI Study Assistant. It uses synthetic mock data and the opened Lesson 3 sections only; no API key is required.

### Run locally

```bash
npm install
cp .env.example .env
# Add your OpenAI key to .env, then use two terminals:
npm run api
npm run dev
```

Use `npm run build` to create a production build. The browser calls `/api/chat`; the API key stays in the Node server and is never exposed to the frontend.

### What is included

- Responsive study chat layout with collapsible navigation, conversation history, empty state, loading state, keyboard send behavior, citations, and copy actions.
- Mock conversations for explanations, exercise hints, and course-context questions.
- Replaceable `StudyAssistantAdapter` with an OpenAI Responses API adapter as the default. The mock adapter remains available for offline demos.
- Server-side study-mode system prompt with Lesson 3 fixtures, educational integrity rules, and structured FC-01–FC-04 detection.
- Configuration-driven failure-handling types, registry, disabled FC-01 through FC-08 placeholders, and an intentionally unimplemented resolver.

The failure placeholders remain disabled and contain no invented case-specific behavior. They are ready to be populated only after the team approves the corresponding failure-case documents.

This repository contains our team's work for **LAB5 — Track 2 (Education)**.

Our project explores failure handling, tool autonomy, and the user experience of an AI study assistant integrated into a course platform.

## 1. Repository structure

```text
.
├── README.md
├── failure-cases/
│   ├── failure-case-template.md
│   ├── FC-01-[failure-case-name].md
│   ├── FC-02-[failure-case-name].md
│   └── ...
├── spec.md
└── prototype/
    ├── README.md
    └── screenshots/
```

Each failure case must have its own Markdown file, created from `failure-case-template.md`.

## 2. Branch naming convention

**Do not commit directly to `main`.**

Each member must work on a branch named after themselves:

```text
<your-name>/<optional-sub-branch>
```

Examples:

```text
khoa
khoa/failure-cases
khoa/FC-01
teammate1
teammate1/FC-03
```

Use lowercase names and hyphens where appropriate. Optional sub-branches can be used to separate tasks.

## 3. Commit message convention

Every commit must follow this format:

```text
(task<task-number>) [<failure-case-name>] <contribution>
```

Examples:

```text
(task1) [AI give straight answer to student] prompt for handling the case

(task1) [AI give straight answer to student] document failure mechanism

(task2) [AI cites nonexistent slide] add expected product behavior

(task3) [AI reveals homework answer] define autonomy policy
```

### Commit message rules

- `task<number>` identifies the task assigned by the team.
- `[failure-case-name]` identifies the failure case being worked on.
- The final part briefly describes your actual contribution.
- Keep the failure-case name consistent across commits and its Markdown filename.
- Use a clear action in the contribution description: `add`, `update`, `document`, `define`, `fix`, `review`, etc.
- One commit should represent one logical contribution where practical.

## 4. Uploading your work

### First-time setup

Clone the repository:

```bash
git clone <repository-url>
cd <repository-name>
```

Create your own branch:

```bash
git checkout -b khoa/failure-cases
```

Replace `khoa` with your own name.

### Before committing

Check your current branch:

```bash
git branch --show-current
```

Check changed files:

```bash
git status
```

Review your changes:

```bash
git diff
```

### Commit your work

Stage only the files you intend to upload:

```bash
git add failure-cases/FC-01-your-failure-case.md
```

Commit using the required convention:

```bash
git commit -m "(task1) [AI give straight answer to student] document failure mechanism"
```

### Push your branch

For the first push:

```bash
git push -u origin khoa/failure-cases
```

For later updates:

```bash
git push
```

Replace the branch name with your own.

### Merge your work

Once your work is ready:

1. Push your branch to GitHub.
2. Open a Pull Request targeting `main`.
3. Include a short description of what you contributed.
4. Request a review from the team.
5. Merge only after the team approves the changes.

## 5. Collaboration rules

- Do not work directly on `main`.
- Do not overwrite another member's work.
- Keep each failure case in its own Markdown file.
- Use the shared template to keep documentation consistent.
- Do not invent course materials, tool outputs, or fixture data.
- Reference the relevant course section or tool behavior when describing a failure.
- Keep commits small and descriptive.
- If you modify an existing failure case, update its existing file instead of creating a duplicate.
- Discuss major changes to severity, selected high-risk cases, or autonomy decisions with the team.

## 6. Before submitting

- [ ] My branch is named after me.
- [ ] My commit messages follow the required format.
- [ ] My changes are pushed to GitHub.
- [ ] My failure case follows the shared template.
- [ ] My Pull Request targets `main`.
- [ ] My contribution is clearly described.

**Keep the history readable, the failure cases evidence-based, and the collaboration organized.**
