export type Locale = "zh" | "en";

export type Chapter = {
  slug: string;
  layer: string;
  sourceType: "心智模型" | "核心源码" | "能力机制" | "动手扩展";
  title: { zh: string; en: string };
  subtitle: { zh: string; en: string };
  addition: { zh: string; en: string };
  analogy: { zh: string; en: string };
  mechanism: { zh: string; en: string };
  takeaways: { zh: string[]; en: string[] };
  source: string;
  code?: string;
};

export const pick = <T>(value: { zh: T; en: T }, locale: string): T =>
  value[locale === "en" ? "en" : "zh"];

export const layers = [
  { id: "mental", no: "01", color: "cyan", title: { zh: "先建立直觉", en: "Build intuition" }, desc: { zh: "先回答它为什么存在，再进入代码。", en: "Understand why it exists before reading code." } },
  { id: "composition", no: "02", color: "blue", title: { zh: "组合系统", en: "Composition system" }, desc: { zh: "Cordis、插件树与可逆副作用。", en: "Cordis, plugin trees, and reversible effects." } },
  { id: "spine", no: "03", color: "violet", title: { zh: "Agent 主干", en: "Agent spine" }, desc: { zh: "一次对话如何成为可回放的工作流。", en: "How a conversation becomes a replayable workflow." } },
  { id: "capability", no: "04", color: "amber", title: { zh: "能力平面", en: "Capability plane" }, desc: { zh: "模型、工具、安全与上下文如何替换。", en: "Swappable models, tools, safety, and context." } },
  { id: "extend", no: "05", color: "rose", title: { zh: "动手扩展", en: "Build extensions" }, desc: { zh: "从第一件工具到自定义产品组合。", en: "From a first tool to a custom product bundle." } },
] as const;

export const chapters: Chapter[] = [
  {
    slug: "h01-harness", layer: "mental", sourceType: "心智模型",
    title: { zh: "Harness 到底是什么？", en: "What is a harness?" },
    subtitle: { zh: "模型是大脑，Harness 是让大脑真正做事的身体与制度", en: "The model is a brain; the harness is its body and operating system" },
    addition: { zh: "模型 + 上下文 + 工具 + 状态 + 控制", en: "model + context + tools + state + control" },
    analogy: { zh: "把大模型想成一位聪明但刚入职的厨师。Harness 就是厨房、菜单、卫生制度、传菜系统和工作记录。没有这些，厨师再聪明也交付不了一顿稳定的晚餐。", en: "Imagine the model as a brilliant new chef. The harness is the kitchen, menu, safety rules, ticket system, and work log. Intelligence alone cannot reliably serve dinner." },
    mechanism: { zh: "DeepSeek Harness 把模型调用、工具注册、会话日志、权限、沙箱、Web UI 与运行配置组装成一个可运行产品。关键宣言是 Everything is a Plugin：没有不可替换的特权核心。", en: "DeepSeek Harness composes model calls, tools, session logs, permissions, sandboxing, UI, and configuration into a product. Its key claim is Everything is a Plugin: there is no privileged core." },
    takeaways: { zh: ["模型负责推理，Harness 负责把推理变成行动", "可靠 Agent 的难点主要在模型周围", "DSH 是开发者预览版，接口仍会快速变化"], en: ["Models reason; harnesses turn reasoning into action", "Most production difficulty lives around the model", "DSH is a developer preview and changes quickly"] },
    source: "README.md",
  },
  {
    slug: "h02-everything-plugin", layer: "mental", sourceType: "心智模型",
    title: { zh: "为什么一切都是插件", en: "Why everything is a plugin" },
    subtitle: { zh: "不是做一个大而全的框架，而是搭一座可以换零件的城市", en: "A city of replaceable parts, not one giant framework" },
    addition: { zh: "功能 = 插件 + 注册 + 生命周期", en: "feature = plugin + registration + lifecycle" },
    analogy: { zh: "传统框架像精装房：改水电要砸墙。插件架构像标准化插槽：灯、门锁和空调都能独立安装、替换、拆除。", en: "A monolith is a finished apartment where changing wiring means breaking walls. A plugin system offers standard sockets: lights, locks, and air conditioners can be mounted or removed independently." },
    mechanism: { zh: "模型适配器、工具注册表、系统提示词、Session 与 Agent Loop 都以 Cordis 插件贡献服务和事件监听器。扩展通常是“在旁边挂一个插件”，而不是修改 Loop。", en: "Model adapters, tools, prompts, sessions, and even the agent loop contribute services and event listeners as Cordis plugins. Extensions mount beside the loop instead of patching it." },
    takeaways: { zh: ["插件不只是第三方扩展，官方核心也是插件", "替换能力靠配置组合，不靠 fork", "能卸载干净与能安装同样重要"], en: ["Core features are plugins too", "Composition replaces forking", "Clean removal matters as much as installation"] },
    source: "docs/architecture.md#cordis",
  },
  {
    slug: "h03-learning-map", layer: "mental", sourceType: "心智模型",
    title: { zh: "一张图看懂全局", en: "The whole system on one map" },
    subtitle: { zh: "输入从哪里来、经过什么、最后留下什么", en: "Where input enters, what processes it, and what remains" },
    addition: { zh: "入口 → Agent → LLM/Tools → Session Log → UI", en: "surface → agent → LLM/tools → session log → UI" },
    analogy: { zh: "像快递网络：入口收件，Agent 是调度中心，模型决定路线，工具是车辆，会话日志是每次扫码记录，UI 则把物流状态展示给你。", en: "Think of parcel delivery: a surface accepts the parcel, the agent dispatches, the model chooses a route, tools are vehicles, the session log records every scan, and the UI renders status." },
    mechanism: { zh: "所有入口最终通过 Agent inbox 进入同一套 turn/step 流程；所有模型可见事实必须可以从 append-only SessionEvent 日志重建。", en: "All surfaces feed one agent inbox and the same turn/step flow. Every model-visible fact must be reconstructable from the append-only SessionEvent log." },
    takeaways: { zh: ["入口与 Agent 内核解耦", "Session Log 是事实真源", "UI 是事件流的投影，不是业务真源"], en: ["Surfaces are decoupled from the agent core", "The session log is the source of truth", "UI is a projection of events"] },
    source: "docs/architecture.md#turn-flow",
  },
  {
    slug: "h04-cordis-context", layer: "composition", sourceType: "核心源码",
    title: { zh: "Cordis Context：共享插座板", en: "Cordis Context: the shared power strip" },
    subtitle: { zh: "服务、事件与作用域在一个上下文中相遇", en: "Services, events, and scopes meet in one context" },
    addition: { zh: "ctx.service + ctx.on + scope", en: "ctx.service + ctx.on + scope" },
    analogy: { zh: "Context 像会展中心的基础设施：每个展商可以接电、监听广播、提供服务，但只能在获准的展区内工作。", en: "Context is convention-center infrastructure: every exhibitor can use power, listen to announcements, and offer a service, but only inside its assigned zone." },
    mechanism: { zh: "Cordis 让插件通过 ctx 贡献服务、类型化事件和 effect。作用域让同名能力可以在不同 Agent 中拥有不同实现，同时保留全局默认值。", en: "Cordis lets plugins contribute services, typed events, and effects through ctx. Scopes allow the same capability to differ per agent while retaining global defaults." },
    takeaways: { zh: ["ctx 是协作面，不是巨型全局变量", "服务表达能力，事件表达协作", "作用域解决多 Agent 隔离"], en: ["ctx is a collaboration surface, not a giant global", "Services express capability; events express cooperation", "Scopes isolate agents"] },
    source: "docs/cordis-primer.md",
    code: "export const name = 'hello-plugin'\n\nexport function apply(ctx: Context) {\n  ctx.on('ready', () => ctx.logger.info('mounted'))\n}",
  },
  {
    slug: "h05-effects", layer: "composition", sourceType: "核心源码",
    title: { zh: "Effect：装得上，也拆得净", en: "Effects: mount cleanly, unmount completely" },
    subtitle: { zh: "热重载成立的真正原因", en: "The real reason hot reload works" },
    addition: { zh: "registration → disposer → rollback", en: "registration → disposer → rollback" },
    analogy: { zh: "临时展台撤展后不能留下电线和螺丝。Effect 会记住插件安装时做过的注册，卸载时按原路撤销。", en: "A temporary booth must leave no cables or screws behind. Effects remember registrations made during mount and unwind them during disposal." },
    mechanism: { zh: "服务、监听器与工具注册都返回 disposer 并归属插件生命周期。插件卸载时 effect 逆向回收，所以 HMR 不会不断积累幽灵监听器。", en: "Services, listeners, and tools return disposers owned by plugin lifecycles. Unloading unwinds effects, so HMR does not accumulate ghost listeners." },
    takeaways: { zh: ["副作用必须有所有者", "注册 API 同时定义撤销语义", "可逆性让配置层真正可组合"], en: ["Every side effect needs an owner", "Registration APIs define undo semantics", "Reversibility makes configuration composable"] },
    source: "docs/architecture.md#cordis",
  },
  {
    slug: "h06-profiles-bundles", layer: "composition", sourceType: "核心源码",
    title: { zh: "Profile 与 Bundle：给插件树配方", en: "Profiles and bundles: recipes for plugin trees" },
    subtitle: { zh: "同一套零件，组合成 Web 或 Headless 产品", en: "The same parts become Web or Headless products" },
    addition: { zh: "base + bundle + patch overlay", en: "base + bundle + patch overlay" },
    analogy: { zh: "Bundle 是预制菜包，Profile 是一整桌菜单，patch 则是“少辣、加香菜”的个人备注。", en: "A bundle is a meal kit, a profile is the full menu, and a patch is your note saying less spice, extra cilantro." },
    mechanism: { zh: "dsh-base 提供通用能力，dsh-web-app 与 dsh-headless 增加不同入口。配置按 bundle 顺序、profile patch、home patch、命令行 patch 逐层叠加。", en: "dsh-base supplies common capabilities; dsh-web-app and dsh-headless add surfaces. Configuration layers bundles, profile patches, home patches, then CLI overlays." },
    takeaways: { zh: ["Profile 是可命名产品组合", "Bundle 是可分发配置层", "patch 替换配置行而非修改源码"], en: ["A profile is a named product composition", "A bundle is a distributable config layer", "Patches replace config rows without editing source"] },
    source: "docs/architecture.md#profiles-and-bundles",
  },
  {
    slug: "h07-session-log", layer: "spine", sourceType: "核心源码",
    title: { zh: "Session Log：Agent 的黑匣子", en: "Session Log: the agent's flight recorder" },
    subtitle: { zh: "不是保存聊天文本，而是记录每个事实", en: "Not a chat transcript, but a log of every fact" },
    addition: { zh: "append-only SessionEvent", en: "append-only SessionEvent" },
    analogy: { zh: "飞机黑匣子不只录乘客讲话，还记录仪表、操作和故障。Session Log 同样保存 turn、step、消息、工具调用和流式 chunk。", en: "A flight recorder captures instruments, operations, and failures—not just speech. The session log records turns, steps, messages, tool calls, and streaming chunks." },
    mechanism: { zh: "事件先提交到内存日志，再通过 session/event 广播。持久化、回放、分叉、转录、遥测与 UI 都从这一条事件流派生。", en: "Events commit to the in-memory log before session/event broadcasts them. Persistence, replay, forks, transcripts, telemetry, and UI all derive from this stream." },
    takeaways: { zh: ["模型可见即必须可记录", "事件提交与观察者失败隔离", "重放能力来自事件粒度"], en: ["Model-visible means loggable", "Committed events survive observer failure", "Replay comes from event granularity"] },
    source: "packages/core/session/src/index.ts",
  },
  {
    slug: "h08-prompt-assembly", layer: "spine", sourceType: "核心源码",
    title: { zh: "提示词不是一段字符串", en: "A prompt is not one string" },
    subtitle: { zh: "有序 section、动态 context、变量与工具共同装配", en: "Ordered sections, dynamic context, variables, and tools assemble together" },
    addition: { zh: "sections + contexts + variables + schemas", en: "sections + contexts + variables + schemas" },
    analogy: { zh: "像报纸排版：社论、天气、广告和突发新闻分别供稿，编辑按优先级拼版，而不是所有人同时改一个 Word 文件。", en: "Like newspaper layout: editorials, weather, ads, and breaking news submit independently; an editor orders them instead of everyone editing one document." },
    mechanism: { zh: "插件向 ctx.systemPrompt 注册 PromptSection、PromptContext、变量和工具 schema provider。每个 step 重新组装，作用域贡献可覆盖全局同名项。", en: "Plugins register PromptSections, PromptContexts, variables, and tool schema providers. Every step assembles a fresh snapshot, with scoped contributions shadowing globals." },
    takeaways: { zh: ["静态身份与动态上下文分离", "顺序是公开协议的一部分", "工具展示与提示词同步组装"], en: ["Static identity is separate from dynamic context", "Ordering is part of the protocol", "Tools and prompts assemble together"] },
    source: "packages/core/system-prompt/src/index.ts",
  },
  {
    slug: "h09-turn-step", layer: "spine", sourceType: "核心源码",
    title: { zh: "Turn 与 Step：一次回答为什么会跑很多轮", en: "Turns and steps: why one answer can loop" },
    subtitle: { zh: "一次用户任务，可包含多次模型请求与工具执行", en: "One user task can contain many model requests and tool runs" },
    addition: { zh: "turn ⊃ step → tool → next step", en: "turn ⊃ step → tool → next step" },
    analogy: { zh: "顾客的一张订单是 Turn；厨师每次看单、做一道工序、检查结果是 Step。只要还有欠下的工作，订单就不会结单。", en: "A customer's ticket is a turn. Each time the chef reads it, performs a task, and checks the result is a step. The ticket stays open while work is owed." },
    mechanism: { zh: "Turn 打开后从 inbox 认领输入。每个 Step 组装提示词、请求模型、执行工具并写事件；如果工具结果要求继续或新输入到达，就进入下一 Step。", en: "A turn claims inbox input. Each step assembles prompts, calls the model, executes tools, and logs events. Tool debt or new input schedules another step." },
    takeaways: { zh: ["Turn 是用户可感知的工作边界", "Step 是模型请求边界", "没有欠账才会 turn/end"], en: ["Turn is the user-visible work boundary", "Step is the model-request boundary", "turn/end requires no remaining debt"] },
    source: "packages/core/agent-loop/src/index.ts",
  },
  {
    slug: "h10-tool-pipeline", layer: "spine", sourceType: "核心源码",
    title: { zh: "工具执行是一条安检流水线", en: "Tool execution is a security pipeline" },
    subtitle: { zh: "发现、限制、门禁、执行、变换、观察各司其职", en: "Discovery, restriction, gating, execution, transforms, and observation" },
    addition: { zh: "pre → execute → post → result", en: "pre → execute → post → result" },
    analogy: { zh: "坐飞机不是“买票后直接登机”：先验票、安检、登机、落地、行李追踪。工具也要经过多个职责清晰的关卡。", en: "Flying is not buy-a-ticket then board: identity, security, boarding, landing, and baggage tracking are separate gates. Tool execution has similarly distinct stages." },
    mechanism: { zh: "tools/pre-execute 可 allow、deny 或 ask；tools/execute 包裹真实分发；post-execute 显式变换结果；tools/result 只观察最终不可变结果。", en: "tools/pre-execute may allow, deny, or ask; tools/execute wraps dispatch; post-execute transforms results; tools/result observes the immutable final result." },
    takeaways: { zh: ["策略与工具实现解耦", "单调 guard 不能被后续插件放行", "最终结果只有一个权威版本"], en: ["Policy is separate from tool implementation", "Monotonic guards cannot be bypassed later", "There is one authoritative final result"] },
    source: "docs/tool-execution-pipeline.md",
  },
  {
    slug: "h11-llm-adapters", layer: "capability", sourceType: "能力机制",
    title: { zh: "模型适配器：换引擎，不换车", en: "LLM adapters: swap the engine, keep the car" },
    subtitle: { zh: "统一消息与流式词汇屏蔽供应商差异", en: "A common message and streaming vocabulary hides provider differences" },
    addition: { zh: "LlmAdapter + llm/stream", en: "LlmAdapter + llm/stream" },
    analogy: { zh: "不同电网的插头形状和电压不同，适配器把差异收在墙内，家电只看到统一插座。", en: "Power grids differ in plugs and voltage. Adapters hide the differences so appliances see one socket." },
    mechanism: { zh: "模型插件注册 LlmAdapter，把统一请求翻译为供应商协议，再把文本、推理、工具调用等 chunk 还原为 Harness 的流式词汇。", en: "Model plugins register LlmAdapters that translate requests into provider protocols and normalize text, reasoning, and tool-call chunks back into Harness vocabulary." },
    takeaways: { zh: ["Agent Loop 不直接 import SDK", "流式 chunk 是跨适配器契约", "DeepSeek 与其他模型可以并列存在"], en: ["The loop does not import vendor SDKs", "Streaming chunks form the adapter contract", "DeepSeek and other models can coexist"] },
    source: "packages/llm/llm/src/index.ts",
  },
  {
    slug: "h12-safety", layer: "capability", sourceType: "能力机制",
    title: { zh: "权限与沙箱：门卫和防爆室", en: "Permissions and sandboxing: guard and blast chamber" },
    subtitle: { zh: "一个决定能不能做，一个限制做坏了影响多大", en: "One decides whether; the other limits the blast radius" },
    addition: { zh: "approval policy × sandbox backend", en: "approval policy × sandbox backend" },
    analogy: { zh: "门卫审核谁能进入实验室，防爆室则保证即使实验失败也不会炸掉整栋楼。两者互补，不能互相替代。", en: "A guard controls who enters the lab; a blast chamber contains failures. They complement rather than replace each other." },
    mechanism: { zh: "审批插件在 tools/pre-execute 决定 allow/deny/ask；沙箱插件通过 capability seam 约束子进程文件与系统访问。计划模式又是独立的策略轴。", en: "Approval plugins return allow/deny/ask at tools/pre-execute. Sandbox plugins constrain process access through a capability seam. Plan mode is a separate policy axis." },
    takeaways: { zh: ["权限是意图判断，沙箱是能力限制", "用户 deny 必须不可绕过", "安全策略不应写死在 bash 工具里"], en: ["Permission judges intent; sandbox limits capability", "User denial must be non-bypassable", "Security policy should not live inside the bash tool"] },
    source: "docs/cookbook/extension-cookbook.md#hook-plugin",
  },
  {
    slug: "h13-compaction", layer: "capability", sourceType: "能力机制",
    title: { zh: "上下文压缩：整理行李而非失忆", en: "Compaction: repack, don't forget" },
    subtitle: { zh: "在 token 压力下保留可继续工作的最小事实", en: "Preserve the minimum working truth under token pressure" },
    addition: { zh: "pressure check → compact → resume", en: "pressure check → compact → resume" },
    analogy: { zh: "行李箱塞满时，不是随手扔掉一半，而是把散装衣服压缩、保留证件和下一站必需品。", en: "When a suitcase is full, you do not discard half at random. You compress clothes and preserve documents and next-stop essentials." },
    mechanism: { zh: "compaction seam 把何时触发、如何总结与如何恢复分开。自动压力检查、请求溢出恢复和手动压缩都复用同一服务。", en: "The compaction seam separates trigger, summarization, and recovery. Automatic pressure checks, overflow recovery, and manual compaction share one service." },
    takeaways: { zh: ["压缩是可替换能力", "原始 SessionEvent 仍是事实真源", "恢复路径与主动压缩复用机制"], en: ["Compaction is a replaceable capability", "Raw SessionEvents remain the truth", "Recovery and proactive compaction share machinery"] },
    source: "packages/core/compaction",
  },
  {
    slug: "h14-capability-ecosystem", layer: "capability", sourceType: "能力机制",
    title: { zh: "MCP、Skill 与 Subagent 不要混为一谈", en: "MCP, skills, and subagents are not the same" },
    subtitle: { zh: "外部工具、知识流程与委派执行是三种边界", en: "External tools, procedural knowledge, and delegated work are distinct boundaries" },
    addition: { zh: "discover / inject / delegate", en: "discover / inject / delegate" },
    analogy: { zh: "MCP 像租用外部设备，Skill 像翻开操作手册，Subagent 像把完整子任务交给另一位同事。", en: "MCP rents external equipment, a skill opens a procedure manual, and a subagent delegates a complete task to a colleague." },
    mechanism: { zh: "MCP 插件发现工具后注册进 ctx.tools；Skill 通过 section 与按需 inject 注入；Subagent 由 provider registry 选择进程内、fork、ACP、Codex 等执行后端。", en: "MCP plugins discover and register tools; skills contribute sections and inject content on demand; subagents select an execution backend from a provider registry." },
    takeaways: { zh: ["三者都可扩展，但生命周期不同", "工具可见性必须与可执行性一致", "委派需要明确所有权与结果边界"], en: ["All extend the agent but have different lifecycles", "Tool visibility must match executability", "Delegation needs explicit ownership and result boundaries"] },
    source: "docs/cookbook/extension-cookbook.md#feature-to-mechanism",
  },
  {
    slug: "h15-first-tool", layer: "extend", sourceType: "动手扩展",
    title: { zh: "写第一个工具插件", en: "Build your first tool plugin" },
    subtitle: { zh: "把 schema、执行和生命周期放在正确边界", en: "Place schema, execution, and lifecycle at the right boundary" },
    addition: { zh: "defineTool → ctx.tools.register", en: "defineTool → ctx.tools.register" },
    analogy: { zh: "给厨房添一台榨汁机：要写清按钮说明、输入限制、输出格式，还要知道何时断电撤走。", en: "Adding a juicer requires clear controls, input limits, output format, and a clean unplug-and-remove lifecycle." },
    mechanism: { zh: "工具插件定义模型可读的 JSON Schema 与类型化 execute，再通过 ctx.tools.register 注册。Schema 会自动进入系统提示词装配。", en: "A tool plugin defines a model-readable JSON Schema and typed execute function, then registers through ctx.tools. Its schema automatically enters prompt assembly." },
    takeaways: { zh: ["名字与描述是模型的 API 文档", "参数校验发生在执行前", "注册返回 disposer"], en: ["Name and description are the model's API docs", "Arguments validate before execution", "Registration returns a disposer"] },
    source: "docs/user/develop/basic/tool.md",
    code: "export function apply(ctx: Context) {\n  ctx.tools.register(defineTool({\n    name: 'greet',\n    description: 'Greet one person by name',\n    parameters: Schema.object({ name: Schema.string() }),\n    execute: async ({ name }) => textResult(`Hello, ${name}!`),\n  }))\n}",
  },
  {
    slug: "h16-policy-hook", layer: "extend", sourceType: "动手扩展",
    title: { zh: "用 Hook 写权限门禁", en: "Build a permission gate with a hook" },
    subtitle: { zh: "在不修改工具的前提下改变执行策略", en: "Change execution policy without touching tools" },
    addition: { zh: "tools/pre-execute waterfall", en: "tools/pre-execute waterfall" },
    analogy: { zh: "门禁规则贴在楼入口，不写进每个房间的门锁里。政策变化时只换门卫流程。", en: "Access rules belong at the building entrance, not inside every door lock. Policy changes replace the gate procedure." },
    mechanism: { zh: "监听 tools/pre-execute，根据 ToolExecution 返回 deny 或调用 next()。需要不可逆拒绝时使用单调 guard，避免后序插件重新放行。", en: "Listen to tools/pre-execute and either deny or delegate with next(). Use a monotonic guard when later plugins must never override rejection." },
    takeaways: { zh: ["waterfall 适合可组合策略", "guard 适合强不变式", "审计观察放在 tools/result"], en: ["Waterfalls suit composable policy", "Guards enforce hard invariants", "Audit observation belongs at tools/result"] },
    source: "docs/cookbook/extension-cookbook.md#hook-plugin",
    code: "ctx.on('tools/pre-execute', async (exec, next) => {\n  if (exec.tool.name === 'bash' && isDangerous(exec.input)) {\n    return { kind: 'deny', reason: 'Blocked by course policy.' }\n  }\n  return next()\n})",
  },
  {
    slug: "h17-custom-bundle", layer: "extend", sourceType: "动手扩展",
    title: { zh: "把插件装成自己的 Harness", en: "Compose plugins into your own harness" },
    subtitle: { zh: "从一个扩展走向可分发的产品配方", en: "From one extension to a distributable product recipe" },
    addition: { zh: "package + cordis.yml + dsh.bundle", en: "package + cordis.yml + dsh.bundle" },
    analogy: { zh: "单个插件是一道菜；Bundle 是套餐；Profile 是餐厅当天真正营业的整份菜单。", en: "A plugin is one dish, a bundle is a set meal, and a profile is the complete menu the restaurant serves today." },
    mechanism: { zh: "将插件包与 Cordis 配置行打包，在 package.json 的 dsh.bundle 指向 patch 文件，再由 Profile 叠加 bundle。所有注册都有 effect，开发时可以热替换。", en: "Package plugins with Cordis config rows, point dsh.bundle at the patch file, and stack bundles in a profile. Effect-owned registrations support hot replacement." },
    takeaways: { zh: ["扩展最终应成为可复用配方", "配置 ID 是 patch 的稳定锚点", "先 dump-config 再定位组合问题"], en: ["Extensions should become reusable recipes", "Config IDs are stable patch anchors", "Use dump-config before debugging composition"] },
    source: "docs/cookbook/adding-a-package.md",
  },
  {
    slug: "h18-read-source", layer: "extend", sourceType: "动手扩展",
    title: { zh: "如何继续读 12,000+ 次提交的源码", en: "How to keep reading a 12,000+ commit codebase" },
    subtitle: { zh: "按事件与能力 seam 追踪，而不是从第一行读到最后一行", en: "Trace events and capability seams instead of reading linearly" },
    addition: { zh: "event map → producer → consumer → invariant", en: "event map → producer → consumer → invariant" },
    analogy: { zh: "读城市不是挨家挨户敲门，而是先看地铁图，再沿一条线路追踪枢纽。", en: "You do not learn a city by knocking on every door. Start with the metro map and follow one line through its hubs." },
    mechanism: { zh: "从 docs/architecture.md 选一个领域，再查 event map、服务定义、provider 和 consumer，最后读 invariant 与测试。官方文档中的源码行号是最好的入口。", en: "Choose one domain in architecture.md, then trace its event map, service definition, provider, consumer, invariants, and tests. Official source-line links are the best entry points." },
    takeaways: { zh: ["先找真源和边界，再看实现细节", "README 讲契约，测试讲边界", "开发者预览期要绑定 commit 而非想当然"], en: ["Find truth and boundaries before implementation", "READMEs explain contracts; tests explain edges", "Pin a commit during developer preview"] },
    source: "docs/architecture.md + docs/event-map.md",
  },
];

export const nav = {
  zh: { architecture: "架构地图", compare: "对比实验", timeline: "学习路径", docs: "术语手册", github: "GitHub", start: "开始学习", chapters: "章", source: "源码锚点", takeaway: "学完你会记住", analogy: "先打个比方", mechanism: "再看真实机制", next: "下一章", prev: "上一章" },
  en: { architecture: "Architecture", compare: "Compare", timeline: "Roadmap", docs: "Glossary", github: "GitHub", start: "Start learning", chapters: "chapters", source: "Source anchor", takeaway: "What stays with you", analogy: "Start with an analogy", mechanism: "Then the real mechanism", next: "Next", prev: "Previous" },
} as const;

export function validLocale(value: string): Locale {
  return value === "en" ? "en" : "zh";
}

export function layerFor(id: string) {
  return layers.find((layer) => layer.id === id)!;
}
