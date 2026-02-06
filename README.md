# 🤖 Personal AI Employee (Digital FTE) - 2026 Edition

> **Tagline:** Your life and business on autopilot. Local-first, agent-driven, human-in-the-loop.

This project is a comprehensive technical implementation of a "Digital FTE" (Full-Time Equivalent). It uses Claude Code as the reasoning engine and Obsidian as the primary GUI and long-term memory.

## 🌟 Tiers Achieved
- **[x] Bronze**: Foundation (Vault, Dashboard, Filesystem Watcher)
- **[x] Silver**: Functional Assistant (LinkedIn Watcher, MCP Integration, Scheduling)
- **[x] Gold**: Autonomous Employee (Ralph Wiggum Loop, Business Audit, Odoo Template)

## 🏗️ Architecture
- **Brain**: Claude Code (Running via `orchestrator.py`)
- **Memory**: Obsidian Local Markdown Vault
- **Senses**: Python Sentinel Scripts (Watchers)
- **Hands**: Model Context Protocol (MCP) Servers
- **Dashboard**: Next.js Control Center

## 🚀 Quick Start

### 1. Prerequisites
- Python 3.13+
- Node.js 24+
- Next.js (installed in `/frontend`)

### 2. Setup
```bash
# Install Python dependencies
pip install schedule watchdog

# Install Frontend dependencies
cd frontend
npm install
```

### 3. Execution
Run the orchestrator and watchers in separate terminals:
```bash
# Start the Logic Engine
python orchestrator.py

# Start the Scheduler
python scheduler.py

# Start the Perception Layer
$env:PYTHONPATH="watchers"; python watchers/filesystem_watcher.py

# Start the Dashboard
cd frontend
npm run dev
```

## 🛠️ Key Files
- `orchestrator.py`: The master logic process.
- `audit_system.py`: Generates the "Monday Morning CEO Briefing".
- `ralph_loop.py`: Implements the autonomous persistence pattern.
- `AI_Employee_Vault/`: Your Obsidian dashboard.

## 🛡️ Security & Privacy
- **Local-First**: All data stays in your Obsidian vault.
- **HITL (Human-in-the-Loop)**: Sensitive actions stay in `/Pending_Approval` until you move them to `/Approved`.

---
*Built for the Personal AI Employee Hackathon 2026*
