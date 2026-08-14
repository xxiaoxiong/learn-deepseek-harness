type Execution = { name: string; input: unknown };
type Result = { ok: boolean; text: string };
type Gate = (exec: Execution, next: () => Promise<Result>) => Promise<Result>;

const policyGate: Gate = async (exec, next) => {
  if (exec.name === "delete_everything") return { ok: false, text: "Denied by policy" };
  return next();
};

const metricsGate: Gate = async (exec, next) => {
  const started = performance.now();
  const result = await next();
  console.log(exec.name, `${performance.now() - started}ms`, result.ok);
  return result;
};

async function dispatch(exec: Execution): Promise<Result> {
  return { ok: true, text: `Executed ${exec.name}` };
}

export async function execute(exec: Execution) {
  const gates = [policyGate, metricsGate];
  const run = (index: number): Promise<Result> =>
    gates[index] ? gates[index](exec, () => run(index + 1)) : dispatch(exec);
  return run(0);
}

