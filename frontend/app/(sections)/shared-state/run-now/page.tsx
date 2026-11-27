"use client";
// Docs: shared-state -> "Writing agent state": run the agent right away after setState
// (`copilotkit.runAgent({ agent })` with a hint message; no file named).
// Host: the docs give only the handler body. It runs from a minimal language <select> (allowed
// addition), with `agent` from useAgent and <CopilotSidebar /> to see the run. Imports completed:
// useAgent, useCopilotKit, CopilotSidebar. Adaptation: agentId -> "shared-state".
import {
  CopilotSidebar,
  useAgent,
  useCopilotKit,
} from "@copilotkit/react-core/v2";

export default function Page() {
  const { agent } = useAgent({ agentId: "shared-state" });
  const { copilotkit } = useCopilotKit();

  const onLanguageChange = async (newLanguage: string) => {
    agent.setState({ language: newLanguage });
    agent.addMessage({
      id: crypto.randomUUID(),
      role: "user",
      content: `the language has been updated to ${newLanguage}`,
    });
    await copilotkit.runAgent({ agent });
  };

  return (
    <main>
      <select defaultValue="English" onChange={(e) => onLanguageChange(e.target.value)}>
        <option>English</option>
        <option>Spanish</option>
        <option>French</option>
      </select>
      <CopilotSidebar />
    </main>
  );
}
