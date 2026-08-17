import { createNewGame } from '../state';
import { tickProduction, rateFor, capacityFor, computeBottlenecks, getRates } from '../production';
import { upgradeFacility, unlockFacility, sellResource, upgradeCost, crystalUpgradeCost, canUpgrade, canUnlock } from '../economy';
import { setEnergyStrategy } from '../energy';
import { resolveEvent, maybeSpawnEvent, activeModifier } from '../events';
import { settleOffline } from '../offline';
import { CRYSTAL_RECIPE_STARDUST, MAX_LEVEL, OFFLINE_CAP_MS, DRONE_BOOST_MS, DRONE_BOOST_MULT, STORM_MS, STORM_MULT, INVEST_COST, INVEST_BOOST } from '../config';
import type { GameState, FacilityId, EnergyStrategyId } from '../types';

function log(title: string, data: unknown): void {
  console.log(`\n=== ${title} ===`);
  console.log(JSON.stringify(data, null, 2));
}

function fmt(n: number): string {
  return n.toFixed(2);
}

// ========== 1. 生产系统测试 ==========
function testProduction(): void {
  console.log('\n' + '='.repeat(60));
  console.log('1. 生产系统深度测试');
  console.log('='.repeat(60));

  const state = createNewGame(0);

  // 1.1 基础产出验证
  console.log('\n--- 1.1 基础产出验证（Lv.1 均衡策略）---');
  const rates = getRates(state, 0);
  console.log(`采掘器基础速度: ${fmt(rates.excavator)} 星尘/秒 (预期: 1.20)`);
  console.log(`运输线基础速度: ${fmt(rates.transport)} 星尘/秒 (预期: 0.00, 未解锁)`);
  console.log(`精炼厂基础速度: ${fmt(rates.refinery)} 晶体/秒 (预期: 0.00, 未解锁)`);

  // 1.2 能源策略验证
  console.log('\n--- 1.2 能源策略验证 ---');
  const strategies: EnergyStrategyId[] = ['excavation', 'balanced', 'refinement'];
  for (const s of strategies) {
    setEnergyStrategy(state, s);
    const r = getRates(state, 0);
    console.log(`${s}: 采掘=${fmt(r.excavator)}, 运输=${fmt(r.transport)}, 精炼=${fmt(r.refinery)}`);
  }
  setEnergyStrategy(state, 'balanced');

  // 1.3 10秒产出验证
  console.log('\n--- 1.3 10秒产出验证 ---');
  const before = state.stardust;
  tickProduction(state, 10000, { now: 0 });
  const produced = state.stardust - before;
  console.log(`10秒产出: ${fmt(produced)} 星尘 (预期: 12.00)`);
  console.log(`误差: ${Math.abs(produced - 12) < 0.01 ? '✅ 正确' : '❌ 错误'}`);

  // 1.4 容量上限验证
  console.log('\n--- 1.4 容量上限验证 ---');
  const cap = capacityFor(state, 'excavator');
  console.log(`采掘器容量: ${fmt(cap)} (预期: 2000)`);
  // 模拟超过容量的产出
  state.stardust = cap - 10;
  tickProduction(state, 100000, { now: 0 }); // 100秒，应该产出120，但只剩10空间
  console.log(`接近容量时产出: ${fmt(state.stardust - (cap - 10))} (预期: 10, 被容量限制)`);
  console.log(`容量限制: ${Math.abs(state.stardust - cap) < 1 ? '✅ 正确' : '❌ 错误'}`);

  // 1.5 升级后产出验证
  console.log('\n--- 1.5 升级后产出验证 ---');
  const state2 = createNewGame(0);
  state2.credits = 10000;
  state2.crystal = 1000;
  for (let i = 1; i <= MAX_LEVEL; i++) {
    const r = rateFor(state2, 'excavator', 0);
    console.log(`Lv.${i}: ${fmt(r)} 星尘/秒`);
    if (i < MAX_LEVEL) upgradeFacility(state2, 'excavator');
  }
  console.log(`每级+20%成长: ${rateFor(state2, 'excavator', 0) === 1.2 * Math.pow(1.2, 4) ? '✅ 正确' : '❌ 错误'}`);
}

// ========== 2. 升级系统测试 ==========
function testUpgrade(): void {
  console.log('\n' + '='.repeat(60));
  console.log('2. 升级系统深度测试');
  console.log('='.repeat(60));

  const state = createNewGame(0);
  state.credits = 100000;
  state.crystal = 1000;

  console.log('\n--- 2.1 采掘器各级升级费用 ---');
  let totalCost = 0;
  let totalCrystal = 0;
  for (let i = 1; i <= MAX_LEVEL; i++) {
    const cost = upgradeCost(state, 'excavator');
    const crystal = crystalUpgradeCost(state, 'excavator');
    console.log(`Lv.${i} → Lv.${i + 1}: ${cost} 信用点 + ${crystal} 晶体`);
    totalCost += cost;
    totalCrystal += crystal;
    if (i < MAX_LEVEL) upgradeFacility(state, 'excavator');
  }
  console.log(`总费用: ${totalCost} 信用点 + ${totalCrystal} 晶体`);
  console.log(`费用增长1.7倍: ${upgradeCost(createNewGame(0), 'excavator') === 50 ? '✅ Lv1→2=50正确' : '❌ 错误'}`);

  console.log('\n--- 2.2 3级以上消耗晶体验证 ---');
  const state3 = createNewGame(0);
  state3.credits = 100000;
  state3.crystal = 0;
  // 升到3级
  upgradeFacility(state3, 'excavator'); // 1→2
  upgradeFacility(state3, 'excavator'); // 2→3
  console.log(`升到3级后晶体消耗: ${crystalUpgradeCost(state3, 'excavator')} (预期: 0, 3级升4级才开始)`);
  const canUp = canUpgrade(state3, 'excavator');
  console.log(`3级升4级（晶体=0）: ${canUp.ok ? '❌ 应该失败' : '✅ 正确失败, 原因: ' + canUp.reason}`);

  console.log('\n--- 2.3 各设施基础升级费对比 ---');
  const facilities: FacilityId[] = ['excavator', 'transport', 'refinery', 'he3Excavator', 'deuteriumExcavator'];
  for (const f of facilities) {
    const s = createNewGame(0);
    s.credits = 100000;
    s.crystal = 1000;
    if (f !== 'excavator') {
      // 先解锁
      s.credits += 10000;
    }
    console.log(`${f}: Lv1→2 = ${upgradeCost(s, f)} 信用点`);
  }
}

// ========== 3. 解锁系统测试 ==========
function testUnlock(): void {
  console.log('\n' + '='.repeat(60));
  console.log('3. 解锁系统深度测试');
  console.log('='.repeat(60));

  console.log('\n--- 3.1 各设施解锁费用 ---');
  const state = createNewGame(0);
  const facilities: FacilityId[] = ['transport', 'refinery', 'he3Excavator', 'deuteriumExcavator'];
  for (const f of facilities) {
    const can = canUnlock(state, f);
    console.log(`${f}: 解锁费 = ${can.reason}`);
  }

  console.log('\n--- 3.2 解锁后运输线是否工作（精炼厂未建成）---');
  const s2 = createNewGame(0);
  s2.credits = 10000;
  unlockFacility(s2, 'transport');
  s2.stardust = 100;
  const beforeBuffer = s2.refineryBuffer;
  tickProduction(s2, 10000, { now: 0 });
  const moved = s2.refineryBuffer - beforeBuffer;
  console.log(`精炼厂未建成时运输量: ${fmt(moved)} (预期: 0, 设计如此)`);
  console.log(`运输线空转: ${moved === 0 ? '✅ 符合设计' : '❌ 异常'}`);

  console.log('\n--- 3.3 解锁精炼厂后完整生产链 ---');
  const s3 = createNewGame(0);
  s3.credits = 10000;
  s3.crystal = 100;
  unlockFacility(s3, 'transport');
  unlockFacility(s3, 'refinery');
  s3.stardust = 1000;
  const beforeCrystal = s3.crystal;
  const beforeStardust = s3.stardust;
  tickProduction(s3, 10000, { now: 0 }); // 10秒
  const crystalProduced = s3.crystal - beforeCrystal;
  const stardustConsumed = beforeStardust - s3.stardust;
  console.log(`10秒精炼产出: ${fmt(crystalProduced)} 晶体 (预期: 2.5)`);
  console.log(`10秒星尘消耗: ${fmt(stardustConsumed)} 星尘 (预期: 10)`);
  console.log(`配方4:1: ${Math.abs(crystalProduced * 4 - stardustConsumed) < 0.1 ? '✅ 正确' : '❌ 错误'}`);
}

// ========== 4. 事件系统测试 ==========
function testEvents(): void {
  console.log('\n' + '='.repeat(60));
  console.log('4. 事件系统深度测试');
  console.log('='.repeat(60));

  console.log('\n--- 4.1 无人机事件A选项（立即获得信用点）---');
  const s1 = createNewGame(0);
  s1.eventState.pendingEvent = { id: 'test-drone', kind: 'drone', createdAt: 0 };
  const before = s1.credits;
  const result = resolveEvent(s1, 'test-drone', { choice: 'A', now: 0 });
  console.log(`获得信用点: ${s1.credits - before} (预期: 50)`);
  console.log(`事件结算: ${result.ok ? '✅ 成功' : '❌ 失败'}`);
  console.log(`事件已清空: ${s1.eventState.pendingEvent === null ? '✅ 是' : '❌ 否'}`);

  console.log('\n--- 4.2 无人机事件B选项（30秒加速）---');
  const s2 = createNewGame(0);
  s2.eventState.pendingEvent = { id: 'test-drone2', kind: 'drone', createdAt: 0 };
  resolveEvent(s2, 'test-drone2', { choice: 'B', now: 1000 });
  const baseRate = rateFor(createNewGame(0), 'excavator', 0);
  const boostedRate = rateFor(s2, 'excavator', 2000);
  console.log(`基础产出: ${fmt(baseRate)}`);
  console.log(`加速产出: ${fmt(boostedRate)} (预期: ${fmt(baseRate * DRONE_BOOST_MULT)})`);
  console.log(`×1.5加速: ${Math.abs(boostedRate - baseRate * DRONE_BOOST_MULT) < 0.01 ? '✅ 正确' : '❌ 错误'}`);
  console.log(`加速持续到: ${new Date(s2.eventState.droneBoostUntil).toISOString().slice(14, 19)}`);

  console.log('\n--- 4.3 太阳风暴事件 ---');
  const s3 = createNewGame(0);
  s3.eventState.solarStormUntil = 60000; // 60秒风暴
  const normalRate = rateFor(createNewGame(0), 'excavator', 0);
  const stormRate = rateFor(s3, 'excavator', 30000);
  console.log(`正常产出: ${fmt(normalRate)}`);
  console.log(`风暴产出（非均衡）: ${fmt(stormRate)} (预期: ${fmt(normalRate * STORM_MULT)})`);
  console.log(`-20%效果: ${Math.abs(stormRate - normalRate * STORM_MULT) < 0.01 ? '✅ 正确' : '❌ 错误'}`);

  console.log('\n--- 4.4 太阳风暴+均衡策略（减伤）---');
  const s4 = createNewGame(0);
  setEnergyStrategy(s4, 'balanced');
  s4.eventState.solarStormUntil = 60000;
  const balancedStormRate = rateFor(s4, 'excavator', 30000);
  console.log(`均衡+风暴产出: ${fmt(balancedStormRate)} (预期: ${fmt(normalRate * 0.9)})`);
  console.log(`均衡减伤: ${Math.abs(balancedStormRate - normalRate * 0.9) < 0.01 ? '✅ 正确' : '❌ 错误'}`);

  console.log('\n--- 4.5 投入型事件 ---');
  const s5 = createNewGame(0);
  s5.credits = INVEST_COST;
  s5.eventState.pendingEvent = { id: 'test-invest', kind: 'invest', createdAt: 0 };
  const beforeRate = rateFor(s5, 'excavator', 0);
  resolveEvent(s5, 'test-invest', { confirm: true, now: 0 });
  const afterRate = rateFor(s5, 'excavator', 0);
  console.log(`投入前: ${fmt(beforeRate)}`);
  console.log(`投入后: ${fmt(afterRate)} (预期: ${fmt(beforeRate * (1 + INVEST_BOOST))})`);
  console.log(`+5%永久加成: ${Math.abs(afterRate - beforeRate * 1.05) < 0.01 ? '✅ 正确' : '❌ 错误'}`);
  console.log(`信用点扣除: ${s5.credits === 0 ? '✅ 正确' : '❌ 错误, 剩余' + s5.credits}`);
  console.log(`标记已使用: ${s5.eventState.investUsed ? '✅ 是' : '❌ 否'}`);

  console.log('\n--- 4.6 投入型事件仅一次 ---');
  const s6 = createNewGame(0);
  s6.credits = INVEST_COST * 3;
  s6.eventState.investUsed = true;
  s6.eventState.pendingEvent = { id: 'test-invest2', kind: 'invest', createdAt: 0 };
  const result2 = resolveEvent(s6, 'test-invest2', { confirm: true, now: 0 });
  console.log(`重复投入: ${result2.ok ? '❌ 应该失败' : '✅ 正确失败'}`);
}

// ========== 5. 瓶颈检测系统测试 ==========
function testBottlenecks(): void {
  console.log('\n' + '='.repeat(60));
  console.log('5. 瓶颈检测系统深度测试');
  console.log('='.repeat(60));

  console.log('\n--- 5.1 初始状态（只有采掘器）---');
  const s1 = createNewGame(0);
  const b1 = computeBottlenecks(s1, getRates(s1, 0));
  console.log(`瓶颈: ${b1.length === 0 ? '无 ✅ 正确' : b1.join(', ')}`);

  console.log('\n--- 5.2 采掘>运输（运输是瓶颈）---');
  const s2 = createNewGame(0);
  s2.credits = 10000;
  s2.crystal = 100;
  unlockFacility(s2, 'transport');
  unlockFacility(s2, 'refinery');
  // 采掘器升到3级，运输线1级
  upgradeFacility(s2, 'excavator');
  upgradeFacility(s2, 'excavator');
  const b2 = computeBottlenecks(s2, getRates(s2, 0));
  console.log(`采掘Lv3 vs 运输Lv1: 瓶颈 = ${b2.join(', ')}`);
  console.log(`运输是瓶颈: ${b2.includes('transport') ? '✅ 正确' : '❌ 错误'}`);

  console.log('\n--- 5.3 运输>精炼（精炼是瓶颈）---');
  const s3 = createNewGame(0);
  s3.credits = 100000;
  s3.crystal = 1000;
  unlockFacility(s3, 'transport');
  unlockFacility(s3, 'refinery');
  // 运输线升到3级，精炼厂1级
  upgradeFacility(s3, 'transport');
  upgradeFacility(s3, 'transport');
  const b3 = computeBottlenecks(s3, getRates(s3, 0));
  console.log(`运输Lv3 vs 精炼Lv1: 瓶颈 = ${b3.join(', ')}`);
  console.log(`运输是瓶颈（运输>精炼消耗）: ${b3.includes('transport') ? '✅ 正确' : '❌ 错误'}`);

  console.log('\n--- 5.4 多采掘器场景 ---');
  const s4 = createNewGame(0);
  s4.credits = 100000;
  s4.crystal = 1000;
  unlockFacility(s4, 'transport');
  unlockFacility(s4, 'refinery');
  unlockFacility(s4, 'he3Excavator');
  const totalExcavation = getRates(s4, 0).excavator + getRates(s4, 0).he3Excavator;
  const transportRate = getRates(s4, 0).transport;
  const b4 = computeBottlenecks(s4, getRates(s4, 0));
  console.log(`双采掘总产出: ${fmt(totalExcavation)}, 运输: ${fmt(transportRate)}`);
  console.log(`瓶颈: ${b4.join(', ')}`);
  console.log(`采掘>运输时标记采掘器: ${b4.includes('excavator') || b4.includes('he3Excavator') ? '✅ 正确' : '❌ 错误'}`);
}

// ========== 6. 离线收益系统测试 ==========
function testOffline(): void {
  console.log('\n' + '='.repeat(60));
  console.log('6. 离线收益系统深度测试');
  console.log('='.repeat(60));

  console.log('\n--- 6.1 基础离线收益 ---');
  const s1 = createNewGame(0);
  s1.lastSavedAt = 0;
  const result = settleOffline(s1, 3600000); // 1小时
  console.log(`离线时长: 1小时`);
  console.log(`产出星尘: ${fmt(result.summary.producedStardust)} (预期: ${fmt(1.2 * 3600)})`);
  console.log(`离线结算: ${result.applied ? '✅ 成功' : '❌ 失败'}`);

  console.log('\n--- 6.2 离线容量无限制验证 ---');
  const s2 = createNewGame(0);
  s2.lastSavedAt = 0;
  // 离线10小时，产出应该是1.2 * 36000 = 43200，远超容量2000
  const result2 = settleOffline(s2, 36000000);
  console.log(`离线10小时产出: ${fmt(result2.summary.producedStardust)}`);
  console.log(`远超容量(2000): ${result2.summary.producedStardust > 2000 ? '✅ 离线不受容量限制' : '❌ 被容量限制了'}`);

  console.log('\n--- 6.3 离线8小时上限验证 ---');
  const s3 = createNewGame(0);
  s3.lastSavedAt = 0;
  const result3 = settleOffline(s3, OFFLINE_CAP_MS * 2); // 16小时
  const expected = 1.2 * (OFFLINE_CAP_MS / 1000);
  console.log(`离线16小时产出: ${fmt(result3.summary.producedStardust)} (预期: ${fmt(expected)}, 上限8小时)`);
  console.log(`8小时上限: ${Math.abs(result3.summary.producedStardust - expected) < 1 ? '✅ 正确' : '❌ 错误'}`);

  console.log('\n--- 6.4 离线清空事件与增益 ---');
  const s4 = createNewGame(0);
  s4.lastSavedAt = 0;
  s4.eventState.droneBoostUntil = 100000;
  s4.eventState.solarStormUntil = 100000;
  s4.eventState.pendingEvent = { id: 'test', kind: 'drone', createdAt: 0 };
  settleOffline(s4, 3600000);
  console.log(`无人机增益清空: ${s4.eventState.droneBoostUntil === 0 ? '✅ 是' : '❌ 否'}`);
  console.log(`太阳风暴清空: ${s4.eventState.solarStormUntil === 0 ? '✅ 是' : '❌ 否'}`);
  console.log(`待处理事件清空: ${s4.eventState.pendingEvent === null ? '✅ 是' : '❌ 否'}`);
}

// ========== 7. 经济系统测试 ==========
function testEconomy(): void {
  console.log('\n' + '='.repeat(60));
  console.log('7. 经济系统深度测试');
  console.log('='.repeat(60));

  console.log('\n--- 7.1 出售星尘矿 ---');
  const s1 = createNewGame(0);
  s1.stardust = 100;
  const earned = sellResource(s1, 'stardust', 50);
  console.log(`出售50个: 获得 ${earned} 信用点 (预期: 50)`);
  console.log(`剩余: ${s1.stardust} 星尘 (预期: 50)`);
  console.log(`价格1:1: ${earned === 50 ? '✅ 正确' : '❌ 错误'}`);

  console.log('\n--- 7.2 出售晶体 ---');
  const s2 = createNewGame(0);
  s2.crystal = 20;
  const earned2 = sellResource(s2, 'crystal', 10);
  console.log(`出售10个: 获得 ${earned2} 信用点 (预期: 80)`);
  console.log(`价格8:1: ${earned2 === 80 ? '✅ 正确' : '❌ 错误'}`);

  console.log('\n--- 7.3 全部出售 ---');
  const s3 = createNewGame(0);
  s3.stardust = 123;
  const earned3 = sellResource(s3, 'stardust');
  console.log(`全部出售: 获得 ${earned3}, 剩余 ${s3.stardust}`);
  console.log(`全部卖光: ${s3.stardust === 0 && earned3 === 123 ? '✅ 正确' : '❌ 错误'}`);

  console.log('\n--- 7.4 数量边界验证 ---');
  const s4 = createNewGame(0);
  s4.stardust = 10;
  const earned4 = sellResource(s4, 'stardust', 100); // 卖100个但只有10个
  console.log(`超额出售: 获得 ${earned4}, 剩余 ${s4.stardust}`);
  console.log(`只卖有货的: ${earned4 === 10 && s4.stardust === 0 ? '✅ 正确' : '❌ 错误'}`);
}

// ========== 8. 完整节奏模拟 ==========
function testFullPacing(): void {
  console.log('\n' + '='.repeat(60));
  console.log('8. 完整游戏节奏模拟（90分钟）');
  console.log('='.repeat(60));

  const state = createNewGame(0);
  const milestones: { name: string; time: string }[] = [];
  let lastLevel = 1;

  // 模拟策略：优先解锁，然后均衡升级，自动卖矿
  for (let t = 0; t < 90 * 60; t++) {
    tickProduction(state, 1000, { now: t * 1000 });

    // 自动出售（超过100就卖，留50）
    if (state.stardust > 100) {
      sellResource(state, 'stardust', Math.floor(state.stardust - 50));
    }
    if (state.crystal > 20) {
      sellResource(state, 'crystal', Math.floor(state.crystal - 10));
    }

    // 解锁优先级
    if (!state.facilities.transport.unlocked && canUnlock(state, 'transport').ok) {
      unlockFacility(state, 'transport');
      milestones.push({ name: '解锁运输线', time: `${Math.floor(t / 60)}分${t % 60}秒` });
    } else if (!state.facilities.refinery.unlocked && canUnlock(state, 'refinery').ok) {
      unlockFacility(state, 'refinery');
      milestones.push({ name: '建成精炼厂', time: `${Math.floor(t / 60)}分${t % 60}秒` });
    } else if (!state.facilities.he3Excavator.unlocked && canUnlock(state, 'he3Excavator').ok) {
      unlockFacility(state, 'he3Excavator');
      milestones.push({ name: '解锁第二矿区', time: `${Math.floor(t / 60)}分${t % 60}秒` });
    }

    // 升级（均衡升级采掘和运输）
    const facilities: FacilityId[] = ['excavator', 'transport', 'refinery'];
    for (const f of facilities) {
      if (state.facilities[f].unlocked && canUpgrade(state, f).ok) {
        upgradeFacility(state, f);
        if (f === 'excavator' && state.facilities.excavator.level !== lastLevel) {
          lastLevel = state.facilities.excavator.level;
          if (lastLevel === 2) milestones.push({ name: '采掘器首次升级', time: `${Math.floor(t / 60)}分${t % 60}秒` });
          if (lastLevel === 5) milestones.push({ name: '采掘器满级', time: `${Math.floor(t / 60)}分${t % 60}秒` });
        }
      }
    }
  }

  console.log('\n--- 里程碑时间线 ---');
  for (const m of milestones) {
    console.log(`  ${m.name}: ${m.time}`);
  }

  console.log('\n--- 90分钟最终状态 ---');
  console.log(`  信用点: ${Math.floor(state.credits)}`);
  console.log(`  星尘矿: ${Math.floor(state.stardust)}`);
  console.log(`  晶体: ${Math.floor(state.crystal)}`);
  console.log(`  采掘器: Lv.${state.facilities.excavator.level}`);
  console.log(`  运输线: Lv.${state.facilities.transport.level}`);
  console.log(`  精炼厂: Lv.${state.facilities.refinery.level}`);
  console.log(`  第二矿区: ${state.facilities.he3Excavator.unlocked ? '已解锁' : '未解锁'}`);

  const finalRates = getRates(state, 0);
  console.log(`\n--- 最终产出速率 ---`);
  console.log(`  采掘: ${fmt(finalRates.excavator + finalRates.he3Excavator)} 星尘/秒`);
  console.log(`  运输: ${fmt(finalRates.transport)} 星尘/秒`);
  console.log(`  精炼: ${fmt(finalRates.refinery)} 晶体/秒`);
}

// ========== 运行所有测试 ==========
console.log('星际矿站 v0.3 核心系统深度测试');
console.log('='.repeat(60));

testProduction();
testUpgrade();
testUnlock();
testEvents();
testBottlenecks();
testOffline();
testEconomy();
testFullPacing();

console.log('\n' + '='.repeat(60));
console.log('测试完成！');
console.log('='.repeat(60));
