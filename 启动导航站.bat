@echo off
cd /d "%~dp0"
start /b cmd /c node_modules\.bin\serve . -p 3000 >/dev/null 2>&1
timeout /t 5 /nobreak >nul
start "" "http://localhost:3000/"