// Docs: headless-threads -> "List and manage threads with useThreads" (ThreadSidebar.tsx).
// Adaptations: agentId "default" -> "headless-threads"; `export` added so App.tsx can import it.
import { useThreads } from "@copilotkit/react-core/v2";

export function ThreadSidebar({
  onSelectThread,
}: {
  onSelectThread: (threadId: string) => void;
}) {
  const {
    threads,
    isLoading,
    renameThread,
    archiveThread,
    deleteThread,
  } = useThreads({ agentId: "headless-threads" });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {threads.map((thread) => (
        <div key={thread.id}>
          <button onClick={() => onSelectThread(thread.id)}>
            {thread.name ?? "New conversation"}
          </button>
          <button onClick={() => renameThread(thread.id, "Renamed")}>
            Rename
          </button>
          <button onClick={() => archiveThread(thread.id)}>
            Archive
          </button>
        </div>
      ))}
    </div>
  );
}
