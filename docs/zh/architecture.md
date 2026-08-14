# DeepSeek Harness 架构导读

> 一句话：DeepSeek Harness 是一棵由 Cordis 在启动时组装的插件树；Agent 的运行事实被写入 append-only 会话日志，能力通过服务和类型化事件接缝协作。

## 先看六层

1. **入口层**：Web、Headless、ACP、SDK 只做协议适配。
2. **组合层**：Profile 叠加 Bundle，再叠加用户 Patch。
3. **Agent 主干**：Inbox → Turn → Step → Model / Tools。
4. **能力平面**：LLM、工具、沙箱、压缩都可替换。
5. **事实层**：SessionEvent 是持久化、回放、UI 与模型历史的共同真源。
6. **控制层**：Approval、Guard、Policy 和 Telemetry 在事件接缝上工作。

## 最重要的三个判断

### 1. “Everything is a Plugin” 是可验证的

模型适配器、工具注册表、Session、系统提示词和 Agent Loop 本身都以插件挂载。新功能首先寻找已有事件或 capability seam，而不是直接修改 Loop。

### 2. 模型可见，意味着必须可重建

只要一个事实会影响模型请求，它就必须能从 Session Log 重建。这条不变式让恢复、分叉、回放和调试共享同一份真相。

### 3. 可逆性是组合能力的前提

Cordis registration 产生 effect，插件卸载时 effect 被撤销。没有这条生命周期纪律，热重载与配置切换都会留下重复监听器或旧服务。

## 推荐源码阅读顺序

1. `docs/architecture.md`
2. `docs/cordis-primer.md`
3. `packages/core/session/README.md`
4. `packages/core/system-prompt/README.md`
5. `packages/core/agent-loop/README.md`
6. `docs/tool-execution-pipeline.md`
7. `docs/cookbook/extension-cookbook.md`

本项目与官方仓库保持独立；官方源码始终是事实真源。

