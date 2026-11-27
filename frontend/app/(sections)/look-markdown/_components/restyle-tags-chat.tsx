"use client";
// Docs: custom-look-and-feel/markdown -> "Restyle individual HTML tags" (page.tsx), verbatim.
// Moved to _components/ (rendered by ../page.tsx) so the page file has only a default export.

import { CopilotChat } from "@copilotkit/react-core/v2";

export function Chat() {
  return (
    <CopilotChat
      messageView={{
        assistantMessage: {
          markdownRenderer: {
            components: {
              a: ({ node, children, ...props }) => (
                <a {...props} className="my-link">
                  {children}
                </a>
              ),
              h2: ({ node, children, ...props }) => (
                <h2 {...props} className="my-heading">
                  {children}
                </h2>
              ),
            },
          },
        },
      }}
    />
  );
}
