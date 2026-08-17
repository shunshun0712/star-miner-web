import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { materials } from '../materials';
import { DustParticles } from '../particles';

export interface ExcavatorAnim {
  drill: THREE.Group;
  crystalMat: THREE.MeshStandardMaterial;
  beaconMat: THREE.MeshStandardMaterial;
  energyMat: THREE.MeshBasicMaterial;
  pulseGroup: THREE.Group;
  light: THREE.PointLight;
  dust: DustParticles;
  drillTip: THREE.Object3D;
}

interface Part {
  geo: THREE.BufferGeometry;
  pos?: [number, number, number];
  rot?: [number, number, number];
}

function merged(parts: Part[]): THREE.BufferGeometry {
  const geos: THREE.BufferGeometry[] = [];
  for (const p of parts) {
    const g = p.geo.clone();
    if (p.rot) g.rotateX(p.rot[0]).rotateY(p.rot[1]).rotateZ(p.rot[2]);
    if (p.pos) g.translate(p.pos[0], p.pos[1], p.pos[2]);
    geos.push(g);
  }
  const out = mergeGeometries(geos);
  if (!out) throw new Error('excavator: mergeGeometries failed');
  return out;
}

/**
 * 采掘器：纯代码几何体，设计依据——
 * 六边形底座=稳定支撑（全游戏统一符号）；机身=动力舱（散热鳍+金色徽标）；
 * 钻头组件=破岩机构（橙色警示带）；收集仓=矿石暂存（紫色晶体光）；警示灯=工作状态。
 * 新增 draw call ≤10，三角面 ≤1500。
 */
export function buildExcavator(group: THREE.Group): ExcavatorAnim {
  const hull = materials.hullDark;
  const pulseGroup = new THREE.Group();
  group.add(pulseGroup);

  // —— 静态船体（六边形底座 + 主箱 + 顶舱 + 引擎 + 散热鳍 + 收集仓）——
  const hullMesh = new THREE.Mesh(
    merged([
      { geo: new THREE.CylinderGeometry(2.1, 2.3, 0.5, 6), pos: [0, 0.25, 0] },
      { geo: new THREE.BoxGeometry(2.2, 1.2, 1.9), pos: [0, 1.35, 0] },
      { geo: new THREE.BoxGeometry(1.2, 0.7, 1.3), pos: [0.1, 2.2, -0.1] },
      { geo: new THREE.BoxGeometry(0.9, 0.8, 1.4), pos: [-0.55, 1.45, -1.05] },
      { geo: new THREE.BoxGeometry(0.12, 0.5, 1.2), pos: [1.15, 1.5, 0.15] },
      { geo: new THREE.BoxGeometry(0.12, 0.5, 1.2), pos: [-1.15, 1.5, 0.15] },
      { geo: new THREE.BoxGeometry(0.12, 0.5, 1.2), pos: [1.15, 1.5, -0.75] },
      { geo: new THREE.BoxGeometry(0.12, 0.5, 1.2), pos: [-1.15, 1.5, -0.75] },
      { geo: new THREE.BoxGeometry(1.15, 0.95, 1.25), pos: [1.25, 0.95, 0.15] },
    ]),
    hull,
  );
  hullMesh.castShadow = true;
  pulseGroup.add(hullMesh);

  // —— 金色装饰（底座描边环 + 前徽标六边形）——
  const goldMesh = new THREE.Mesh(
    merged([
      { geo: new THREE.TorusGeometry(2.18, 0.07, 6, 24), pos: [0, 0.5, 0], rot: [Math.PI / 2, 0, 0] },
      { geo: new THREE.CylinderGeometry(0.3, 0.3, 0.06, 6), pos: [0.72, 1.55, 0.96], rot: [Math.PI / 2, 0, 0] },
    ]),
    materials.gold,
  );
  goldMesh.castShadow = true;
  pulseGroup.add(goldMesh);

  // —— 能量线（青色环，独立以便发光动画）——
  const energyMat = materials.cyanEnergy.clone();
  const energyRing = new THREE.Mesh(new THREE.TorusGeometry(1.86, 0.06, 6, 32), energyMat);
  energyRing.rotation.x = Math.PI / 2;
  energyRing.position.y = 0.72;
  pulseGroup.add(energyRing);

  // —— 收集仓内晶体（紫，独立以便脉动）——
  const crystalMat = materials.purpleCrystal.clone();
  const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.34), crystalMat);
  crystal.position.set(1.25, 1.15, 0.15);
  pulseGroup.add(crystal);
  const crystal2 = new THREE.Mesh(new THREE.OctahedronGeometry(0.2), crystalMat);
  crystal2.position.set(1.35, 0.85, -0.25);
  crystal2.rotation.set(0.5, 0.3, 0);
  pulseGroup.add(crystal2);

  // —— 警示灯（顶部，独立以便闪烁）——
  const beaconMat = materials.orangeBeacon.clone();
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), beaconMat);
  beacon.position.set(0, 2.65, 0);
  pulseGroup.add(beacon);

  // —— 钻头组件（独立组，整体旋转，螺旋带让旋转可见）——
  const drill = new THREE.Group();
  drill.position.set(-1.25, 1.55, 0.35);
  drill.rotation.z = -0.5;
  const drillMesh = new THREE.Mesh(
    merged([
      { geo: new THREE.CylinderGeometry(0.16, 0.2, 1.1, 10), pos: [0, -0.55, 0] },
      { geo: new THREE.ConeGeometry(0.42, 0.9, 10), pos: [0, -1.55, 0], rot: [Math.PI, 0, 0] },
      { geo: new THREE.BoxGeometry(0.05, 1.5, 0.14), pos: [0, -1.05, 0], rot: [0, 0.7, 0] },
      { geo: new THREE.BoxGeometry(0.05, 1.5, 0.14), pos: [0, -1.05, 0], rot: [0, -0.7, 0] },
    ]),
    materials.drillSteel,
  );
  drillMesh.castShadow = true;
  drill.add(drillMesh);
  const warnStripes = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.055, 6, 12), materials.orangeWarn);
  warnStripes.position.y = -1.05;
  warnStripes.rotation.x = Math.PI / 2;
  drill.add(warnStripes);
  const drillTip = new THREE.Object3D();
  drillTip.position.set(0, -2.1, 0);
  drill.add(drillTip);
  pulseGroup.add(drill);

  // —— 钻架（连接机身与钻头）——
  const cradle = new THREE.Mesh(
    merged([{ geo: new THREE.BoxGeometry(0.35, 0.5, 1.0), pos: [-1.05, 1.7, 0.35], rot: [0, 0, -0.5] }]),
    materials.hullSteel,
  );
  cradle.castShadow = true;
  pulseGroup.add(cradle);

  // —— 点光源（升级脉冲时增亮）——
  const light = new THREE.PointLight(0xffffff, 6, 12, 1.6);
  light.position.set(0.3, 2.4, 0.7);
  pulseGroup.add(light);

  // —— 碎屑粒子（不随脉冲缩放）——
  const dust = new DustParticles();
  group.add(dust.mesh);

  return { drill, crystalMat, beaconMat, energyMat, pulseGroup, light, dust, drillTip };
}
