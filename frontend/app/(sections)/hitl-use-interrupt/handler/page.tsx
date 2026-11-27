"use client";
// Docs: human-in-the-loop/useInterrupt -> "Preprocess with `handler`".
// The docs give a bare hook call: it is wrapped in a component (HandlerInterrupt) and rendered
// in the minimal ExampleShell. Adaptation: agentId "gen-ui-interrupt" -> "hitl-use-interrupt".
// Added import: useInterrupt. LEFT BROKEN: `lookupUserDepartment` and `RequestAccessCard` are
// not defined in the docs or the demo.
import { useInterrupt } from "@copilotkit/react-core/v2";
import { ExampleShell } from "../_components/example-shell";

function HandlerInterrupt() {
  useInterrupt({
    agentId: "hitl-use-interrupt",
    handler: async ({ event, resolve }) => {
      const value =
        typeof event.value === "string" ? JSON.parse(event.value) : event.value;
      const dept = await lookupUserDepartment();
      if (value.accessDepartment === dept || dept === "admin") {
        resolve({ code: "AUTH_BY_DEPARTMENT" });
        return; // agent will resume; card unmounts when the run starts
      }
      return { dept };
    },
    render: ({ result, event, resolve }) => (
      <RequestAccessCard
        dept={result?.dept}
        onRequest={() => resolve({ code: "REQUEST_AUTH" })}
        onCancel={() => resolve({ code: "CANCEL" })}
      />
    ),
  });

  return null;
}

export default function Page() {
  return (
    <ExampleShell>
      <HandlerInterrupt />
    </ExampleShell>
  );
}
