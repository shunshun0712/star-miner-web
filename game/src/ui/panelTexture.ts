function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function applyPanelTexture(): void {
  try {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rand = mulberry32(20260807);

    ctx.clearRect(0, 0, size, size);

    // 面板分割线（青色微光）
    ctx.strokeStyle = 'rgba(56, 217, 232, 0.08)';
    ctx.lineWidth = 2;
    for (let i = 0; i <= size; i += 64) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(size, i);
      ctx.stroke();
    }

    // 细节点（紫/青）
    for (let i = 0; i < 120; i += 1) {
      const color = rand() < 0.5 ? '56,217,232' : '160,107,255';
      ctx.fillStyle = `rgba(${color},${0.03 + rand() * 0.06})`;
      ctx.fillRect(Math.floor(rand() * size), Math.floor(rand() * size), 2, 2);
    }

    // 左上高光、右下暗角
    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
    glow.addColorStop(0, 'rgba(255,255,255,0.045)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, size, size);
    const shade = ctx.createRadialGradient(size, size, 0, size, size, size);
    shade.addColorStop(0, 'rgba(0,0,0,0.10)');
    shade.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, size, size);

    const url = canvas.toDataURL('image/png');
    const style = document.createElement('style');
    style.textContent = `
      #topbar {
        background-image: url("${url}"), linear-gradient(180deg, #0b1524, #08101d);
        background-size: 256px 256px, cover;
      }
      #leftnav, #right-panel {
        background-image: url("${url}");
        background-size: 256px 256px;
      }
      .panel-card, .modal {
        background-image: url("${url}");
        background-size: 256px 256px;
      }
    `;
    document.head.appendChild(style);
  } catch {
    // 纹理生成失败时保持原有纯色面板，不影响游戏
  }
}
