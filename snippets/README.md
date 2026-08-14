# Minimal teaching implementations

这些文件不是 DeepSeek Harness 源码的复制品，而是把关键机制压缩到几十行的“显微镜切片”。它们只使用 Node.js / TypeScript 标准能力，重点是让结构可见。

| 文件 | 你会看到 |
|---|---|
| `h01-agent-loop.ts` | Turn、Step、工具结果反馈 |
| `h02-session-log.ts` | append-only 事件日志与投影 |
| `h03-plugin-effects.ts` | 插件注册、effect 与干净卸载 |
| `h04-tool-pipeline.ts` | pre / execute / post / result 四段管线 |

> 教学实现没有生产级沙箱、审批、错误恢复与资源隔离。请勿直接用于真实 Agent。

