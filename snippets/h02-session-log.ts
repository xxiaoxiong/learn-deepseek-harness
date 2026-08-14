/** Append-only truth + derived view. */
type Event =
  | { type: "turn/start" }
  | { type: "user/message"; text: string }
  | { type: "assistant/chunk"; text: string }
  | { type: "turn/end" };

class SessionLog {
  #events: Event[] = [];
  #listeners = new Set<(event: Event) => void>();

  append(event: Event) {
    this.#events.push(Object.freeze(event)); // commit first
    for (const listener of this.#listeners) queueMicrotask(() => listener(event));
  }

  onEvent(listener: (event: Event) => void) {
    this.#listeners.add(listener);
    return () => this.#listeners.delete(listener); // reversible effect
  }

  transcript() {
    return this.#events.flatMap((event) =>
      event.type === "user/message" || event.type === "assistant/chunk" ? [event.text] : [],
    );
  }
}

const session = new SessionLog();
const dispose = session.onEvent((event) => console.log("UI projection:", event.type));
session.append({ type: "turn/start" });
session.append({ type: "user/message", text: "解释插件" });
session.append({ type: "assistant/chunk", text: "插件是可装卸的能力单元。" });
session.append({ type: "turn/end" });
dispose();

