# AI Employee Core Skills

This file defines the specialized skills the AI Employee uses to manage the Obsidian vault and perform business tasks.

## `process_needs_action`
Processes all markdown files in the `/Needs_Action` folder.
- **Steps:**
    1. Read each file in `/Needs_Action`.
    2. Create a corresponding plan in `/Plans/PLAN_<filename>.md`.
    3. If the task requires external action, create an approval request in `/Pending_Approval/`.
    4. Move the original signal file to `/Done/`.

## `generate_ceo_briefing`
Audits the vault and generates a weekly summary.
- **Data Sources:** `/Logs/`, `/Done/`, `Business_Goals.md`.
- **Output:** `/Briefings/{{DATE}}_Monday_Briefing.md`.

## `handle_approval`
Executes tasks from the `/Approved` folder.
- **Triggers:** When a file moves from `/Pending_Approval` to `/Approved`.
- **Actions:** Sends emails, posts to social media, or updates financial logs via MCP.
