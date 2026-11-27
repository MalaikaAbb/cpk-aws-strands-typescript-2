// Demo code: `forwardingFetch` (and the two private pieces it uses) from showcase
// src/agent/header-forwarding.ts. Needed by the demo's `createModel` (model-factory.ts).

import { AsyncLocalStorage } from "node:async_hooks";

const headersStorage = new AsyncLocalStorage<Record<string, string>>();

/** Return the ALS-bound headers (or an empty map when not in scope). */
function getForwardedHeaders(): Record<string, string> {
  return headersStorage.getStore() ?? {};
}

/**
 * `clientConfig.fetch` for the strands `OpenAIModel`. Injects the ALS-bound
 * inbound x-* headers (incl. `X-AIMock-Strict`, `x-test-id`, `x-aimock-context`,
 * `x-diag-*`) onto every outbound OpenAI call. Byte-identical to a plain
 * `fetch` when no x-* are in scope, so demo traffic is unaffected.
 *
 * Precedence: uses `if (!merged.has(k)) merged.set(k, v)` so it never clobbers a
 * header the OpenAI SDK already set from `clientConfig.defaultHeaders` (the
 * static `x-aimock-context` slug stays authoritative); inbound `X-AIMock-Strict`
 * / `x-test-id` / `x-diag-*` are ADDED.
 */
export const forwardingFetch: typeof fetch = (input, init) => {
  const forwarded = getForwardedHeaders();
  if (Object.keys(forwarded).length === 0) {
    return fetch(input, init);
  }
  const merged = new Headers(init?.headers);
  for (const [k, v] of Object.entries(forwarded)) {
    if (!merged.has(k)) merged.set(k, v);
  }
  return fetch(input, { ...init, headers: merged });
};
