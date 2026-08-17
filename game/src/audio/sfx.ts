/** Web Audio 程序化音效：click / upgrade / unlock，零素材依赖，首次用户手势后初始化。 */

let ctx: AudioContext | null = null;
let enabled = true;

try {
  enabled = localStorage.getItem('starminer-sfx') !== '0';
} catch {
  // 隐私模式等场景忽略
}

function ensureCtx(): AudioContext | null {
  if (!enabled) return null;
  if (!ctx) {
    const AC =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

export function initSfx(): void {
  const unlock = (): void => {
    ensureCtx();
  };
  document.addEventListener('pointerdown', unlock);
  document.addEventListener('keydown', unlock);
}

export function setSfxEnabled(v: boolean): void {
  enabled = v;
  try {
    localStorage.setItem('starminer-sfx', v ? '1' : '0');
  } catch {
    // 忽略
  }
  if (!v && ctx) void ctx.suspend();
}

export function isSfxEnabled(): boolean {
  return enabled;
}

export function toggleSfx(): boolean {
  setSfxEnabled(!enabled);
  return enabled;
}

function tone(
  freqStart: number,
  freqEnd: number,
  dur: number,
  opts: { attack?: number; delay?: number; gain?: number; type?: OscillatorType } = {},
): void {
  const c = ensureCtx();
  if (!c) return;
  const t0 = c.currentTime + (opts.delay ?? 0);
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = opts.type ?? 'sine';
  osc.frequency.setValueAtTime(Math.max(1, freqStart), t0);
  if (freqEnd !== freqStart) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, freqEnd), t0 + dur);
  }
  const attack = opts.attack ?? 0.008;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(opts.gain ?? 0.14, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g);
  g.connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.03);
}

export function click(): void {
  tone(880, 640, 0.04, { type: 'square', gain: 0.045 });
}

/** 升级：220→440Hz 扫频 120ms，起音 0.12s / 衰减 0.4s。 */
export function upgrade(): void {
  const c = ensureCtx();
  if (!c) return;
  const t0 = c.currentTime;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(220, t0);
  osc.frequency.exponentialRampToValueAtTime(440, t0 + 0.12);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(0.16, t0 + 0.12);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.52);
  osc.connect(g);
  g.connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + 0.55);
}

/** 解锁：三连音琶音。 */
export function unlock(): void {
  const notes = [392, 494, 587];
  notes.forEach((f, i) => {
    tone(f, f, 0.18, { attack: 0.02, gain: 0.14, delay: i * 0.09, type: 'triangle' });
  });
}
