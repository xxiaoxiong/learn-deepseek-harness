type Disposer = () => void;
type Plugin = (ctx: Context) => void;

class Context {
  #effects: Disposer[] = [];
  #services = new Map<string, unknown>();

  service(name: string, value: unknown) {
    this.#services.set(name, value);
    const dispose = () => this.#services.delete(name);
    this.#effects.push(dispose);
    return dispose;
  }

  mount(plugin: Plugin) {
    const start = this.#effects.length;
    plugin(this);
    return () => this.#effects.splice(start).reverse().forEach((dispose) => dispose());
  }
}

const ctx = new Context();
const unmount = ctx.mount((child) => {
  child.service("clock", { now: () => Date.now() });
  child.service("greeter", { greet: (name: string) => `Hi ${name}` });
});

unmount(); // 两项注册按相反顺序撤销，不留下“幽灵服务”

