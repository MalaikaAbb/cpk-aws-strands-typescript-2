#!/usr/bin/env bash
# Merge every section branch (scripts/sections.txt) into main.
# Usage: scripts/merge-all.sh            (run from the repo root, on main)
set -euo pipefail
cd "$(dirname "$0")/.."
[ "$(git branch --show-current)" = "main" ] || { echo "Switch to main first"; exit 1; }
while read -r slug _; do
  if git show-ref --verify --quiet "refs/heads/$slug"; then
    echo "== merging $slug"
    git merge --no-edit "$slug"
  else
    echo "-- skip $slug (no branch)"
  fi
done < scripts/sections.txt
