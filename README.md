# CortexOS

CortexOS is a full-stack personal knowledge workspace that connects notes, documents, tasks, projects, decisions, memories, research, and conversations. It includes an AI assistant, knowledge graph, and analytics for exploring and organizing that information.

## Features

- Create and organize notes, documents, tasks, and projects
- Maintain conversations, memory entries, decisions, and research runs
- Explore relationships through a knowledge graph
- Review analytics and potential contradictions
- Use an OpenAI-compatible AI client with a local Ollama model

## Technology stack

| Area | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query |
| Backend | Node.js, TypeScript, Express |
| Data | PostgreSQL, Drizzle ORM |
| Authentication | Clerk, with an opt-in local development bypass |
| AI | OpenAI Node SDK, Ollama, Qwen3.5 4B |
| Workspace | pnpm monorepo |

## Repository structure

| Path | Purpose |
|---|---|
| `artifacts/cortexos/` | React frontend |
| `artifacts/api-server/` | Express API server |
| `lib/db/` | Database client and Drizzle schema |
| `lib/api-spec/` | OpenAPI source |
| `lib/api-zod/` | API validation schemas |
| `lib/api-client-react/` | React API client |
| `lib/integrations-openai-ai-server/` | Server-side OpenAI-compatible AI integration |
| `lib/integrations-openai-ai-react/` | React audio integration hooks |
| `scripts/` | Workspace scripts |

## Local development

### Prerequisites

- Node.js and pnpm
- PostgreSQL
- Ollama with `qwen3.5:4b` pulled

### Configure and install

1. Copy `.env.example` to `.env` for a new checkout. Update `DATABASE_URL` and any provider credentials for your environment.
2. Install workspace dependencies:

   ```powershell
   pnpm install
   ```

3. Start PostgreSQL and create the database named in `DATABASE_URL`.
4. Apply the database schema:

   ```powershell
   pnpm --filter @workspace/db push
   ```

5. Start Ollama and make the model available:

   ```powershell
   ollama pull qwen3.5:4b
   ollama serve
   ```

The local AI endpoint is `http://localhost:11434/v1`. The example environment file configures this endpoint and model. Qwen3.5 4B supports text and vision input; image generation and audio features require a compatible provider.

For local development without Clerk credentials, set `LOCAL_AUTH_BYPASS=true` and `VITE_LOCAL_AUTH_BYPASS=true` in `.env`. Do not enable the bypass in production. Otherwise, configure the Clerk keys shown in `.env.example`.

### Run the application

Start the API server in one terminal:

```powershell
pnpm --filter @workspace/api-server dev
```

Start the frontend in another terminal:

```powershell
pnpm --filter @workspace/cortexos dev
```

The API server uses port `8080`; the Vite frontend uses port `5173` by default. These can be changed with `PORT` and `VITE_PORT`.

## License

The root `package.json` declares the MIT license. No standalone `LICENSE` file is present in this checkout.

## Attribution

This project is based on the original CortexOS repository.
