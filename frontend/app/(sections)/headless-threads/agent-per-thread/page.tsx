"use client";
// Docs: headless-threads -> "Driving one agent per thread" (useAgent snippet, no file named).
// The docs give only the hook call. Host: one ThreadAgent per thread from useThreads. It renders
// nothing, because the docs give no UI; this route only checks that the snippet compiles and mounts.
// Adaptation: runtimeAgentId "default" -> "headless-threads". Imports completed: useAgent, useThreads.
import { useAgent, useThreads } from "@copilotkit/react-core/v2";

function ThreadAgent({ threadId }: { threadId: string }) {
  const { agent } = useAgent({
    agentId: `chat-${threadId}`, // local id, unique per mounted thread
    runtimeAgentId: "headless-threads", // the one runtime agent they all route to
    threadId, // the thread this instance is pinned to
  });

  return null;
}

export default function Page() {
  const { threads } = useThreads({ agentId: "headless-threads" });

  return (
    <>
      {threads.map((thread) => (
        <ThreadAgent key={thread.id} threadId={thread.id} />
      ))}
    </>
  );
}
