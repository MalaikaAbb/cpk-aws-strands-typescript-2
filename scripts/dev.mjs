// Starts the agent server (:8000) and the Next.js frontend (:3000) together.
// Root `npm run dev` loads ./.env first, so both processes inherit it.
import concurrently from "concurrently";

const { result } = concurrently(
  [
    { name: "agent", command: "npm run dev -w agent", prefixColor: "magenta" },
    { name: "web", command: "npm run dev -w frontend", prefixColor: "cyan" },
  ],
  { killOthersOn: ["failure"] },
);
result.catch(() => process.exit(1));
