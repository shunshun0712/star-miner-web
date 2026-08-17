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
} as const;
