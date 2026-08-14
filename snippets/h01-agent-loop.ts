/**
 * 一个刻意缩小的 Turn / Step 教学实现。
 * 真正的 DSH 会把消息、工具调用和边界写入 SessionEvent 日志。
 */
type Message = { role: "user" | "assistant" | "tool"; content: string };
type Reply = { text?: string; tool?: { name: string; input: unknown } };

const tools: Record<string, (input: unknown) => Promise<string>> = {
  clock: async () => new Date().toISOString(),
};

async function fakeModel(history: Message[]): Promise<Reply> {
  const hasToolResult = history.at(-1)?.role === "tool";
  return hasToolResult
    ? { text: `根据工具结果：${history.at(-1)?.content}` }
    : { tool: { name: "clock", input: {} } };
}

export async function runTurn(input: string) {
  const history: Message[] = [{ role: "user", content: input }];
  for (let step = 1; ; step += 1) {
    console.log(`step/start #${step}`);
    const reply = await fakeModel(history);
    if (!reply.tool) {
      console.log("turn/end", reply.text);
      return reply.text;
    }
    const result = await tools[reply.tool.name](reply.tool.input);
    history.push({ role: "assistant", content: `call:${reply.tool.name}` });
    history.push({ role: "tool", content: result });
  }
}

runTurn("现在几点？");

