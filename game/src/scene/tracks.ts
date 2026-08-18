import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { ART_TOKENS } from '../art/tokens';
import { materials } from './materials';
import type { FacilityId } from '../core/types';

const RING_RADIUS = 6;
const TRACK_Y = 1.0;
const POD_Y = 1.38;
const LOCKED_FACTOR = 0.45; // 锁定态亮度：可见但明显是待机
const CYAN = new THREE.Color(ART_TOKENS.color.cyan);
const GOLD = new THREE.Color(ART_TOKENS.color.gold);
const RED = new THREE.Color(ART_TOKENS.color.danger);
const UP = new THREE.Vector3(0, 1, 0);

/** 沿折线按里程取点：支持「支线 → 主环弧 → 卸货臂」的连续路径。 */
class TransportPath {
  readonly length: number;
  private pts: THREE.Vector3[];
  private cum: number[];

  constructor(pts: THREE.Vector3[]) {
    this.pts = pts;
    this.cum = [0];
    for (let i = 1; i < pts.length; i += 1) {
      this.cum.push(this.cum[i - 1] + pts[i].distanceTo(pts[i - 1]));
    }
    this.length = this.cum[this.cum.length - 1];
  }

  pointAt(t: number, out: THREE.Vector3): void {
    const d = Math.max(0, Math.min(this.length, t * this.length));
    let i = 1;
    while (i < this.cum.length - 1 && this.cum[i] < d) i += 1;
    const segLen = this.cum[i] - this.cum[i - 1];
    const k = segLen > 1e-6 ? (d - this.cum[i - 1]) / segLen : 0;
    out.lerpVectors(this.pts[i - 1], this.pts[i], k);
  }
}

function ringPoint(dir: THREE.Vector3): THREE.Vector3 {
  return dir.clone().normalize().multiplyScalar(RING_RADIUS);
}

function arcPts(fromAngle: number, radius: number, y: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  let a = ((fromAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const end = Math.PI * 2;
  while (a < end - 1e-4) {
    pts.push(new THREE.Vector3(Math.cos(a) * radius, y, Math.sin(a) * radius));
    a += 0.35;
  }
  pts.push(new THREE.Vector3(radius, y, 0));
  return pts;
}

function beamGeoXZ(a: THREE.Vector3, b: THREE.Vector3, w: number, h: number): THREE.BufferGeometry {
  const dir = b.clone().sub(a);
  const len = dir.length();
  const geo = new THREE.BoxGeometry(len, h, w);
  geo.translate(len / 2, 0, 0);
  geo.rotateY(-Math.atan2(dir.z, dir.x)); // 修正：+X 需对齐线段方向，取反旋转角，否则每段沿 Z 镜像导致断线
  geo.translate(a.x, 0, a.z);
  return geo;
}

/** 采掘器出料口 → 主环的平滑曲线（控制点向环心收，入口顺势切入主环）。 */
function spokeCurvePts(from: THREE.Vector3, to: THREE.Vector3, bend = 0.6): THREE.Vector3[] {
  const mid = from.clone().lerp(to, 0.5);
  const outward = mid.clone().normalize();
  const ctrl = mid.clone().addScaledVector(outward, -bend);
  const pts: THREE.Vector3[] = [];
  const N = 20; // 更多分段：单实线曲线更平滑，无折线感
  for (let i = 0; i <= N; i += 1) {
    const t = i / N;
    const a = from.clone().lerp(ctrl, t);
    const b = ctrl.clone().lerp(to, t);
    pts.push(a.lerp(b, t));
  }
  return pts;
}

/** 沿折线逐段生成盒状轨道梁并合并（平滑曲线轨道）。 */
function beamPolyGeo(pts: THREE.Vector3[], w: number, h: number): THREE.BufferGeometry {
  const geos: THREE.BufferGeometry[] = [];
  for (let i = 1; i < pts.length; i += 1) geos.push(beamGeoXZ(pts[i - 1], pts[i], w, h));
  return mergeGeometries(geos) ?? new THREE.BufferGeometry();
}

interface Spoke {
  from: THREE.Vector3;
  to: THREE.Vector3;
}

interface Source {
  path: TransportPath;
  clampDist: number;
  spokeIndex: number;
}

function spokeMatches(spokeIndex: number, selected: FacilityId | null): boolean {
  if (selected === 'transport') return spokeIndex < 4; // 控制站 = 全货运网高亮
  switch (spokeIndex) {
    case 0: return selected === 'excavator';
    case 1: return selected === 'he3Excavator';
    case 2: return selected === 'deuteriumExcavator';
    case 3: return selected === 'refinery';
    case 4: return selected === 'energyStation';
    default: return false;
  }
}

/**
 * 环形 + 放射运输轨道：货舱连续流动、方向箭头、能源线金色区分、选中设施高亮关联轨道。
 * 锁定态：轨道约 45% 亮度缓慢呼吸（可见但待机）；运行态：全亮 + 货舱流动。
 */
export class TransportTracks {
  readonly group = new THREE.Group();

  private ringGlowMat: THREE.MeshBasicMaterial;
  private spokeGlowMats: THREE.MeshBasicMaterial[] = [];
  private cargoPods: THREE.InstancedMesh;
  private energyOrbs: THREE.InstancedMesh;
  private arrows: THREE.InstancedMesh;
  private loadPortals: THREE.InstancedMesh;
  private dummy = new THREE.Object3D();
  private sources: Source[] = [];
  private energyPath: { from: THREE.Vector3; to: THREE.Vector3 };
  private arrowDefs: { pos: THREE.Vector3; dir: THREE.Vector3; gold: boolean; delivery?: boolean }[] = [];
  private dist: number[] = [];
  private t = 0;
  private congested = false;

  constructor() {
    // —— 主环（钢轨 + 青色能量线）——
    const ringSteel = new THREE.Mesh(new THREE.TorusGeometry(RING_RADIUS, 0.16, 8, 64), materials.hullSteel);
    ringSteel.rotation.x = Math.PI / 2;
    ringSteel.position.y = TRACK_Y;
    this.group.add(ringSteel);
    this.ringGlowMat = materials.cyanEnergy.clone();
    this.ringGlowMat.transparent = true;
    const ringGlow = new THREE.Mesh(new THREE.TorusGeometry(RING_RADIUS + 0.2, 0.05, 6, 64), this.ringGlowMat);
    ringGlow.rotation.x = Math.PI / 2;
    ringGlow.position.y = TRACK_Y + 0.07;
    this.group.add(ringGlow);

    // —— 放射支线（钢轨合并 + 逐支线发光，便于选中高亮）——
    // 出料口（收集仓侧，朝向主环）→ 主环：平滑曲线，避免轨道从钻头侧反向伸出
    const miners = [new THREE.Vector3(-12, 0, -7), new THREE.Vector3(12, 0, -7), new THREE.Vector3(0, 0, -14)];
    const minerPorts = [
      new THREE.Vector3(-10.75, 0, -6.85),
      new THREE.Vector3(10.75, 0, -6.85),
      new THREE.Vector3(0.15, 0, -12.75),
    ];
    const spokes: Spoke[] = [];
    const spokeCurves: THREE.Vector3[][] = [];
    for (let i = 0; i < miners.length; i += 1) {
      const port = minerPorts[i];
      const to = ringPoint(miners[i]);
      const curve = spokeCurvePts(port, to);
      spokeCurves.push(curve);
      spokes.push({ from: curve[0], to: curve[curve.length - 1] });
    }
    const delivery: Spoke = { from: new THREE.Vector3(5.2, 0, 0), to: new THREE.Vector3(1.05, 0, 0) };
    spokes.push(delivery);
    const energy: Spoke = { from: new THREE.Vector3(0, 0, 11.0), to: new THREE.Vector3(0, 0, 6.3) };
    spokes.push(energy);

    // 三条采掘支线改为「单实线」：不再叠钢轨 + 发光条两层，只保留一条连续发光轨道
    const steelGeos: THREE.BufferGeometry[] = [];
    steelGeos.push(beamGeoXZ(spokes[3].from, spokes[3].to, 0.26, 0.14));
    steelGeos.push(beamGeoXZ(spokes[4].from, spokes[4].to, 0.26, 0.14));
    const steelSpokes = new THREE.Mesh(mergeGeometries(steelGeos) ?? new THREE.BufferGeometry(), materials.hullSteel);
    steelSpokes.position.y = TRACK_Y;
    this.group.add(steelSpokes);

    for (let i = 0; i < spokes.length; i += 1) {
      const s = spokes[i];
      const mat = materials.cyanEnergy.clone();
      mat.transparent = true;
      if (i === 4) mat.color.copy(GOLD); // 能源线：金色
      let glowGeo: THREE.BufferGeometry;
      if (i === 3) {
        // 卸货臂（枢纽 → 精炼厂）：双轨能量带，抬高到枢纽钢臂之上避免被遮挡
        const railDir = s.to.clone().sub(s.from).normalize();
        const perp = new THREE.Vector3(-railDir.z, 0, railDir.x);
        const rails: THREE.BufferGeometry[] = [];
        for (const off of [-0.16, 0.16]) {
          const a = s.from.clone().addScaledVector(perp, off);
          const b = s.to.clone().addScaledVector(perp, off);
          rails.push(beamGeoXZ(a, b, 0.16, 0.1));
        }
        glowGeo = mergeGeometries(rails) ?? new THREE.BufferGeometry();
      } else if (i < 3) {
        glowGeo = beamPolyGeo(spokeCurves[i], 0.22, 0.08);
      } else {
        glowGeo = beamGeoXZ(s.from, s.to, 0.14, 0.06);
      }
      const glow = new THREE.Mesh(glowGeo, mat);
      glow.position.y = i === 3 ? TRACK_Y + 0.2 : TRACK_Y + 0.07;
      this.group.add(glow);
      this.spokeGlowMats.push(mat);
    }

    // —— 连接点：采掘器出料口的装料站（六边形接料台 + 门架支柱 + 青色装载环）——
    const dockGeos: THREE.BufferGeometry[] = [];
    for (let i = 0; i < minerPorts.length; i += 1) {
      const p = minerPorts[i];
      const back = p.clone().addScaledVector(spokes[i].to.clone().sub(spokes[i].from).normalize(), -0.6);
      dockGeos.push(new THREE.CylinderGeometry(0.72, 0.82, 0.28, 6).translate(p.x, 0.14, p.z));
      dockGeos.push(new THREE.CylinderGeometry(0.07, 0.09, 1.35, 8).translate(back.x, 0.675, back.z));
    }
    // —— 精炼厂接料台：六边形平台 + 门架，接住卸货臂货舱 ——
    const refDock = new THREE.Vector3(1.05, 0, 0);
    dockGeos.push(new THREE.CylinderGeometry(0.72, 0.82, 0.28, 6).translate(refDock.x, 0.14, refDock.z));
    dockGeos.push(new THREE.CylinderGeometry(0.07, 0.09, 1.35, 8).translate(refDock.x - 0.55, 0.675, refDock.z));

    const dockMesh = new THREE.Mesh(mergeGeometries(dockGeos) ?? new THREE.BufferGeometry(), materials.hullSteel);
    dockMesh.position.y = TRACK_Y;
    this.group.add(dockMesh);
    this.loadPortals = this.makePods(new THREE.TorusGeometry(0.55, 0.06, 8, 24), minerPorts.length + 1, true);
    for (let i = 0; i < minerPorts.length; i += 1) {
      const p = minerPorts[i];
      const dir = spokes[i].to.clone().sub(spokes[i].from).setY(0).normalize();
      this.dummy.position.set(p.x, TRACK_Y + 0.38, p.z);
      this.dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
      this.dummy.scale.setScalar(1);
      this.dummy.updateMatrix();
      this.loadPortals.setMatrixAt(i, this.dummy.matrix);
      this.loadPortals.setColorAt(i, CYAN);
    }
    {
      const refDir = delivery.to.clone().sub(delivery.from).setY(0).normalize();
      this.dummy.position.set(refDock.x, TRACK_Y + 0.38, refDock.z);
      this.dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), refDir);
      this.dummy.scale.setScalar(1);
      this.dummy.updateMatrix();
      this.loadPortals.setMatrixAt(minerPorts.length, this.dummy.matrix);
      this.loadPortals.setColorAt(minerPorts.length, CYAN);
    }

    // —— 连续货舱路径：支线 → 主环弧 → 枢纽 → 卸货臂 → 精炼厂 ——
    const minerAngles = [Math.atan2(-7, -12), Math.atan2(-7, 12), Math.atan2(-14, 0)];
    for (let i = 0; i < miners.length; i += 1) {
      const from = minerPorts[i].clone().setY(POD_Y);
      const p = ringPoint(miners[i]).setY(POD_Y);
      const arc = arcPts(minerAngles[i], RING_RADIUS, POD_Y);
      const curvePts = spokeCurvePts(from, p);
      const pts = [...curvePts, ...arc, new THREE.Vector3(6, POD_Y, 0), new THREE.Vector3(1.05, POD_Y, 0)];
      const path = new TransportPath(pts);
      this.sources.push({ path, clampDist: path.length - 0.95, spokeIndex: i });
      this.dist.push(i * 2.5);
    }
    this.energyPath = { from: new THREE.Vector3(0, POD_Y, 11.0), to: new THREE.Vector3(0, POD_Y, 6.3) };

    // —— 方向箭头（支线指向精炼中心、主环逆时针指向枢纽；能源支线金色）——
    for (let i = 0; i < 3; i += 1) {
      const curve = spokeCurves[i];
      for (const k of [0.3, 0.62]) {
        const idx = Math.round(k * (curve.length - 1));
        const a = curve[Math.max(0, idx - 1)];
        const b = curve[Math.min(curve.length - 1, idx + 1)];
        this.arrowDefs.push({
          pos: curve[idx].clone().setY(POD_Y + 0.12),
          dir: b.clone().sub(a).setY(0).normalize(),
          gold: false,
        });
      }
    }
    const dDir = delivery.to.clone().sub(delivery.from).normalize();
    this.arrowDefs.push({ pos: delivery.from.clone().lerp(delivery.to, 0.5).setY(POD_Y + 0.12), dir: dDir, gold: false, delivery: true });
    const eDir = energy.to.clone().sub(energy.from).normalize();
    this.arrowDefs.push({ pos: energy.from.clone().lerp(energy.to, 0.5).setY(POD_Y + 0.12), dir: eDir, gold: true });
    // 主环箭头放在离各支线入口足够远的弧段中点（入口角：采掘 3.67 / 氘 4.71 / 氦-3 5.76 / 枢纽 0）
    const arcMids = [1.7, 2.8, 4.25, 5.3, 6.05];
    for (const a of arcMids) {
      this.arrowDefs.push({
        pos: new THREE.Vector3(Math.cos(a) * RING_RADIUS, POD_Y + 0.12, Math.sin(a) * RING_RADIUS),
        dir: new THREE.Vector3(-Math.sin(a), 0, Math.cos(a)),
        gold: false,
      });
    }

    this.arrows = this.makePods(new THREE.ConeGeometry(0.14, 0.3, 4), this.arrowDefs.length, false);
    this.cargoPods = this.makePods(new THREE.SphereGeometry(0.44, 10, 10), 6, true);
    this.energyOrbs = this.makePods(new THREE.SphereGeometry(0.24, 10, 10), 2, true);
  }

  update(dt: number, activity: number, congested: boolean, selected: FacilityId | null = null): void {
    this.congested = congested;
    this.t += dt;
    const running = activity > 0.001;
    if (running) {
      const speed = 2.2 + activity * 2.4;
      for (let i = 0; i < this.sources.length; i += 1) this.dist[i] += speed * dt;
    }
    const cargoColor = congested ? RED : CYAN; // 拥堵时整网变红（原版效果）

    // —— 逐支线发光：能源线金色；锁定 45% 呼吸；选中高亮、未选中压暗 ——
    const lockedGlow = LOCKED_FACTOR + 0.08 * Math.sin(this.t * 2.5);
    const cargoSelected = running && selected !== null && selected !== 'energyStation';
    for (let i = 0; i < this.spokeGlowMats.length; i += 1) {
      const mat = this.spokeGlowMats[i];
      const isEnergy = i === 4;
      const base = isEnergy ? GOLD : cargoColor;
      let factor: number;
      if (!running) {
        factor = lockedGlow;
      } else if (isEnergy) {
        factor = selected === 'energyStation' ? 1.1 : 0.7 + 0.2 * Math.sin(this.t * 5);
      } else if (i < 3) {
        // 三条采掘支线完全一致：以中间线为基准的统一亮度，不因选中而增亮/压暗
        factor = congested ? 0.9 : 0.8 + 0.15 * Math.sin(this.t * 6);
      } else if (spokeMatches(i, selected)) {
        factor = 1.15 + 0.05 * Math.sin(this.t * 6); // 卸货臂高亮
      } else if (cargoSelected) {
        factor = 0.42 + 0.08 * Math.sin(this.t * 3);
      } else {
        factor = congested ? 0.9 : 0.6 + 0.25 * Math.sin(this.t * 6);
      }
      mat.color.copy(base).multiplyScalar(factor);
      mat.opacity = !running ? 0.9 : 1;
    }

    // —— 主环发光（选中运输线/精炼厂时最亮，选中采掘器时略暗突出支线）——
    let ringFactor: number;
    if (!running) {
      ringFactor = lockedGlow;
    } else if (selected === 'transport' || selected === 'refinery') {
      ringFactor = 1.1;
    } else if (cargoSelected) {
      ringFactor = 0.5 + 0.06 * Math.sin(this.t * 3);
    } else {
      ringFactor = congested ? 0.9 : 0.6 + 0.25 * Math.sin(this.t * 6);
    }
    this.ringGlowMat.color.copy(cargoColor).multiplyScalar(ringFactor);
    this.ringGlowMat.opacity = !running ? 0.9 : 1;

    // —— 货舱（选中源货舱变金）——
    let idx = 0;
    for (let s = 0; s < this.sources.length; s += 1) {
      const src = this.sources[s];
      const path = src.path;
      for (let j = 0; j < 2; j += 1) {
        let d = (this.dist[s] + j * path.length * 0.5) % path.length;
        if (congested) d = Math.min(d, Math.max(0, src.clampDist - idx * 0.35));
        path.pointAt(d / path.length, this.dummy.position);
        let podScale = running ? 1 : 0.001;
        if (running && d > path.length - 1.15) {
          // 进入精炼厂接料台：末段逐渐缩小，模拟卸货
          podScale = Math.max(0.001, 1 - (d - (path.length - 1.15)) / 1.15);
        }
        this.dummy.scale.setScalar(podScale);
        this.dummy.updateMatrix();
        this.cargoPods.setMatrixAt(idx, this.dummy.matrix);
        this.cargoPods.setColorAt(idx, cargoColor); // 三条支线货舱统一颜色，与中间线一致
        idx += 1;
      }
    }

    // —— 能源球（金色，能源站 → 主环）——
    for (let i = 0; i < 2; i += 1) {
      const tt = (this.t * 0.6 + i * 0.5) % 1;
      this.dummy.position.lerpVectors(this.energyPath.from, this.energyPath.to, tt);
      this.dummy.scale.setScalar(running ? 0.9 : 0.001);
      this.dummy.updateMatrix();
      this.energyOrbs.setMatrixAt(i, this.dummy.matrix);
      this.energyOrbs.setColorAt(i, GOLD);
    }

    // —— 方向箭头 ——
    const arrowFactor = running ? (congested ? 0.85 : 0.8) : lockedGlow;
    for (let i = 0; i < this.arrowDefs.length; i += 1) {
      const def = this.arrowDefs[i];
      this.dummy.position.copy(def.pos);
      this.dummy.quaternion.setFromUnitVectors(UP, def.dir);
      this.dummy.scale.setScalar(running ? 1 : 0.55);
      this.dummy.updateMatrix();
      this.arrows.setMatrixAt(i, this.dummy.matrix);
      const color = def.gold ? GOLD : cargoColor;
      this.arrows.setColorAt(i, color.clone().multiplyScalar(arrowFactor));
    }

    // —— 装料站装载环：与货舱同色呼吸，拥堵变红 ——
    const portalFactor = running ? (congested ? 0.9 : 0.8 + 0.2 * Math.sin(this.t * 4)) : lockedGlow;
    for (let i = 0; i < this.loadPortals.count; i += 1) {
      this.loadPortals.setColorAt(i, cargoColor.clone().multiplyScalar(portalFactor));
    }
    this.loadPortals.instanceColor!.needsUpdate = true;

    this.cargoPods.instanceMatrix.needsUpdate = true;
    this.energyOrbs.instanceMatrix.needsUpdate = true;
    this.arrows.instanceMatrix.needsUpdate = true;
    this.cargoPods.instanceColor!.needsUpdate = true;
    this.energyOrbs.instanceColor!.needsUpdate = true;
    this.arrows.instanceColor!.needsUpdate = true;
  }

  private makePods(geo: THREE.BufferGeometry, count: number, withColor: boolean): THREE.InstancedMesh {
    const mesh = new THREE.InstancedMesh(geo, new THREE.MeshBasicMaterial({ color: 0xffffff }), count);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.frustumCulled = false;
    for (let i = 0; i < count; i += 1) {
      this.dummy.position.set(0, -100, 0);
      this.dummy.scale.setScalar(0.001);
      this.dummy.quaternion.identity();
      this.dummy.updateMatrix();
      mesh.setMatrixAt(i, this.dummy.matrix);
      if (withColor) mesh.setColorAt(i, CYAN);
    }
    this.group.add(mesh);
    return mesh;
  }
}