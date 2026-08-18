/** 美术设计令牌：2D UI 与 3D 场景的唯一色值 / 线宽 / 发光 / 字号来源。 */

export const ART_TOKENS = {
  color: {
    bgDeep: '#14161a',
    bgPanel: '#1b1e24',
    bgPanelSolid: '#15171c',
    line: '#2a2f38',
    text: '#e8e9eb',
    muted: '#9aa1ac',
    gold: '#c9a227',
    cyan: '#3fe0d8',
    purple: '#a78bfa',
    orange: '#e8862e',
    green: '#5fbf77',
    danger: '#ff6b5e',
    dust: '#8a93a0',
  },
  lineWidth: { divider: 1, accent: 1, energyIdle: 1, energyActive: 2 },
  glow: { idle: 0.5, active: 1.2 },
  radius: 2,
  panelWidth: '300px',
  navWidth: '64px',
  topbarHeight: '56px',
  type: {
    title: { size: 18, weight: 600, letterSpacing: 0.5 },
    subtitle: { size: 13, weight: 500 },
    body: { size: 12, weight: 400, lineHeight: 1.6 },
    dataMain: { size: 20, weight: 700 },
    dataSub: { size: 12, weight: 500 },
    button: { size: 14, weight: 600 },
    tag: { size: 10, weight: 600, letterSpacing: 0.8 },
    nav: { size: 11, weight: 500 },
  },
} as const;

/** 将令牌注入 CSS 变量，供 style.css 引用；3D 材质直接 import ART_TOKENS。 */
export function applyTokensToCss(): void {
  const s = document.documentElement.style;
  const c = ART_TOKENS.color;
  s.setProperty('--bg-deep', c.bgDeep);
  s.setProperty('--bg-panel', c.bgPanel);
  s.setProperty('--bg-panel-solid', c.bgPanelSolid);
  s.setProperty('--line', c.line);
  s.setProperty('--text', c.text);
  s.setProperty('--muted', c.muted);
  s.setProperty('--gold', c.gold);
  s.setProperty('--cyan', c.cyan);
  s.setProperty('--purple', c.purple);
  s.setProperty('--warn', c.orange);
  s.setProperty('--ok', c.green);
  s.setProperty('--danger', c.danger);
  s.setProperty('--radius', `${ART_TOKENS.radius}px`);
  s.setProperty('--panel-w', ART_TOKENS.panelWidth);
  s.setProperty('--nav-w', ART_TOKENS.navWidth);
  s.setProperty('--topbar-h', ART_TOKENS.topbarHeight);
}
