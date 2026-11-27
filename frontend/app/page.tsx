// SHARED — do not edit on section branches.
// Lists every section present on the current branch (folders in app/(sections)/).
import { readdirSync } from "node:fs";
import path from "node:path";
import Link from "next/link";

function listSections(): string[] {
  const dir = path.join(process.cwd(), "app", "(sections)");
  try {
    return readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
      .map((d) => d.name)
      .sort();
  } catch {
    return [];
  }
}

export default function Home() {
  const sections = listSections();
  return (
    <main style={{ padding: 32, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Sections on this branch</h1>
      {sections.length === 0 ? (
        <p>No sections on this branch yet.</p>
      ) : (
        <ul style={{ lineHeight: 1.9 }}>
          {sections.map((s) => (
            <li key={s}>
              <Link href={`/${s}`} style={{ textDecoration: "underline" }}>
                /{s}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
