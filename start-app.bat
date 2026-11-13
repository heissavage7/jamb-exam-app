@echo off
echo ===================================================
echo           STARTING JAMB CBT EXAM PREP APP
echo ===================================================
echo.
cd /d "%~dp0"
echo Starting development server on http://localhost:3000 ...
start http://localhost:3000
npm run dev
pause
