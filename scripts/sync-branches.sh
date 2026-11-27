#!/usr/bin/env bash
# After changing shared code on main, merge main into every section branch.
# Usage: scripts/sync-branches.sh        (run from the repo root, clean tree)
set -euo pipefail
cd "$(dirname "$0")/.."
start="$(git branch --show-current)"
while read -r slug _; do
  git show-ref --verify --quiet "refs/heads/$slug" || continue
  echo "== $slug"
  git switch -q "$slug"
  git merge --no-edit main
done < scripts/sections.txt
git switch -q "$start"
