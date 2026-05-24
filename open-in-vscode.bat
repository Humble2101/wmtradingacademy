@echo off
:: ─────────────────────────────────────────────
::  Open WM Trading Academy in VS Code
::  Windows launcher
:: ─────────────────────────────────────────────

echo Opening WM Trading Academy in VS Code...
echo Path: %~dp0

:: Use the 'code' CLI installed with VS Code
where code >nul 2>&1
if %ERRORLEVEL% == 0 (
    code "%~dp0"
    echo VS Code is launching...
) else (
    echo.
    echo  WARNING: 'code' command not found.
    echo  Make sure VS Code is installed and added to PATH.
    echo  In VS Code: Ctrl+Shift+P ^> "Shell Command: Install code command in PATH"
    echo.
    echo  Or open VS Code manually and choose:
    echo  File ^> Open Folder ^> %~dp0
    pause
)
