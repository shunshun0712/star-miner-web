import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { materials } from '../materials';

/**
 * 运输枢纽（主环东侧转运节点）：六边形底座 + 金色描边 + 控制塔 + 转运臂，
 * 与采掘器样板同一设计语言；环 + 支线轨道与货舱由 tracks.ts 负责。
 */
export function buildTransportHub(group: THREE.Group): void {
  const base = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.2, 0.5, 6), materials.hullDark);
  base.position.y = 0.25;
  base.castShadow = true;
  group.add(base);

  const goldRing = new THREE.Mesh(new THREE.TorusGeometry(2.06, 0.06, 6, 24), materials.gold);
  goldRing.rotation.x = Math.PI / 2;
  goldRing.position.y = 0.5;
  group.add(goldRing);

  const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.68, 1.7, 10), materials.hullSteel);
  tower.position.y = 1.45;
  tower.castShadow = true;
  group.add(tower);

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.7, 0.9), materials.hullDark);
  cabin.position.y = 2.3;
  cabin.castShadow = true;
  group.add(cabin);

  const badge = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.05, 6), materials.gold);
  badge.rotation.x = Math.PI / 2;
  badge.position.set(0, 2.3, 0.46);
  group.add(badge);

  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.9, 8), materials.hullSteel);
  antenna.position.y = 2.95;
  group.add(antenna);

  // M3：beacon 不需独立动画，直接用共享材质（traverse + safeDispose 统一释放）
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 10), materials.orangeBeacon);
  beacon.position.y = 3.4;
  group.add(beacon);

  // 转运臂：西侧接环、东侧发射（hub 在 (6,0)，精炼厂在 (0,0) 即西侧）
  // M3：合并后释放临时 BoxGeometry，避免 GPU 内存泄漏
  const armGeo1 = new THREE.BoxGeometry(2.4, 0.28, 0.5).translate(-1.2, 0, 0);
  const armGeo2 = new THREE.BoxGeometry(0.5, 0.28, 1.2).translate(1.2, 0, 0);
  const armGeo = mergeGeometries([armGeo1, armGeo2]) ?? new THREE.BufferGeometry();
  armGeo1.dispose();
  armGeo2.dispose();
  const arm = new THREE.Mesh(armGeo, materials.hullSteel);
  arm.position.set(4.9, 1.05, 0);
  arm.castShadow = true;
  group.add(arm);

  // M3：strip/lamp 不需独立动画，直接用共享材质
  const strip = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.06, 0.12), materials.cyanEnergy);
  strip.position.set(4.9, 1.22, 0);
  group.add(strip);

  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), materials.cyanEnergy);
  lamp.position.set(4.9, 1.35, 0);
  group.add(lamp);
}
