// Demo: showcase/shared/typescript/tools/generate-a2ui.ts — only the `A2UIOperation` type used by search-flights.ts.
export type A2UIOperation =
  | { version: "v0.9"; createSurface: { surfaceId: string; catalogId: string } }
  | {
      version: "v0.9";
      updateComponents: {
        surfaceId: string;
        components: Array<Record<string, unknown>>;
      };
    }
  | {
      version: "v0.9";
      updateDataModel: {
        surfaceId: string;
        path: string;
        value: Record<string, unknown>;
      };
    };
