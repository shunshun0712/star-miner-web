@echo off
chcp 65001 >nul
title Star Miner - One Click Launcher
cd /d "%~dp0game"

set "NODE_CMD=node"
where node >nul 2>&1
if errorlevel 1 goto nonode

:run
echo Starting Star Miner local server and opening browser...
"%NODE_CMD%" "tools\static-server.mjs"
echo.
echo Server stopped.
pause
exit /b

:nonode
echo [ERROR] Node.js not found. Install Node.js first: https://nodejs.org
pause