@echo off
chcp 65001 >nul
title 星际矿站 · 一键启动
setlocal

echo [1;36m星际矿站[0m  [90m一键启动[0m
echo.

echo [90m[1/4][0m Node.js
where node >nul 2>&1
if errorlevel 1 goto :no_node
for /f "delims=" %%v in ('node -v') do echo   [32m✓[0m %%v
goto :check_deps

:no_node
echo   [31m✗ 未安装[0m  下载 [4mhttps://nodejs.org[0m 后重试
start "" "https://nodejs.org"
pause & exit /b 1

:check_deps
echo [90m[2/4][0m 依赖
cd /d "%~dp0game"
if exist "node_modules" goto :deps_ok
echo   安装中（首次较慢）...
call npm install
if errorlevel 1 goto :install_fail
:deps_ok
echo   [32m✓ 就绪[0m

echo [90m[3/4][0m 构建
call npm run build
if errorlevel 1 goto :build_fail
echo   [32m✓ 完成[0m

echo [90m[4/4][0m 启动 [36mhttp://localhost:4173[0m
echo   关闭窗口即停止服务
echo.
cd /d "%~dp0game"
node "tools\static-server.mjs"
echo.
echo [90m服务已停止[0m
pause
exit /b 0

:install_fail
echo   [31m✗ 安装失败[0m  检查网络或手动 npm install
pause & exit /b 1

:build_fail
echo   [31m✗ 构建失败[0m  手动 npm run build 排查
pause & exit /b 1
