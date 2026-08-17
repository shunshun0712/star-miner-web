import * as THREE from 'three';

function makeCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas 2d context unavailable');
  return [canvas, ctx];
}

function seededRandom(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function createSkyboxTexture(): THREE.CanvasTexture {
  const w = 2048;
  const h = 1024;
  const [canvas, ctx] = makeCanvas(w, h);
  const rand = seededRandom(20260807);

  // 深空渐变底
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#02040c');
  grad.addColorStop(0.45, '#060d1f');
  grad.addColorStop(0.75, '#0a1428');
  grad.addColorStop(1, '#03050d');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // 星云光斑（青 / 紫 / 蓝）
  const nebulae = [
    { x: 0.22, y: 0.34, r: 0.22, color: 'rgba(56,217,232,0.10)' },
    { x: 0.38, y: 0.62, r: 0.16, color: 'rgba(160,107,255,0.10)' },
    { x: 0.58, y: 0.28, r: 0.2, color: 'rgba(56,120,255,0.09)' },
    { x: 0.74, y: 0.55, r: 0.18, color: 'rgba(160,107,255,0.08)' },
    { x: 0.9, y: 0.38, r: 0.14, color: 'rgba(56,217,232,0.09)' },
    { x: 0.5, y: 0.82, r: 0.15, color: 'rgba(39,75,143,0.10)' },
  ];
  for (const n of nebulae) {
    const g = ctx.createRadialGradient(n.x * w, n.y * h, 0, n.x * w, n.y * h, n.r * w);
    g.addColorStop(0, n.color);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  // 星点
  for (let i = 0; i < 900; i += 1) {
    const x = rand() * w;
    const y = rand() * h;
    const r = 0.6 + rand() * 1.6;
    const tint = rand();
    const color = tint < 0.6 ? '255,255,255' : tint < 0.8 ? '180,220,255' : '255,220,180';
    const a = 0.35 + rand() * 0.6;
    ctx.fillStyle = `rgba(${color},${a})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // 少量亮星 + 光晕
  for (let i = 0; i < 26; i += 1) {
    const x = rand() * w;
    const y = rand() * h;
    const r = 2 + rand() * 2.5;
    const color = rand() < 0.5 ? '56,217,232' : '255,255,255';
    const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
    glow.addColorStop(0, `rgba(${color},0.9)`);
    glow.addColorStop(0.25, `rgba(${color},0.35)`);
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(x - r * 6, y - r * 6, r * 12, r * 12);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createGroundTexture(): THREE.CanvasTexture {
  const size = 1024;
  const [canvas, ctx] = makeCanvas(size, size);
  const rand = seededRandom(19860713);

  ctx.fillStyle = '#1a2231';
  ctx.fillRect(0, 0, size, size);

  // 岩石噪点
  for (let i = 0; i < 12000; i += 1) {
    const x = rand() * size;
    const y = rand() * size;
    const v = rand();
    const shade = v < 0.5 ? 18 + rand() * 14 : 34 + rand() * 18;
    ctx.fillStyle = `rgb(${shade},${shade + 4},${shade + 10})`;
    ctx.fillRect(x, y, 1 + rand() * 2, 1 + rand() * 2);
  }

  // 陨石坑：暗底 + 亮缘
  for (let i = 0; i < 46; i += 1) {
    const x = rand() * size;
    const y = rand() * size;
    const r = 8 + rand() * 34;
    ctx.fillStyle = 'rgba(10,14,24,0.85)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(110,126,150,0.5)';
    ctx.lineWidth = 2 + rand() * 3;
    ctx.beginPath();
    ctx.arc(x, y, r * 0.82, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 裂纹
  for (let i = 0; i < 30; i += 1) {
    let x = rand() * size;
    let y = rand() * size;
    ctx.strokeStyle = 'rgba(8,11,18,0.8)';
    ctx.lineWidth = 1 + rand() * 1.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const segs = 4 + Math.floor(rand() * 6);
    for (let s = 0; s < segs; s += 1) {
      x += (rand() - 0.5) * 70;
      y += (rand() - 0.5) * 70;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  return tex;
}

export function createHullTexture(): THREE.CanvasTexture {
  const size = 1024;
  const [canvas, ctx] = makeCanvas(size, size);
  const rand = seededRandom(991023);

  ctx.fillStyle = '#232d3d';
  ctx.fillRect(0, 0, size, size);

  // 面板网格
  ctx.strokeStyle = '#2f3d53';
  ctx.lineWidth = 3;
  const cell = 128;
  for (let x = 0; x <= size; x += cell) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, size);
    ctx.stroke();
  }
  for (let y = 0; y <= size; y += cell) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }

  // 面板内衬与渐变
  for (let gx = 0; gx < size / cell; gx += 1) {
    for (let gy = 0; gy < size / cell; gy += 1) {
      const x = gx * cell;
      const y = gy * cell;
      const light = rand();
      const g = ctx.createLinearGradient(x, y, x, y + cell);
      g.addColorStop(0, `rgba(255,255,255,${0.03 + light * 0.03})`);
      g.addColorStop(1, 'rgba(0,0,0,0.05)');
      ctx.fillStyle = g;
      ctx.fillRect(x + 4, y + 4, cell - 8, cell - 8);
    }
  }

  // 铆钉
  ctx.fillStyle = '#4a5a74';
  for (let i = 0; i < 520; i += 1) {
    const x = 8 + rand() * (size - 16);
    const y = 8 + rand() * (size - 16);
    ctx.beginPath();
    ctx.arc(x, y, 2 + rand() * 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 能量槽（青色 / 紫色 / 橙色少量）
  for (let i = 0; i < 10; i += 1) {
    const horizontal = rand() < 0.5;
    const x = rand() * size;
    const y = rand() * size;
    const len = 100 + rand() * 180;
    const pick = rand();
    const color = pick < 0.5 ? '56,217,232' : pick < 0.8 ? '160,107,255' : '255,159,67';
    ctx.strokeStyle = `rgba(${color},0.55)`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    if (horizontal) {
      ctx.moveTo(x, y);
      ctx.lineTo(x + len, y);
    } else {
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + len);
    }
    ctx.stroke();
  }

  // 磨损
  for (let i = 0; i < 300; i += 1) {
    const x = rand() * size;
    const y = rand() * size;
    ctx.fillStyle = `rgba(10,14,22,${0.1 + rand() * 0.2})`;
    ctx.fillRect(x, y, 2 + rand() * 8, 1 + rand() * 3);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 1);
  return tex;
}

export interface MetalTextureOptions {
  base: string;
  panelLine: string;
  accent?: string;
  accentChance?: number;
  seed?: number;
}

/** 程序化金属贴图：面板网格 + 铆钉 + 3 种尺度磨损（大斑块 / 中划痕 / 细颗粒）+ 可选能量槽。 */
export function createMetalTexture(opts: MetalTextureOptions): THREE.CanvasTexture {
  const size = 1024;
  const [canvas, ctx] = makeCanvas(size, size);
  const rand = seededRandom(opts.seed ?? 991023);

  // 1) 基础底色
  ctx.fillStyle = opts.base;
  ctx.fillRect(0, 0, size, size);

  // 2) 大尺度斑块（明暗差异）
  for (let i = 0; i < 48; i += 1) {
    const x = rand() * size;
    const y = rand() * size;
    const r = 90 + rand() * 180;
    const dark = rand() < 0.55;
    const a = 0.03 + rand() * 0.05;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, dark ? `rgba(0,0,0,${a})` : `rgba(255,255,255,${a * 0.7})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }

  // 3) 面板网格（128px 单元格）
  ctx.strokeStyle = opts.panelLine;
  ctx.lineWidth = 3;
  const cell = 128;
  for (let x = 0; x <= size; x += cell) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, size);
    ctx.stroke();
  }
  for (let y = 0; y <= size; y += cell) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }

  // 4) 面板内衬渐变 + 四角铆钉
  for (let gx = 0; gx < size / cell; gx += 1) {
    for (let gy = 0; gy < size / cell; gy += 1) {
      const x = gx * cell;
      const y = gy * cell;
      const g = ctx.createLinearGradient(x, y, x, y + cell);
      g.addColorStop(0, `rgba(255,255,255,${0.025 + rand() * 0.025})`);
      g.addColorStop(1, 'rgba(0,0,0,0.06)');
      ctx.fillStyle = g;
      ctx.fillRect(x + 4, y + 4, cell - 8, cell - 8);
      ctx.fillStyle = '#5a6270';
      for (const [cx, cy] of [
        [x + 10, y + 10],
        [x + cell - 10, y + 10],
        [x + 10, y + cell - 10],
        [x + cell - 10, y + cell - 10],
      ] as const) {
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // 5) 中尺度划痕
  ctx.strokeStyle = 'rgba(0,0,0,0.30)';
  for (let i = 0; i < 120; i += 1) {
    const x = rand() * size;
    const y = rand() * size;
    ctx.lineWidth = 1 + rand() * 1.2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (rand() - 0.5) * 70, y + (rand() - 0.5) * 70);
    ctx.stroke();
  }

  // 6) 细颗粒（第三尺度）
  for (let i = 0; i < 9000; i += 1) {
    const v = rand();
    ctx.fillStyle = v < 0.5 ? `rgba(0,0,0,${0.05 + rand() * 0.08})` : `rgba(255,255,255,${0.02 + rand() * 0.04})`;
    ctx.fillRect(rand() * size, rand() * size, 1 + rand() * 1.5, 1 + rand() * 1.5);
  }

  // 7) 可选能量槽（accent 高亮）
  if (opts.accent) {
    const chance = opts.accentChance ?? 0.2;
    for (let i = 0; i < 14; i += 1) {
      if (rand() > chance) continue;
      const horizontal = rand() < 0.5;
      const x = rand() * size;
      const y = rand() * size;
      const len = 90 + rand() * 160;
      ctx.strokeStyle = opts.accent;
      ctx.globalAlpha = 0.35 + rand() * 0.25;
      ctx.lineWidth = 3;
      ctx.beginPath();
      if (horizontal) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + len, y);
      } else {
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + len);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  // 8) 边缘磨损
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  for (let i = 0; i < 26; i += 1) {
    const edge = Math.floor(rand() * 4);
    const pos = rand() * size;
    const len = 30 + rand() * 120;
    ctx.lineWidth = 2 + rand() * 3;
    ctx.beginPath();
    if (edge === 0) {
      ctx.moveTo(pos, 0);
      ctx.lineTo(pos + len, 2);
    } else if (edge === 1) {
      ctx.moveTo(pos, size);
      ctx.lineTo(pos + len, size - 2);
    } else if (edge === 2) {
      ctx.moveTo(0, pos);
      ctx.lineTo(2, pos + len);
    } else {
      ctx.moveTo(size, pos);
      ctx.lineTo(size - 2, pos + len);
    }
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 1);
  return tex;
}
