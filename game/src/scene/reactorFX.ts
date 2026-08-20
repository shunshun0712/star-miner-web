import * as THREE from 'three';

const MAX_PARTICLES = 80;
const PARTICLE_LIFE = 1.2;
const BASE_SPAWN_PER_SEC = 14;

/**
 * T1-2 反应堆视觉：粒子流 + 脉动核心 + 点光源。
 *
 * 活动度 0 = 待机（粒子停发、核心低辉），1 = 满载（粒子流密集、核心强脉动、光晕旋转加速）。
 * 由 ReactorRuntime.reactorActivity() 经 GameScene.sync 驱动，与 buff 倒计时逻辑解耦
 * （倒计时走墙钟，粒子走渲染帧——两者独立，互不依赖）。
 */
export class ReactorFX {
  readonly group = new THREE.Group();

  private core: THREE.Mesh;
  private coreMat: THREE.MeshStandardMaterial;
  private halo: THREE.Mesh;
  private haloMat: THREE.MeshBasicMaterial;
  private light: THREE.PointLight;
  private particles: THREE.InstancedMesh;
  private particleMat: THREE.MeshBasicMaterial;

  private dummy = new THREE.Object3D();
  private pPos: THREE.Vector3[] = [];
  private pVel: THREE.Vector3[] = [];
  private pLife: number[] = [];
  private spawnAcc = 0;
  private activity = 0;

  constructor() {
    // 底座
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.9, 0.4, 6),
      new THREE.MeshStandardMaterial({ color: 0x232c3d, metalness: 0.7, roughness: 0.55 }),
    );
    pedestal.position.y = 0.2;
    pedestal.castShadow = true;
    this.group.add(pedestal);

    // 反应堆核心（紫青双色辉光八面体）
    this.coreMat = new THREE.MeshStandardMaterial({
      color: 0xa06bff,
      emissive: 0x6a3fd4,
      emissiveIntensity: 1.0,
      metalness: 0.3,
      roughness: 0.2,
    });
    this.core = new THREE.Mesh(new THREE.OctahedronGeometry(0.85), this.coreMat);
    this.core.position.y = 2.0;
    this.core.castShadow = true;
    this.group.add(this.core);

    // 光晕环
    this.haloMat = new THREE.MeshBasicMaterial({ color: 0x7ef3e0, transparent: true, opacity: 0.6 });
    this.halo = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.06, 8, 40), this.haloMat);
    this.halo.position.y = 2.0;
    this.halo.rotation.x = Math.PI / 2.4;
    this.group.add(this.halo);

    // 点光源（运行态时增亮周边）
    this.light = new THREE.PointLight(0x9a6bff, 6, 12, 1.6);
    this.light.position.y = 2.3;
    this.group.add(this.light);

    // 粒子流（围绕核心上升的等离子）
    this.particleMat = new THREE.MeshBasicMaterial({ color: 0x8ad9ff, transparent: true, opacity: 0.9 });
    this.particles = new THREE.InstancedMesh(new THREE.SphereGeometry(0.09, 6, 6), this.particleMat, MAX_PARTICLES);
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
  }

  /** 设置活动度 0..1，驱动粒子发射率与核心辉光 */
  setActivity(level: number): void {
    this.activity = Math.max(0, Math.min(1, level));
  }

  update(dt: number, elapsed: number): void {
    const a = this.activity;

    // 核心旋转 + 脉动（脉动幅度随活动度增大）
    this.core.rotation.y += (0.4 + a * 1.2) * dt;
    this.core.rotation.x = Math.sin(elapsed * 0.8) * 0.15;
    const pulse = 0.7 + 0.3 * Math.sin(elapsed * Math.PI * 2 * (0.6 + a));
    this.coreMat.emissiveIntensity = 0.6 + a * 1.2 * pulse;
    this.core.scale.setScalar(1 + a * 0.12 * pulse);

    // 光晕旋转与透明度
    this.halo.rotation.z += (0.6 + a * 2.4) * dt;
    this.haloMat.opacity = 0.25 + a * 0.55;
    this.haloMat.color.setHex(a > 0.5 ? 0xa06bff : 0x7ef3e0);

    // 光源
    this.light.intensity = 4 + a * 16 * pulse;
    this.light.color.setHex(a > 0.66 ? 0xa06bff : 0x7ee8ff);

    // 粒子发射（随活动度）
    if (a > 0.02) {
      this.spawnAcc += dt * BASE_SPAWN_PER_SEC * a;
      while (this.spawnAcc >= 1) {
        this.spawnAcc -= 1;
        this.spawnParticle();
      }
    }

    // 粒子更新（上升 + 轨道漂移 + 衰减）
    for (let i = 0; i < MAX_PARTICLES; i += 1) {
      if (this.pLife[i] <= 0) continue;
      this.pLife[i] -= dt;
      if (this.pLife[i] <= 0) {
        this.hideInstance(i);
        continue;
      }
      this.pVel[i].y += 0.6 * dt; // 上升加速
      this.pPos[i].addScaledVector(this.pVel[i], dt);
      this.syncInstance(i);
    }
    this.particles.instanceMatrix.needsUpdate = true;
  }

  dispose(): void {
    this.core.geometry.dispose();
    this.coreMat.dispose();
    this.halo.geometry.dispose();
    this.haloMat.dispose();
    this.particles.geometry.dispose();
    this.particleMat.dispose();
    this.group.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh === this.core || mesh === this.halo || mesh === this.particles) return;
      if (mesh.geometry) mesh.geometry.dispose();
      const mat = mesh.material as THREE.Material | undefined;
      if (mat) mat.dispose();
    });
  }

  private spawnParticle(): void {
    let idx = 0;
    let min = this.pLife[0];
    for (let i = 1; i < MAX_PARTICLES; i += 1) {
      if (this.pLife[i] < min) {
        min = this.pLife[i];
        idx = i;
      }
    }
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.5 + Math.random() * 0.6;
    this.pPos[idx].set(
      Math.cos(angle) * radius,
      0.6 + Math.random() * 0.3,
      Math.sin(angle) * radius,
    );
    this.pVel[idx].set(
      Math.cos(angle) * 0.3,
      0.8 + Math.random() * 0.7,
      Math.sin(angle) * 0.3,
    );
    this.pLife[idx] = PARTICLE_LIFE;
    this.syncInstance(idx);
  }

  private syncInstance(i: number): void {
    const t = 1 - this.pLife[i] / PARTICLE_LIFE;
    this.dummy.position.copy(this.pPos[i]);
    this.dummy.scale.setScalar(Math.max(0.001, (1 - t) * (0.6 + this.activity * 0.8)));
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
