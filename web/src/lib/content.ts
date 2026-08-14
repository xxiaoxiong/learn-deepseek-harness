export type Locale = "zh" | "en";

export type I18n<T> = { zh: T; en: T };

export type SourceAnchor = {
  path: string;
  symbol: string;
  note: I18n<string>;
};

export type FlowStep = {
  code: string;
  title: I18n<string>;
  detail: I18n<string>;
};

export type Chapter = {
  slug: string;
  layer: string;
  sourceType: "mental" | "core" | "mechanism" | "build";
  minutes: number;
  title: I18n<string>;
  subtitle: I18n<string>;
  addition: I18n<string>;
  question: I18n<string>;
  analogy: I18n<string>;
  mechanism: I18n<string[]>;
  flow: FlowStep[];
  invariants: I18n<string[]>;
  pitfalls: I18n<string[]>;
  bridge: I18n<string>;
  sources: SourceAnchor[];
  checkpoint: { question: I18n<string>; answer: I18n<string> };
  code?: string;
};

export const upstreamSnapshot = {
  commit: "47f943859bef60e4160492346772ded9b24f765a",
  shortCommit: "47f9438",
  date: "2026-08-13",
  packageFamilies: 49,
  docs: 324,
  packageFiles: 3746,
};

export const pick = <T>(value: I18n<T>, locale: string): T =>
  value[locale === "en" ? "en" : "zh"];

export const validLocale = (value: string): Locale => (value === "en" ? "en" : "zh");

const bi = <T>(zh: T, en: T): I18n<T> => ({ zh, en });
const step = (code: string, zh: string, en: string, detailZh: string, detailEn: string): FlowStep => ({
  code,
  title: bi(zh, en),
  detail: bi(detailZh, detailEn),
});
const source = (path: string, symbol: string, zh: string, en: string): SourceAnchor => ({
  path,
  symbol,
  note: bi(zh, en),
});

export const layers = [
  { id: "mental", no: "01", color: "sky", title: bi("建立全局直觉", "Build the mental model"), desc: bi("先知道 Harness 解决什么问题，再学习它如何拆分复杂度。", "Understand the problem before studying how complexity is divided."), outcome: bi("能向别人讲清模型、Agent 与 Harness 的边界", "Explain the boundary between model, agent, and harness") },
  { id: "composition", no: "02", color: "mint", title: bi("掌握组合语法", "Learn the composition grammar"), desc: bi("沿着 Cordis 的上下文、effect、服务、事件、作用域与配置树读系统。", "Read the system through Cordis contexts, effects, services, events, scopes, and config trees."), outcome: bi("能读懂一棵真实插件树为何可安装、可替换、可卸载", "Read why a real plugin tree can mount, replace, and unwind") },
  { id: "spine", no: "03", color: "blue", title: bi("追踪 Agent 主干", "Trace the agent spine"), desc: bi("从 Agent 创建到 SessionEvent、Turn、Step、Prompt、LLM 与工具执行。", "From agent creation through SessionEvent, turns, steps, prompts, LLMs, and tools."), outcome: bi("能逐事件解释一次完整模型请求", "Explain a complete model request event by event") },
  { id: "durability", no: "04", color: "coral", title: bi("理解安全与耐久性", "Understand safety and durability"), desc: bi("审批、沙箱、文件系统、压缩、持久化、投影与防御性不变量。", "Approval, sandboxing, filesystem policy, compaction, persistence, projections, and invariants."), outcome: bi("能判断系统在拒绝、崩溃、取消和长上下文下是否仍可信", "Judge whether the system stays trustworthy under denial, crashes, cancellation, and long context") },
  { id: "scale", no: "05", color: "violet", title: bi("从单 Agent 扩到协作系统", "Scale beyond one agent"), desc: bi("目标、计划、待办、子 Agent、后台任务、工作流、调度和能力发现。", "Goals, plans, todos, subagents, jobs, workflows, schedules, and capability discovery."), outcome: bi("能区分状态、委派、编排与长期运行的责任边界", "Separate state, delegation, orchestration, and long-running work") },
  { id: "build", no: "06", color: "amber", title: bi("动手扩展并交付", "Build and ship extensions"), desc: bi("把理解落到工具、适配器、客户端表面、Profile 与 Bundle。", "Turn understanding into tools, adapters, client surfaces, profiles, and bundles."), outcome: bi("能在不修改 Agent Loop 的前提下交付一项完整能力", "Ship a capability without patching the agent loop") },
] as const;

export const sourceTypeLabel: Record<Chapter["sourceType"], I18n<string>> = {
  mental: bi("心智模型", "Mental model"),
  core: bi("核心主干", "Core spine"),
  mechanism: bi("生产机制", "Production mechanism"),
  build: bi("扩展实战", "Extension lab"),
};

export const chapters: Chapter[] = [
  {
    slug: "h01-harness", layer: "mental", sourceType: "mental", minutes: 12,
    title: bi("Harness 到底是什么？", "What is a harness, really?"),
    subtitle: bi("模型负责生成下一步，Harness 负责让下一步成为可控、可恢复的真实行动", "The model proposes the next step; the harness turns it into controlled, recoverable action"),
    addition: bi("模型 + 上下文 + 工具 + 状态 + 控制 + 表面", "model + context + tools + state + control + surfaces"),
    question: bi("为什么同一个模型放进不同 Agent 产品，表现会像完全不同的系统？", "Why can the same model feel like a different system inside another agent product?"),
    analogy: bi("把模型想成一位很聪明的新飞行员。Harness 不是飞机上的某个按钮，而是机身、仪表、飞行手册、空管、黑匣子和维修制度的总和。飞行员决定下一步动作，整套系统决定动作能否被执行、被观察、被撤销。", "Think of the model as a brilliant new pilot. The harness is not one cockpit button; it is the aircraft, instruments, checklists, air traffic control, flight recorder, and maintenance regime. The pilot chooses; the system makes the choice executable and accountable."),
    mechanism: bi([
      "DeepSeek Harness 把模型调用之外的复杂度拆成插件拥有的能力：会话日志保存事实，系统提示词组装请求，工具注册表执行动作，策略与沙箱限制动作，客户端表面呈现结果。",
      "真正的设计目标不是让模型“更聪明”，而是让模型可替换、运行可回放、能力可组合、失败可收敛。"
    ], [
      "DeepSeek Harness assigns the complexity around model calls to plugin-owned capabilities: sessions preserve facts, prompt assembly builds requests, tools execute actions, policy and sandboxes constrain them, and client surfaces present results.",
      "The design goal is not to make the model intrinsically smarter. It is to keep models replaceable, runs replayable, capabilities composable, and failures convergent."
    ]),
    flow: [
      step("input", "接收意图", "Receive intent", "Web、CLI、ACP 或 SDK 送入同一种 Agent 输入。", "Web, CLI, ACP, or SDK delivers the same agent input."),
      step("reason", "模型选择下一步", "Model chooses", "模型只返回内容或工具调用，不直接拥有外部世界。", "The model returns content or tool calls; it does not own the outside world."),
      step("govern", "Harness 解释与约束", "Harness governs", "上下文、权限、工具和生命周期把提议变成受控操作。", "Context, permissions, tools, and lifecycles turn proposals into controlled operations."),
      step("record", "记录与呈现", "Record and present", "结果进入仅追加日志，再由 UI、回放和下一步共同消费。", "Results enter the append-only log, then feed UI, replay, and the next step."),
    ],
    invariants: bi(["模型可见的事实必须可从日志重建", "外部动作必须经过 Harness 拥有的能力边界", "任何可替换能力都不应迫使 Agent Loop 认识具体提供方"], ["Every model-visible fact must be reconstructable from the log", "External action must cross a harness-owned capability boundary", "Replaceable capabilities must not leak concrete providers into the agent loop"]),
    pitfalls: bi(["把“会调用工具”误当成“已经是生产级 Agent”", "把所有状态塞进 messages 数组", "用模型提示词代替真实权限与沙箱"], ["Equating tool calling with a production agent", "Stuffing every state into the messages array", "Using prompt wording as a substitute for real permissions and sandboxing"]),
    bridge: bi("下一章会解释 DeepSeek Harness 为什么用“Everything is a Plugin”来组织这些责任，而不是继续扩大主循环。", "Next we examine why DeepSeek Harness organizes these responsibilities as plugins instead of growing the central loop."),
    sources: [source("README.md", "Everything is a Plugin", "官方定位与开发者预览声明。", "Official positioning and developer-preview warning."), source("docs/architecture.md", "Core packages", "官方架构主线与事件域。", "The official architecture spine and event domains.")],
    checkpoint: { question: bi("模型与 Harness 的责任边界是什么？", "Where is the responsibility boundary between model and harness?"), answer: bi("模型生成候选输出与工具意图；Harness 拥有上下文组装、动作执行、权限、状态、回放、取消和界面。", "The model produces candidate output and tool intent; the harness owns context assembly, execution, permissions, state, replay, cancellation, and surfaces.") },
  },
  {
    slug: "h02-everything-plugin", layer: "mental", sourceType: "mental", minutes: 13,
    title: bi("为什么一切都是插件", "Why everything is a plugin"),
    subtitle: bi("不是为了追求插件数量，而是让每项副作用都有所有者、每项能力都有替换点", "Not to maximize plugin count, but to give every effect an owner and every capability a replacement point"),
    addition: bi("行为 = 插件 + 契约 + 生命周期", "behavior = plugin + contract + lifecycle"),
    question: bi("如果 Session、工具甚至 Agent Loop 都是插件，系统还剩下什么“核心”？", "If sessions, tools, and even the agent loop are plugins, what remains as the core?"),
    analogy: bi("传统框架像一艘焊死舱室的船：改动力系统要切开船体。Cordis 插件树更像标准化航天舱段：每段声明接口、连接点和分离程序，组合方式改变，任务形态就改变。", "A monolithic framework is a ship with welded compartments. A Cordis plugin tree is closer to standardized spacecraft modules: each declares interfaces, connection points, and separation procedures; composition changes the mission."),
    mechanism: bi(["Cordis 的最小内核负责 Context、插件挂载、服务注册、事件分发与 effect 回收；具体 Agent 行为都由树上的插件贡献。", "扩展的正确姿势是监听既有事件或注册服务，而不是在 agent-loop 中新增 provider 特判。"], ["Cordis keeps a small kernel for contexts, mounting, service registration, event dispatch, and effect cleanup. Concrete agent behavior comes from plugins on the tree.", "Extensions listen at documented events or register services; they do not add provider-specific branches to agent-loop."]),
    flow: [step("mount", "挂载插件", "Mount plugin", "插件获得一个 Context 和配置。", "The plugin receives a context and config."), step("contribute", "贡献服务与事件", "Contribute", "服务表达能力，事件表达协作，effect 记录副作用。", "Services express capability, events express cooperation, effects track side effects."), step("compose", "按树组合", "Compose tree", "父子 Context 与作用域决定可见性。", "Parent-child contexts and scopes determine visibility."), step("dispose", "逆向卸载", "Dispose", "Fiber 停止后，effect 按所有权完全回收。", "After the fiber stops, owned effects unwind completely.")],
    invariants: bi(["官方能力与第三方能力遵循同一种插件契约", "插件卸载后不得留下监听器、服务或后台任务", "扩展依赖公开的 service/event，而不是具体 loop 实现"], ["First-party and third-party capabilities use the same plugin contract", "Unloading must leave no listener, service, or background task behind", "Extensions depend on public services/events, not the concrete loop"]),
    pitfalls: bi(["把插件理解为 UI 市场里的第三方小组件", "注册副作用却没有 disposer", "依赖加载顺序的偶然行为而不声明依赖"], ["Treating plugins as third-party UI widgets", "Registering side effects without a disposer", "Depending on accidental load order instead of declared requirements"]),
    bridge: bi("理解“全是插件”后，需要先画出整棵系统的六个平面，才能知道每个插件应该落在哪里。", "With the plugin claim established, we now map the six planes that tell each plugin where it belongs."),
    sources: [source("docs/architecture.md", "Cordis", "“不存在需要打补丁的特权内核”的官方解释。", "Official explanation of the absence of a privileged patch target."), source("docs/cordis-primer.md", "Plugin model", "Context、service、event、effect 与 fiber 的基础语义。", "Core semantics for context, service, event, effect, and fiber.")],
    checkpoint: { question: bi("为什么“可卸载”与“可安装”同样重要？", "Why is clean removal as important as installation?"), answer: bi("因为配置、HMR、Agent 作用域和测试隔离都依赖副作用能按所有权撤销；否则每次重组都会累积幽灵状态。", "Configuration, HMR, agent scopes, and test isolation all rely on owned side effects being reversible; otherwise every recomposition accumulates ghost state.") },
  },
  {
    slug: "h03-learning-map", layer: "mental", sourceType: "mental", minutes: 14,
    title: bi("一张地图看懂六个平面", "The six-plane system map"),
    subtitle: bi("把 49 个 package 家族压缩成可推理的职责地图，而不是记包名", "Compress 49 package families into a responsibility map instead of memorizing names"),
    addition: bi("组合 → 主干 → 能力 → 控制 → 事实 → 表面", "composition → spine → capability → control → truth → surface"),
    question: bi("面对数千个源码文件，怎样判断一个新行为应该放在哪个层？", "Across thousands of source files, how do you decide where new behavior belongs?"),
    analogy: bi("读一座城市不从背街道名开始，而是先看分区：规划局决定组合，交通主干推动流转，公共设施提供能力，法规控制风险，档案馆保存事实，窗口把服务交给人。", "You do not understand a city by memorizing street names. Start with zoning: planning composes it, transit moves work, utilities provide capability, regulation controls risk, archives preserve facts, and public counters expose services."),
    mechanism: bi(["组合平面决定插件树；Agent 主干认领输入并推进 Turn；能力平面提供 LLM、FS、Shell、Subagent 等 seam；控制平面通过事件、guard、审批和沙箱约束执行。", "事实平面以 SessionEvent 为真源；表面平面只负责协议适配与投影，不拥有另一套 Agent 逻辑。"], ["The composition plane builds the plugin tree; the agent spine advances turns; capability planes provide seams such as LLM, FS, shell, and subagents; the control plane constrains execution through events, guards, approvals, and sandboxing.", "The truth plane uses SessionEvent as its source of truth; surfaces adapt protocols and project state rather than owning another agent core."]),
    flow: [step("profile", "组合产品", "Compose product", "Profile、Bundle、Patch 生成运行树。", "Profiles, bundles, and patches produce the runtime tree."), step("agent", "推进工作", "Drive work", "Inbox、Turn、Step 把意图变成请求。", "Inbox, turns, and steps turn intent into requests."), step("seams", "调用能力", "Use capabilities", "模型、工具、沙箱和委派通过 service seam 接入。", "Models, tools, sandboxes, and delegation enter through service seams."), step("events", "约束协作", "Govern cooperation", "实时事件改写或观察进行中的工作。", "Live events transform or observe active work."), step("session", "提交事实", "Commit facts", "仅追加日志成为回放与 UI 的共同基础。", "The append-only log becomes the basis for replay and UI."), step("surface", "投影给人", "Project to humans", "Web、CLI、ACP、SDK 消费同一组事实。", "Web, CLI, ACP, and SDK consume the same facts.")],
    invariants: bi(["表面不是业务真源", "能力 seam 必须同时说明定义、提供者和消费者", "持久事实与实时控制事件不能混用"], ["Surfaces are not the business source of truth", "A capability seam names definition, provider, and consumer", "Durable facts and live control events are not interchangeable"]),
    pitfalls: bi(["用目录层级代替职责模型", "把所有 event 都当成可回放事件", "认为 Web UI 直接驱动模型 SDK"], ["Using directory hierarchy as the architecture model", "Treating every event as replayable", "Assuming the Web UI directly drives a model SDK"]),
    bridge: bi("下一章建立源码阅读方法：如何从文档图、服务目录和事件目录，快速找到真实控制点。", "Next we build a source-reading method using graph docs, service catalogs, and event catalogs to find real control points."),
    sources: [source("docs/architecture.md", "Core packages", "主干包与三类事件域。", "Spine packages and three event domains."), source("docs/graph-atlas.md", "Documentation graph index", "官方生成图的入口。", "Entry point to generated architecture graphs."), source("docs/capability-seams.md", "Service graph", "服务定义、实现与消费者矩阵。", "Matrix of service definitions, providers, and consumers.")],
    checkpoint: { question: bi("为什么 UI 不能成为 Session 状态的真源？", "Why must the UI not become the source of session state?"), answer: bi("UI 会断线、刷新和多端并存；只有持久事件日志能为回放、恢复、SDK 与多个表面提供一致事实。", "UIs disconnect, refresh, and coexist. Only the durable event log can give replay, recovery, SDKs, and multiple surfaces the same facts.") },
  },
  {
    slug: "h04-source-reading", layer: "mental", sourceType: "mental", minutes: 12,
    title: bi("如何读这座源码城市", "How to read the source city"),
    subtitle: bi("从生成目录到 package README，再到类型与事件；避免从 index.ts 盲目下钻", "Move from generated catalogs to package READMEs, then types and events—avoid blind index.ts spelunking"),
    addition: bi("图 → 契约 → 生产方/消费方 → 实现", "graph → contract → producer/consumer → implementation"),
    question: bi("读一个大型 Agent 仓库，先搜函数名还是先找契约？", "In a large agent repository, do you search functions first or find contracts first?"),
    analogy: bi("维修复杂设备时，先看线路图和接口表，再拆机；直接从一颗螺丝追踪，通常只会迷失在局部。", "To repair complex equipment, start with wiring diagrams and interface catalogs before opening the chassis. Following one screw rarely reveals the system."),
    mechanism: bi(["DeepSeek Harness 的 docs/ 已生成模块图、能力 seam 图、事件生产消费矩阵、持久化事件目录和配置目录；它们把源码中分散的声明编译成可查询索引。", "阅读顺序应当是：确定职责 → 找 service/event 契约 → 找 provider 与 consumer → 最后进入具体实现与测试。"], ["DeepSeek Harness generates module graphs, capability-seam graphs, event producer/consumer matrices, persistence catalogs, and config catalogs from source declarations.", "Read in this order: establish responsibility, locate service/event contracts, identify providers and consumers, then enter implementations and tests."]),
    flow: [step("atlas", "定位图谱", "Locate graph", "从 graph-atlas 选择模块、服务、事件或持久化视角。", "Choose module, service, event, or persistence view in graph-atlas."), step("contract", "阅读契约", "Read contract", "先读 types.ts 与 subsystem 文档里的不变量。", "Read types.ts and subsystem invariants first."), step("edges", "找生产与消费", "Trace edges", "确认谁注册、谁监听、谁真正调用。", "Confirm who registers, listens, and actually calls."), step("implementation", "进入实现与测试", "Inspect implementation", "用源码和测试校准边界条件，而不是只看 README。", "Use implementation and tests to calibrate edge cases, not README alone.")],
    invariants: bi(["文档中的生成区块必须与源码同步", "示例解释必须标明对齐的 upstream commit", "推断与源码事实要明确区分"], ["Generated documentation blocks must stay source-synchronized", "Teaching material should name the upstream commit it aligns to", "Inference and source-backed fact must be clearly separated"]),
    pitfalls: bi(["复制过时博客里的包名", "只读 happy path，不读取消与 dispose", "看到一个 provider 就以为它是唯一实现"], ["Copying package names from stale posts", "Reading only the happy path, not cancellation and disposal", "Assuming the first provider found is the only one"]),
    bridge: bi("带着这套方法进入 Cordis：先从 Context 这张协作面开始。", "With this method, we enter Cordis through its collaboration surface: Context."),
    sources: [source("docs/graph-atlas.md", "Graph index", "生成图索引与维护模式。", "Generated graph index and maintenance model."), source("docs/subsystems/README.md", "Subsystem index", "按概念组织的官方子系统入口。", "Concept-oriented subsystem index."), source("docs/event-producer-consumer.md", "Event matrix", "事件的生产者、消费者与分发模式。", "Event producers, consumers, and dispatch modes.")],
    checkpoint: { question: bi("为什么应当先找 consumer，再判断一个 service 的真实职责？", "Why inspect consumers before deciding what a service really does?"), answer: bi("接口声明说明它能做什么，消费者说明它在产品中为何存在；两者合起来才是能力 seam 的实际边界。", "The interface says what it can do; consumers reveal why the product needs it. Together they define the real capability boundary.") },
  },
  {
    slug: "h05-cordis-context", layer: "composition", sourceType: "core", minutes: 15,
    title: bi("Context：插件的协作面", "Context: the plugin collaboration surface"),
    subtitle: bi("服务发现、事件分发、依赖检查和 effect 所有权在同一个作用域相遇", "Service discovery, event dispatch, dependency checks, and effect ownership meet in one scope"),
    addition: bi("ctx.service + ctx.on + ctx.effect", "ctx.service + ctx.on + ctx.effect"),
    question: bi("Context 是一个更方便的全局变量，还是系统的边界对象？", "Is Context a convenient global variable, or the system's boundary object?"),
    analogy: bi("Context 像一张有权限边界的园区通行证：它告诉你能看到哪些设施、能订阅哪些广播、能在哪个区域安装设备，并记录设备离场时要拆掉什么。", "Context is a scoped campus pass: it determines which facilities you can discover, which broadcasts you can hear, where you may install equipment, and what must be removed when you leave."),
    mechanism: bi(["插件不直接 import 具体实现，而是从 ctx 发现声明过的服务；依赖缺失会在组合阶段暴露。", "子 Context 继承父级可见能力，同时拥有独立 effect 与事件作用域，为 Agent 局部能力提供基础。"], ["Plugins discover declared services from ctx rather than importing concrete implementations; missing dependencies surface during composition.", "Child contexts inherit visible parent capabilities while owning independent effects and event scope, which enables agent-local capability worlds."]),
    flow: [step("create", "创建 Context", "Create context", "父级、隔离域与配置确定初始可见性。", "Parent, realm, and config determine initial visibility."), step("require", "校验依赖", "Validate dependencies", "插件声明需要的 service，加载器先验证再 apply。", "Plugins declare required services; the loader validates before apply."), step("apply", "执行插件", "Apply plugin", "插件贡献服务、监听器和 effect。", "The plugin contributes services, listeners, and effects."), step("fork", "派生子作用域", "Fork scope", "Agent 或功能子树获得局部覆盖。", "An agent or feature subtree receives local overrides.")],
    invariants: bi(["Context 引用本身携带作用域语义", "服务重复注册按契约失败，而不是静默覆盖", "dispose 后的 Context 不应接受新的注册"], ["A Context reference carries scope semantics", "Duplicate services fail by contract instead of silently overwriting", "A disposed Context must reject new registrations"]),
    pitfalls: bi(["把 ctx 当依赖注入容器的同义词而忽略事件与生命周期", "在模块顶层缓存跨 Agent 的 service", "绕过 ctx 直接实例化 provider"], ["Reducing ctx to dependency injection and ignoring events/lifecycle", "Caching agent-scoped services at module scope", "Instantiating providers directly around ctx"]),
    bridge: bi("Context 之所以能安全重组，关键在 effect 与 fiber 对副作用和异步生命期的所有权。", "Context can be safely recomposed because effects and fibers own side effects and asynchronous lifetimes."),
    sources: [source("docs/cordis-primer.md", "Context", "Context 的继承、依赖与插件基础。", "Context inheritance, dependencies, and plugin basics."), source("docs/cordis-api/context.md", "Context API", "官方 Context API 与边界。", "Official Context API and boundaries.")],
    checkpoint: { question: bi("为什么 Agent 局部工具注册应挂在 agent.ctx，而不是根 ctx？", "Why register agent-local tools on agent.ctx rather than root ctx?"), answer: bi("agent.ctx 的可见性和 effect 生命周期与该 Agent 同生共死；挂在根 ctx 会泄漏到其他 Agent，也无法随 Agent 自动卸载。", "agent.ctx shares visibility and lifetime with the agent. Root registration would leak to other agents and outlive disposal.") },
  },
  {
    slug: "h06-effects-fibers", layer: "composition", sourceType: "core", minutes: 16,
    title: bi("Effect 与 Fiber：让卸载真正完成", "Effects and fibers: make disposal finish"),
    subtitle: bi("同步注册需要撤销函数，异步工作需要停稳协议；两者缺一不可", "Synchronous registration needs undo; asynchronous work needs quiescence—both are required"),
    addition: bi("register → disposer · start → stop → join", "register → disposer · start → stop → join"),
    question: bi("调用 AbortController.abort()，为什么不等于插件已经卸载？", "Why does AbortController.abort() not mean a plugin has finished unloading?"),
    analogy: bi("关店不只是挂出“停止营业”：还要停止接单、让厨房收尾、清点设备、归还钥匙，并确认没有员工留在里面。", "Closing a shop is more than flipping the sign. Stop new orders, let the kitchen settle, inventory equipment, return keys, and confirm nobody remains inside."),
    mechanism: bi(["Effect 记录服务注册、监听器、计时器等可同步撤销的副作用；插件 Context dispose 时按所有权逆向执行 disposer。", "Fiber 拥有持续或异步工作：先请求停止，再等待 done；只有完全停稳后，依赖它的世界才能安全拆除。"], ["Effects track synchronously reversible side effects such as services, listeners, and timers; context disposal unwinds their disposers by ownership.", "Fibers own continuous or asynchronous work: request stop, then await done. Dependent worlds can unwind safely only after full quiescence."]),
    flow: [step("register", "登记副作用", "Register effect", "每次注册都返回并归属一个 disposer。", "Each registration returns an owned disposer."), step("run", "启动 Fiber", "Start fiber", "异步工作公开停止与完成边界。", "Async work exposes stop and completion boundaries."), step("stop", "停止接收新工作", "Stop intake", "dispose 先阻止新的输入和回调。", "Disposal first prevents new input and callbacks."), step("join", "等待完全停稳", "Await quiescence", "后台任务、子资源和回调全部结算。", "Background tasks, child resources, and callbacks settle."), step("unwind", "逆向回收", "Unwind", "最后撤销服务与监听器，不留下幽灵状态。", "Finally remove services and listeners without ghost state.")],
    invariants: bi(["请求停止与确认停稳是两个不同阶段", "dispose 必须幂等", "依赖方必须在提供方服务撤销前停止"], ["Requesting stop and confirming quiescence are distinct phases", "Dispose must be idempotent", "Consumers must stop before provider services are removed"]),
    pitfalls: bi(["fire-and-forget 后台 Promise", "只 clearInterval 却不等待当前 tick", "在 disposer 中抛错导致后续资源无法回收"], ["Fire-and-forget background promises", "Clearing an interval without awaiting the active tick", "Throwing in one disposer and preventing later cleanup"]),
    bridge: bi("有了可靠生命周期，服务与事件才能成为稳定的协作协议。", "With reliable lifecycles, services and events can become stable cooperation protocols."),
    sources: [source("docs/cordis-tutorial/02-lifecycle-and-effects.md", "Lifecycle and effects", "effect 的所有权与撤销。", "Effect ownership and undo semantics."), source("docs/cordis-api/fiber.md", "Fiber", "持续工作、停止与结算契约。", "Contracts for continuous work, stop, and settlement."), source("docs/defensive-patterns.md", "dispose must quiesce", "官方防御性停稳模式。", "Official defensive quiescence pattern.")],
    checkpoint: { question: bi("为什么 HMR 最容易暴露生命周期 bug？", "Why does HMR expose lifecycle bugs so quickly?"), answer: bi("因为它反复执行挂载/卸载；未回收监听器、计时器或后台任务会在每轮重载后倍增，立即显现所有权缺失。", "HMR repeatedly mounts and unmounts. Leaked listeners, timers, and tasks multiply on every reload, exposing missing ownership.") },
  },
  {
    slug: "h07-services-events", layer: "composition", sourceType: "core", minutes: 17,
    title: bi("Service 与 Event：能力和协作要分开", "Services and events: separate capability from cooperation"),
    subtitle: bi("Service 回答“谁能做”，Event 回答“何时让别人参与”", "Services answer who can act; events answer when others may participate"),
    addition: bi("service = capability · event = extension point", "service = capability · event = extension point"),
    question: bi("什么时候应该调用 ctx.fs，什么时候应该监听 fs/write-intent？", "When should you call ctx.fs, and when should you listen to fs/write-intent?"),
    analogy: bi("医院的影像科是一项 Service：有明确接口和唯一当前提供者。术前会诊是 Event：多个科室按协议参与、观察或改变决策。", "A radiology department is a service with a clear interface and active provider. A pre-op review is an event where multiple specialties participate, observe, or alter a decision."),
    mechanism: bi(["Service 适合有身份、方法和替换实现的能力；事件适合横切策略、观察和 waterfall 改写。", "DeepSeek Harness 把事件分成持久 SessionEvent、实时 agent/* 与能力事件；选择错误会导致回放污染或控制丢失。"], ["Services suit capabilities with identity, methods, and replaceable implementations. Events suit cross-cutting policy, observation, and waterfall transformation.", "DeepSeek Harness distinguishes durable SessionEvents, live agent/* events, and capability events. Choosing the wrong domain corrupts replay or loses control semantics."]),
    flow: [step("declare", "声明契约", "Declare contract", "Service 定义方法；Event 定义 payload 与分发模式。", "Services define methods; events define payload and dispatch mode."), step("provide", "注册提供者", "Provide implementation", "组合树选择当前实现。", "The composition tree selects the active implementation."), step("consume", "调用或分发", "Consume or emit", "主流程调用 service，在扩展点发出 event。", "Core flow calls services and emits events at extension points."), step("compose", "监听器协作", "Compose listeners", "parallel、serial、waterfall 等模式决定权威结果。", "Parallel, serial, and waterfall modes define the authoritative result.")],
    invariants: bi(["Waterfall 监听器必须显式调用 next() 才会委托下游", "最终事实只有一个权威版本", "持久事件的 payload 必须是无损 JSON"], ["Waterfall listeners delegate only by calling next()", "There is one authoritative final fact", "Durable event payloads must be lossless JSON"]),
    pitfalls: bi(["用广播事件实现需要返回值的能力", "在观察事件中偷偷改写状态", "把回调异常传播到权威分发器"], ["Implementing return-value capabilities with broadcast events", "Mutating state inside an observation event", "Letting observer exceptions escape an authoritative dispatcher"]),
    bridge: bi("下一章加入 scope：同一个服务与事件协议，如何在不同 Agent 世界里拥有不同实现。", "Next we add scope: how the same service and event protocol can resolve differently in different agent worlds."),
    sources: [source("docs/cordis-api/service.md", "Service", "服务声明、依赖与重复注册语义。", "Service declaration, dependency, and duplicate-registration semantics."), source("docs/cordis-api/events.md", "Events", "事件模式与 next() 契约。", "Event modes and the next() contract."), source("docs/event-producer-consumer.md", "Event matrix", "源码生成的事件生产消费关系。", "Source-generated producer/consumer relationships.")],
    checkpoint: { question: bi("审批为什么是一个 waterfall，而不是普通广播？", "Why is approval a waterfall instead of a broadcast?"), answer: bi("因为一次请求只能有一个闭合权威结果；不负责的应答者调用 next()，第一个负责者占据决策槽位。", "One request needs one closed authoritative outcome. Unresponsible answerers call next(); the first responsible answerer claims the decision slot.") },
  },
  {
    slug: "h08-scope-rescope", layer: "composition", sourceType: "core", minutes: 16,
    title: bi("Scope、Realm 与 Rescope", "Scope, realm, and rescope"),
    subtitle: bi("把同一套全局能力安全地投影成每个 Agent 自己的运行世界", "Project global capabilities into a safe runtime world for each agent"),
    addition: bi("global defaults + agent-local shadowing", "global defaults + agent-local shadowing"),
    question: bi("两个 Agent 为什么可以看到不同工具、人格和工作目录，却仍共享同一进程？", "How can two agents see different tools, personas, and working directories in one process?"),
    analogy: bi("同一栋写字楼共享电梯和消防系统，但每家公司有自己的门禁、办公室与设备。Realm 是可发布服务的边界，Scope 是你当前拿着哪张门禁卡。", "Companies in one building share elevators and fire systems but keep separate access, offices, and equipment. A realm bounds service publication; a scope is the access card you currently hold."),
    mechanism: bi(["createScope/scopeOf/scopeTarget 提供零依赖作用域原语；服务注册表和事件分发在调用时解析当前 Agent 目标。", "Agent 创建阶段在 agent.ctx 内挂载 preset 与局部贡献；局部同名项 shadow 全局默认，dispose 时随 Agent 一起回收。"], ["createScope/scopeOf/scopeTarget provide zero-dependency scope primitives. Registries and event dispatch resolve the current agent target at call time.", "Agent creation mounts presets and local contributions inside agent.ctx. Local names shadow global defaults and unwind with the agent."]),
    flow: [step("root", "声明全局默认", "Declare defaults", "部署级 provider 与工具挂在根世界。", "Deployment-level providers and tools live in the root world."), step("agent", "创建 Agent Scope", "Create agent scope", "setup 事务在发布 Agent 前构建局部世界。", "The setup transaction builds a local world before publishing the agent."), step("shadow", "局部覆盖", "Shadow locally", "同名 persona、工具或服务只影响当前 Agent。", "A same-name persona, tool, or service affects only this agent."), step("dispatch", "按目标分发", "Dispatch by target", "事件监听器只接收匹配作用域的 Agent。", "Listeners receive only agents matching their scope."), step("dispose", "整体回收", "Dispose world", "Agent 处置会移除所有局部贡献。", "Agent disposal removes every local contribution.")],
    invariants: bi(["Agent 局部能力不得发布到根 service realm", "作用域过滤发生在权威分发路径中", "scoped registration 的身份必须受保护"], ["Agent-local capabilities must not publish into the root service realm", "Scope filtering occurs in the authoritative dispatch path", "Scoped registration identity must be protected"]),
    pitfalls: bi(["把 cwd 当成完整隔离边界", "在全局数组里按 agentId 手动过滤", "允许用户 preset 向根 realm 发布服务"], ["Treating cwd as a complete isolation boundary", "Manually filtering a global array by agentId", "Allowing user presets to publish services to the root realm"]),
    bridge: bi("Scope 解决运行时隔离，Profile、Bundle 与 Patch 则解决启动时产品组合。", "Scope solves runtime isolation; profiles, bundles, and patches solve boot-time product composition."),
    sources: [source("docs/subsystems/scope.md", "Scoped registries", "作用域原语、目标身份与过滤。", "Scope primitives, target identity, and filtering."), source("docs/architecture.md", "Agent-scoped context", "Agent 局部能力的官方归属。", "Official ownership of agent-local capabilities."), source("packages/core/agent/src/types.ts", "Agent.ctx", "Agent 句柄公开的局部 Context。", "The local Context exposed on Agent.")],
    checkpoint: { question: bi("工具 restriction 为什么不限制 Agent 自己局部注册的工具？", "Why do tool restrictions not filter tools registered inside the agent scope?"), answer: bi("restriction 约束继承来的部署能力；局部工具通常是委派协议必需的能力。否则子 Agent 可能连回报结果的工具也看不到。", "Restrictions filter inherited deployment capabilities. Local tools often implement the delegation contract; filtering them could remove the child's ability to report back.") },
  },
  {
    slug: "h09-profiles-bundles", layer: "composition", sourceType: "mechanism", minutes: 18,
    title: bi("Profile、Bundle、Patch 与启动树", "Profiles, bundles, patches, and the boot tree"),
    subtitle: bi("同一批插件如何组合成 Web、Headless 或你自己的产品", "How the same plugins become Web, Headless, or your own product"),
    addition: bi("bundle layers → profile patch → home patch → CLI overlay", "bundle layers → profile patch → home patch → CLI overlay"),
    question: bi("不 fork 官方仓库，怎样替换模型、沙箱或工具集合？", "How do you replace models, sandboxing, or tools without forking upstream?"),
    analogy: bi("Bundle 是可分发的积木盒，Profile 是一套命名方案，Patch 是用户在装配说明上贴的覆盖便签；启动器按固定顺序把它们叠成最终清单。", "A bundle is a distributable parts kit, a profile is a named build recipe, and a patch is an overlay note. The bootloader layers them in a fixed order into the final manifest."),
    mechanism: bi(["dsh-base 提供公共能力，web-app/headless 增加不同表面；profile 的 package.json 通过 dsh.profile 声明 bundle，bundle 通过 dsh.bundle 指向配置。", "Patch 按稳定 id 替换整条 config 或插入新条目；--dump-config 是理解真实运行树的权威入口。"], ["dsh-base provides common capabilities while web-app/headless add surfaces. Profile package.json files list bundles through dsh.profile; bundles point to configuration through dsh.bundle.", "Patches replace an entire config row by stable id or insert a new row. --dump-config is the authoritative view of the actual runtime tree."]),
    flow: [step("discover", "发现 Profile", "Discover profile", "从 Harness home 与发行模板解析具名组合。", "Resolve named compositions from Harness home and shipped templates."), step("bundles", "按序叠 Bundle", "Layer bundles", "dsh-base 通常是第一层。", "dsh-base is normally the first layer."), step("patch", "应用覆盖", "Apply patches", "profile、home、CLI overlay 逐层替换稳定 id。", "Profile, home, and CLI overlays replace stable ids in order."), step("load", "装载插件树", "Load tree", "依赖验证后按配置挂载 Cordis 插件。", "Cordis plugins mount after dependency validation."), step("inspect", "导出真实配置", "Inspect runtime", "--dump-config 让最终树可解释、可复现。", "--dump-config makes the final tree explainable and reproducible.")],
    invariants: bi(["Patch 依赖稳定 config id，而不是数组位置", "Bundle 仍可被上层 patch", "启动失败应回滚尚未发布的组合"], ["Patches depend on stable config ids, not array position", "Bundles remain patchable by upper layers", "Boot failure must roll back unpublished composition"]),
    pitfalls: bi(["直接改 dsh-base 以做本地定制", "把 Profile 当作 cwd 或安全沙箱", "只读静态文件而不检查 dump-config"], ["Editing dsh-base for local customization", "Treating a profile as cwd or a security sandbox", "Reading static files without inspecting dump-config"]),
    bridge: bi("组合树准备完毕后，下一层从 Agent 的创建、拥有和销毁开始追踪运行主干。", "With the tree assembled, we trace the runtime spine from agent creation, ownership, and disposal."),
    sources: [source("docs/architecture.md", "Profiles and bundles", "叠加顺序与官方 bundle。", "Layering order and official bundles."), source("packages/boot/app-boot/README.md", "Profiles", "发现、装载与 patch 机制。", "Discovery, loading, and patch mechanics."), source("docs/config-catalog.md", "Config catalog", "源码生成的配置字段目录。", "Source-generated configuration catalog.")],
    checkpoint: { question: bi("Patch 为什么替换整条 config，而不是做任意深合并？", "Why does a patch replace a whole config row instead of arbitrary deep merge?"), answer: bi("整条替换使来源、优先级和最终值可推理；任意深合并容易产生隐藏继承和无法解释的局部状态。", "Whole-row replacement keeps provenance, precedence, and final values explainable; arbitrary deep merge creates hidden inheritance and partial states.") },
  },
  {
    slug: "h10-agent-lifecycle", layer: "spine", sourceType: "core", minutes: 19,
    title: bi("Agent 的创建、所有权与取消", "Agent creation, ownership, and cancellation"),
    subtitle: bi("Agent 不是一个 while 循环，而是带身份、Session、Inbox、Context 和停稳协议的活对象", "An agent is not a while loop; it is a live object with identity, session, inbox, context, and quiescence"),
    addition: bi("create/resume → setup transaction → publish → dispose", "create/resume → setup transaction → publish → dispose"),
    question: bi("谁有权销毁一个 Agent？创建失败一半时又如何回滚？", "Who may destroy an agent, and how does a half-failed creation roll back?"),
    analogy: bi("AgentHandle 像租赁车辆的钥匙与合同：注册表可以查询车辆，但只有持有合同的所有者能结束租赁并触发完整验收。", "AgentHandle is like the key and lease contract for a vehicle. The registry can locate it, but only the owner holding the contract can terminate the lease and complete teardown."),
    mechanism: bi(["ctx.agents.create/resume 返回 AgentHandle；setup 在 Agent 与 Session 尚未发布时构建 agent.ctx，可返回同步 commit。任何失败都会回滚两个身份。", "cancel 只请求当前活动收敛；whenIdle 跟随替代工作直到真正静止；dispose 停止循环、注销、移除内存 Session，再拆除局部 Context。"], ["ctx.agents.create/resume returns an AgentHandle. setup builds agent.ctx before agent and session publication and may return a synchronous commit; failure rolls both identities back.", "cancel requests convergence of current activity; whenIdle follows replacement work until true quiescence; dispose stops the loop, unregisters, removes the in-memory session, then unwinds local context."]),
    flow: [step("identity", "分配共享身份", "Allocate identity", "AgentId 与 SessionId 使用同一品牌身份。", "AgentId and SessionId share one branded identity."), step("setup", "事务化 Setup", "Transactional setup", "局部 preset、工具和 persona 在发布前挂载。", "Local presets, tools, and persona mount before publication."), step("publish", "发布句柄", "Publish handle", "agent/created 后外部才可发现。", "External discovery begins only after agent/created."), step("drive", "驱动与维护", "Drive and maintain", "send/followup/steer/inject 进入不同 Inbox 边界。", "send/followup/steer/inject enter distinct inbox boundaries."), step("dispose", "停稳并拆除", "Quiesce and dispose", "先停止所有活动，再逆向卸载局部世界。", "All activity stops before the local world unwinds.")],
    invariants: bi(["Agent 与 Session 身份要么同时发布，要么都不发布", "取消原因 first-wins 且不武装未来工作", "dispose holder 是一种 capability"], ["Agent and session identities publish together or not at all", "Cancellation cause is first-wins and never arms future work", "Holding dispose authority is itself a capability"]),
    pitfalls: bi(["拿 ctx.agents.get() 的裸 Agent 假装拥有销毁权", "把 whenIdle 当成某条消息的回执", "取消后立即删除 provider service"], ["Treating a bare Agent from ctx.agents.get() as disposal authority", "Treating whenIdle as acknowledgement for one message", "Removing provider services immediately after cancellation"]),
    bridge: bi("Agent 的耐久身份依赖 Session。下一章把 SessionEvent 日志作为整个系统的事实真源来拆解。", "An agent's durable identity depends on its session. Next we unpack SessionEvent as the system's source of truth."),
    sources: [source("docs/subsystems/core.md", "Creation and ownership", "AgentHandle、setup 事务与 Agent surface。", "AgentHandle, setup transaction, and Agent surface."), source("packages/core/agent/src/types.ts", "Agent / AgentHandle", "公开运行句柄与停稳契约。", "Public live handle and quiescence contract."), source("docs/agent-lifecycle.md", "Lifecycle sequence", "创建后 Turn/Step 的官方时序图。", "Official post-creation turn/step sequence.")],
    checkpoint: { question: bi("Agent.cancel() 与 AgentHandle.dispose() 有什么不同？", "How do Agent.cancel() and AgentHandle.dispose() differ?"), answer: bi("cancel 终止当前活动但保留 Agent；dispose 是所有者能力，会等待停稳并注销 Agent、Session 与局部 Context。", "cancel terminates current activity while preserving the agent. dispose is owner authority that waits for quiescence and removes the agent, session, and local context.") },
  },
  {
    slug: "h11-session-log", layer: "spine", sourceType: "core", minutes: 20,
    title: bi("SessionEvent：唯一真源", "SessionEvent: the single source of truth"),
    subtitle: bi("消息历史不是被保存的数组，而是从仅追加、可扩展、无损 JSON 日志派生的投影", "Message history is not a stored array; it is derived from an append-only, extensible, lossless JSON log"),
    addition: bi("append-only facts → surface projection → derived messages", "append-only facts → surface projection → derived messages"),
    question: bi("为什么连原始 assistant/chunk 都要持久化，而不是只存最终消息？", "Why persist raw assistant chunks instead of only the final message?"),
    analogy: bi("会话日志像飞行数据记录器：乘客广播只是其中一个投影；调查、回放、计量和仪表盘都从更细粒度的原始事实重新构建。", "A session log is a flight data recorder. Passenger announcements are one projection; investigation, replay, metering, and dashboards rebuild from finer-grained facts."),
    mechanism: bi(["SessionEventMap 通过 declaration merging 扩展；核心 turn/step/message/tool 事件与 goal、approval、compaction、schedule 等领域事件共存。", "deriveMessages() 从当前 surface 位置顺序投影模型历史；替换节点的 seq 可以更大但位置更靠前，所以不能把 seq 数值当表面顺序。"], ["SessionEventMap expands through declaration merging. Core turn/step/message/tool events coexist with domain events for goals, approval, compaction, schedules, and more.", "deriveMessages() projects model history from current surface position order. Replacement nodes may have larger seq values while appearing earlier, so numeric seq is not surface order."]),
    flow: [step("append", "提交事件", "Append event", "先校验无损 JSON，再分配连续 seq。", "Validate lossless JSON, then allocate contiguous seq."), step("broadcast", "提交后广播", "Broadcast after commit", "session/event 观察者失败不撤销已提交事实。", "Observer failure cannot revoke a committed fact."), step("fold", "折叠领域状态", "Fold domain state", "Todo、Goal、Approval 等从日志取最后有效状态。", "Todo, goal, approval, and more fold effective state from the log."), step("project", "投影表面", "Project surface", "replace/hidden 等操作得到当前消息表面。", "replace/hidden operations produce the current message surface."), step("derive", "构建请求历史", "Derive request", "模型只看到由当前表面重建的消息。", "The model sees messages rebuilt from the current surface.")],
    invariants: bi(["模型可见即已记录", "seq 连续但不等于表面位置", "提交点与观察者错误隔离"], ["Model-visible means logged", "seq is contiguous but not surface position", "Commit points isolate observer failure"]),
    pitfalls: bi(["另存一份 messages 作为真源", "重放时跳过 log-only 事件造成领域状态漂移", "把 UI 临时状态写成模型可见消息"], ["Storing a second messages array as truth", "Skipping log-only events during replay and drifting domain state", "Encoding transient UI state as model-visible messages"]),
    bridge: bi("有了事实日志，Turn 与 Step 才能成为清晰的持久边界。下一章沿 Inbox 认领一次工作。", "With a fact log, turns and steps become clear durable boundaries. Next we follow work from inbox claim."),
    sources: [source("docs/subsystems/session.md", "SessionEventMap", "事件词汇、surface 与 request/header。", "Event vocabulary, surface, and request/header."), source("packages/core/session/src/types.ts", "SessionEventMap", "核心类型与 JSON 约束。", "Core types and JSON constraints."), source("docs/persistence-catalog.md", "Event catalog", "全部合并事件领域与声明位置。", "All merged event domains and declaration sites.")],
    checkpoint: { question: bi("为什么 compaction summary 要用新的 user/message 替换表面，而不是修改旧事件？", "Why does compaction append a replacement user/message instead of mutating old events?"), answer: bi("仅追加日志不能改写历史；新的带 surface replace 操作的事件保留原事实，同时定义新的模型可见投影。", "An append-only log cannot mutate history. A new event with a surface replace operation preserves original facts while defining the new model-visible projection.") },
  },
  {
    slug: "h12-inbox-turn-step", layer: "spine", sourceType: "core", minutes: 20,
    title: bi("Inbox、Turn 与 Step", "Inbox, turns, and steps"),
    subtitle: bi("一个用户任务如何包含多次模型请求、并行工具和中途 steering", "How one user task contains multiple model calls, parallel tools, and mid-turn steering"),
    addition: bi("turn ⊃ step → tool debt → next step", "turn ⊃ step → tool debt → next step"),
    question: bi("为什么“用户发了一条消息”不等于“系统只会请求一次模型”？", "Why does one user message not imply one model request?"),
    analogy: bi("Turn 像一张尚未结清的工单，Step 是工单上的一次处理回合。工具结果、新 steering 或 turn-stopping 义务会让同一工单继续下一回合。", "A turn is an unsettled work ticket; a step is one processing round. Tool results, steering, or turn-stopping obligations may schedule another round under the same ticket."),
    mechanism: bi(["followup 创建普通下一轮输入，steer 面向最近 Step 边界，inject 只排队上下文且不会唤醒空闲 Agent。Driver 每次只认领下一 Step 批次。", "工具调用按 executionMode 分类为 barrier 或有界滚动并发池；模型顺序的结果仍按权威次序后处理与记日志。"], ["followup queues a normal next turn, steer targets the nearest step boundary, and inject queues context without waking an idle agent. The driver claims one next-step batch at a time.", "Tool calls are classified into barriers or a bounded rolling concurrency pool. Results are still post-processed and logged in authoritative model order."]),
    flow: [step("turn/start", "打开 Turn", "Open turn", "在认领输入前先写持久边界。", "Write the durable boundary before claiming input."), step("claim", "认领批次", "Claim batch", "下一步输入与一条普通消息形成候选 Step。", "Next-step input and one queued prompt form a proposed step."), step("agent/pre-step", "允许或拒绝", "Allow or reject", "Waterfall 可改写进入模型的消息。", "A waterfall may rewrite messages entering the model."), step("step/start", "进入 Step", "Enter step", "记录 user/message 并构建请求。", "Record user/message and build the request."), step("tools", "结算工具债务", "Settle tool debt", "调用与结果可能要求继续下一 Step。", "Calls and results may require another step."), step("turn/end", "关闭 Turn", "Close turn", "没有欠账且通过 stopping checkpoint 才结束。", "End only when no debt remains and stopping checkpoint passes.")],
    invariants: bi(["Turn 在首次认领前打开，即使被拒绝也要闭合", "Step 是一次模型请求边界", "自然停止前必须经过 agent/turn-stopping"], ["A turn opens before first claim and closes even if rejected", "A step is one model-request boundary", "Natural stop must cross agent/turn-stopping"]),
    pitfalls: bi(["用消息数量推算 Step 数量", "steer 与 followup 混为一谈", "并行工具完成顺序直接决定模型历史顺序"], ["Inferring step count from message count", "Conflating steer and followup", "Letting parallel completion order define model history order"]),
    bridge: bi("每个 Step 在请求模型前都要重新装配完整请求头。下一章拆解 Prompt Assembly。", "Every step assembles a fresh request header before calling the model. Next we unpack prompt assembly."),
    sources: [source("docs/agent-lifecycle.md", "Turn/step sequence", "官方完整时序图。", "Official full sequence diagram."), source("docs/subsystems/core.md", "Agent inbox", "send/followup/steer/inject 语义。", "Semantics of send, followup, steer, and inject."), source("packages/core/agent-loop/src/index.ts", "driver", "具体循环驱动器。", "Concrete loop driver.")],
    checkpoint: { question: bi("inject 为什么默认不唤醒空闲 Agent？", "Why does inject not wake an idle agent?"), answer: bi("它是下一次获准请求的补充上下文，不是独立用户任务；需要 followup 或 steer 产生真正的工作边界。", "It is supplemental context for the next authorized request, not an independent user task. A followup or steer must create real work.") },
  },
  {
    slug: "h13-prompt-assembly", layer: "spine", sourceType: "core", minutes: 18,
    title: bi("Prompt 不是一段字符串", "A prompt is not one string"),
    subtitle: bi("稳定身份、动态上下文、变量、工具 schema 与请求配置共同形成可重建的 EpochHeader", "Stable identity, dynamic context, variables, tool schemas, and call config form a reconstructable EpochHeader"),
    addition: bi("sections + variables + contexts + tool schemas", "sections + variables + contexts + tool schemas"),
    question: bi("插件如何增加模型可见上下文，又不让所有人共同编辑一份 systemPrompt？", "How can plugins add model-visible context without everyone editing one systemPrompt?"),
    analogy: bi("像报纸编辑台：不同栏目独立供稿，编辑按公开顺序和作用域组版；每期留下完整版面快照，而不是只记“某人改过标题”。", "It is a newsroom: desks contribute independently, an editor lays them out by public order and scope, and each edition preserves the full front-page snapshot."),
    mechanism: bi(["ctx.systemPrompt 注册 section、context、变量与工具 schema provider；每个 Step 组装一份确定性快照。Agent scope 的同名贡献可以 shadow 部署默认。", "完整调用配置、渲染 system 与工具 schema 写入 request/header；只在 envelope 变化时记录 change，因此请求可从日志 + 代码重建。"], ["ctx.systemPrompt registers sections, contexts, variables, and tool-schema providers. Every step assembles a deterministic snapshot; same-name agent-scoped contributions can shadow deployment defaults.", "Call config, rendered system text, and tool schemas are logged as request/header. A change snapshot is written only when the envelope changes, keeping requests reconstructable from log plus code."]),
    flow: [step("collect", "收集贡献", "Collect contributions", "按作用域解析 section、变量与 schema。", "Resolve sections, variables, and schemas by scope."), step("order", "稳定排序", "Order deterministically", "公开 order 与命名控制版面。", "Public order and names control layout."), step("render", "模板渲染", "Render templates", "严格变量插值生成 system 文本。", "Strict interpolation generates system text."), step("schema", "装配工具", "Assemble tools", "当前可见工具的 schema 与提示同步。", "Schemas for currently visible tools stay synchronized with guidance."), step("header", "记录 EpochHeader", "Record header", "完整请求信封成为日志状态。", "The full request envelope becomes logged state.")],
    invariants: bi(["工具可见性与 schema/提示必须同步", "排序是公开协议的一部分", "请求头记录完整快照而非增量 patch"], ["Tool visibility, schema, and guidance must stay synchronized", "Ordering is part of the public protocol", "Request headers log full snapshots, not incremental patches"]),
    pitfalls: bi(["把动态文件内容写进稳定 persona", "使用未声明变量静默渲染为空", "切换工具 restriction 却复用旧请求头"], ["Putting dynamic file content into stable persona", "Silently rendering missing variables as empty", "Reusing an old request header after tool restrictions change"]),
    bridge: bi("请求装配完成后交给 LLM seam。下一章看统一流式词汇如何隔离提供方差异。", "The assembled request enters the LLM seam. Next we see how one streaming vocabulary isolates provider differences."),
    sources: [source("docs/subsystems/system-prompt.md", "Assembly registry", "section、context、变量与 schema 组装。", "Assembly of sections, contexts, variables, and schemas."), source("packages/core/system-prompt/src/index.ts", "SystemPromptService", "服务实现与排序。", "Service implementation and ordering."), source("docs/subsystems/session.md", "request/header", "EpochHeader 的持久化与重建。", "EpochHeader persistence and reconstruction.")],
    checkpoint: { question: bi("为什么工具 schema 属于 Prompt Assembly，而不只属于 Tools？", "Why do tool schemas belong to prompt assembly rather than only Tools?"), answer: bi("模型必须在同一请求中看到当前可执行能力的准确描述；执行注册表与模型可见投影需要共享同一份已解析定义。", "The model needs an accurate description of currently executable capability in the same request. Execution and model projection must share the same resolved definition.") },
  },
  {
    slug: "h14-llm-streaming", layer: "spine", sourceType: "core", minutes: 18,
    title: bi("LLM Adapter 与流式词汇", "LLM adapters and the streaming vocabulary"),
    subtitle: bi("统一 ContentBlock、Message、StreamChunk 与错误恢复，让 Provider 留在 seam 后面", "Unify content blocks, messages, stream chunks, and recovery so providers stay behind the seam"),
    addition: bi("ModelSelection → adapter → StreamChunk*", "ModelSelection → adapter → StreamChunk*"),
    question: bi("DeepSeek、重放模型或其他 Provider 的流式事件为什么能进入同一 Agent Loop？", "Why can DeepSeek, replay, and other providers stream into the same agent loop?"),
    analogy: bi("国际机场把不同航空公司的内部流程转换成统一登机口协议；塔台只处理标准呼号、航班状态与错误类别。", "An international airport maps each airline's internal process into a common gate protocol. Air traffic control deals only with standardized callsigns, states, and error classes."),
    mechanism: bi(["ctx.llm 保存按 provider 路由的 adapter registry。LlmCallConfig、ContentBlock、Message、ToolCall 与 StreamChunk 是提供方无关词汇。", "每个原始 chunk 先写 assistant/chunk，成功结束再写 assistant/message 与 usage；失败步骤关闭后，agent/request-error 决定是否重试。"], ["ctx.llm holds a provider-routed adapter registry. LlmCallConfig, ContentBlock, Message, ToolCall, and StreamChunk are provider-neutral vocabulary.", "Every raw chunk is logged as assistant/chunk. Success adds assistant/message and usage. After a failed step closes, agent/request-error decides whether recovery may retry."]),
    flow: [step("select", "解析模型路由", "Resolve route", "ModelSelection 找到 provider 与具体 adapter。", "ModelSelection resolves provider and exact adapter."), step("request", "构建统一请求", "Build request", "Adapter 接收规范 call config、system、messages、tools。", "The adapter receives canonical call config, system, messages, and tools."), step("stream", "规范化流", "Normalize stream", "Provider 事件转换为 StreamChunk 联合类型。", "Provider events map into the StreamChunk union."), step("log", "逐块记录", "Log chunks", "原始 chunk 保证 UI 与回放保真。", "Raw chunks preserve UI and replay fidelity."), step("settle", "闭合消息或错误", "Settle", "成功记录 message/usage，失败进入有界恢复。", "Success records message/usage; failure enters bounded recovery.")],
    invariants: bi(["Adapter 不直接修改 Session", "一个成功 provider 调用对应一个 assistant/message", "错误恢复必须有界且保留原错误"], ["Adapters do not mutate sessions directly", "One successful provider call maps to one assistant/message", "Recovery is bounded and preserves the original error"]),
    pitfalls: bi(["在 Agent Loop 内判断 provider 名称", "只记录最终文本导致工具增量和思考块无法回放", "无条件重试上下文溢出"], ["Branching on provider names inside agent-loop", "Logging only final text and losing tool/thinking stream fidelity", "Retrying context overflow unconditionally"]),
    bridge: bi("模型可能返回工具调用；下一章进入整个 Harness 最关键的安全流水线。", "The model may emit tool calls. Next we enter the harness's most important security pipeline."),
    sources: [source("docs/subsystems/llm-streaming.md", "Streaming vocabulary", "消息、Chunk、错误与 adapter seam。", "Messages, chunks, errors, and the adapter seam."), source("packages/llm/llm/src/types.ts", "LlmAdapter", "权威 Provider 无关类型。", "Authoritative provider-neutral types."), source("packages/llm/llm-deepseek/src/index.ts", "DeepSeek adapter", "DeepSeek 提供方实现。", "DeepSeek provider implementation.")],
    checkpoint: { question: bi("为什么失败的 provider 调用没有 assistant/message？", "Why does a failed provider call have no assistant/message?"), answer: bi("assistant/message 表示一次成功闭合的模型响应；失败仍可留下 chunk 与 step 边界，但不能伪造完整响应。", "assistant/message represents one successfully closed model response. Failure may leave chunks and step boundaries, but must not fabricate a complete response.") },
  },
  {
    slug: "h15-tool-pipeline", layer: "spine", sourceType: "core", minutes: 22,
    title: bi("工具执行不是一次函数调用", "Tool execution is not a function call"),
    subtitle: bi("从发现、前置策略、单调 Guard、环绕执行、后处理到不可变最终结果", "From discovery and pre-policy through monotonic guards, around execution, post-policy, and an immutable final result"),
    addition: bi("pre → guards → execute → post → finalize → result", "pre → guards → execute → post → finalize → result"),
    question: bi("为什么一个后加载插件不能把前面已经 deny 的危险调用重新放行？", "Why can a later plugin not re-allow a dangerous call already denied upstream?"),
    analogy: bi("工具调用像一件货物过海关：申报、准入、查验、运输、到港处理和最终签收分属不同权威点；任何环节都不能私自改写已经生效的硬性禁运。", "A tool call crosses customs: declaration, admission, inspection, transport, arrival processing, and final receipt are separate authority points. No stage may undo a hard prohibition already in force."),
    mechanism: bi(["tools/pre-execute waterfall 可 allow/deny/ask；ask 进入 ctx.approval。随后 monotonic guards 只 deny 或 abstain，身份受保护。", "tools/execute 包装真实 dispatch，post-execute 可替换结果；注册表规范化 JSON，ToolDefinition.finalizeContent 强制最后内容不变量，tools/result 只观察冻结结果。"], ["tools/pre-execute may allow, deny, or ask; ask enters ctx.approval. Monotonic guards then deny or abstain with protected identity.", "tools/execute wraps dispatch; post-execute may replace results. The registry normalizes JSON, ToolDefinition.finalizeContent enforces last content-only invariants, and tools/result observes the frozen outcome."]),
    flow: [step("tool/call", "先记调用", "Log call first", "UI 和审计先看到模型原始参数。", "UI and audit first see the model's raw arguments."), step("pre", "策略前置", "Run pre-policy", "钩子、权限与沙箱可以 allow/deny/ask。", "Hooks, permissions, and sandbox policy may allow, deny, or ask."), step("guards", "单调 Guard", "Apply guards", "硬性约束只能收紧，不能被后续放宽。", "Hard constraints can only tighten, never be relaxed later."), step("execute", "环绕执行", "Execute around dispatch", "超时、重试、计量包裹真实 handler。", "Timeouts, retries, and metrics wrap the real handler."), step("post", "后处理结果", "Post-process", "spill、过滤和上下文追加作用于候选结果。", "Spill, filtering, and additional context act on the candidate result."), step("tool/result", "冻结并记录", "Freeze and record", "只有一个 JSON 无损的模型可见结果。", "One lossless-JSON model-visible result is frozen and logged.")],
    invariants: bi(["每个 tool/call 最终对应一个权威 tool/result", "Guard 的 deny 不可被后续监听器撤销", "tools/result 看到的是冻结的最终结果"], ["Every tool/call eventually maps to one authoritative tool/result", "A guard denial cannot be undone downstream", "tools/result observes the frozen final outcome"]),
    pitfalls: bi(["把权限检查写进某个工具 handler", "在 tools/result 中修改结果", "策略异常导致调用绕过检查"], ["Embedding permission logic inside one tool handler", "Mutating outcomes inside tools/result", "Letting policy exceptions bypass checks"]),
    bridge: bi("工具流水线定义控制点；下一层先把审批与权限预设放进这些控制点。", "The pipeline defines control points. Next we place approval and permission presets into them."),
    sources: [source("docs/tool-execution-pipeline.md", "Pipeline graph", "完整官方流程图与顺序。", "Complete official flow and ordering."), source("docs/subsystems/tools.md", "Tool registry", "schema、restriction、guard 与执行语义。", "Schemas, restrictions, guards, and execution semantics."), source("packages/core/tools/src/index.ts", "ToolService", "注册表与权威执行实现。", "Registry and authoritative execution implementation.")],
    checkpoint: { question: bi("tools/post-execute 与 ToolDefinition.finalizeContent 有何不同？", "How do tools/post-execute and ToolDefinition.finalizeContent differ?"), answer: bi("post-execute 是可组合策略 waterfall，可替换候选结果；finalizeContent 是具体工具定义拥有的最后同步内容不变量，之后结果被冻结。", "post-execute is a composable policy waterfall that may replace the candidate. finalizeContent is the tool definition's final synchronous content invariant before freezing.") },
  },
  {
    slug: "h16-approval-presets", layer: "durability", sourceType: "mechanism", minutes: 18,
    title: bi("审批、策略与权限预设", "Approval, policy, and permission presets"),
    subtitle: bi("把一次性人类决定、会话策略和沙箱模式分成三个正交旋钮", "Separate one-shot human decisions, session policy, and sandbox mode into orthogonal controls"),
    addition: bi("preset = sandbox knob + approval knob", "preset = sandbox knob + approval knob"),
    question: bi("为什么“danger-full-access + never ask”仍然不等于所有工具都能执行？", "Why does danger-full-access plus never-ask still not mean every tool can execute?"),
    analogy: bi("门禁区域、是否呼叫管理员、物品禁运清单是三套制度：权限预设只是把前两项组合成方便选择的套餐，不能取消硬性禁运。", "Access zones, whether to call an administrator, and prohibited-item rules are separate systems. A permission preset bundles the first two for convenience; it cannot erase hard prohibitions."),
    mechanism: bi(["ctx.approval 为一次具体操作返回 allowed-once/rejected/cancelled/unavailable；除 allowed-once 外全部 fail closed。ApprovalPolicy 只有 ask 与 never。", "PermissionPreset 把 sandbox/mode 与 approval/policy 写入各自权威 setter；current() 从实际 knob 折叠结果派生，未匹配时显示 custom。"], ["ctx.approval returns allowed-once, rejected, cancelled, or unavailable for one exact action. Every outcome except allowed-once fails closed. ApprovalPolicy is ask or never.", "PermissionPreset writes sandbox/mode and approval/policy through their authoritative setters. current() derives from actual folded knobs and reports custom when no preset matches."]),
    flow: [step("preset", "选择预设", "Select preset", "记录 permission/preset 用户意图。", "Record permission/preset user intent."), step("knobs", "写入两个旋钮", "Write two knobs", "sandbox/mode 与 approval/policy 独立持久化。", "sandbox/mode and approval/policy persist independently."), step("ask", "遇到 ask", "Encounter ask", "ApprovalService 写 asked 审计事件并分发应答者。", "ApprovalService logs asked and dispatches answerers."), step("decide", "闭合决定", "Close decision", "写 decided；缺失或异常应答者变 unavailable。", "Log decided; missing or failing answerers become unavailable."), step("guard", "继续硬性 Guard", "Continue guards", "一次授权也不能绕过所有者策略。", "A one-shot grant still cannot bypass owner policy.")],
    invariants: bi(["unavailable 必须拒绝", "allowed-once 只授权当前操作", "预设不拥有强制执行，只组合权威旋钮"], ["unavailable must deny", "allowed-once authorizes only the current operation", "Presets do not enforce; they compose authoritative knobs"]),
    pitfalls: bi(["把 never 理解成自动允许", "审批请求复制一份可能漂移的工具参数", "把 custom 当可选择的预设写入日志"], ["Interpreting never as auto-allow", "Duplicating tool arguments into an approval prompt and letting them drift", "Persisting custom as a selectable preset"]),
    bridge: bi("审批决定“是否继续”，沙箱与能力 seam 决定“在哪里、能影响什么”。", "Approval decides whether to proceed; sandbox and capability seams decide where and what the action may affect."),
    sources: [source("docs/subsystems/approval.md", "ApprovalService", "结果词汇、策略、审计对与 fail-closed。", "Outcome vocabulary, policy, audit pair, and fail-closed behavior."), source("docs/subsystems/permission-presets.md", "PermissionPresetService", "预设与正交 knob。", "Presets and orthogonal knobs."), source("packages/interaction/user-approval/src/index.ts", "approval/request", "权威 waterfall 实现。", "Authoritative waterfall implementation.")],
    checkpoint: { question: bi("审批应答者异常时为什么不是重试或默认允许？", "Why does an answerer failure not retry or default-allow?"), answer: bi("审批是安全边界，未知结果必须关闭失败；重试可能重复提示或把失效应答者误当授权来源。", "Approval is a security boundary, so uncertainty fails closed. Retrying can duplicate prompts or treat a broken answerer as authority.") },
  },
  {
    slug: "h17-sandbox-world", layer: "durability", sourceType: "mechanism", minutes: 20,
    title: bi("Sandbox、FS、Shell 与同一个执行世界", "Sandbox, FS, shell, and one execution world"),
    subtitle: bi("真正的隔离不是在工具层说“不许”，而是让能力提供者共享可执行边界", "Real isolation is not a tool-layer warning; providers share an enforceable execution boundary"),
    addition: bi("ctx.fs + ctx.subprocess + ctx.shell + ctx.sandbox", "ctx.fs + ctx.subprocess + ctx.shell + ctx.sandbox"),
    question: bi("为什么替换 subprocess provider，Bash、PTY、LSP 与外部子 Agent 会一起迁移？", "Why does replacing the subprocess provider move Bash, PTY, LSP, and external subagents together?"),
    analogy: bi("不是给每个工人一本“不要越界”的手册，而是把整支施工队安排在有围栏、统一门禁和同一材料仓库的工地。", "Do not hand every worker a 'stay inside' booklet. Put the whole crew on one fenced site with shared access control and the same material store."),
    mechanism: bi(["ctx.fs 抽象文件读写，ctx.subprocess 抽象进程启动，ctx.shell/terminals/lsp 作为消费者；E2B provider 可让 fs 与 subprocess 指向同一个远程 Linux 世界。", "sandbox-policy 保存统一 mode 与 workspace roots；bash-sandbox、fs-sandbox、terminal 都读取同一权威策略，避免不同能力拥有不同边界。"], ["ctx.fs abstracts file access and ctx.subprocess abstracts process creation; shell, terminals, and LSP consume them. E2B providers can point FS and subprocess to the same remote Linux world.", "sandbox-policy owns one mode and workspace-root set. bash-sandbox, fs-sandbox, and terminal all read the same policy so capabilities cannot disagree on boundaries."]),
    flow: [step("policy", "折叠会话策略", "Fold session policy", "默认模式与事件覆盖得到当前 sandbox/mode。", "Default mode plus event overrides produces current sandbox/mode."), step("resolve", "选择能力提供者", "Resolve provider", "本地、受限本地或 E2B 注册同一 seam。", "Local, confined local, or E2B providers register the same seam."), step("intent", "检查操作意图", "Check intent", "FS mutation 先过 write/edit intent 事件与先读后写策略。", "FS mutations cross write/edit intent and read-before-write policy."), step("wrap", "包装精确 argv", "Wrap exact argv", "Sandbox backend 在 spawn 前施加强制边界。", "The sandbox backend enforces boundaries on the exact argv before spawn."), step("observe", "报告执行事实", "Report enforcement", "调用方知道是强制、部分还是未施加隔离。", "Callers know whether confinement was enforced, partial, or absent.")],
    invariants: bi(["FS 与进程必须共享同一 workspace 根策略", "沙箱报告不能把部分强制误报为子进程失败", "路径策略要防符号链接与 TOCTOU"], ["FS and processes share one workspace-root policy", "Sandbox reporting must not misclassify partial enforcement as child failure", "Path policy accounts for symlinks and TOCTOU"]),
    pitfalls: bi(["只在 tool-bash 里做字符串黑名单", "让 cwd 代替 workspace root 校验", "本地 FS + 远程 subprocess 指向两个不同世界"], ["Using only string blacklists inside tool-bash", "Using cwd as workspace-root validation", "Pointing local FS and remote subprocess at different worlds"]),
    bridge: bi("即使执行安全，长工具输出与长会话仍会压垮模型上下文；下一章处理 compaction、token 与 spill。", "Even safe execution can overwhelm model context with long sessions and tool output. Next: compaction, token metering, and spill."),
    sources: [source("docs/subsystems/sandbox.md", "Sandbox seam", "模式、后端与强制报告。", "Modes, backends, and enforcement reporting."), source("docs/subsystems/filesystem.md", "Filesystem seam", "文件能力、intent 事件与策略。", "Filesystem capability, intent events, and policy."), source("docs/capability-seams.md", "Execution world", "fs/subprocess/shell/terminal/lsp 的 provider-consumer 图。", "Provider-consumer graph for fs, subprocess, shell, terminal, and LSP.")],
    checkpoint: { question: bi("为什么工具层 allow/deny 不能替代操作系统沙箱？", "Why can tool allow/deny not replace an OS sandbox?"), answer: bi("工具策略决定是否尝试，沙箱限制实际进程与文件影响；模型、插件或实现 bug 都可能绕过仅存在于工具语义层的约束。", "Tool policy decides whether to attempt. A sandbox limits actual process and filesystem effects. Model, plugin, or implementation bugs can bypass constraints that exist only in tool semantics.") },
  },
  {
    slug: "h18-compaction-spill", layer: "durability", sourceType: "mechanism", minutes: 21,
    title: bi("Compaction、Token Meter 与 Spill", "Compaction, token metering, and spill"),
    subtitle: bi("不是粗暴截断，而是在仅追加日志上安全替换模型表面、保留大结果与可审计记账", "Not blunt truncation: safely replace the model surface while preserving large results and auditable accounting"),
    addition: bi("measure → prune → summarize → replace surface", "measure → prune → summarize → replace surface"),
    question: bi("如何缩短模型上下文，同时不破坏工具 call/result 配对、不删除原始事实？", "How do you shorten context without breaking tool call/result pairing or deleting original facts?"),
    analogy: bi("档案馆不销毁卷宗，而是建立一份摘要索引供日常查阅；超大附件移入保管库，目录里保留定位符、大小与取回说明。", "An archive does not destroy case files. It adds a summary index for daily use; oversized attachments move to storage while the catalog keeps a locator, size, and retrieval instructions."),
    mechanism: bi(["TokenMeter 对当前 surface 逐节点计价；Compaction 先记录 start 锁，可选 prune 工具结果，再生成 summary 和带 replace 的 user/message，最后 end。", "Spill policy 在 tools/post-execute 把超大纯文本完整保存到 session 私有后端，只把首尾预览与不透明 locator 交给模型；保存失败则保留原结果。"], ["TokenMeter prices the current surface node by node. Compaction logs a start lock, optionally prunes tool results, generates a summary plus replacement user/message, then logs end.", "Spill policy stores oversized text in a session-private backend during tools/post-execute and gives the model a preview plus opaque locator. If saving fails, it preserves the original result."]),
    flow: [step("measure", "测量压力", "Measure pressure", "usage 锚点或保守启发式得到 totalTokens。", "A usage anchor or conservative heuristic produces totalTokens."), step("lock", "记录压缩锁", "Log lock", "compaction/start 标记完整操作生命周期。", "compaction/start marks the full operation lifetime."), step("prune", "先剪工具结果", "Prune tool results", "模型无关替换可能已足够降低压力。", "Model-free replacement may already relieve pressure."), step("summary", "生成安全摘要", "Generate summary", "保留最近尾部并选择平衡的工具边界。", "Keep a recent tail and choose tool-balanced boundaries."), step("replace", "追加表面替换", "Append replacement", "原始事件仍在，新的 user/message 改变模型表面。", "Original events remain; a new user/message changes the model surface."), step("close", "闭合并持久化", "Close and persist", "compaction/end 让崩溃中断可检测。", "compaction/end makes crash interruption detectable.")],
    invariants: bi(["压缩边界保持工具 call/result 平衡", "start/end 锁包围整个操作", "spill locator 是不透明句柄，不假定本地路径"], ["Compaction boundaries preserve tool call/result balance", "start/end lock encloses the whole operation", "Spill locators are opaque handles, not assumed local paths"]),
    pitfalls: bi(["按 seq 数值范围选择表面节点", "摘要失败后仍写成功 end", "spill 保存失败把成功工具调用改成 error"], ["Selecting surface nodes by numeric seq interval", "Writing a successful end after summary failure", "Turning a successful tool call into an error when spill storage fails"]),
    bridge: bi("Compaction 仍建立在完整日志上；下一章看日志怎样跨进程持久化，并通过 projection/query 高效读取。", "Compaction still rests on the full log. Next we persist it across processes and read efficiently through projections and queries."),
    sources: [source("docs/subsystems/compaction.md", "Compaction lifecycle", "锁、摘要事件、surface replace 与恢复。", "Lock, summary events, surface replacement, and recovery."), source("docs/subsystems/token-meter.md", "TokenMeasurement", "usage 锚点与表面逐节点计价。", "Usage anchors and node-level surface pricing."), source("docs/subsystems/spill.md", "SpillStore", "完整保存、定位符与降级策略。", "Full preservation, locators, and degradation policy.")],
    checkpoint: { question: bi("为什么 compaction/start 和 end 是 log-only 事件？", "Why are compaction/start and end log-only events?"), answer: bi("它们描述操作锁和审计，不是模型对话内容；模型表面的变化由独立带 replace 的 user/message 表达。", "They describe operation locking and audit, not conversation content. Model-surface change is expressed by a separate replacement user/message.") },
  },
  {
    slug: "h19-persistence-projection", layer: "durability", sourceType: "mechanism", minutes: 22,
    title: bi("持久化、Projection 与 Query", "Persistence, projections, and queries"),
    subtitle: bi("写入保持完整日志，读取通过折叠、缓存、水位与全文索引避免每次重放一切", "Writes preserve the full log; reads use folds, checkpoints, watermarks, and indexes instead of replaying everything"),
    addition: bi("durable log + projection checkpoints + query seam", "durable log + projection checkpoints + query seam"),
    question: bi("会话列表为什么不应该为每一行加载完整 SessionEvent 日志？", "Why should a session list not load the complete event log for every row?"),
    analogy: bi("银行保留流水账，但余额页不会每次从开户第一天重算；它读取可信检查点，再重放检查点之后的尾部。", "A bank preserves the ledger but does not recompute every balance from account opening. It reads a trusted checkpoint and replays only the tail."),
    mechanism: bi(["session-persistence seam 负责 JSONL/SQLite 等耐久后端与 flush；checkpoint-policy 在请求、轮次结束和分离点建立明确耐久边界。", "session-projection 注册领域 fold 单元，projection-cache 保存状态与水位；冷读取采用“缓存行 + 持久化尾部回放”。session-query 提供精确读、过滤、trace 与全文搜索。"], ["The session-persistence seam owns durable backends such as JSONL or SQLite and explicit flush. checkpoint-policy establishes durability boundaries at requests, turn ends, and detach points.", "session-projection registers domain fold units, while projection-cache stores state and watermarks. Cold reads use cached row plus durable tail replay. session-query provides exact reads, filtering, traces, and full-text search."]),
    flow: [step("append", "写内存日志", "Append in memory", "Session 先提交权威事件。", "Session first commits the authoritative event."), step("publish", "协调持久写", "Coordinate durable write", "持久化消费方按 seq 写后端。", "Persistence consumers write backend records by seq."), step("flush", "建立耐久边界", "Flush durability", "请求与生命周期策略决定何时等待落盘。", "Request and lifecycle policy decide when to await durability."), step("fold", "增量 Projection", "Incremental projection", "每个领域从自己的 watermark 向前折叠。", "Each domain folds forward from its watermark."), step("checkpoint", "缓存检查点", "Cache checkpoint", "节流与必选边界写状态快照。", "Throttled and mandatory boundaries write state snapshots."), step("query", "按需查询", "Query on demand", "精确日志、摘要、过滤和搜索各走合适索引。", "Exact logs, summaries, filters, and search use appropriate indexes.")],
    invariants: bi(["持久写必须保持事件 seq 与 JSON 保真", "缓存只是可重建加速层，不是真源", "列表读取不应依赖加载完整日志"], ["Durable writes preserve event seq and JSON fidelity", "Caches are reconstructable accelerators, not truth", "List reads should not require full-log loading"]),
    pitfalls: bi(["在 turn/end 假设已经 flush", "把 projection cache 当不可丢失状态", "搜索结果绕过 workspace 授权"], ["Assuming turn/end implies a completed flush", "Treating projection cache as irreplaceable state", "Letting search results bypass workspace authorization"]),
    bridge: bi("耐久系统最后需要明确的失败语义。下一章总结取消、超时、结构化错误与完全停稳的不变量。", "A durable system still needs explicit failure semantics. Next we unify cancellation, timeouts, structured errors, and quiescence invariants."),
    sources: [source("docs/subsystems/persistence.md", "Persistence seam", "后端、写协调与恢复。", "Backends, write coordination, and recovery."), source("docs/subsystems/session-projection.md", "Projection units", "折叠单元、水位和缓存。", "Fold units, watermarks, and caching."), source("docs/subsystems/session-query.md", "Session query", "精确读取、trace 与全文搜索。", "Exact reads, traces, and full-text search.")],
    checkpoint: { question: bi("为什么缓存检查点必须带 watermark？", "Why must a projection checkpoint include a watermark?"), answer: bi("没有已消费事件位置，就无法知道应从哪里继续重放，也无法证明快照对应哪一版日志。", "Without the consumed-event position, you cannot know where replay resumes or prove which log revision the snapshot represents.") },
  },
  {
    slug: "h20-defensive-invariants", layer: "durability", sourceType: "mechanism", minutes: 18,
    title: bi("取消、超时与防御性不变量", "Cancellation, timeouts, and defensive invariants"),
    subtitle: bi("生产可靠性来自所有边界都报告真实状态，而不是“尽量不要出错”", "Production reliability comes from every boundary reporting truthful state, not from hoping errors do not happen"),
    addition: bi("request stop ≠ fully stopped", "request stop ≠ fully stopped"),
    question: bi("为什么一个超时不能简单地 Promise.race 后忘掉仍在运行的工作？", "Why can a timeout not simply Promise.race and forget the still-running work?"),
    analogy: bi("消防警报宣布“立即撤离”不等于大楼已经清空；系统必须区分命令已发出、人员正在撤离和检查确认无人滞留。", "A fire alarm announcing evacuation does not mean the building is empty. The system must distinguish request issued, evacuation in progress, and verified clearance."),
    mechanism: bi(["DeepSeek Harness 使用结构化错误码、AbortSignal、Deadline 与 holder-owned dispose，把“请求停止”与“资源已释放”拆开。", "invariants service 让每个 package 注册自身可验证条件；分发器隔离观察者异常，正交结果独立上报，避免一个通知失败伪造主操作失败。"], ["DeepSeek Harness uses structured error codes, AbortSignal, deadlines, and holder-owned disposal to separate stop requests from resource release.", "The invariants service lets each package register verifiable conditions. Dispatchers isolate observer exceptions and report orthogonal outcomes independently so notification failure cannot falsify the primary operation."]),
    flow: [step("deadline", "建立 Deadline", "Create deadline", "所有子操作共享剩余预算而不是各自重置超时。", "Child operations share remaining budget instead of resetting timeout."), step("abort", "传播取消", "Propagate abort", "first-wins 原因沿真实拥有关系传递。", "A first-wins cause travels through real ownership."), step("settle", "等待结算", "Await settlement", "结果必须闭合为成功、取消或结构化失败。", "Outcomes close as success, cancellation, or structured failure."), step("dispose", "完全停稳", "Reach quiescence", "后台进程、worker 与回调全部结束。", "Processes, workers, and callbacks all stop."), step("verify", "检查不变量", "Verify invariants", "开发与测试阶段主动发现跨包漂移。", "Development and tests proactively detect cross-package drift.")],
    invariants: bi(["取消原因 first-wins", "dispose 完成表示资源真正释放", "观察者失败不能撤销已经提交的权威操作"], ["Cancellation cause is first-wins", "Completed dispose means resources are truly released", "Observer failure cannot revoke an authoritative committed operation"]),
    pitfalls: bi(["每层都重新开始完整 timeout", "捕获所有错误并返回普通文本", "unlink 前 follow 符号链接到外部路径"], ["Restarting a full timeout at every layer", "Catching every error and returning plain text", "Following a symlink outside the boundary before unlink"]),
    bridge: bi("单 Agent 的可靠主干已经建立。接下来加入目标、计划与待办这些可回放协作状态。", "The reliable single-agent spine is complete. Next we add replayable collaboration state: goals, plans, and todos."),
    sources: [source("docs/defensive-patterns.md", "Defensive patterns", "完全停稳、异常隔离与路径安全。", "Quiescence, exception isolation, and path safety."), source("docs/subsystems/invariants.md", "Invariant registry", "package-owned 不变量注册与执行。", "Package-owned invariant registration and execution."), source("packages/guard/timeout-policy/README.md", "Timeout policy", "工具超时的环绕执行策略。", "Around-execution policy for tool timeouts.")],
    checkpoint: { question: bi("为什么 observer 失败不能让 Session.append() 失败？", "Why must observer failure not make Session.append() fail?"), answer: bi("事件已经越过提交点，回滚是不可能的；向调用方报告失败会制造“事实未发生”的假象并诱发重复写。", "The event already crossed the commit point and cannot be rolled back. Reporting failure would pretend the fact never happened and could trigger duplicate writes.") },
  },
  {
    slug: "h21-goals-plan-todo", layer: "scale", sourceType: "mechanism", minutes: 18,
    title: bi("Goal、Plan Mode 与 Todo", "Goals, plan mode, and todos"),
    subtitle: bi("三个相似概念分别拥有长期目标、协作模式和当前清单，不能压成一个数组", "Three similar ideas own durable objectives, collaboration mode, and the current checklist—they are not one array"),
    addition: bi("goal state · plan mode · todo projection", "goal state · plan mode · todo projection"),
    question: bi("为什么 Todo 已全部完成，不一定意味着 Goal 已经完成？", "Why can all todos be complete while the goal is not?"),
    analogy: bi("Goal 是合同交付结果，Plan Mode 是双方当前的协作流程，Todo 是施工现场今日清单。清单清空只说明一批工作做完，不自动证明合同验收通过。", "A goal is the contractual outcome, plan mode is the current collaboration protocol, and todos are today's site checklist. An empty checklist does not prove the contract passed acceptance."),
    mechanism: bi(["ctx.goals 从 goal/* SessionEvent 折叠带 revision 的持久状态，并在进程内维护 continuation 激活；goal-round-driver 决定轮次延续。", "plan-mode 记录模式与计划状态；todo_write 记录全量三态列表快照。三者独立投影、独立不变量、独立 UI。"], ["ctx.goals folds revisioned durable state from goal/* SessionEvents and keeps live continuation activation in-process; goal-round-driver controls continued rounds.", "plan-mode records collaboration mode and plan state; todo_write logs a full three-state list snapshot. Each has its own projection, invariants, and UI."]),
    flow: [step("goal", "创建持久目标", "Create durable goal", "目标定义成功条件与 revision。", "The goal defines success conditions and revision."), step("mode", "选择协作模式", "Choose collaboration mode", "计划、默认执行或其他模式控制交互协议。", "Planning, default execution, or another mode controls collaboration."), step("todo", "投影当前清单", "Project checklist", "Agent 用全量快照表达本轮工作状态。", "The agent uses a full snapshot for current work state."), step("round", "驱动延续轮次", "Drive continuation", "Goal 未终结且条件允许时激活下一轮。", "If the goal is unfinished and policy allows, activate another round."), step("complete", "显式验收", "Complete explicitly", "只有 Goal 权威状态声明结果达成。", "Only authoritative goal state declares the outcome achieved.")],
    invariants: bi(["Goal revision 防止基于旧状态更新", "Todo 列表 last-write-wins 且无需稳定 item id", "Plan 退出 schema 在状态转换期间保持稳定"], ["Goal revisions prevent stale updates", "Todo lists are last-write-wins and need no stable item id", "Plan-exit schema stays stable during transitions"]),
    pitfalls: bi(["用 Todo 完成率推断 Goal 状态", "把 Plan 当模型内部隐藏思维", "Goal continuation 无上限自旋"], ["Inferring goal state from todo completion", "Treating a plan as hidden model reasoning", "Allowing goal continuation to spin without bounds"]),
    bridge: bi("有了持久目标与当前工作状态，下一章讨论如何把子任务交给其他 Agent，并把长工作登记为 Job。", "With durable objectives and current work state, we can delegate subtasks and register long-running work as jobs."),
    sources: [source("docs/subsystems/goal.md", "Goal domain", "revision、运行时激活与轮次驱动。", "Revisions, live activation, and round driving."), source("docs/subsystems/plan.md", "Plan mode", "计划协作状态与命令。", "Planning collaboration state and commands."), source("docs/subsystems/session.md", "TodoItem", "todo/write 全量快照语义。", "Whole-snapshot semantics of todo/write.")],
    checkpoint: { question: bi("TodoItem 为什么故意没有稳定 id？", "Why does TodoItem deliberately omit a stable id?"), answer: bi("todo/write 每次替换完整列表，状态只需要内容与三态生命周期；稳定 id 会增加不存在的局部更新语义。", "todo/write replaces the whole list. Content plus three-state lifecycle is enough; stable ids would imply partial-update semantics that do not exist.") },
  },
  {
    slug: "h22-subagents-jobs", layer: "scale", sourceType: "mechanism", minutes: 22,
    title: bi("Subagent、Continuation 与 Job", "Subagents, continuations, and jobs"),
    subtitle: bi("委派传输、可继续对话和长时间运行控制是三层不同抽象", "Delegation transport, continued conversation, and long-running control are three different abstractions"),
    addition: bi("provider transport + activation + job registry", "provider transport + activation + job registry"),
    question: bi("启动一个子 Agent 后，谁拥有它、谁能继续发消息、谁负责停止？", "After starting a subagent, who owns it, who may continue it, and who must stop it?"),
    analogy: bi("委派像把任务交给外包团队：Provider 是通信方式，Descriptor 是合同身份，Continuation 是续约通道，Job Registry 是项目监控台。", "Delegation is outsourcing: the provider is the transport, the descriptor is contractual identity, continuation is the follow-up channel, and the job registry is the project control board."),
    mechanism: bi(["ctx.subagents 选择 in-process spawn/fork、ACP、Codex、Claude Code 或 DSH SDK provider；请求携带深度、cwd、persona、工具可见性与持久 descriptor。", "Continuation 由 Activation 编排，tool-subagent-control 发送后续；长运行委派登记 ctx.jobs，ownerSession 负责访问控制，Agent dispose 会取消并等待 Job。"], ["ctx.subagents selects in-process spawn/fork, ACP, Codex, Claude Code, or DSH SDK providers. Requests carry depth, cwd, persona, tool visibility, and a durable descriptor.", "Activation orchestrates continuation and tool-subagent-control sends follow-ups. Long-running delegation registers with ctx.jobs; ownerSession controls access and agent disposal cancels and awaits the job."]),
    flow: [step("request", "声明委派请求", "Declare request", "描述、父 Agent、深度、工具过滤和 persona。", "Description, parent agent, depth, tool filter, and persona."), step("resolve", "选择 Provider", "Resolve provider", "运行时校验所需 capability。", "Runtime validates required capabilities."), step("start", "启动并记录 Descriptor", "Start and record descriptor", "Session-backed provider 保存子任务谱系。", "Session-backed providers preserve child lineage."), step("activate", "可选 Continuation", "Optional continuation", "Activation 管理可继续输入与完成边界。", "Activation manages follow-up input and completion boundaries."), step("job", "登记长工作", "Register job", "读取、列表、终止与最终通知走统一控制器。", "Read, list, stop, and completion notification use one controller."), step("dispose", "级联停稳", "Cascade quiescence", "父 Agent 销毁会取消并等待所属委派。", "Parent disposal cancels and awaits owned delegation.")],
    invariants: bi(["绝对委派深度在 provider 间一致", "工具过滤是可见性，不是安全权限", "Job.done 只在生产方释放资源后完成"], ["Absolute delegation depth is consistent across providers", "Tool filtering is visibility, not security permission", "Job.done resolves only after the producer releases resources"]),
    pitfalls: bi(["把“新开 API 调用”当完整子 Agent", "只取消 Job 记录却不停止生产方", "用可猜 JobId 作为访问控制"], ["Calling a new model request a full subagent", "Cancelling only the job record but not producer work", "Using guess-resistant JobId as access control"]),
    bridge: bi("子 Agent 解决一次委派；下一章让模型编写工作流脚本并安排持久 Schedule。", "Subagents solve delegation. Next, model-written workflows orchestrate many agents and durable schedules wake future turns."),
    sources: [source("docs/subsystems/subagent.md", "Subagent runtime", "Provider、descriptor、capability 与 continuation。", "Providers, descriptors, capabilities, and continuation."), source("docs/subsystems/jobs.md", "Job runtime", "所有权、状态、输出与取消。", "Ownership, status, output, and cancellation."), source("packages/subagent/subagent/src/types.ts", "SubagentStartRequest", "权威委派请求类型。", "Authoritative delegation request types.")],
    checkpoint: { question: bi("为什么 toolFilter 不能被当作安全沙箱？", "Why can toolFilter not be treated as a security sandbox?"), answer: bi("它只控制模型可见的继承工具集合；Provider、进程、文件系统和局部工具仍需真正的权限与沙箱边界。", "It only controls the inherited tools visible to the model. Providers, processes, filesystems, and local tools still need real permission and sandbox boundaries.") },
  },
  {
    slug: "h23-workflow-schedule", layer: "scale", sourceType: "mechanism", minutes: 22,
    title: bi("Workflow Engine 与持久 Schedule", "Workflow engine and durable schedules"),
    subtitle: bi("模型编写短期编排脚本，Schedule 在未来把提醒作为普通 Follow-up 送回原 Session", "The model writes bounded orchestration scripts; schedules deliver future reminders as normal follow-ups to the same session"),
    addition: bi("worker-thread script + agent() fan-out + durable wakeup", "worker-thread script + agent() fan-out + durable wakeup"),
    question: bi("Workflow、Job 与 Schedule 为什么不能合成一个“后台任务”概念？", "Why can workflow, job, and schedule not collapse into one background-task concept?"),
    analogy: bi("Workflow 是导演的分镜与现场调度，Job 是正在拍摄的机位状态，Schedule 是未来某个时间重新开机的通告。", "A workflow is the director's shooting plan, a job is the live camera status, and a schedule is the future call sheet that restarts work."),
    mechanism: bi(["ctx.workflowEngine 每个 Context 只有一个实现；worker-thread 在隔离 vm 中运行模型脚本，提供 agent()、phase() 与 JSON args，拥有总 Agent 数与并发上限。", "Schedule 只在同一 Session 内持久 after/at/every 记录；到期后排队普通 followup。重复调度固定速率、至少五分钟，错过区间只合并为最新一次到期。"], ["Each context has one ctx.workflowEngine implementation. worker-thread runs model code in an isolated VM with agent(), phase(), JSON args, and total/concurrency limits.", "Schedules persist after/at/every records inside one session and deliver due reminders as ordinary followups. Repetition is fixed-rate, at least five minutes, and missed intervals collapse to the latest due occurrence."]),
    flow: [step("script", "提交脚本与 Meta", "Submit script and meta", "纯 JSON 身份与参数先通过 schema 校验。", "Plain-JSON identity and args are schema-validated first."), step("worker", "启动隔离 Worker", "Start isolated worker", "每次 run 一个 worker_threads + vm 世界。", "Each run owns a worker_threads plus VM world."), step("fanout", "agent() 扇出", "Fan out", "脚本通过受限绑定创建子 Agent。", "The script creates subagents through bounded bindings."), step("result", "物化 JSON 结果", "Materialize result", "completed/cancelled/error 闭合，不返回半成功。", "completed/cancelled/error closes without partial success."), step("schedule", "持久未来触发", "Persist future wakeup", "schedule/change 保存规范 UTC 目标。", "schedule/change stores normalized UTC targets."), step("followup", "对话式交付", "Deliver conversationally", "到期提醒进入原 Session 的普通后续轮次。", "Due reminders enter an ordinary follow-up turn in the same session.")],
    invariants: bi(["Workflow result promise 不拒绝，而以封闭 stopReason 结算", "dispose 在有界宽限期后强制终止卡死 worker", "Schedule 永不隐式读取环境时区"], ["Workflow result never rejects; it settles with a closed stopReason", "Dispose force-terminates a stuck worker after bounded grace", "Schedule never implicitly reads environment time zone"]),
    pitfalls: bi(["把脚本 meta 当可执行表达式解析", "重复 Schedule 枚举所有错过区间造成风暴", "把 dispatch 当成用户已收到回执"], ["Evaluating workflow meta as code", "Replaying every missed schedule interval into a storm", "Treating dispatch as user acknowledgement"]),
    bridge: bi("系统还需要发现外部能力：Skills、MCP、LSP 与 Web 都通过不同 seam 进入，而不是绕过工具管线。", "The system still needs external capability discovery. Skills, MCP, LSP, and Web enter through distinct seams rather than bypassing the tool pipeline."),
    sources: [source("docs/subsystems/workflow.md", "Workflow seam", "脚本、Meta、运行句柄与停稳。", "Scripts, metadata, run handles, and quiescence."), source("docs/subsystems/schedule.md", "Schedule records", "after/at/every、时区与持久交付。", "after/at/every, time zones, and durable delivery."), source("packages/workflow/workflow-worker-thread/src/runtime.ts", "Worker runtime", "Worker、VM 与绑定实现。", "Worker, VM, and binding implementation.")],
    checkpoint: { question: bi("为什么 Schedule 的 at 字符串必须带 UTC 偏移？", "Why must Schedule at strings include a UTC offset?"), answer: bi("持久记录必须跨机器与重放保持同一时点；不带偏移的本地时间依赖环境状态，无法确定性重建。", "Durable records must mean the same instant across machines and replay. Local time without offset depends on environment state and is not deterministically reconstructable.") },
  },
  {
    slug: "h24-skills-mcp-lsp", layer: "scale", sourceType: "mechanism", minutes: 19,
    title: bi("Skills、MCP、LSP 与 Web 能力", "Skills, MCP, LSP, and Web capabilities"),
    subtitle: bi("操作指南、动态工具、代码语义与互联网访问各有独立服务边界", "Operating guides, dynamic tools, code semantics, and internet access each keep an independent service boundary"),
    addition: bi("discover → normalize → register → same tool pipeline", "discover → normalize → register → same tool pipeline"),
    question: bi("Skill 和 Plugin 都能扩展 Agent，为什么它们不是一回事？", "Skills and plugins both extend agents—why are they not the same?"),
    analogy: bi("Skill 是给操作员的标准作业指导书；Plugin 是给工厂安装的新设备；MCP 是外部设备协议；LSP 是专门的代码测量仪。", "A skill is an operating procedure for the worker. A plugin installs machinery. MCP is an external equipment protocol. LSP is a specialized code measurement instrument."),
    mechanism: bi(["ctx.skills 合并 provider 目录，tool-skill 先展示目录再按需注入完整正文；内容进入模型上下文但不注册新 JS service。", "MCP client 动态发现外部工具后注册到 ctx.tools；LSP seam 只暴露四种标准化查询，不提供协议逃生口；Web seam 把 search/fetch provider 放在稳定 tool-web 名称之后。"], ["ctx.skills merges provider catalogs. tool-skill first shows a catalog and injects full bodies on demand; content enters model context without registering JavaScript services.", "MCP discovers remote tools then registers them into ctx.tools. LSP exposes four normalized queries without protocol escape hatches. Web search/fetch providers sit behind stable tool-web names."]),
    flow: [step("discover", "发现能力", "Discover", "扫描 Skill 文件、MCP server 或 provider 注册。", "Scan skill files, MCP servers, or provider registrations."), step("normalize", "标准化契约", "Normalize", "外部 schema、LSP 请求或 Web 结果转成内部词汇。", "Convert external schemas, LSP requests, or Web results into internal vocabulary."), step("register", "进入 Service/Tools", "Register", "Plugin 生命周期拥有动态注册。", "Plugin lifecycle owns dynamic registration."), step("assemble", "同步模型可见性", "Assemble visibility", "Prompt 与 schema 只展示当前作用域能力。", "Prompts and schemas expose only current-scope capability."), step("execute", "走统一管线", "Use common pipeline", "审批、超时、spill 与结果记录保持一致。", "Approval, timeout, spill, and result logging remain consistent.")],
    invariants: bi(["MCP 工具不能绕过 ctx.tools", "Skill 正文是模型上下文，不是受信任代码", "LSP provider 必须转换成标准结果"], ["MCP tools cannot bypass ctx.tools", "Skill bodies are model context, not trusted code", "LSP providers must translate into normalized results"]),
    pitfalls: bi(["把 Skill 当 Plugin 执行任意代码", "直接把 MCP schema 原样信任为内部类型", "暴露通用 LSP request 方法破坏 seam"], ["Executing a skill as arbitrary plugin code", "Trusting MCP schemas as internal types without normalization", "Exposing a generic LSP request escape hatch"]),
    bridge: bi("能力地图已经完整；最后一层把它落实为四种扩展任务：工具、Provider、客户端表面和产品组合。", "The capability map is complete. The final layer turns it into four extension tasks: tools, providers, surfaces, and product composition."),
    sources: [source("docs/subsystems/skills.md", "Skill registry", "Skill provider、目录与正文加载。", "Skill providers, catalogs, and body loading."), source("docs/subsystems/lsp.md", "LSP seam", "标准化代码查询边界。", "Normalized code-query boundary."), source("packages/mcp/mcp-client/src/index.ts", "MCP client", "动态工具发现与注册。", "Dynamic tool discovery and registration."), source("docs/subsystems/web.md", "Web seam", "搜索/抓取 provider 与 tool-web。", "Search/fetch providers and tool-web.")],
    checkpoint: { question: bi("MCP 工具发现后为什么仍需注册到 ctx.tools？", "Why register discovered MCP tools into ctx.tools?"), answer: bi("这样 schema 装配、作用域限制、审批、Guard、超时、spill、日志和 UI 展示都与原生工具一致。", "This keeps schema assembly, scope restriction, approval, guards, timeouts, spill, logging, and UI presentation consistent with native tools.") },
  },
  {
    slug: "h25-build-tool", layer: "build", sourceType: "build", minutes: 20,
    title: bi("实战：添加一个工具", "Lab: add a tool"),
    subtitle: bi("从参数 schema、执行与输出 schema，到作用域注册、展示和测试", "From argument schema, execution, and output schema to scoped registration, presentation, and tests"),
    addition: bi("defineTool → ctx.tools.register → prompt schema", "defineTool → ctx.tools.register → prompt schema"),
    question: bi("一个合格工具定义除了 name、description 和 execute，还必须考虑什么？", "Beyond name, description, and execute, what makes a production-grade tool definition?"),
    analogy: bi("工具定义是一份带质检的产品合同：输入规格、产出规格、最长交期、展示方式和出错类别都要与实际生产线一致。", "A tool definition is a quality-controlled product contract: input spec, output spec, deadline, presentation, and error classes must match the production line."),
    mechanism: bi(["defineTool 把参数推导、JSON Schema 编译、运行时校验、output 校验和 presentation 绑定在同一份定义上；不支持的 schema 关键字会被拒绝。", "注册到 agent.ctx 可提供局部能力，注册到根 ctx 提供部署能力；schemas() 只投影当前可见工具，执行仍走完整流水线。"], ["defineTool ties TypeScript inference, JSON Schema compilation, runtime validation, output validation, and presentation to one definition. Unsupported schema keywords are rejected.", "Register on agent.ctx for local capability or root ctx for deployment capability. schemas() projects only currently visible tools, while execution still uses the full pipeline."]),
    flow: [step("contract", "定义参数与输出", "Define contract", "参数、output 和错误保持 JSON 可表示。", "Arguments, output, and errors remain JSON-representable."), step("execute", "实现纯业务逻辑", "Implement behavior", "权限与通用超时不塞进 handler。", "Do not embed permission or generic timeout policy in the handler."), step("present", "定义展示", "Define presentation", "call/result card 与 meta 保持可回放。", "Call/result cards and meta stay replayable."), step("register", "按作用域注册", "Register by scope", "effect disposer 自动移除能力。", "The effect disposer removes capability automatically."), step("test", "验证契约和流水线", "Test contract and pipeline", "覆盖非法参数、取消、错误与卸载。", "Cover invalid args, cancellation, errors, and disposal.")],
    invariants: bi(["参数与输出都经过运行时校验", "工具 meta 必须 JSON 可序列化", "工具业务逻辑不拥有跨工具安全策略"], ["Arguments and output are runtime-validated", "Tool meta must be JSON-serializable", "Tool business logic does not own cross-tool security policy"]),
    pitfalls: bi(["只写 TypeScript 类型而无运行时 schema", "handler 返回 class/Date/循环引用", "注册后忘记让插件生命周期拥有 disposer"], ["Writing TypeScript types without runtime schemas", "Returning classes, Date, or cycles from handlers", "Registering without lifecycle ownership of the disposer"]),
    bridge: bi("工具是 capability consumer；下一章从另一侧设计一个可替换 Provider 和完整 seam。", "A tool is a capability consumer. Next we design a replaceable provider and the full seam from the other side."),
    sources: [source("docs/cookbook/adding-a-tool.md", "Adding a tool", "官方分步实现与测试清单。", "Official step-by-step implementation and test checklist."), source("packages/core/tools/src/types.ts", "ToolDefinition", "参数、输出、执行与展示类型。", "Argument, output, execution, and presentation types."), source("docs/subsystems/tools.md", "defineTool", "schema 子集与 restriction。", "Schema subset and restrictions.")],
    checkpoint: { question: bi("为什么工具 output 也要有 schema？", "Why does tool output need a schema?"), answer: bi("工具结果会进入日志、UI、回放和模型上下文；运行时验证能在边界处阻止不可序列化或漂移的实现结果。", "Tool output enters logs, UI, replay, and model context. Runtime validation stops unserializable or drifted implementation results at the boundary.") },
    code: `export const apply = (ctx: Context) => {
  ctx.tools.register(defineTool({
    name: "weather_lookup",
    description: "Return a normalized weather snapshot.",
    parameters: { city: { type: "string" } },
    output: { summary: { type: "string" } },
    async execute({ city }, runtime) {
      runtime.signal.throwIfAborted()
      return { summary: await lookup(city, runtime.signal) }
    },
  }))
}`,
  },
  {
    slug: "h26-build-adapter", layer: "build", sourceType: "build", minutes: 22,
    title: bi("实战：设计 Capability Seam 与 Provider", "Lab: design a capability seam and provider"),
    subtitle: bi("接口、实现和消费者要一起设计；只抽象一个 class 不等于拥有 seam", "Design interface, implementation, and consumer together; an abstract class alone is not a seam"),
    addition: bi("definition + provider + consumer", "definition + provider + consumer"),
    question: bi("什么时候应该新增 Provider，什么时候应该新增完整能力 seam？", "When should you add a provider, and when should you design a new seam?"),
    analogy: bi("插座标准不是一个插座外壳：它同时定义电气接口、生产插座的厂商和使用插头的设备。缺少任一角色，标准都没有产品意义。", "A socket standard is not one socket shell. It defines the electrical interface, manufacturers producing sockets, and appliances consuming them. Without all roles, it has no product meaning."),
    mechanism: bi(["已有 service contract 时，新增 provider 只需实现语义并注册；新增能力则要同时选择 service 定义、至少一个 provider、消费方与替换价值。", "Provider 特有配置留在实现包；consumer 只依赖 service。能力目录与模块图用于核验没有不必要反向依赖。"], ["When a service contract exists, a new provider implements its semantics and registers. A new capability requires a service definition, at least one provider, a consumer, and a clear replacement value.", "Provider-specific config stays in the implementation package; consumers depend only on the service. Capability catalogs and module graphs verify there are no unnecessary reverse dependencies."]),
    flow: [step("need", "证明替换价值", "Prove replacement value", "至少有两个合理实现或一个明确部署边界。", "Identify two plausible implementations or one clear deployment boundary."), step("definition", "声明最小接口", "Declare minimal interface", "保持 provider 无关的输入、结果和错误语义。", "Keep input, result, and error semantics provider-neutral."), step("provider", "实现并注册", "Implement provider", "配置、SDK 与资源生命周期留在实现包。", "Config, SDK, and resource lifecycle stay in the implementation package."), step("consumer", "接入稳定名称", "Connect consumer", "工具或主干只调用 ctx service。", "Tools or spine call only the ctx service."), step("verify", "生成图与契约测试", "Verify graph and contract", "所有 provider 通过同一测试套件。", "All providers pass the same contract suite.")],
    invariants: bi(["消费者不 import provider 包", "接口错误语义能被所有实现兑现", "Provider dispose 完全释放 SDK、进程或远程资源"], ["Consumers do not import provider packages", "Every implementation can honor interface error semantics", "Provider disposal fully releases SDK, process, or remote resources"]),
    pitfalls: bi(["为一个实现提前抽象", "把 provider 名称泄漏到 Agent Loop", "接口提供任意协议 escape hatch"], ["Abstracting prematurely for one implementation", "Leaking provider names into agent-loop", "Offering an arbitrary protocol escape hatch"]),
    bridge: bi("能力完成后还要被人类或其他客户端使用；下一章讲 Web、CLI、ACP、SDK 与 Host 如何共享同一 Agent。", "A capability still needs human and client surfaces. Next: how Web, CLI, ACP, SDK, and Host share one agent."),
    sources: [source("docs/capability-seams.md", "Capability graph", "定义、实现、消费者与 policy consumer。", "Definitions, implementations, consumers, and policy consumers."), source("docs/cookbook/adding-an-llm-adapter.md", "Adding an adapter", "Provider 扩展实例。", "A concrete provider-extension example."), source("docs/cookbook/adding-a-package.md", "Package boundaries", "包边界、依赖与验证。", "Package boundaries, dependencies, and verification.")],
    checkpoint: { question: bi("为什么 LSP seam 不提供 sendRawRequest()？", "Why does the LSP seam not expose sendRawRequest()?"), answer: bi("Escape hatch 会让消费者重新依赖具体协议并绕过标准结果、测试和替换契约，seam 形同虚设。", "An escape hatch makes consumers depend on provider protocol again and bypass normalized results, tests, and replacement contracts, defeating the seam.") },
    code: `abstract class WeatherService extends Service {
  abstract lookup(input: WeatherQuery, signal?: AbortSignal): Promise<WeatherSnapshot>
}

class HttpWeatherProvider extends WeatherService {
  async lookup(input: WeatherQuery, signal?: AbortSignal) {
    return normalize(await this.client.fetch(input, { signal }))
  }
}`,
  },
  {
    slug: "h27-surfaces-host", layer: "build", sourceType: "build", minutes: 21,
    title: bi("实战：Web、CLI、ACP、SDK 与 Host", "Lab: Web, CLI, ACP, SDK, and Host"),
    subtitle: bi("入口适配协议、Host 拥有运行时，客户端从 SessionEvent 投影；没有第二套 Agent 内核", "Surfaces adapt protocols, Host owns runtime, and clients project SessionEvents—there is no second agent core"),
    addition: bi("surface input → ctx.agents → session/event → projection", "surface input → ctx.agents → session/event → projection"),
    question: bi("Web UI 的按钮如何安全地变成 Agent 行为，又不让浏览器直接拥有业务状态？", "How does a Web UI button become agent behavior without making the browser own business state?"),
    analogy: bi("客户端像不同语言的客服窗口，Host 是后台业务中心。窗口翻译请求并展示档案，业务规则和唯一记录都在后台。", "Clients are service windows speaking different languages; Host is the shared back office. Windows translate requests and present records, while rules and authoritative state stay behind them."),
    mechanism: bi(["ctx.apiProxy 提供 transport-neutral Host gateway；每条 Host 流自行订阅事件。Web client module graph 通过 dsh.client 扫描组合，HMR 更新客户端插件。", "ACP、CLI、Headless 和 SDK 都通过 ctx.agents 创建/恢复或驱动 Agent，从 session/event 渲染；命令可通过 ctx.commands 绕过模型轮次但仍遵循服务边界。"], ["ctx.apiProxy provides a transport-neutral Host gateway and each Host stream owns its event subscriptions. Web client modules compose through dsh.client scanning and update through HMR.", "ACP, CLI, Headless, and SDK create, resume, or drive agents through ctx.agents and render from session/event. Human commands may bypass model turns through ctx.commands while preserving service boundaries."]),
    flow: [step("input", "适配输入协议", "Adapt input", "Browser RPC、ACP request 或 CLI command 转成 Host 调用。", "Browser RPC, ACP request, or CLI command becomes a Host call."), step("agent", "驱动 ctx.agents", "Drive agents", "创建、恢复、followup、steer、cancel 使用公开句柄。", "Create, resume, follow up, steer, and cancel through public handles."), step("event", "订阅持久与实时事件", "Subscribe", "SessionEvent 用于 transcript；agent/* 用于状态与控制。", "SessionEvent feeds transcripts; agent/* feeds live state and control."), step("project", "客户端投影", "Project client state", "对话节点和卡片从权威事件构建。", "Conversation nodes and cards build from authoritative events."), step("reconnect", "重连与重放", "Reconnect and replay", "断线后从持久日志与 projection 恢复。", "Reconnect from durable logs and projections.")],
    invariants: bi(["客户端表面不保存第二份权威 Agent 状态", "持久 transcript 消费 session/event，不消费 agent/*", "Host 流独立拥有订阅与处置"], ["Client surfaces do not own a second authoritative agent state", "Durable transcripts consume session/event, not agent/*", "Each Host stream owns its subscriptions and disposal"]),
    pitfalls: bi(["浏览器本地 optimistic state 覆盖权威结果", "把 agent/status 写入持久 transcript", "共享一个全局广播器导致连接间事件泄漏"], ["Letting optimistic browser state overwrite authoritative results", "Writing agent/status into durable transcripts", "Sharing one global broadcaster and leaking events across connections"]),
    bridge: bi("最后一章把工具、Provider 与表面装进 Profile/Bundle，并建立版本、测试和上游同步策略。", "The final chapter packages tools, providers, and surfaces into profiles and bundles with versioning, tests, and upstream alignment."),
    sources: [source("docs/api-gateway.md", "API gateway", "Host/Client 调用与流边界。", "Host/client calls and stream boundaries."), source("docs/subsystems/client-modules.md", "Client module graph", "dsh.client 组合与 HMR。", "dsh.client composition and HMR."), source("docs/subsystems/core.md", "Agent surface", "所有入口共享的公开 Agent API。", "Public Agent API shared by every surface.")],
    checkpoint: { question: bi("为什么 SDK 要消费 session/event 而不是仅监听 assistant 文本？", "Why should an SDK consume session/event instead of only assistant text?"), answer: bi("工具、压缩、目标、审批、用量和错误都是会话事实；只监听文本无法回放或重建完整交互。", "Tools, compaction, goals, approvals, usage, and errors are session facts. Text-only listeners cannot replay or reconstruct the interaction.") },
  },
  {
    slug: "h28-product-bundle", layer: "build", sourceType: "build", minutes: 20,
    title: bi("实战：从插件到可交付产品", "Lab: from plugins to a shippable product"),
    subtitle: bi("用 Package、Bundle、Profile、契约测试和源码快照把扩展变成可维护产品", "Use packages, bundles, profiles, contract tests, and source snapshots to turn extensions into a maintainable product"),
    addition: bi("package → bundle → profile → release", "package → bundle → profile → release"),
    question: bi("一个在本地能跑的插件，离“可交付”还差哪些边界？", "What boundaries separate a locally working plugin from a shippable product?"),
    analogy: bi("发明一个零件不等于造出商品：还要有规格、装配清单、兼容版本、验收测试、升级说明和召回路径。", "Inventing a part is not shipping a product. You still need specifications, assembly manifests, compatible versions, acceptance tests, upgrade notes, and a recall path."),
    mechanism: bi(["功能按 Service Definition、Provider、Consumer、Policy 分包；Bundle 提供可覆盖配置，Profile 命名产品组合，用户 patch 保留本地差异。", "开发者预览意味着 breaking change 是常态；教学与扩展项目应固定 upstream commit、记录 source map、用契约测试和定期 diff 审计更新。"], ["Features separate Service Definition, provider, consumer, and policy packages. Bundles provide patchable config, profiles name product compositions, and user patches preserve local differences.", "Developer preview means breaking change is normal. Teaching and extension projects should pin an upstream commit, keep a source map, use contract tests, and audit diffs regularly."]),
    flow: [step("package", "定义包边界", "Define package boundary", "导出稳定词汇，避免反向依赖。", "Export stable vocabulary and avoid reverse dependencies."), step("tests", "建立契约与生命周期测试", "Add contracts", "同一 provider suite、dispose、错误与作用域都覆盖。", "Cover provider suites, disposal, errors, and scope."), step("bundle", "发布可覆盖组合", "Publish bundle", "配置行使用稳定 id，默认值可解释。", "Config rows use stable ids and explainable defaults."), step("profile", "组装产品", "Compose product", "选择表面、能力、政策和持久化后端。", "Choose surfaces, capabilities, policy, and persistence backends."), step("release", "锁定源码快照", "Pin source snapshot", "README、Source Map 与站点声明对齐 commit。", "README, source map, and site declare the aligned commit."), step("maintain", "持续审计上游", "Audit upstream", "按模块图和事件目录检查 breaking changes。", "Check breaking changes through module graphs and event catalogs.")],
    invariants: bi(["产品默认配置可用 --dump-config 解释", "所有用户自定义通过上层 patch 保留", "教学结论注明 upstream 快照与推断边界"], ["Product defaults are explainable with --dump-config", "User customization survives as upper-layer patches", "Teaching claims name the upstream snapshot and inference boundary"]),
    pitfalls: bi(["把示例配置硬编码进 Provider", "发布 Bundle 却要求用户修改源码", "官方 breaking change 后仍展示旧事件顺序"], ["Hardcoding example config into providers", "Publishing a bundle that requires source edits", "Showing stale event ordering after upstream breaking changes"]),
    bridge: bi("你现在拥有一条从心智模型、组合、运行主干、安全耐久性到扩展交付的完整学习路径。架构地图与源码索引会继续作为日常查阅入口。", "You now have an end-to-end path from mental model and composition through runtime, safety, durability, and extension delivery. Keep the architecture atlas and source index as daily references."),
    sources: [source("docs/cookbook/extension-cookbook.md", "Extension cookbook", "能力到 package/tool/adapter/client 的任务映射。", "Task map from capability to packages, tools, adapters, and clients."), source("docs/cookbook/adding-a-package.md", "Adding a package", "包结构、导出与验证。", "Package structure, exports, and verification."), source("docs/development.md", "Development guide", "官方开发命令与质量门。", "Official development commands and quality gates.")],
    checkpoint: { question: bi("为什么本教学项目必须记录 upstream commit，而不能只写“最新版”？", "Why must this learning project record an upstream commit instead of saying latest?"), answer: bi("DeepSeek Harness 处于 developer preview，接口和事件会破坏性变化；commit 让每条解读都有可复核的事实基线。", "DeepSeek Harness is in developer preview and contracts can break. A commit gives every explanation an auditable factual baseline.") },
  },
];

export const layerFor = (id: string) => layers.find((item) => item.id === id) ?? layers[0];

export const nav = {
  zh: { architecture: "架构图谱", compare: "设计对比", timeline: "学习路径", docs: "源码索引", github: "GitHub", start: "开始深读", chapters: "章", analogy: "先建立直觉", mechanism: "机制拆解", takeaway: "关键不变量", source: "源码锚点", prev: "上一章", next: "下一章" },
  en: { architecture: "Architecture", compare: "Design compare", timeline: "Learning path", docs: "Source index", github: "GitHub", start: "Start deep dive", chapters: "chapters", analogy: "Build intuition", mechanism: "Mechanism", takeaway: "Core invariants", source: "Source anchors", prev: "Previous", next: "Next" },
};

export const architecturePlanes = [
  { id: "composition", icon: "layers", title: bi("组合平面", "Composition plane"), tag: "Profile · Bundle · Patch · Cordis", description: bi("决定哪些插件存在、如何分层以及卸载时如何回收。", "Decides which plugins exist, how they layer, and how they unwind."), packages: ["boot", "bundle", "preset", "extensions"] },
  { id: "spine", icon: "route", title: bi("Agent 主干", "Agent spine"), tag: "Inbox · Turn · Step · Request", description: bi("认领输入、组装请求、调用模型、结算工具债务。", "Claims input, assembles requests, calls models, and settles tool debt."), packages: ["core/agent", "core/agent-loop", "core/session", "llm"] },
  { id: "capability", icon: "blocks", title: bi("能力平面", "Capability plane"), tag: "Service Definition · Provider · Consumer", description: bi("让文件、进程、模型、委派与 Web 能力可替换。", "Makes files, processes, models, delegation, and Web replaceable."), packages: ["fs", "subprocess", "sandbox", "subagent", "web"] },
  { id: "control", icon: "shield", title: bi("控制平面", "Control plane"), tag: "Event · Guard · Approval · Policy", description: bi("在公开扩展点改写、拒绝、观察和审计运行。", "Transforms, denies, observes, and audits execution at public seams."), packages: ["guard", "interaction", "hooks", "feedback"] },
  { id: "truth", icon: "database", title: bi("事实平面", "Truth plane"), tag: "SessionEvent · Persistence · Projection", description: bi("用仅追加事实支持回放、恢复、搜索、计量与 UI。", "Uses append-only facts for replay, recovery, search, metering, and UI."), packages: ["session", "storage", "session-query", "compaction"] },
  { id: "surface", icon: "panels", title: bi("表面平面", "Surface plane"), tag: "Web · CLI · ACP · SDK · API", description: bi("适配协议和交互，但不复制 Agent 业务真源。", "Adapts protocols and interaction without copying agent truth."), packages: ["host", "client", "acp", "sdk", "apps/web"] },
];
