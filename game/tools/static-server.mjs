import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { exec } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../outputs/StarMinerWeb');
const PORT = Number(process.env.PORT || 4173);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
};

if (!fs.existsSync(path.join(ROOT, 'index.html'))) {
  console.error('未找到构建产物：' + ROOT);
  console.error('请先在 game 目录运行 npm run build 生成网站文件。');
  process.exit(1);
}

function openBrowser(url) {
  if (process.env.STARMINER_NO_OPEN === '1') return;
  exec(`start "" "${url}"`, (err) => {
    if (err) console.log('（已尝试自动打开浏览器，可手动访问 ' + url + '）');
  });
}

// ---------- 端口占用自愈 ----------
const MAX_PORT_RETRIES = 3;
let portRetryCount = 0;

function findAndKillPortHolder(port) {
  return new Promise((resolve) => {
    const isWin = process.platform === 'win32';
    const findCmd = isWin
      ? `netstat -ano | findstr :${port} | findstr LISTENING`
      : `lsof -ti :${port} -sTCP:LISTEN 2>/dev/null`;
    exec(findCmd, (err, stdout) => {
      if (err || !stdout || !stdout.trim()) {
        resolve({ killed: false, pids: [] });
        return;
      }
      const pids = new Set();
      const lines = stdout.trim().split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        if (isWin) {
          const parts = trimmed.split(/\s+/);
          const pid = parts[parts.length - 1];
          if (pid && /^\d+$/.test(pid) && pid !== String(process.pid)) {
            pids.add(pid);
          }
        } else {
          if (/^\d+$/.test(trimmed) && trimmed !== String(process.pid)) {
            pids.add(trimmed);
          }
        }
      }
      if (pids.size === 0) {
        resolve({ killed: false, pids: [] });
        return;
      }
      const pidList = [...pids];
      let killedCount = 0;
      let pending = pidList.length;
      pidList.forEach((pid) => {
        const killCmd = isWin
          ? `taskkill /F /PID ${pid}`
          : `kill -9 ${pid}`;
        exec(killCmd, (kerr) => {
          if (!kerr) {
            killedCount++;
            console.log(`  已终止占用进程 PID ${pid}`);
          } else {
            console.log(`  终止进程 PID ${pid} 失败`);
          }
          pending--;
          if (pending === 0) {
            resolve({ killed: killedCount > 0, pids: pidList });
          }
        });
      });
    });
  });
}

function printManualFallback(port) {
  console.error('');
  console.error(`无法自动释放端口 ${port}，请手动处理后重试：`);
  console.error('  1. 关闭所有之前双击「一键启动.bat」打开的控制台窗口');
  if (process.platform === 'win32') {
    console.error('  2. Win+R 输入 cmd 回车，运行: taskkill /F /IM node.exe');
  } else {
    console.error(`  2. 查找并终止占用 ${port} 端口的进程`);
  }
  console.error('  3. 重新双击「一键启动.bat」');
}

function handleRequest(req, res) {
  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
  } catch {
    res.writeHead(400);
    res.end('Bad Request');
    return;
  }
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  let filePath = path.normalize(path.join(ROOT, urlPath));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isDirectory()) filePath = path.join(filePath, 'index.html');
    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      res.end(data);
    });
  });
}

function startListening() {
  // Each attempt creates a fresh server to avoid stale handle state
  const server = http.createServer(handleRequest);

  server.on('error', async (err) => {
    if (err.code !== 'EADDRINUSE') {
      console.error('服务器启动失败：', err.message);
      process.exit(1);
      return;
    }
    portRetryCount++;
    if (portRetryCount > MAX_PORT_RETRIES) {
      console.error(`端口 ${PORT} 仍被占用，已重试 ${MAX_PORT_RETRIES} 次仍无法启动。`);
      printManualFallback(PORT);
      process.exit(1);
      return;
    }
    console.log(`端口 ${PORT} 已被占用，尝试终止占用进程（第 ${portRetryCount}/${MAX_PORT_RETRIES} 次）...`);
    const result = await findAndKillPortHolder(PORT);
    if (result.killed) {
      console.log('占用进程已终止，等待端口释放后重新启动...');
      setTimeout(startListening, 1000);
    } else {
      printManualFallback(PORT);
      process.exit(1);
    }
  });

  server.listen(PORT, '0.0.0.0', () => {
    const ips = [];
    for (const name of Object.keys(os.networkInterfaces())) {
      for (const net of os.networkInterfaces()[name] || []) {
        if (net.family === 'IPv4' && !net.internal) ips.push(net.address);
      }
    }
    console.log('==============================================');
    console.log('  《星际矿站》已启动');
    console.log('  本机访问:   http://localhost:' + PORT + '/');
    for (const ip of ips) {
      console.log('  手机/局域网: http://' + ip + ':' + PORT + '/');
    }
    console.log('  手机无法访问时：先运行一次「开放防火墙端口.bat」');
    console.log('  关闭本窗口即停止服务器');
    console.log('==============================================');
    openBrowser(`http://localhost:${PORT}/`);
  });
}

startListening();
