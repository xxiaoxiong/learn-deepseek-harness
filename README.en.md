<div align="center">

<img src="assets/readme-hero-v2.png" alt="Learn DeepSeek Harness: 28 chapters, 6 layers, 70 static pages, 64 source anchors, and a six-plane architecture map" width="100%" />

# Learn DeepSeek Harness

### An architecture-first, source-anchored course for DeepSeek Harness

Turn a complex **AI agent runtime, Cordis plugin system, guarded tool pipeline, and recoverable execution model** into architecture knowledge you can transfer to your own systems.

**28 deep chapters · 6-layer learning ramp · 70 static pages · 64 source anchors · Chinese + English**

[![Live Course](https://img.shields.io/badge/Live_Course-Open_now-2563EB?style=for-the-badge&logo=vercel&logoColor=white)](https://learn-deepseek-harness.vercel.app/en)
[![Upstream](https://img.shields.io/badge/Upstream-47f9438-0E9F79?style=for-the-badge&logo=github&logoColor=white)](https://github.com/deepseek-ai/deepseek-harness/commit/47f943859bef60e4160492346772ded9b24f765a)
[![Curriculum](https://img.shields.io/badge/Curriculum-28_chapters-7955D9?style=for-the-badge&logo=bookstack&logoColor=white)](https://learn-deepseek-harness.vercel.app/en/timeline)
[![License](https://img.shields.io/badge/License-MIT-E66856?style=for-the-badge)](LICENSE)

[Start chapter one](https://learn-deepseek-harness.vercel.app/en/chapter/h01-harness) · [Architecture atlas](https://learn-deepseek-harness.vercel.app/en/architecture) · [Design comparison](https://learn-deepseek-harness.vercel.app/en/compare) · [Learning path](https://learn-deepseek-harness.vercel.app/en/timeline) · [Source index](https://learn-deepseek-harness.vercel.app/en/docs) · [简体中文](README.md)

<sub>If architecture-first, mechanism-first, source-anchored learning helps you, consider giving the project a ⭐ Star.</sub>

</div>

---

## Decide in 30 seconds whether this is for you

| Your question | This project’s answer |
|---|---|
| What does DeepSeek Harness actually solve? | It treats state, tools, permissions, recovery, and multiple clients as one runtime system—not as one model call. |
| Where should I begin reading a large agent codebase? | Build a six-plane map, then trace `Definition → Provider → Consumer → Event → Invariant → Tests`. |
| Does it cover more than the happy path? | Every chapter includes a causal flow, invariants, failure modes, a knowledge check, and a bridge forward. |
| Can I verify the claims? | The course is pinned to official `deepseek-harness@47f9438`; 64 anchors lead to upstream docs, symbols, and implementation paths. |
| What will I be able to do? | Explain and extend agent runtimes, plugin lifecycles, tool guards, durable projections, long context, subagents, and workflows. |

> [!NOTE]
> This is an independent teaching and source-analysis project built around [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness). It is not an official DeepSeek project or endorsement. Upstream remains the source of truth.

## Not a package-name translation

Why can the same model feel like a completely different system inside two agent products?

The model proposes a next step. The harness makes that step **executable, deniable, recoverable, replayable, and composable**. It decides what the model sees, how tool calls settle, where durable facts live, how permissions narrow, how context compacts, and how Web / CLI / SDK surfaces share the same runtime truth.

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) organizes these responsibilities around **Everything is a Plugin**. The idea is powerful; its real mechanics are easy to lose behind vocabulary such as Cordis, EpochHeader, SessionEvent, Projection, and Capability Seam.

This course takes a deliberate path:

- begin with an accurate plain-language intuition;
- turn each mechanism into a clickable causal flow;
- name invariants, error paths, and common misreadings;
- anchor conclusions in official docs, symbols, paths, and implementation;
- connect every chapter to the next with an explicit bridge question.

Teaching inference and upstream-backed fact are labeled separately. DeepSeek Harness is still in developer preview, so the pinned snapshot makes every architectural claim auditable instead of vaguely “current.”

## Research baseline

| Research dimension | Pinned baseline | Why it matters |
|---|---:|---|
| Upstream commit | [`47f9438`](https://github.com/deepseek-ai/deepseek-harness/commit/47f943859bef60e4160492346772ded9b24f765a) | Makes architecture claims reproducible |
| Calibration date | 2026-08-13 | Marks the developer-preview time boundary |
| Top-level package families | 49 | Covers spine, capability, control, durability, collaboration, and surfaces |
| Official docs files | 324 | Cross-checks architecture, lifecycles, subsystems, and cookbooks |
| Package files | 3,746 | Avoids guessing implementation from documentation titles |
| Teaching output | 28 chapters / 6 layers / 70 static routes | Chinese and English share one structured content source |

The source review crosses `architecture`, `agent-lifecycle`, `capability-seams`, `tool-execution-pipeline`, `session`, `system-prompt`, `llm-streaming`, `approval`, `permission-presets`, `compaction`, `spill`, `projection`, `subagent`, `workflow`, `jobs`, and `schedule`.

## One map for the whole system

<img src="assets/architecture-map-light.svg" alt="DeepSeek Harness six-plane architecture atlas" width="100%" />

Forty-nine package families are not forty-nine islands. The course reorganizes the system into six reasoning planes:

| Plane | Core vocabulary | The question it answers |
|---|---|---|
| Composition | `Profile · Bundle · Patch · Cordis` | Which plugins exist, how config layers, and how resources unwind |
| Agent spine | `Inbox · Turn · Step · Request` | How one input is claimed, reasoned over, and settled |
| Capability | `Definition · Provider · Consumer` | Why filesystems, processes, models, and delegation are replaceable |
| Control | `Event · Guard · Approval · Policy` | Who may observe, rewrite, or deny an action |
| Truth | `SessionEvent · Persistence · Projection` | How the system recovers and what clients treat as authoritative |
| Surfaces | `Web · CLI · ACP · SDK · API` | How many clients share one agent without duplicating business state |

## The six-layer curriculum

| Layer | Chapters | Outcome |
|---|---|---|
| 01 · Mental model | H01–H04 | Explain model, agent, and harness boundaries; navigate a large source tree |
| 02 · Composition grammar | H05–H09 | Read Context, Effect, Fiber, Service, Event, Scope, Profile, and Bundle |
| 03 · Agent spine | H10–H15 | Trace Agent, Session, Turn, Step, Prompt, LLM, and Tool event by event |
| 04 · Safety and durability | H16–H20 | Reason about denial, crashes, cancellation, long context, and replay |
| 05 · Collaborative systems | H21–H24 | Separate goals, subagents, jobs, workflows, schedules, and discovery |
| 06 · Build and ship | H25–H28 | Build tools and providers, connect surfaces, and ship profiles and bundles |

Each chapter answers the same eight questions: chapter problem, plain analogy, mechanism, interactive flow, invariants, failure modes, source anchors, and a knowledge check plus chapter bridge.

## Two mechanisms worth tracing

### A turn is not one model call

<img src="assets/turn-lifecycle-light.svg" alt="Turn and step lifecycle with tool debt" width="100%" />

A turn is work that must settle; a step is one model request. Tool calls create debt that must return as paired results before the turn can legally close. This view unifies retries, cancellation, stream events, usage, and recovery.

### A tool is not `tools[name](args)`

<img src="assets/tool-pipeline-light.svg" alt="Guarded tool execution pipeline" width="100%" />

Real tool execution flows through `pre → approval → guard → around → post → normalize → finalize`. Success, denial, exceptions, cancellation, and timeouts converge on a model-consumable, auditable result. Downstream policy can narrow permission, but it cannot re-enable an action already denied upstream.

## Website experience

The [live course](https://learn-deepseek-harness.vercel.app/en) is a statically generated learning application, not a reskinned README:

- interactive six-plane architecture atlas;
- Turn event replay from `inbox/claim` to `turn/finish`;
- chapter mechanism steppers and knowledge checks;
- minimal-agent versus production-harness comparison;
- curated source catalog organized by learning question;
- responsive desktop, tablet, and mobile layouts;
- structurally aligned Chinese and English courses.

## Repository structure

```text
learn-deepseek-harness/
├── assets/                  # README hero and original mechanism diagrams
├── docs/
│   ├── zh/                  # Architecture, source map, and safety notes
│   └── en/                  # English architecture primer
├── snippets/                # Teaching slices reduced to reveal mechanisms
└── web/                     # Next.js 16 static learning site
    └── src/
        ├── app/[locale]/    # Home, 28 chapters, atlas, compare, path, glossary
        ├── components/      # SystemMap / FlowLab / MechanismFlow / Check
        └── lib/content.ts   # Shared bilingual structured curriculum source
```

The teaching method is deeply inspired by [learn-hermes-agent](https://github.com/xxiaoxiong/learn-hermes-agent). The DeepSeek Harness research, curriculum, interaction flows, diagrams, and bright editorial system were designed specifically for this project.

## Run locally

```bash
git clone https://github.com/xxiaoxiong/learn-deepseek-harness.git
cd learn-deepseek-harness/web
npm install
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en). Before contributing, run:

```bash
npm run lint
npm run build
```

The build statically generates 70 routes. For Vercel, set the project Root Directory to `web`.

## Recommended source-reading loop

Do not read a large repository linearly from the first folder to the last. Choose one mechanism and trace:

```text
Question → Definition → Provider → Consumer → Event → Invariant → Tests
```

Start with the pinned official [Architecture](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/architecture.md), [Agent lifecycle](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/agent-lifecycle.md), [Capability seams](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/capability-seams.md), [Session subsystem](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/subsystems/session.md), [Tool execution pipeline](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/tool-execution-pipeline.md), and [Extension cookbook](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/cookbook/extension-cookbook.md).

## Safety boundary

Files in `snippets/` are deliberately reduced teaching implementations, **not production agent code**. They omit complete approval, sandboxing, isolation, resource limits, credential separation, and recovery. Never run untrusted input or production credentials through them.

## Contributing and maintenance

See [CONTRIBUTING.md](CONTRIBUTING.md) for content corrections, source mapping, course proposals, and implementation changes. The issue forms ask contributors to separate upstream fact, teaching inference, and requested improvement.

Maintenance principles:

- pin every architecture claim to an upstream commit;
- compare module graphs, event catalogs, and capability catalogs before updating prose;
- fix invariants, event order, and source anchors first after a breaking change;
- keep the website, READMEs, and source map aligned to the same research snapshot.

## Credits

- [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) — upstream project and factual source of truth
- [learn-hermes-agent](https://github.com/xxiaoxiong/learn-hermes-agent) — important reference for the teaching architecture
- [Cordis](https://github.com/cordisjs/cordis) — composition and lifecycle foundation used by DeepSeek Harness

## License

[MIT](LICENSE) © 2026 [xxiaoxiong](https://github.com/xxiaoxiong)
