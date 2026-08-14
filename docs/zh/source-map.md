# DeepSeek Harness 概念到源码地图

> 对齐 `47f9438`。推荐沿“问题 → 定义 → Provider → Consumer → Event → Invariant → Tests”追踪，而不是从目录第一行线性阅读。

## 组合与生命周期

| 想回答的问题 | 先读 | 追踪重点 |
|---|---|---|
| 为什么一切都能成为插件？ | `docs/architecture.md` | Context 如何安装插件，插件如何声明 service / event / effect |
| 为什么卸载不会留下监听器？ | `docs/cordis-primer.md` | Effect disposer、父子 Context 与 scope disposal |
| 异步任务由谁取消？ | `docs/agent-lifecycle.md` | Fiber ownership、AbortSignal 与父子生命周期 |
| 产品组合怎样覆盖默认配置？ | `docs/architecture.md` | Profile → Bundle → user Patch 的优先级与稳定 id |
| 能力如何替换而不穿透？ | `docs/capability-seams.md` | Definition / Provider / Consumer / policy consumer |

## Agent 主干

| 想回答的问题 | 先读 | 追踪重点 |
|---|---|---|
| Agent 从创建到销毁发生什么？ | `docs/subsystems/core.md` | public handle、agent 状态、runtime effects |
| 会话事实怎样写入？ | `docs/subsystems/session.md` | SessionEvent append、surface、seq 与恢复 |
| Turn 和 Step 为什么不同？ | `docs/agent-lifecycle.md` | inbox claim、request header、tool debt、settlement |
| 系统提示词怎样组装？ | `docs/subsystems/system-prompt.md` | contribution、顺序、snapshot 与缓存边界 |
| 流式结果怎样变成事实？ | `docs/subsystems/llm-streaming.md` | delta、completed item、error 与 usage |
| 工具拒绝后为什么还要写结果？ | `docs/tool-execution-pipeline.md` | pre / approval / guard / around / post / finalize |

## 安全与耐久性

| 想回答的问题 | 先读 | 追踪重点 |
|---|---|---|
| 默认权限从哪里来？ | `docs/subsystems/permission-presets.md` | preset layering 与运行时决策 |
| 审批和 Guard 如何协作？ | `docs/subsystems/approval.md` | interaction、deny path 与 monotonic safety |
| Sandbox 是否等于权限？ | `docs/capability-seams.md` | sandbox provider、FS / subprocess 共同执行世界 |
| 上下文满了怎样压缩？ | `docs/subsystems/compaction.md` | lock、summary、surface replacement、tool pair balance |
| 超大结果怎样离开上下文？ | `docs/subsystems/spill.md` | opaque locator、best-effort 与 read-back |
| 搜索与统计怎样避免重算？ | `docs/subsystems/session-projection.md` | projection cache、watermark、rebuild |
| 查询如何不篡改权威日志？ | `docs/subsystems/session-query.md` | read model 与 source of truth 的边界 |

## 协作与长期运行

| 想回答的问题 | 先读 | 追踪重点 |
|---|---|---|
| Goal / Plan / Todo 各自保存什么？ | 对应 `docs/subsystems/*` | 长期意图、当前策略与原子执行状态 |
| 子 Agent 怎样选择实现？ | `docs/subsystems/subagent.md` | provider contract、parent/child session 与回传 |
| 后台 Job 怎样恢复？ | `docs/subsystems/jobs.md` | durable state、cancel、result 与 ownership |
| Workflow 与 Job 有何差别？ | `docs/subsystems/workflow.md` | graph semantics、step result 与 orchestration |
| Schedule 为什么不能只是 timer？ | `docs/subsystems/schedule.md` | durable definition、trigger、missed run 与 job handoff |

## 扩展与产品化

| 任务 | 官方入口 | 验证标准 |
|---|---|---|
| 新增 Tool | `docs/cookbook/extension-cookbook.md` | schema、AbortSignal、统一错误语义、无全局可变状态 |
| 新增 Adapter / Provider | `docs/cookbook/adding-an-llm-adapter.md` | consumer 不 import provider，契约测试复用 |
| 新增 Package | `docs/cookbook/adding-a-package.md` | 导出边界、依赖方向、dispose 与模块图 |
| 新增客户端表面 | `docs/api-gateway.md` | Host 拥有 runtime，客户端从事件投影 |
| 发布产品组合 | `docs/architecture.md` | Bundle 可覆盖、Profile 可解释、用户 Patch 可保留 |

## 阅读时始终检查的五条不变量

1. 模型可见事实必须能从 SessionEvent 重建。
2. 工具调用与工具结果必须配对。
3. 插件创建的 effect 必须能随 scope 回收。
4. 下游 policy 可以收紧权限，不能重新放行已拒绝操作。
5. 客户端表面不能成为第二份 Agent 权威状态。
