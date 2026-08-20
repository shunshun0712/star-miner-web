import * as THREE from 'three';
import {
  PRESTIGE_FX_DURATIONS,
  PRESTIGE_FX_TOTAL,
  prestigePhaseAt,
  type PrestigePhase,
} from './prestigeTimeline';

export { PRESTIGE_FX_DURATIONS, PRESTIGE_FX_TOTAL, prestigePhaseAt, type PrestigePhase, type PrestigePhaseState } from './prestigeTimeline';

const MAX_PARTICLES = 240;

/**
 * T2-3 转生仪式动画：星体坍缩 → 爆发重生 → 新世界展开。
 *
 * 视觉风格与现有 starfield / ReactorFX 一致：emissive 八面体核心 + InstancedMesh 粒子 +
 * 点光源 + 光晕环。挂在 GameScene 主渲染循环内更新，**不另起 rAF**——与主循环零冲突。
 *
 * 三阶段：
 * - collapse：核心向中心收缩、白热化，粒子向内螺旋汇聚
 * - burst：核心隐去、点光源爆闪、粒子向外迸射、扩张壳层（光晕环放大）
 * - rebirth：核心从点重新展开、粒子减速淡出、世界恢复
 *
 * 用法：scene.playPrestigeSequence() 启动；GameScene.frame 每帧调 update(dt, elapsed)。
 */
export class PrestigeFX {
  readonly group = new THREE.Group();

  private core: THREE.Mesh;
  private coreMat: THREE.MeshStandardMaterial;
  private halo: THREE.Mesh;
  private haloMat: THREE.MeshBasicMaterial;
  private light: THREE.PointLight;
  private particles: THREE.InstancedMesh;
  private particleMat: THREE.MeshBasicMaterial;
  private shell: THREE.Mesh;
  private shellMat: THREE.MeshBasicMaterial;

  private dummy = new THREE.Object3D();
  private pPos: THREE.Vector3[] = [];
  private pVel: THREE.Vector3[] = [];
  private pLife: number[] = [];
  private active = false;
  private startElapsed = 0;

  constructor() {
    // 核心：白蓝双色辉光八面体（与 ReactorFX / 精炼厂水晶同系材质）
    this.coreMat = new THREE.MeshStandardMaterial({
      color: 0xbfe8ff,
      emissive: 0x6ad9ff,
      emissiveIntensity: 1.2,
      metalness: 0.2,
      roughness: 0.25,
      transparent: true,
      opacity: 1,
    });
    this.core = new THREE.Mesh(new THREE.OctahedronGeometry(1.2, 0), this.coreMat);
    this.core.position.y = 6;
    this.group.add(this.core);

    // 光晕环
    this.haloMat = new THREE.MeshBasicMaterial({ color: 0x9af0ff, transparent: true, opacity: 0.55 });
    this.halo = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.08, 10, 48), this.haloMat);
    this.halo.position.y = 6;
    this.halo.rotation.x = Math.PI / 2;
    this.group.add(this.halo);

    // 爆发扩张壳层（wireframe 球，burst 阶段放大）
    this.shellMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      wireframe: true,
    });
    this.shell = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 1), this.shellMat);
    this.shell.position.y = 6;
    this.group.add(this.shell);

    // 点光源：burst 时全场景泛白
    this.light = new THREE.PointLight(0xffffff, 0, 60, 1.2);
    this.light.position.y = 6;
    this.group.add(this.light);

    // 粒子（坍缩向内 / 爆发向外复用同一池）
    this.particleMat = new THREE.MeshBasicMaterial({ color: 0xcfeaff, transparent: true, opacity: 0.9 });
    this.particles = new THREE.InstancedMesh(new THREE.SphereGeometry(0.08, 6, 6), this.particleMat, MAX_PARTICLES);
    this.particles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.particles.frustumCulled = false;
    for (let i = 0; i < MAX_PARTICLES; i += 1) {
      this.pPos.push(new THREE.Vector3());
      this.pVel.push(new THREE.Vector3());
      this.pLife.push(0);
      this.hideInstance(i);
    }
    this.particles.instanceMatrix.needsUpdate = true;
    this.group.add(this.particles);

    // 默认隐藏，启动时才显示
    this.group.visible = false;
  }

  /** 是否正在播放 */
  isActive(): boolean {
    return this.active;
  }

  /** 启动动画——传入 GameScene 的 elapsed（墙钟累计秒），保证与主循环同基准 */
  start(sceneElapsed: number): void {
    this.active = true;
    this.startElapsed = sceneElapsed;
    this.group.visible = true;
    // 初始粒子：在核心周围散布一圈，坍缩阶段向内汇聚
    for (let i = 0; i < MAX_PARTICLES; i += 1) {
      const angle = (i / MAX_PARTICLES) * Math.PI * 2 + Math.random() * 0.3;
      const radius = 3 + Math.random() * 2.5;
      this.pPos[i].set(Math.cos(angle) * radius, 6 + (Math.random() - 0.5) * 1.5, Math.sin(angle) * radius);
      // 坍缩阶段速度指向核心
      this.pVel[i].set(-Math.cos(angle) * 1.8, -0.3, -Math.sin(angle) * 1.8);
      this.pLife[i] = PRESTIGE_FX_DURATIONS.collapse + PRESTIGE_FX_DURATIONS.burst;
      this.syncInstance(i, 1);
    }
    this.particles.instanceMatrix.needsUpdate = true;
  }

  /** 每帧更新——由 GameScene.frame 调用，dt/elapsed 与主渲染循环同一来源 */
  update(dt: number, sceneElapsed: number): void {
    if (!this.active) return;
    const elapsed = sceneElapsed - this.startElapsed;
    const st = prestigePhaseAt(elapsed);

    switch (st.phase) {
      case 'collapse':
        this.updateCollapse(st.phaseProgress, dt);
        break;
      case 'burst':
        this.updateBurst(st.phaseProgress, dt, elapsed);
        break;
      case 'rebirth':
        this.updateRebirth(st.phaseProgress, dt);
        break;
      case 'done':
        this.finish();
        return;
      default:
        break;
    }

    // 粒子更新（坍缩向内 / 爆发向外共用）
    for (let i = 0; i < MAX_PARTICLES; i += 1) {
      if (this.pLife[i] <= 0) continue;
      this.pLife[i] -= dt;
      this.pPos[i].addScaledVector(this.pVel[i], dt);
      // rebirth 阶段粒子减速并淡出
      if (st.phase === 'rebirth') {
        this.pVel[i].multiplyScalar(0.92);
      }
      const fade = Math.max(0, Math.min(1, this.pLife[i] / 1.5));
      this.syncInstance(i, fade);
      if (this.pLife[i] <= 0) this.hideInstance(i);
    }
    this.particles.instanceMatrix.needsUpdate = true;
  }

  private updateCollapse(p: number, _dt: number): void {
    // 核心收缩 1 → 0.05，白热化（emissive 增强、颜色偏白）
    const scale = 1 - p * 0.95;
    this.core.scale.setScalar(Math.max(0.05, scale));
    this.core.rotation.y += 0.04;
    this.coreMat.emissiveIntensity = 1.2 + p * 2.2;
    this.coreMat.emissive.lerpColors(new THREE.Color(0x6ad9ff), new THREE.Color(0xffffff), p);
    this.coreMat.opacity = 1;
    // 光晕环收紧
    this.halo.scale.setScalar(1 - p * 0.6);
    this.haloMat.opacity = 0.55 + p * 0.35;
    this.halo.rotation.z += 0.05;
    // 壳层与光不显现
    this.shellMat.opacity = 0;
    this.light.intensity = p * 8;
  }

  private updateBurst(p: number, _dt: number, elapsed: number): void {
    // 核心隐去（爆发瞬间），burst 后半段重新浮现
    const coreOpacity = p < 0.4 ? 0 : (p - 0.4) / 0.6;
    this.coreMat.opacity = coreOpacity;
    this.core.scale.setScalar(0.05 + coreOpacity * 0.95);
    this.coreMat.emissiveIntensity = 3.4 - coreOpacity * 2.0;
    // 点光源爆闪：0 → 峰值 → 衰减
    const flash = p < 0.3 ? p / 0.3 : 1 - (p - 0.3) / 0.7;
    this.light.intensity = flash * 220;
    // 扩张壳层
    const shellScale = 1 + p * 30;
    this.shell.scale.setScalar(shellScale);
    this.shellMat.opacity = (1 - p) * 0.6;
    this.shell.rotation.y += 0.02;
    this.shell.rotation.x += 0.015;
    // 光晕随壳层淡入新星雏形
    this.halo.scale.setScalar(0.4 + p * 0.6);
    this.haloMat.opacity = 0.35 + p * 0.4;

    // burst 起始帧：把粒子改为向外迸射
    if (elapsed - PRESTIGE_FX_DURATIONS.collapse < 0.05) {
      for (let i = 0; i < MAX_PARTICLES; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const elevation = (Math.random() - 0.5) * 0.8;
        const speed = 6 + Math.random() * 5;
        this.pVel[i].set(Math.cos(angle) * speed, elevation * speed + 1.5, Math.sin(angle) * speed);
        this.pLife[i] = PRESTIGE_FX_DURATIONS.burst + PRESTIGE_FX_DURATIONS.rebirth;
      }
    }
  }

  private updateRebirth(p: number, _dt: number): void {
    // 新星从点展开到正常，emissive 回落至常态
    this.coreMat.opacity = 1;
    this.core.scale.setScalar(1 + (1 - p) * 0.5);
    this.coreMat.emissiveIntensity = 2.0 - p * 0.8;
    this.coreMat.emissive.lerpColors(new THREE.Color(0xffffff), new THREE.Color(0x6ad9ff), p);
    this.core.rotation.y += 0.02;
    // 光晕恢复常态
    this.halo.scale.setScalar(1);
    this.haloMat.opacity = 0.55 - p * 0.2;
    this.haloMat.color.setHex(p > 0.5 ? 0x9af0ff : 0xffffff);
    // 壳层与光源淡出
    this.shellMat.opacity = 0;
    this.light.intensity = (1 - p) * 12;
  }

  /** 结束：隐藏全部视觉，恢复初始可见性 */
  private finish(): void {
    this.active = false;
    this.group.visible = false;
    this.core.scale.setScalar(1);
    this.coreMat.opacity = 1;
    this.coreMat.emissiveIntensity = 1.2;
    this.coreMat.emissive.setHex(0x6ad9ff);
    this.halo.scale.setScalar(1);
    this.haloMat.opacity = 0.55;
    this.shellMat.opacity = 0;
    this.light.intensity = 0;
    for (let i = 0; i < MAX_PARTICLES; i += 1) {
      this.pLife[i] = 0;
      this.hideInstance(i);
    }
    this.particles.instanceMatrix.needsUpdate = true;
  }

  dispose(): void {
    this.core.geometry.dispose();
    this.coreMat.dispose();
    this.halo.geometry.dispose();
    this.haloMat.dispose();
    this.shell.geometry.dispose();
    this.shellMat.dispose();
    this.particles.geometry.dispose();
    this.particleMat.dispose();
  }

  private syncInstance(i: number, fade: number): void {
    this.dummy.position.copy(this.pPos[i]);
    this.dummy.scale.setScalar(Math.max(0.001, fade));
    this.dummy.updateMatrix();
    this.particles.setMatrixAt(i, this.dummy.matrix);
  }

  private hideInstance(i: number): void {
    this.dummy.position.set(0, -100, 0);
    this.dummy.scale.setScalar(0.001);
    this.dummy.updateMatrix();
    this.particles.setMatrixAt(i, this.dummy.matrix);
  }
}
