import * as THREE from 'three';
import { ART_TOKENS } from '../art/tokens';
import { createMetalTexture, type MetalTextureOptions } from './textures';

const cache = new Map<string, THREE.MeshStandardMaterial>();

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function metal(name: string, base: string, accent?: string): THREE.MeshStandardMaterial {
  const key = `metal:${name}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const opts: MetalTextureOptions = { base, panelLine: '#3a414e', seed: hash(name) };
  if (accent) {
    opts.accent = accent;
    opts.accentChance = 0.18;
  }
  const mat = new THREE.MeshStandardMaterial({
    map: createMetalTexture(opts),
    metalness: 0.85,
    roughness: 0.45,
  });
  cache.set(key, mat);
  return mat;
}

const c = ART_TOKENS.color;

/**
 * M3：材质去重登记表——共享材质被多个 mesh 引用，traverse 时若逐 mesh dispose
 * 同一实例会触发 WebGL 错误。safeDispose 用 WeakSet 保证每实例只释放一次。
 * 导出供 gameScene.teardownGraphics 遍历时复用同一去重表。
 */
const disposed = new WeakSet<THREE.Material>();

export function safeDispose(mat: THREE.Material): void {
  if (!disposed.has(mat)) {
    disposed.add(mat);
    mat.dispose();
  }
}

/** 共享材质缓存：3D 设施统一从这里取材质，避免每网格新建。 */
export const materials = {
  hullDark: metal('hull-dark', '#20242b'),
  hullSteel: metal('hull-steel', '#2e333c'),
  drillSteel: metal('drill-steel', '#3a404b'),
  gold: new THREE.MeshStandardMaterial({ color: c.gold, metalness: 1.0, roughness: 0.32 }),
  cyanEnergy: new THREE.MeshBasicMaterial({ color: c.cyan }),
  purpleCrystal: new THREE.MeshStandardMaterial({
    color: c.purple,
    emissive: c.purple,
    emissiveIntensity: 1.1,
    metalness: 0.3,
    roughness: 0.2,
  }),
  orangeBeacon: new THREE.MeshStandardMaterial({
    color: c.orange,
    emissive: c.orange,
    emissiveIntensity: 1.0,
    metalness: 0.2,
    roughness: 0.4,
  }),
  orangeWarn: new THREE.MeshStandardMaterial({
    color: c.orange,
    emissive: c.orange,
    emissiveIntensity: 0.35,
    metalness: 0.4,
    roughness: 0.5,
  }),
  dust: new THREE.MeshBasicMaterial({ color: c.dust }),

  /**
   * M3：释放 cache + 单例中的所有材质（safeDispose 去重），清空 cache，
   * 并重建单例 + cache，使 reinitGraphics() 重建场景时拿到全新 GPU 资源。
   * traverse 中已通过 safeDispose 释放过的材质在此自动跳过。
   */
  disposeAll(): void {
    for (const mat of cache.values()) safeDispose(mat);
    cache.clear();
    safeDispose(this.gold);
    safeDispose(this.cyanEnergy);
    safeDispose(this.purpleCrystal);
    safeDispose(this.orangeBeacon);
    safeDispose(this.orangeWarn);
    safeDispose(this.dust);
    // hullDark/hullSteel/drillSteel 来自 cache，已在上面的循环中释放
    // 重建单例 + cache，供下一轮 buildGraphics 使用
    this.hullDark = metal('hull-dark', '#20242b');
    this.hullSteel = metal('hull-steel', '#2e333c');
    this.drillSteel = metal('drill-steel', '#3a404b');
    this.gold = new THREE.MeshStandardMaterial({ color: c.gold, metalness: 1.0, roughness: 0.32 });
    this.cyanEnergy = new THREE.MeshBasicMaterial({ color: c.cyan });
    this.purpleCrystal = new THREE.MeshStandardMaterial({
      color: c.purple,
      emissive: c.purple,
      emissiveIntensity: 1.1,
      metalness: 0.3,
      roughness: 0.2,
    });
    this.orangeBeacon = new THREE.MeshStandardMaterial({
      color: c.orange,
      emissive: c.orange,
      emissiveIntensity: 1.0,
      metalness: 0.2,
      roughness: 0.4,
    });
    this.orangeWarn = new THREE.MeshStandardMaterial({
      color: c.orange,
      emissive: c.orange,
      emissiveIntensity: 0.35,
      metalness: 0.4,
      roughness: 0.5,
    });
    this.dust = new THREE.MeshBasicMaterial({ color: c.dust });
  },
};
