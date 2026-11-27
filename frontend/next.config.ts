import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // create-next-app@latest (Next 16) enables cacheComponents (and partialPrefetching,
  // which requires it) by default.
  // Disabled: with it on, <CopilotKit> raises "unstable value randomUUID() in a
  // Client Component" on every section page. See README "Scaffold notes".
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
