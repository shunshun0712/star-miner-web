import { describe, it, expect } from 'vitest';
import { createNewGame } from '../state';
import { tickProduction } from '../production';
import { canUnlock, canUpgrade, unlockFacility, upgradeFacility, sellResource } from '../economy';
import { SECOND_MINE_UNLOCK_CREDITS } from '../config';
import type { FacilityId, GameState } from '../types';

interface Milestone {
  name: string;
  atSeconds: number;
}

/**
 * 模拟一名"合理玩家"：
 * 1) 优先解锁设施（运输线→精炼厂→第二矿区）；
 * 2) 无法解锁时就升级采掘器（先升采掘器，再升运输线/精炼厂）；
 * 3) 星尘矿囤到 50 就卖，晶体囤到 10 就卖。
 */
function simulatePlayer(minutes: number): Milestone[] {
  const state: GameState = createNewGame(0);
  const milestones: Milestone[] = [];
  let lastExcavatorLevel = 1;
  const snapshots: string[] = [];

  const record = (name: string, t: number): void => {
    milestones.push({ name, atSeconds: Math.round(t) });
  };
  const snap = (t: number): void => {
    snapshots.push(
      `t=${t}s 信用点=${Math.round(state.credits)} 星尘矿=${Math.round(state.stardust)} 缓冲=${Math.round(state.refineryBuffer)} 晶体=${Math.round(state.crystal)} 等级={采掘${state.facilities.excavator.level}, 运输${state.facilities.transport.level}, 精炼${state.facilities.refinery.level}}`,
    );
  };

  for (let t = 0; t < minutes * 60; t += 1) {
    if (t % 600 === 0) snap(t);
    tickProduction(state, 1000, { now: t * 1000 });

    // 1) 解锁设施
    if (!state.facilities.transport.unlocked && canUnlock(state, 'transport').ok) {
      unlockFacility(state, 'transport');
      record('解锁磁轨运输线', t);
    } else if (!state.facilities.refinery.unlocked && canUnlock(state, 'refinery').ok) {
      unlockFacility(state, 'refinery');
      record('建成晶体精炼厂', t);
    } else if (!state.facilities.he3Excavator.unlocked && canUnlock(state, 'he3Excavator').ok) {
      unlockFacility(state, 'he3Excavator');
      record('解锁第二矿区(氦-3)', t);
    } else if (state.facilities.excavator.level < 5 && canUpgrade(state, 'excavator').ok) {
      upgradeFacility(state, 'excavator');
      if (state.facilities.excavator.level !== lastExcavatorLevel) {
        lastExcavatorLevel = state.facilities.excavator.level;
        if (lastExcavatorLevel === 2) record('首次升级采掘器', t);
      }
    }

    // 2) 出售资源（临近解锁第二矿区时停止卖晶体，攒够 50 个）
    const savingForMine = !state.facilities.he3Excavator.unlocked && state.credits >= SECOND_MINE_UNLOCK_CREDITS;
    if (state.stardust >= 50) sellResource(state, 'stardust');
    if (state.crystal >= 10 && !savingForMine) sellResource(state, 'crystal');
  }

  snap(minutes * 60);
  console.log('--- 状态快照 ---');
  console.log(snapshots.join('\n'));
  milestones.push({ name: '模拟结束状态', atSeconds: minutes * 60 });
  return milestones;
}

describe('节奏数据模拟（合理玩家基准线）', () => {
  it('输出 90 分钟模拟的里程碑时间', () => {
    const ms = simulatePlayer(90);
    const rows = ms.map((m) => ({
      里程碑: m.name,
      用时: `${Math.floor(m.atSeconds / 60)}分${m.atSeconds % 60}秒`,
    }));
    console.table(rows);
    console.log('--- 原始秒数 ---');
    console.log(JSON.stringify(ms));
  });

  it('第二矿区解锁时间落在 25–28 分钟', () => {
    const ms = simulatePlayer(90);
    const mine = ms.find((m) => m.name === '解锁第二矿区(氦-3)');
    expect(mine).toBeDefined();
    if (!mine) return;
    expect(mine.atSeconds).toBeGreaterThanOrEqual(25 * 60);
    expect(mine.atSeconds).toBeLessThanOrEqual(28 * 60);
  });
});



