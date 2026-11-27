// Docs: headless-threads -> "Add pagination for large thread lists" (ThreadSidebar.tsx).
// The docs give a fragment for ThreadSidebar.tsx: the useThreads call with `limit` and the
// "Load more" JSX. Applied to the ThreadSidebar from "List and manage threads": its useThreads
// call gains `limit: 20` and the pagination fields, and the button goes after the list.
// Adaptation: agentId "default" -> "headless-threads".
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
    hasMoreThreads,
    isFetchingMoreThreads,
    fetchMoreThreads,
  } = useThreads({
    agentId: "headless-threads",
    limit: 20,
  });

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
      {hasMoreThreads && (
        <button
          onClick={fetchMoreThreads}
          disabled={isFetchingMoreThreads}
        >
          {isFetchingMoreThreads ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
