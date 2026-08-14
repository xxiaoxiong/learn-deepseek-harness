<div align="center">

<img src="assets/deepseek-harness-hero.png" alt="Learn DeepSeek Harness" width="100%" />

# Learn DeepSeek Harness

### Understand the system beneath an AI agent.

**18 chapters · 5 layers · bilingual site · interactive architecture · real source anchors**

[Live course](https://learn-deepseek-harness.vercel.app/en) · [简体中文](README.md) · [Architecture map](https://learn-deepseek-harness.vercel.app/en/architecture)

</div>

## What is this?

An independent teaching companion for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness), built around its central idea: **Everything is a Plugin**.

Instead of starting with framework jargon, the course starts with familiar analogies, then reveals the actual mechanism, and finally points to the upstream source. It covers Cordis context and effects, profiles and bundles, append-only session events, prompt assembly, turns and steps, the tool pipeline, model adapters, approval and sandboxing, compaction, MCP, skills, subagents, and extension authoring.

The structure and teaching method are deeply inspired by [learn-hermes-agent](https://github.com/xxiaoxiong/learn-hermes-agent), while the visual system and all DeepSeek Harness material were designed specifically for this project.

## Run locally

```bash
git clone https://github.com/xxiaoxiong/learn-deepseek-harness.git
cd learn-deepseek-harness/web
npm install
npm run dev
```

Open `http://localhost:3000/en`.

## Safety and status

The files under `snippets/` are minimal teaching implementations, not production agent code. They intentionally omit production sandboxing, approval, isolation, and recovery. DeepSeek Harness is currently a developer preview and evolves quickly; upstream source remains the source of truth.

Content was aligned with the upstream architecture and subsystem documentation on **2026-08-14**.

## License

[MIT](LICENSE) © 2026 [xxiaoxiong](https://github.com/xxiaoxiong)
