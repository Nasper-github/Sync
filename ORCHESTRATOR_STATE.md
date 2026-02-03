Project Sync - Orchestrator State
🎯 Current Sprint
Sprint 1: Foundation

⚡ Active Task
Task: S1.4 - Text selection tracking

Status: COMPLETED

Priority: Critical (Required for all subsequent tasks)

📋 Task Backlog
Sprint 1: Foundation
[x] S1.1 - Project scaffolding (frontend + backend)
    - [x] Monorepo setup
    - [x] Frontend (Vite+React+TS+Tailwind)
    - [x] Backend (FastAPI+Poetry)
    - [x] Docker Compose

Setup Monorepo structure

Frontend: Vite + React + TypeScript + Tailwind CSS

Backend: FastAPI + Poetry

Configure Docker Compose

[x] S1.2 - Document parser with format map

Implement DocumentParser using python-docx and lxml

Create FormatMap for XPath expression linking

Ensure run-level formatting preservation

[x] S1.3 - Basic TipTap editor rendering .docx

[x] S1.4 - Text selection tracking

[x] S1.5 - Side panel component

[ ] S1.6 - FastAPI endpoints for document CRUD

Sprint 2: AI Pipeline
[ ] S2.1 - Qdrant setup and document chunking

[ ] S2.2 - Jina embeddings integration (8K context support)

[ ] S2.3 - LangGraph agent workflow

[ ] S2.4 - Claude API integration via OpenRouter

[ ] S2.5 - Semantic search implementation

Sprint 3: Polish & Deploy
[ ] S3.1 - Track Changes generation (OOXML injection)

[ ] S3.2 - Conflict detection UI

[ ] S3.3 - Audit trail / reasoning panel

[ ] S3.4 - Document export with formatting

🏗️ Technical Decisions & Integration
Editor: TipTap (React-based)

Orchestration: LangGraph for agent workflows

Embeddings: Jina-embeddings-v3

Ports: Frontend on 5173, Backend on 8000

UI: Tailwind CSS + Shadcn UI