@echo off
chcp 65001 >nul
title 星际矿站 - 一键启动
setlocal

echo.
echo ============================================================
echo   星际矿站 一键启动
echo   自动检测环境 ^| 安装依赖 ^| 构建产物 ^| 启动服务器
echo ============================================================
echo.

REM ---------- [1/4] 检测 Node.js ----------
echo [1/4] 正在检查 Node.js 环境...
where node >nul 2>&1
if errorlevel 1 goto :no_node
for /f "delims=" %%v in ('node -v') do echo       已检测到 Node.js 版本：%%v
echo.
goto :check_deps

:no_node
echo.
echo [错误] 未检测到 Node.js，请先安装。
echo 即将打开下载页：https://nodejs.org
echo 安装完成后请重新双击本文件。
start "" "https://nodejs.org"
echo.
pause
exit /b 1

REM ---------- [2/4] 安装依赖 ----------
:check_deps
echo [2/4] 正在检查依赖...
cd /d "%~dp0game"
if exist "node_modules" goto :deps_ok
echo       未检测到 node_modules，开始安装依赖（首次较慢，请耐心等待）...
call npm install
if errorlevel 1 goto :install_fail
:deps_ok
echo       依赖就绪。
echo.

REM ---------- [3/4] 构建产物 ----------
echo [3/4] 正在构建网站，请稍候...
call npm run build
if errorlevel 1 goto :build_fail
echo       构建完成。
echo.

REM ---------- [4/4] 启动本地服务器 ----------
echo [4/4] 正在启动本地服务器...
cd /d "%~dp0game"
echo       浏览器将自动打开 http://localhost:4173
echo       如未自动打开，请手动访问该地址。
echo       关闭本窗口即可停止服务器。
echo.
node "tools\static-server.mjs"
echo.
echo 服务器已停止。
pause
exit /b 0

:install_fail
echo.
echo [错误] 依赖安装失败。
echo 请检查网络连接，或在 game 目录手动运行 npm install 后重试。
echo.
pause
exit /b 1

:build_fail
echo.
echo [错误] 构建失败。
echo 请在 game 目录手动运行 npm run build 排查错误信息。
echo.
pause
exit /b 1
