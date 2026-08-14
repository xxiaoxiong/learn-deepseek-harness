<div align="center">

<img src="assets/deepseek-harness-hero.png" alt="Learn DeepSeek Harness — modular agent harness visual" width="100%" />

# Learn DeepSeek Harness

### 把 AI Agent 的底座，真正讲明白。

**18 章 · 5 层课程 · 双语网站 · 交互式架构图 · 真实源码锚点**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000?style=for-the-badge&logo=vercel)](https://learn-deepseek-harness.vercel.app/zh)
[![DeepSeek Harness](https://img.shields.io/badge/Based_on-DeepSeek_Harness-2D6BFF?style=for-the-badge)](https://github.com/deepseek-ai/deepseek-harness)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](LICENSE)

[在线阅读](https://learn-deepseek-harness.vercel.app/zh) · [English](README.en.md) · [学习路径](https://learn-deepseek-harness.vercel.app/zh/timeline) · [架构地图](https://learn-deepseek-harness.vercel.app/zh/architecture)

</div>

---

## 为什么做这个项目？

大模型像一颗聪明的大脑，但只有大脑还不是 Agent。

它还需要知道可以使用哪些工具、怎样保存状态、何时继续工作、危险操作要不要询问、上下文满了怎么整理、失败后如何恢复——这些围绕模型的系统，才是 **Harness**。

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 提出一个非常漂亮、也很容易被术语遮住的设计：**Everything is a Plugin**。模型、工具、会话、系统提示词，甚至 Agent Loop 本身，都可以作为插件组合和替换。

这个项目不复制官方文档，而是在官方源码与普通读者之间搭一座桥：

- 先用厨房、快递、黑匣子等生活类比建立直觉
- 再用交互动画还原真实的 Turn / Step / Tool 流程
- 每章只引入一个新概念，拒绝“第一章就把所有术语倒给你”
- 每个关键结论都给出官方文档或源码路径，不靠想象讲架构

> 本项目是独立教学伴侣，并非 DeepSeek 官方项目。DeepSeek Harness 目前仍处于 developer preview，官方源码始终是事实真源。

## 你会学到什么？

| 层 | 课程 | 核心问题 |
|---|---|---|
| 01 · 先建立直觉 | H01–H03 | Harness 是什么？为什么“一切都是插件”？ |
| 02 · 组合系统 | H04–H06 | Cordis Context、可逆 Effect、Profile / Bundle 如何协作？ |
| 03 · Agent 主干 | H07–H10 | Session Log、提示词装配、Turn / Step、工具管线如何连接？ |
| 04 · 能力平面 | H11–H14 | 模型适配、安全沙箱、压缩、MCP / Skill / Subagent 如何替换？ |
| 05 · 动手扩展 | H15–H18 | 怎样写工具、策略 Hook、自定义 Bundle，并继续读大型源码？ |

学完后，你不只会“复述 DeepSeek Harness 有哪些包”，而是能回答：

1. 为什么模型可见的事实必须进入 Session Event Log？
2. 为什么权限判断与沙箱不能互相替代？
3. 为什么插件注册要能逆向撤销？
4. MCP、Skill 与 Subagent 的边界分别在哪里？
5. 新功能应该修改 Agent Loop，还是挂在事件接缝上？

## 在线体验

网站不是文档列表的换皮，而是一套可探索的教学界面：

- **交互式系统地图**：点击 Surface、Agent、Assembly、Model、Tools、Log，查看每层职责
- **Turn Flow 回放器**：逐步播放 `turn/start → agent/pre-step → step/start → ... → turn/end`
- **架构地图**：用六层模型建立全局坐标
- **对比实验**：把 30 行最小 Agent Loop 与插件化 Harness 放在一起比较
- **学习时间线**：约 3 小时完成五次递进式学习会话
- **双语课程**：中文与英文拥有一致的信息结构

👉 **[打开在线课程](https://learn-deepseek-harness.vercel.app/zh)**

## 目录结构

```text
learn-deepseek-harness/
├── assets/                 # README 与品牌视觉资产
├── docs/
│   ├── zh/                 # 中文架构导读、源码地图与安全说明
│   └── en/                 # English architecture primer
├── snippets/               # 最小教学实现（不是生产代码）
│   ├── h01-agent-loop.ts
│   ├── h02-session-log.ts
│   ├── h03-plugin-effects.ts
│   └── h04-tool-pipeline.ts
└── web/                    # Next.js 16 双语互动站
    └── src/
        ├── app/[locale]/   # 首页、章节、架构、对比、路径、术语
        ├── components/     # SystemMap、FlowLab 等交互组件
        └── lib/content.ts  # 18 章结构化课程真源
```

项目结构与教学方法深度参考了 [learn-hermes-agent](https://github.com/xxiaoxiong/learn-hermes-agent)：分层课程、双语站点、源码锚点、架构地图、对比页与可运行教学切片；视觉与 DeepSeek Harness 课程内容均为本项目重新设计。

## 本地运行

```bash
git clone https://github.com/xxiaoxiong/learn-deepseek-harness.git
cd learn-deepseek-harness/web
npm install
npm run dev
```

打开 [http://localhost:3000/zh](http://localhost:3000/zh)。

构建检查：

```bash
npm run lint
npm run build
```

## 如何读官方源码

推荐按“地图 → 边界 → 实现”阅读：

1. [整体架构](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md)
2. [Cordis Primer](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/cordis-primer.md)
3. [Session 子系统](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/session.md)
4. [System Prompt 子系统](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/system-prompt.md)
5. [工具执行管线](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/tool-execution-pipeline.md)
6. [扩展 Cookbook](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/cookbook/extension-cookbook.md)

更细的“概念 → 文档 → 源码”映射见 [`docs/zh/source-map.md`](docs/zh/source-map.md)。

## 安全边界

`snippets/` 是为了暴露机制而刻意缩小的教学实现，**不具备生产级审批、沙箱、资源限制与错误恢复**。不要让这些示例执行来自不可信输入的命令，也不要在示例中使用生产凭证。详见 [`docs/zh/safety.md`](docs/zh/safety.md)。

## 内容校准

课程内容于 **2026-08-14** 对照 DeepSeek Harness `master` 架构文档与核心子系统文档整理。由于上游处在快速迭代期，涉及精确 API 时请再次检查官方仓库。

## 致谢

- [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) — 原始项目与事实真源
- [Cordis](https://github.com/cordisjs/cordis) — DeepSeek Harness 的组合基础
- 所有为 Agent 基础设施提供文档、测试与讨论的贡献者

## License

[MIT](LICENSE) © 2026 [xxiaoxiong](https://github.com/xxiaoxiong)

<div align="center">

如果这个项目让你第一次真正看懂 Harness，欢迎点一个 ⭐，也欢迎把它分享给正在学习 Agent 的朋友。

</div>

