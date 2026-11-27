// Copied from the demo (src/app/demos/declarative-json-render/types.ts): json-render-renderer.tsx imports `JsonRenderSpec` from "./types", which the docs never give.
export interface JsonRenderSpec {
  root: string;
  elements: Record<
    string,
    { type: string; props: Record<string, unknown>; children?: string[] }
  >;
}
