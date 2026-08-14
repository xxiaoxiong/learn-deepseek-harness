# DeepSeek Harness architecture primer

DeepSeek Harness is a Cordis plugin tree composed at boot. Runtime facts are appended to a session log; replaceable capabilities cooperate through services and typed event seams.

The six useful layers are: surfaces, composition, agent spine, capabilities, session truth, and control. The three invariants worth remembering are:

1. Core features are plugins too—extend beside the loop rather than patching it.
2. Model-visible facts must be reconstructable from the session log.
3. Registrations must be reversible so unload and hot replacement stay clean.

Recommended order: `architecture.md` → `cordis-primer.md` → Session → System Prompt → Agent Loop → Tool Pipeline → Extension Cookbook.

