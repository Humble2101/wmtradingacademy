#!/bin/bash
# ─────────────────────────────────────────────
#  Open WM Trading Academy in VS Code
#  Mac / Linux launcher
# ─────────────────────────────────────────────

# Get the directory this script lives in
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "📂 Opening WM Trading Academy in VS Code..."
echo "   Path: $DIR"

# Try to open with the 'code' CLI
if command -v code &>/dev/null; then
  code "$DIR"
  echo "✅ Opened! VS Code should be launching..."
else
  echo ""
  echo "⚠️  'code' command not found."
  echo "   Make sure VS Code is installed and the 'code' CLI is on your PATH."
  echo "   In VS Code: Cmd/Ctrl+Shift+P → 'Shell Command: Install code command in PATH'"
  echo ""
  echo "   Or open VS Code manually and choose:"
  echo "   File → Open Folder → $DIR"
fi
