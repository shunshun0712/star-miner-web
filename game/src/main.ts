import './style.css';
import {
  ENERGY_STRATEGY_LABELS,
  FACILITIES,
  FACILITY_ORDER,
  GAME_VERSION,
  MAX_LEVEL,
  RESEARCH_CENTER_UNLOCK_CRYSTALS,
  STORM_MS,
  TECH_BY_ID,
  type AchievementDef,
} from './core/config';
import { checkAchievements } from './core/achievements';
import { applyAutoSell, sellResource, unlockFacility, upgradeFacility } from './core/economy';
import { releaseEnergy, setEnergyStrategy } from './core/energy';
import { maybeSpawnEvent, resolveEvent } from './core/events';
import { formatDuration, formatNumber } from './core/format';
import { settleOffline } from './core/offline';
import { rateFor, tickProduction } from './core/production';
import { researchTech } from './core/research';
import { parseSaveJson, serializeState } from './core/save';
import { createNewGame } from './core/state';
import { registerShortcuts } from './input/shortcuts';
import { downloadCsvFile, downloadSaveFile, importSaveFile } from './save/jsonTransfer';
import { IndexedDbSaveRepository } from './save/indexeddb';
import { GameScene, type SceneSyncState } from './scene/gameScene';
import { applyTokensToCss } from './art/tokens';
import * as sfx from './audio/sfx';
import { Hud } from './ui/hud';
import { Panel } from './ui/panel';
import { applyPanelTexture } from './ui/panelTexture';
import {
  showAchievementsModal,
  showDebugPanel,
  showHelpModal,
  showEventNotification,
  showImportPreview,
  showMilestoneCard,
  showOfflineModal,
  showResearchModal,
  showSaveModal,
  showStarmapModal,
} from './ui/modals';
import { toast } from './ui/toasts';
import type {
  EnergyStrategyId,
  FacilityId,
  FacilityStatus,
  GameState,
  PendingEvent,
  ProductionSummary,
} from './core/types';

const STEP_MS = 100;
const AUTOSAVE_INTERVAL_MS = 30_000;
const HIDDEN_OFFLINE_THRESHOLD_MS = 60_000;
const LS_SNAPSHOT_KEY = 'star-miner-snapshot';

let state: GameState;
let selectedId: FacilityId = 'excavator';
let lastSummary: ProductionSummary | null = null;
let hiddenAt: number | null = null;

interface Milestone {
  name: string;
  atMs: number;
}
const milestones: Milestone[] = [];

const repo = new IndexedDbSaveRepository();
const scene = new GameScene();
let hud: Hud;
let panel: Panel;

function byId<T extends HTMLElement = HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`missing #${id}`);
  return el as T;
}

function setSaveStatus(text: string): void {
  byId('save-status').textContent = text;
}

function recordMilestone(name: string): void {
  if (milestones.some((m) => m.name === name)) return;
  const atMs = Date.now() - state.createdAt;
  milestones.push({ name, atMs });
  console.info(`[里程碑] ${name} 用时 ${formatDuration(atMs)}`);
  showMilestoneCard(name, atMs);
  toast(`达成：${name}`);
}

function statusFor(id: FacilityId): FacilityStatus {
  return state.facilities[id].unlocked ? 'ONLINE' : 'LOCKED';
}

function buildSceneSync(): SceneSyncState {
  return {
    statuses: {
      excavator: statusFor('excavator'),
      he3Excavator: statusFor('he3Excavator'),
      deuteriumExcavator: statusFor('deuteriumExcavator'),
      transport: statusFor('transport'),
      refinery: statusFor('refinery'),
      energyStation: statusFor('energyStation'),
    },
    selected: selectedId,
    transportActivity: Math.min(1, rateFor(state, 'transport') / 1.0),
    bottlenecks: lastSummary?.bottlenecks ?? [],
    transportCongested: lastSummary?.transportCongested ?? false,
  };
}

function notifyDroneEvent(ev: PendingEvent): void {
  const canUnlockResearch =
    !state.researchCenterUnlocked &&
    state.facilities.he3Excavator.unlocked &&
    state.stats.totalCrystalProduced >= RESEARCH_CENTER_UNLOCK_CRYSTALS;
  showEventNotification('drone', {
    onA: () => {
      const r = resolveEvent(state, ev.id, { choice: 'A' });
      if (r.ok) {
        toast(`无人机奖励：+${r.creditsGained} 信用点`);
        void saveNow('事件');
      } else {
        toast(r.reason ?? '事件已失效', 'error');
      }
    },
    onB: () => {
      const r = resolveEvent(state, ev.id, { choice: 'B', now: Date.now() });
      if (r.ok) {
        toast('无人机奖励：全设施 ×1.5 速度 30 秒');
        void saveNow('事件');
      } else {
        toast(r.reason ?? '事件已失效', 'error');
      }
    },
    onResearchCenter: canUnlockResearch
      ? () => {
          state.researchCenterUnlocked = true;
          toast('研究中心已解锁！打开「研究」页探索科技树');
          void saveNow('研究中心');
        }
      : undefined,
  });
}

function handleSpawnedEvent(ev: PendingEvent): void {
  flashEventStatus();
  if (ev.kind === 'solar-storm') {
    showEventNotification('solar-storm');
    toast('太阳风暴来袭：全设施速度降低');
    void saveNow('事件');
  } else if (ev.kind === 'drone') {
    notifyDroneEvent(ev);
  } else {
    showEventNotification('invest', {
      onInvest: () => {
        const r = resolveEvent(state, ev.id, { confirm: true });
        if (r.ok) {
          toast('投入完成：采掘速度永久 +5%');
        } else {
          toast(r.reason ?? '投资失败', 'error');
        }
        void saveNow('事件');
      },
      onIgnore: () => {
        resolveEvent(state, ev.id, { confirm: false });
      },
    });
  }
}

const GUIDE_SESSION_KEY = 'starminer-guide-step';
let guideDismissed = false;
let guideStep = loadGuideStep();

function loadGuideStep(): number {
  const v = Number.parseInt(sessionStorage.getItem(GUIDE_SESSION_KEY) ?? '0', 10);
  return Number.isFinite(v) && v >= 0 && v <= 4 ? v : 0;
}

function saveGuideStep(): void {
  sessionStorage.setItem(GUIDE_SESSION_KEY, String(guideStep));
}

function advanceGuide(): void {
  if (guideStep < 4) {
    guideStep += 1;
    saveGuideStep();
  }
}

const GUIDE_STEPS = [
  {
    name: '出售矿石',
    title: '第 1 步：出售矿石',
    body: '点「交易」区的出售按钮，把星尘矿换成信用点。',
    target: 'market-card',
  },
  {
    name: '升级采掘器',
    title: '第 2 步：升级采掘器',
    body: '点「升级（U）」按钮提升采掘产出。',
    target: 'facility-card',
  },
  {
    name: '切换能源策略',
    title: '第 3 步：切换能源策略',
    body: '试试切换三种能源策略，观察产出倍率变化。',
    target: 'energy-card',
  },
  {
    name: '解锁运输线',
    title: '第 4 步：解锁运输线',
    body: '攒 600 信用点，点击场景中的磁轨运输线（橙色轨道）后解锁。',
    target: 'facility-card',
  },
];

function clearGuideHighlight(): void {
  for (const id of ['market-card', 'energy-card', 'facility-card']) {
    document.getElementById(id)?.classList.remove('guide-highlight');
  }
}

function updateGuideCard(): void {
  const guide = byId<HTMLElement>('guide-card');
  if (guideDismissed || state.facilities.transport.unlocked || guideStep >= 4) {
    guide.hidden = true;
    clearGuideHighlight();
    return;
  }
  const step = GUIDE_STEPS[guideStep];
  guide.hidden = false;
  byId('guide-title').textContent = step.title;
  byId('guide-body').textContent = step.body;
  const stepsEl = byId<HTMLElement>('guide-steps');
  stepsEl.innerHTML = GUIDE_STEPS.map((s, i) => {
    const stateCls = i < guideStep ? 'done' : i === guideStep ? 'current' : 'pending';
    const mark = i < guideStep ? '✓' : String(i + 1);
    return `<li class="guide-step ${stateCls}"><span class="guide-step-mark">${mark}</span>${s.name}</li>`;
  }).join('');
  clearGuideHighlight();
  document.getElementById(step.target)?.classList.add('guide-highlight');
}

function flashEventStatus(): void {
  const chip = byId('event-status');
  chip.classList.add('flash');
  window.setTimeout(() => chip.classList.remove('flash'), 1500);
}

function updateEventStatus(): void {
  const chip = byId('event-status');
  const now = Date.now();
  const stormMs = state.eventState.solarStormUntil - now;
  const boostMs = state.eventState.droneBoostUntil - now;
  const hadFlash = chip.classList.contains('flash');
  if (stormMs > 0) {
    const penalty = state.energyStrategy === 'balanced' ? '-10%' : '-20%';
    chip.textContent = `太阳风暴 ${penalty} ${Math.ceil(stormMs / 1000)}s`;
    chip.className = 'stat-value danger';
  } else if (boostMs > 0) {
    chip.textContent = `无人机加速 ×1.5 ${Math.ceil(boostMs / 1000)}s`;
    chip.className = 'stat-value boost';
  } else {
    chip.textContent = '正常';
    chip.className = 'stat-value muted';
  }
  if (hadFlash) chip.classList.add('flash');
}

let saveSeq = 0;
async function saveNow(reason = '自动'): Promise<void> {
  const seq = ++saveSeq;
  setSaveStatus('保存中…');
  state.lastSavedAt = Date.now();
  try {
    await repo.save(serializeState(state));
    if (seq === saveSeq) {
      setSaveStatus(`已保存 ${new Date().toLocaleTimeString('zh-CN', { hour12: false })}`);
    }
  } catch {
    if (seq === saveSeq) {
      setSaveStatus('保存失败');
      toast('保存失败，请检查浏览器存储', 'error');
    }
  }
}

/** beforeunload/pagehide 时同步写 localStorage 快照，避免异步 IDB 事务被页面关闭中断。 */
function writeLocalSnapshot(s: GameState): void {
  try {
    localStorage.setItem(LS_SNAPSHOT_KEY, serializeState(s));
  } catch {
    // QuotaExceededError 或隐私模式限制：静默放弃，不阻塞页面关闭
  }
}

/** 启动时从 localStorage 读取快照回退（IDB 不可用或无存档时）。 */
function loadFromLocalSnapshot(): GameState | null {
  try {
    const raw = localStorage.getItem(LS_SNAPSHOT_KEY);
    if (!raw) return null;
    const parsed = parseSaveJson(raw);
    return parsed.ok ? parsed.state : null;
  } catch {
    return null;
  }
}

function doFacilityAction(): void {
  sfx.click();
  const f = state.facilities[selectedId];
  if (!f.unlocked) {
    const r = unlockFacility(state, selectedId);
    if (r.ok) {
      sfx.unlock();
      toast(`${FACILITIES[selectedId].name} 已解锁`);
      if (selectedId === 'transport') {
        recordMilestone('解锁运输线');
        advanceGuide();
      }
      if (selectedId === 'refinery') recordMilestone('建成晶体精炼厂');
      if (selectedId === 'he3Excavator') recordMilestone('解锁第二矿区');
      if (selectedId === 'deuteriumExcavator') recordMilestone('解锁第三矿区');
      if (selectedId === 'energyStation') recordMilestone('解锁能源站');
      void saveNow('解锁');
    } else {
      toast(r.reason ?? '解锁失败', 'error');
    }
    return;
  }
  const beforeRate = rateFor(state, selectedId);
  const r = upgradeFacility(state, selectedId);
  if (r.ok) {
    const afterRate = rateFor(state, selectedId);
    panel.flashUpgrade(beforeRate, afterRate);
    scene.pulseFacility(selectedId);
    sfx.upgrade();
    toast(`${FACILITIES[selectedId].name} 升至 Lv.${f.level}`);
    if (selectedId === 'excavator' && f.level === 2) {
      recordMilestone('首次升级');
      advanceGuide();
    }
    void saveNow('升级');
  } else {
    toast(r.reason ?? '升级失败', 'error');
  }
}

function doEnergy(id: EnergyStrategyId): void {
  setEnergyStrategy(state, id);
  toast(`能源策略：${ENERGY_STRATEGY_LABELS[id]}`);
  if (id !== 'balanced') advanceGuide();
  void saveNow('策略');
}

function doSell(resource: 'stardust' | 'crystal', amount?: number): void {
  const gained = sellResource(state, resource, amount);
  if (gained > 0) {
    toast(`售出获得 ${formatNumber(gained)} 信用点`);
    advanceGuide();
  }
  void saveNow('交易');
}

function handleAchievements(newly: AchievementDef[]): void {
  for (const a of newly) {
    toast(`成就达成：${a.name}（+${formatNumber(a.rewardCredits)} 信用点 +${a.rewardCrystals} 晶体）`);
  }
  if (newly.length > 0) void saveNow('成就');
}

function researchModalHandlers(): { onResearch: (id: string) => void } {
  return {
    onResearch: (id: string) => {
      const r = researchTech(state, id);
      if (r.ok) {
        toast(`研究完成：${TECH_BY_ID[id]?.name ?? id}`);
        void saveNow('研究');
        handleAchievements(checkAchievements(state));
        showResearchModal(state, researchModalHandlers());
      } else {
        toast(r.reason ?? '研究失败', 'error');
      }
    },
  };
}

function openResearchModal(): void {
  if (!state.researchCenterUnlocked) {
    toast('需先解锁研究中心：累计产出 50 晶体 + 第二矿区，等待无人机事件出现「发现古代数据核心」', 'error');
    return;
  }
  showResearchModal(state, researchModalHandlers());
}

function openAchievementsModal(): void {
  showAchievementsModal(state);
}

function openStarmap(): void {
  showStarmapModal(state);
}

function openSaveModal(): void {
  showSaveModal(
    { createdAt: state.createdAt, lastSavedAt: state.lastSavedAt },
    {
      onExport: () => downloadSaveFile(state),
      onImport: (file) => void handleImport(file),
      onExportCsv: handleExportCsv,
    },
  );
}

function openDebugPanel(): void {
  showDebugPanel(state, {
    onApply: (values) => {
      state.credits = values.credits;
      state.stardust = values.stardust;
      state.crystal = values.crystal;
      for (const id of FACILITY_ORDER) {
        state.facilities[id].level = Math.min(MAX_LEVEL, Math.max(1, values.levels[id]));
        if (values.unlockAll) state.facilities[id].unlocked = true;
      }
      void saveNow('调试');
      toast('调试数值已应用');
    },
    onDrone: () => {
      const ev: PendingEvent = { id: `ev-debug-${Date.now()}`, kind: 'drone', createdAt: Date.now() };
      state.eventState.pendingEvent = ev;
      notifyDroneEvent(ev);
    },
    onStorm: () => {
      state.eventState.solarStormUntil = Date.now() + STORM_MS;
      showEventNotification('solar-storm');
      flashEventStatus();
      toast('太阳风暴已触发');
      void saveNow('调试');
    },
    onOffline: (hours) => {
      state.lastSavedAt = Date.now() - hours * 3600 * 1000;
      const result = settleOffline(state, Date.now());
      if (result.applied) showOfflineModal(result, () => undefined);
      void saveNow('调试');
    },
  });
}

async function handleImport(file: File): Promise<void> {
  const parsed = await importSaveFile(file);
  if (!parsed.ok) {
    toast(`导入失败：${parsed.error}，当前进度保持不变`, 'error');
    return;
  }
  showImportPreview(parsed.state, () => {
    state = parsed.state;
    selectedId = 'excavator';
    lastSummary = null;
    void saveNow('导入').then(() => toast('存档导入成功'));
  });
}

function handleExportCsv(): void {
  const header = '里程碑,用时(秒)';
  const rows = milestones.map((m) => `${m.name},${(m.atMs / 1000).toFixed(1)}`);
  downloadCsvFile('星际矿站_节奏数据.csv', [header, ...rows].join('\n'));
  toast('节奏数据已导出');
}

function frame(now: number): void {
  const dt = Math.min(now - lastFrame, 500);
  lastFrame = now;
  acc += dt;
  while (acc >= STEP_MS) {
    lastSummary = tickProduction(state, STEP_MS, { now: Date.now() });
    acc -= STEP_MS;
    applyAutoSell(state);
  }
  if (now - lastAchievementCheck >= 1000) {
    lastAchievementCheck = now;
    handleAchievements(checkAchievements(state));
  }
  const ev = maybeSpawnEvent(state, Date.now());
  if (ev) handleSpawnedEvent(ev);
  hud.update(state);
  panel.update(state, selectedId, lastSummary);
  updateEventStatus();
  updateGuideCard();
  scene.sync(buildSceneSync());
  requestAnimationFrame(frame);
}

let lastFrame = performance.now();
let acc = 0;
let lastAchievementCheck = 0;

let autosaveTimer: number | null = null;

function stopAutosave(): void {
  if (autosaveTimer !== null) {
    clearInterval(autosaveTimer);
    autosaveTimer = null;
  }
}

async function bootstrap(): Promise<void> {
  applyTokensToCss();
  sfx.initSfx();
  try {
    const json = await repo.load();
    if (json) {
      const parsed = parseSaveJson(json);
      if (parsed.ok) {
        state = parsed.state;
      } else {
        toast(`读取存档失败：${parsed.error}，已开始新档`, 'error');
        state = createNewGame(Date.now());
      }
    } else {
      // IDB 无存档，回退 localStorage 快照（beforeunload/pagehide 紧急保存）
      state = loadFromLocalSnapshot() ?? createNewGame(Date.now());
    }
  } catch {
    // IDB 不可用（隐私模式/禁用），尝试 localStorage 快照回退
    state = loadFromLocalSnapshot() ?? createNewGame(Date.now());
    toast('无法读取浏览器存档，已尝试恢复快照', 'error');
  }

  applyPanelTexture();
  hud = new Hud();
  byId<HTMLButtonElement>('version-label').textContent = `Web 原型 ${GAME_VERSION}`;
  byId<HTMLButtonElement>('btn-guide-close').addEventListener('click', () => {
    guideDismissed = true;
    byId<HTMLElement>('guide-card').hidden = true;
    clearGuideHighlight();
  });
  panel = new Panel({
    onFacilityAction: doFacilityAction,
    onEnergy: doEnergy,
    onSell: doSell,
    onReleaseEnergy: () => {
      const r = releaseEnergy(state, Date.now());
      if (r.ok) {
        toast('储备释放：30 秒全设施 ×1.2');
        void saveNow('释放');
      } else {
        toast(r.reason ?? '无法释放储备', 'error');
      }
    },
    onAutoSell: (resource, enabled, keepAmount) => {
      const label = resource === 'stardust' ? '星尘矿' : '晶体';
      if (resource === 'stardust') {
        state.settings.autoSellStardust = enabled;
        state.settings.stardustKeepAmount = keepAmount;
      } else {
        state.settings.autoSellCrystal = enabled;
        state.settings.crystalKeepAmount = keepAmount;
      }
      toast(enabled ? `${label}自动出售已开启（保留 ${keepAmount} 个）` : `${label}自动出售已关闭`);
      void saveNow('设置');
    },
  });

  const isFreshGame = state.createdAt === state.lastSavedAt && !state.facilities.transport.unlocked && state.credits === 100;
  if (isFreshGame) {
    toast('提示：出售星尘矿可赚信用点，先解锁运输线（600），再建精炼厂（1000）；点击场景设施可查看详情');
  }

  const bootNow = Date.now();
  const offline = bootNow - state.lastSavedAt >= HIDDEN_OFFLINE_THRESHOLD_MS ? settleOffline(state, bootNow) : null;
  if (offline?.applied) {
    showOfflineModal(offline, () => undefined);
    void saveNow('离线结算');
  }

  const sceneHost = byId<HTMLElement>('scene-host');
  const labelsLayer = byId<HTMLElement>('scene-labels');
  scene.init(sceneHost, labelsLayer, {
    onSelect: (id) => {
      selectedId = id ?? 'excavator';
    },
  });
  scene.start();

  byId<HTMLButtonElement>('btn-save-modal').addEventListener('click', openSaveModal);
  document.querySelectorAll<HTMLButtonElement>('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      if (page === 'save') {
        openSaveModal();
      } else if (page === 'starmap') {
        openStarmap();
      } else if (page === 'research') {
        openResearchModal();
      } else if (page === 'achievements') {
        openAchievementsModal();
      } else if (page === 'help') {
        showHelpModal();
      }
    });
  });

  const sfxBtn = byId<HTMLButtonElement>('btn-sfx');
  const syncSfxBtn = (): void => {
    sfxBtn.textContent = sfx.isSfxEnabled() ? '音效：开' : '音效：关';
    sfxBtn.classList.toggle('sfx-off', !sfx.isSfxEnabled());
  };
  sfxBtn.addEventListener('click', () => {
    sfx.toggleSfx();
    syncSfxBtn();
  });
  syncSfxBtn();

  registerShortcuts({
    onStrategy: doEnergy,
    onUpgrade: doFacilityAction,
    onCloseModal: () => document.dispatchEvent(new Event('modal:close')),
    onOpenSave: openSaveModal,
    onDebug: openDebugPanel,
  });

  autosaveTimer = window.setInterval(() => void saveNow('定时'), AUTOSAVE_INTERVAL_MS);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      hiddenAt = Date.now();
      void saveNow('隐藏');
    } else if (hiddenAt !== null) {
      const awayMs = Date.now() - hiddenAt;
      hiddenAt = null;
      if (awayMs > HIDDEN_OFFLINE_THRESHOLD_MS) {
        const result = settleOffline(state, Date.now());
        if (result.applied) {
          showOfflineModal(result, () => undefined);
          void saveNow('离线结算');
        }
      }
    }
  });

  window.addEventListener('beforeunload', () => {
    state.lastSavedAt = Date.now();
    writeLocalSnapshot(state);
    void repo.save(serializeState(state));
    stopAutosave();
  });

  window.addEventListener('pagehide', () => {
    state.lastSavedAt = Date.now();
    writeLocalSnapshot(state);
  });

  document.addEventListener('modal:open', () => scene.setPaused(true));
  document.addEventListener('modal:closed', () => scene.setPaused(false));

  requestAnimationFrame(frame);
  void saveNow('启动');
}

void bootstrap();







