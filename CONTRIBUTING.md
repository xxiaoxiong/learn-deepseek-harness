# Contributing to Learn DeepSeek Harness

感谢你帮助这套 DeepSeek Harness 教学项目变得更准确、更容易理解。这里最看重的不是篇幅，而是三件事：**解释清楚、证据可复核、学习路径不断裂**。

## 你可以贡献什么

- **内容纠错**：术语、事件顺序、机制解释、中英文表达或链接有误。
- **源码映射**：补充更准确的上游文件、符号、测试或提交锚点。
- **课程建议**：提出新章节、交互演示、类比或知识检查。
- **实现改进**：修复站点可访问性、响应式布局、性能、SEO 或开发体验。

请优先使用对应的 [Issue 表单](.github/ISSUE_TEMPLATE)，让问题拥有足够上下文。安全敏感问题不要公开附带凭据、令牌或个人信息。

## 内容证据规则

1. 明确区分以下三类内容：
   - **上游事实**：官方文档、源码、类型、测试或提交明确表达的行为；
   - **教学推断**：为帮助理解而进行的总结、类比或架构归纳；
   - **建议做法**：本项目基于工程经验给出的实践建议。
2. 上游事实应尽量提供仓库路径、符号名和对齐 commit；不要只链接一个会持续变化的目录首页。
3. DeepSeek Harness 处于 developer preview。发现当前 `master` 与课程快照不一致时，请同时说明“课程基线行为”和“上游新行为”。
4. 类比必须帮助理解，但不能替代关键不变量、失败路径或真实事件顺序。
5. 中文与英文内容共享同一结构化课程真源；修改 `web/src/lib/content.ts` 时应同步检查两个语言版本。

## 本地开发

```bash
git clone https://github.com/xxiaoxiong/learn-deepseek-harness.git
cd learn-deepseek-harness/web
npm install
npm run dev
```

提交前运行：

```bash
npm run lint
npm run build
```

然后检查你改动过的中文和英文页面、键盘交互、窄屏布局，以及所有新增外链。

## Pull Request 清单

- PR 只解决一个清晰问题，并解释读者获得的改进。
- 内容变更列出涉及章节、上游证据和快照差异。
- 不把本项目描述为 DeepSeek 官方项目或暗示官方背书。
- 不加入无法验证的统计、排名、用户量或性能结论。
- 图片具有准确的替代文本；装饰图不承担唯一的信息表达责任。
- `npm run lint` 与 `npm run build` 均通过。

## English summary

Contributions are welcome for corrections, stronger upstream source mapping, course ideas, accessibility, responsive design, performance, and SEO. Separate upstream fact from teaching inference, pin factual claims to a path/symbol/commit where possible, check both locales, and run `npm run lint` plus `npm run build` before opening a PR.

By contributing, you agree that your changes may be distributed under this repository’s [MIT License](LICENSE).
