import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FACILITIES, FACILITY_ORDER } from '../core/config';
import type { FacilityId, FacilityStatus } from '../core/types';
import { createGroundTexture, createHullTexture, createSkyboxTexture } from './textures';
import { ART_TOKENS } from '../art/tokens';
import { easeOutBackUpgrade } from '../art/easing';
import { buildExcavator, type ExcavatorAnim } from './facilities/excavator';
import { buildTransportHub } from './facilities/transport';
import { TransportTracks } from './tracks';

export interface SceneSyncState {
  statuses: Record<FacilityId, FacilityStatus>;
  selected: FacilityId | null;
  transportActivity: number;
  bottlenecks: FacilityId[];
  transportCongested: boolean;
}

const STATUS_COLORS: Record<FacilityStatus, number> = {
  ONLINE: 0x58e0a1,
  LOCKED: 0x3d4c63,
  BUILDING: 0xff9f43,
  UPGRADING: 0xff9f43,
  OFFLINE: 0x445066,
};

const POSITIONS: Record<FacilityId, [number, number]> = {
  excavator: [-12, -7],
  he3Excavator: [12, -7],
  deuteriumExcavator: [0, -14],
  transport: [6, 0],
  refinery: [0, 0],
  energyStation: [0, 12],
};

interface FacilityVisual {
  id: FacilityId;
  group: THREE.Group;
  ringMat: THREE.MeshBasicMaterial;
  pips: THREE.Mesh[];
  pipPhase: number;
  pulse: number;
  excavator?: ExcavatorAnim;
}

export class GameScene {
  private renderer: THREE.WebGLRenderer | null = null;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera | null = null;
  private controls: OrbitControls | null = null;
  private container: HTMLElement | null = null;
  private labelsLayer: HTMLElement | null = null;
  private visuals = new Map<FacilityId, FacilityVisual>();
  private labelEls = new Map<FacilityId, HTMLElement>();
  private skyTex: THREE.Texture | null = null;
  private groundTex: THREE.Texture | null = null;
  private hullTex: THREE.Texture | null = null;
  private tracks: TransportTracks | null = null;
  private transportCongested = false;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private tmpVec = new THREE.Vector3();
  private clock = new THREE.Clock();
  private raf = 0;
  private running = false;
  private selected: FacilityId | null = null;
  private onSelect: ((id: FacilityId | null) => void) | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private activity = 0;
  private bottlenecks: FacilityId[] = [];
  private elapsed = 0;
  private pulses = new Map<FacilityId, number>();
  private energyBase = new THREE.Color(ART_TOKENS.color.cyan);
  private statuses: Record<FacilityId, FacilityStatus> = {
    excavator: 'ONLINE',
    he3Excavator: 'LOCKED',
    deuteriumExcavator: 'LOCKED',
    transport: 'LOCKED',
    refinery: 'LOCKED',
    energyStation: 'LOCKED',
  };

  init(
    container: HTMLElement,
    labelsLayer: HTMLElement,
    opts: { onSelect?: (id: FacilityId | null) => void } = {},
  ): void {
    this.container = container;
    this.labelsLayer = labelsLayer;
    this.onSelect = opts.onSelect ?? null;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(Math.max(1, container.clientWidth), Math.max(1, container.clientHeight));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);
    this.renderer = renderer;

    const camera = new THREE.PerspectiveCamera(
      50,
      Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight),
      0.1,
      300,
    );
    camera.position.set(0, 30, 32);
    this.camera = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 12;
    controls.maxDistance = 60;
    controls.maxPolarAngle = 1.35;
    this.controls = controls;

    this.scene.background = new THREE.Color(0x050a14);
    this.scene.fog = new THREE.Fog(0x050a14, 50, 120);

    this.skyTex = createSkyboxTexture();
    this.groundTex = createGroundTexture();
    this.hullTex = createHullTexture();

    this.buildLights();
    this.buildSkybox();
    this.buildGround();
    this.buildFacilities();
    this.buildTracks();

    renderer.domElement.addEventListener('pointerdown', this.onPointerDown);
    renderer.domElement.addEventListener('pointermove', this.onPointerMove);
    renderer.domElement.addEventListener('webglcontextlost', this.onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', this.onContextRestored);

    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(container);
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.clock.start();
    this.raf = requestAnimationFrame(this.frame);
  }

  setPaused(paused: boolean): void {
    if (this.controls) this.controls.enabled = !paused;
  }

  sync(s: SceneSyncState): void {
    this.statuses = s.statuses;
    this.selected = s.selected;
    this.activity = s.transportActivity;
    this.bottlenecks = s.bottlenecks;
    this.transportCongested = s.transportCongested;
  }

  dispose(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.resizeObserver?.disconnect();
    this.renderer?.domElement.removeEventListener('pointerdown', this.onPointerDown);
    this.renderer?.domElement.removeEventListener('pointermove', this.onPointerMove);
    this.renderer?.domElement.removeEventListener('webglcontextlost', this.onContextLost);
    this.renderer?.domElement.removeEventListener('webglcontextrestored', this.onContextRestored);
    this.controls?.dispose();
    this.skyTex?.dispose();
    this.groundTex?.dispose();
    this.hullTex?.dispose();
    this.renderer?.dispose();
    this.renderer?.domElement.remove();
    for (const label of this.labelEls.values()) label.remove();
    this.labelEls.clear();
    for (const v of this.visuals.values()) v.excavator?.dust.dispose();
    this.visuals.clear();
  }

  private onContextLost = (e: Event): void => {
    e.preventDefault();
    this.running = false;
    cancelAnimationFrame(this.raf);
  };

  private onContextRestored = (): void => {
    this.running = true;
    this.clock.getDelta();
    this.raf = requestAnimationFrame(this.frame);
  };

  private onPointerDown = (e: PointerEvent): void => {
    if (!this.renderer) return;
    const hit = this.pick(e);
    if (hit) {
      this.selected = hit;
      this.onSelect?.(hit);
    } else {
      this.onSelect?.(null);
    }
  };

  private onPointerMove = (e: PointerEvent): void => {
    if (!this.renderer) return;
    const hit = this.pick(e);
    this.renderer.domElement.style.cursor = hit ? 'pointer' : 'grab';
  };

  private pick(e: PointerEvent): FacilityId | null {
    if (!this.renderer || !this.camera) return null;
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / Math.max(1, rect.height)) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const groups = [...this.visuals.values()].map((v) => v.group);
    const hits = this.raycaster.intersectObjects(groups, true);
    if (hits.length === 0) return null;
    let obj: THREE.Object3D | null = hits[0].object;
    while (obj) {
      const id = obj.userData.facilityId as FacilityId | undefined;
      if (id && this.visuals.has(id)) return id;
      obj = obj.parent;
    }
    return null;
  }

  private handleResize(): void {
    if (!this.container || !this.renderer || !this.camera) return;
    const w = Math.max(1, this.container.clientWidth);
    const h = Math.max(1, this.container.clientHeight);
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  private buildLights(): void {
    this.scene.add(new THREE.AmbientLight(0x334466, 0.9));
    const hemi = new THREE.HemisphereLight(0x8899bb, 0x0a0f1a, 0.7);
    this.scene.add(hemi);
    const key = new THREE.DirectionalLight(0xfff3d8, 1.15);
    key.position.set(12, 18, 10);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -16;
    key.shadow.camera.right = 16;
    key.shadow.camera.top = 16;
    key.shadow.camera.bottom = -16;
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 60;
    key.shadow.bias = -0.0004;
    this.scene.add(key);
    const cyan = new THREE.PointLight(0x38d9e8, 40, 30);
    cyan.position.set(-9, 4.5, 2);
    this.scene.add(cyan);
    const teal = new THREE.PointLight(0x7ee8ff, 30, 26);
    teal.position.set(-16, 4.5, 0);
    this.scene.add(teal);
    const purple = new THREE.PointLight(0xa06bff, 40, 30);
    purple.position.set(9, 4.5, -2);
    this.scene.add(purple);
  }

  private buildSkybox(): void {
    if (!this.skyTex) return;
    const geo = new THREE.SphereGeometry(170, 40, 24);
    const mat = new THREE.MeshBasicMaterial({ map: this.skyTex, side: THREE.BackSide, fog: false });
    const sky = new THREE.Mesh(geo, mat);
    this.scene.add(sky);
  }

  private buildGround(): void {
    const geo = new THREE.IcosahedronGeometry(20, 1);
    const mat = new THREE.MeshStandardMaterial({
      map: this.groundTex ?? undefined,
      color: 0xffffff,
      roughness: 0.95,
      metalness: 0.1,
      flatShading: true,
    });
    const ground = new THREE.Mesh(geo, mat);
    ground.scale.set(1, 0.28, 1);
    ground.position.y = -5.0;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  private buildFacilities(): void {
    for (const id of FACILITY_ORDER) {
      const group = new THREE.Group();
      const [fx, fz] = POSITIONS[id];
      group.position.set(fx, 0, fz);
      group.userData.facilityId = id;
      const visual = this.buildFacilityMesh(id, group);
      this.scene.add(group);
      this.visuals.set(id, visual);
      this.buildLabel(id);
    }
  }

  private buildFacilityMesh(id: FacilityId, group: THREE.Group): FacilityVisual {
    if (id === 'excavator') {
      const anim = buildExcavator(group);
      const ringMat = new THREE.MeshBasicMaterial({
        color: STATUS_COLORS.ONLINE,
        transparent: true,
        opacity: 0.7,
      });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.05, 10, 48), ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 2.75;
      group.add(ring);
      const hitbox = new THREE.Mesh(
        new THREE.CylinderGeometry(2.35, 2.35, 5, 12),
        new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false }),
      );
      hitbox.position.y = 2.3;
      group.add(hitbox);
      return { id, group, ringMat, pips: [], pipPhase: 0, pulse: Math.random() * 6, excavator: anim };
    }

    const metal = (color: number) =>
      new THREE.MeshStandardMaterial({
        map: this.hullTex ?? undefined,
        color,
        metalness: 0.72,
        roughness: 0.35,
      });

    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(1.9, 2.1, 0.35, 24),
      new THREE.MeshStandardMaterial({
        map: this.hullTex ?? undefined,
        color: 0x232c3d,
        metalness: 0.7,
        roughness: 0.55,
      }),
    );
    pedestal.position.y = 0.18;
    group.add(pedestal);

    const pips: THREE.Mesh[] = [];


    if (id === 'he3Excavator' || id === 'deuteriumExcavator') {
      const isHe3 = id === 'he3Excavator';
      const isDeut = id === 'deuteriumExcavator';
      const bodyColor = isDeut ? 0x8f3f4f : isHe3 ? 0x3f8f9f : 0x5f7694;
      const accentColor = isDeut ? 0xff6b5e : isHe3 ? 0x7ee8ff : 0x38d9e8;
      const body = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.3, 1.8), metal(bodyColor));
      body.position.y = 1.15;
      group.add(body);
      const drill = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.5, 12), metal(isDeut ? 0xc97f8f : isHe3 ? 0x7fb0bd : 0x9aa7b8));
      drill.position.y = 0.65;
      drill.rotation.x = Math.PI;
      group.add(drill);
      const intake = new THREE.Mesh(
        new THREE.TorusGeometry(0.48, 0.09, 8, 24),
        new THREE.MeshStandardMaterial({ color: accentColor, emissive: accentColor, emissiveIntensity: 1.2 }),
      );
      intake.position.y = 1.9;
      intake.rotation.x = Math.PI / 2;
      group.add(intake);
      const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 1.1, 8), metal(isDeut ? 0xc97f8f : isHe3 ? 0x7fb0bd : 0x9aa7b8));
      antenna.position.y = 2.4;
      group.add(antenna);
      const tip = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 12, 12),
        new THREE.MeshStandardMaterial({ color: accentColor, emissive: accentColor, emissiveIntensity: 1.6 }),
      );
      tip.position.y = 3.0;
      group.add(tip);
    }

    if (id === 'transport') {
      buildTransportHub(group);
    }

    if (id === 'refinery') {
      const base = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.2, 2.0), metal(0x4b3a6e));
      base.position.y = 1.05;
      group.add(base);
      const crystal = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.85),
        new THREE.MeshStandardMaterial({
          color: 0xa06bff,
          emissive: 0x7b3fd4,
          emissiveIntensity: 1.35,
          metalness: 0.3,
          roughness: 0.2,
        }),
      );
      crystal.position.y = 2.1;
      group.add(crystal);
      const glow = new THREE.PointLight(0xa06bff, 18, 8);
      glow.position.y = 2.4;
      group.add(glow);
    }

    if (id === 'energyStation') {
      const core = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.9),
        new THREE.MeshStandardMaterial({
          color: 0x39d6c1,
          emissive: 0x1fb8a3,
          emissiveIntensity: 1.5,
          metalness: 0.3,
          roughness: 0.2,
        }),
      );
      core.position.y = 2.1;
      group.add(core);
      const halo = new THREE.Mesh(
        new THREE.TorusGeometry(1.15, 0.07, 8, 32),
        new THREE.MeshBasicMaterial({ color: 0x7ef3e0 }),
      );
      halo.position.y = 2.1;
      halo.rotation.x = Math.PI / 2.6;
      group.add(halo);
      const glow = new THREE.PointLight(0x39d6c1, 20, 9);
      glow.position.y = 2.4;
      group.add(glow);
    }

    const hitbox = new THREE.Mesh(
      new THREE.CylinderGeometry(2.35, 2.35, 5, 12),
      new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false }),
    );
    hitbox.position.y = 2.3;
    group.add(hitbox);

    const ringMat = new THREE.MeshBasicMaterial({
      color: STATUS_COLORS.ONLINE,
      transparent: true,
      opacity: 0.7,
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.05, 10, 48), ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 2.75;
    group.add(ring);

    return { id, group, ringMat, pips, pipPhase: Math.random() * Math.PI * 2, pulse: Math.random() * 6 };
  }

  private buildTracks(): void {
    this.tracks = new TransportTracks();
    this.scene.add(this.tracks.group);
  }

  private buildLabel(id: FacilityId): void {
    if (!this.labelsLayer) return;
    const label = document.createElement('div');
    label.className = 'facility-label';
    label.dataset.facility = id;
    const status = document.createElement('span');
    status.className = 'label-status';
    label.append(document.createTextNode(FACILITIES[id].name));
    label.append(status);
    this.labelsLayer.appendChild(label);
    this.labelEls.set(id, label);
  }

  // 中间三个设施（枢纽/精炼/能源）的标签默认锚点会压住支线与主环，上移避开轨道
  private static readonly LABEL_OFFSETS: Partial<Record<FacilityId, [number, number]>> = {
    transport: [0, -48],
    refinery: [0, -48],
    energyStation: [0, -48],
  };

  private updateLabels(): void {
    if (!this.labelsLayer || !this.camera) return;
    const camera = this.camera;
    const rect = this.labelsLayer.getBoundingClientRect();
    const place = (x: number, z: number, label: HTMLElement, off: [number, number] = [0, 0]): void => {
      this.tmpVec.set(x, 3.6, z);
      const ndc = this.tmpVec.clone().project(camera);
      const inFront = ndc.z > -1 && ndc.z < 1;
      if (!inFront) {
        label.style.display = 'none';
        return;
      }
      label.style.display = 'block';
      label.style.left = `${((ndc.x + 1) / 2) * rect.width + off[0]}px`;
      label.style.top = `${((1 - ndc.y) / 2) * rect.height + off[1]}px`;
    };
    for (const id of FACILITY_ORDER) {
      const v = this.visuals.get(id);
      const label = this.labelEls.get(id);
      if (!v || !label) continue;
      const off = GameScene.LABEL_OFFSETS[id] ?? [0, 0];
      place(POSITIONS[id][0], POSITIONS[id][1], label, off);
      const status = this.statuses[id];
      const statusEl = label.querySelector('.label-status');
      if (statusEl) {
        statusEl.textContent = status;
        statusEl.className = `label-status ${status}`;
      }
      label.dataset.status = status;
      label.classList.toggle('selected', this.selected === id);
    }

  }

  pulseFacility(id: FacilityId): void {
    this.pulses.set(id, this.elapsed);
  }

  private updateExcavator(v: FacilityVisual, dt: number): void {
    const a = v.excavator;
    if (!a) return;
    const running = this.statuses[v.id] === 'ONLINE';
    if (running) a.drill.rotation.y += 2.5 * dt;

    const t = this.elapsed;
    a.crystalMat.emissiveIntensity = running ? 1.1 + 0.3 * Math.sin(t * Math.PI * 2) : 0.45;
    a.beaconMat.emissiveIntensity = !running ? 0.2 : Math.floor(t * 2) % 2 === 0 ? 2.0 : 0.2;

    let glow = 0.5 + 0.2 * Math.sin(t * Math.PI * 1.6);
    let scale = 1;
    let lightBoost = 0;
    const start = this.pulses.get(v.id);
    if (start !== undefined) {
      const el = this.elapsed - start;
      if (el < 0.6) glow = Math.max(glow, 0.5 + 0.7 * Math.sin(Math.PI * (el / 0.6)));
      if (el < 0.45) scale = 1 + (easeOutBackUpgrade(el / 0.45) - 1) * 0.6;
      if (el < 0.5) lightBoost = 0.5 * (1 - el / 0.5);
      if (el >= 0.6) this.pulses.delete(v.id);
    }
    a.energyMat.color.copy(this.energyBase).multiplyScalar(glow);
    a.pulseGroup.scale.setScalar(scale);
    a.light.intensity = 6 * (1 + lightBoost);

    a.drillTip.getWorldPosition(this.tmpVec);
    a.dust.setActive(running);
    a.dust.update(dt, this.tmpVec);
  }

  private frame = (): void => {
    if (!this.running) return;
    const dt = Math.min(this.clock.getDelta(), 0.1);
    this.elapsed += dt;



    for (const v of this.visuals.values()) {
      if (v.excavator) this.updateExcavator(v, dt);
    }

    for (const v of this.visuals.values()) {
      const status = this.statuses[v.id];
      v.pulse += dt * 3;
      const color = this.bottlenecks.includes(v.id) ? 0xff9f43 : STATUS_COLORS[status];
      const pulse = status === 'LOCKED' ? 0.2 : 0.55 + 0.25 * Math.sin(v.pulse);
      v.ringMat.color.setHex(color);
      v.ringMat.opacity = pulse;
    }

    this.tracks?.update(dt, this.activity, this.transportCongested, this.selected);

    this.controls?.update();
    this.updateLabels();
    if (this.camera && this.renderer) this.renderer.render(this.scene, this.camera);
    if (this.running) this.raf = requestAnimationFrame(this.frame);
  };
}
