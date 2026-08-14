# 概念到源码地图

| 想理解什么 | 先读文档 | 再进源码 |
|---|---|---|
| 整体插件树 | `docs/architecture.md` | `packages/app/boot` |
| Session Event | `docs/subsystems/session.md` | `packages/core/session/src/index.ts` |
| 提示词装配 | `docs/subsystems/system-prompt.md` | `packages/core/system-prompt/src/index.ts` |
| Turn / Step | `docs/agent-turn-lifecycle.md` | `packages/core/agent-loop/src/index.ts` |
| 工具执行 | `docs/tool-execution-pipeline.md` | `packages/core/tools/src/index.ts` |
| 扩展模式 | `docs/cookbook/extension-cookbook.md` | 从对应 plugin 的 `apply(ctx)` 开始 |
| Profile / Bundle | `docs/architecture.md#profiles-and-bundles` | `packages/app/boot` 与各包 `package.json#dsh` |

阅读大型代码库时，不要从目录第一行线性读到最后一行。选择一个事件或服务：**定义 → provider → consumer → invariant → tests**。

