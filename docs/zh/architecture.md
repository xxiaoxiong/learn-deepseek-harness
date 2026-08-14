# DeepSeek Harness 架构导读

> 研究基线：`deepseek-ai/deepseek-harness@47f943859bef60e4160492346772ded9b24f765a`（2026-08-13）。上游处于 developer preview，接口与事件可能继续变化。

一句话版本：**DeepSeek Harness 是一棵由 Cordis 组合、用作用域管理生命周期、由事件驱动协作、以 SessionEvent 保存事实，并通过能力接缝替换实现的插件树。**

## 六个推理平面

| 平面 | 关键结构 | 阅读问题 |
|---|---|---|
| 组合 | Profile / Bundle / Patch / Context | 谁安装插件？配置怎样覆盖？卸载时谁回收？ |
| 主干 | Inbox / Turn / Step / EpochHeader | 一条输入如何被认领、请求模型并结清？ |
| 能力 | Definition / Provider / Consumer | 文件、进程、模型和委派如何替换？ |
| 控制 | Event / Guard / Approval / Policy | 哪些公开接缝允许观察、改写和拒绝？ |
| 事实 | SessionEvent / Persistence / Projection | 崩溃后如何恢复？UI 依据哪份真相？ |
| 表面 | Web / CLI / ACP / SDK / API | 多入口如何共享内核而不复制状态？ |

## 三个事件域必须分开

### 1. `session/event`：持久事实

只追加、带顺序、可回放、会影响模型或会话语义的事实进入这里。Transcript、恢复、搜索、用量与客户端投影都从这份日志生长。UI 的 surface 顺序可能重组压缩摘要或工具卡片，因此不能把展示位置当成日志 `seq`。

### 2. `agent/*`：实时运行状态

Agent 状态、流式增量、steer、cancel 等属于活跃执行。它们适合状态灯与控制面板，不是持久 transcript 的替代物。

### 3. Capability events：公开扩展接缝

Prompt、Tool、Approval、Compaction 等子系统通过类型化事件暴露 pre / around / post 或 policy 接缝。插件在这里协作，避免把所有扩展写进 Agent Loop。

## 一次 Turn 的因果链

```text
inbox/claim
  → turn/start
  → request/header     # 完整 EpochHeader 快照
  → step/start
  → llm stream
  → assistant item
  → tool pipeline?     # 可能产生下一 Step
  → step/finish
  → turn/finish        # 所有工具债务结清
```

Turn 是一份需要结清的工作，Step 是一次 LLM 请求。把二者混为一谈，会在工具调用、取消、恢复和用量归属上制造歧义。

## 工具管线的核心不是 Middleware，而是结算

```text
pre → approval → monotonic guards → around execute
    → post → normalize → finalizeContent → frozen result
```

所有出口都必须汇入相同的最终化路径：成功、拒绝、异常、取消、超时都要生成匹配 `toolCallId` 的模型可消费结果。下游 Guard 可以把允许变成拒绝，不能把拒绝重新放行。

## 耐久性来自“不改历史”

- **Compaction** 用摘要替换模型 Surface 中的一段内容，不删除 SessionEvent 历史；
- **Spill** 把超大内容移出上下文，留下不透明 locator，并把失败视为 best-effort；
- **Projection** 从事件增量计算读模型，用 watermark 防止重复消费；
- **Persistence** 保存权威事件，而不是保存某个 UI 组件树的快照。

## 判断新能力放在哪里

1. 已有 Service Definition？新增 Provider，并让消费者继续依赖稳定 service。
2. 需要改写一次运行？寻找 capability event 或 guard seam。
3. 需要新工具？注册 ToolDefinition，不修改 Agent Loop。
4. 需要新客户端？通过 Host / Agent public API 驱动，从 SessionEvent 投影。
5. 需要产品变体？用 Bundle / Profile / Patch 组合，不复制仓库或硬编码配置。

## 复核入口

- `docs/architecture.md`
- `docs/agent-lifecycle.md`
- `docs/capability-seams.md`
- `docs/tool-execution-pipeline.md`
- `docs/subsystems/session.md`
- `docs/subsystems/core.md`
- `docs/subsystems/compaction.md`

教学解释用于建立模型；官方源码用于最终裁决。
