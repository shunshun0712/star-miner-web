import * as THREE from 'three';

const MAX = 50;
const LIFE = 0.8;
const SPAWN_PER_SECOND = 8;

/**
 * 碎屑粒子：InstancedMesh 实现，从钻头接触点发射，重力下落、0.8s 回收循环。
 * 单实例锥形，最多 50 个，LOCKED 时立即清空。
 */
export class DustParticles {
  readonly mesh: THREE.InstancedMesh;

  private dummy = new THREE.Object3D();
  private pos: THREE.Vector3[] = [];
  private vel: THREE.Vector3[] = [];
  private life: number[] = [];
  private acc = 0;
  private active = false;

  constructor() {
    const geo = new THREE.ConeGeometry(0.07, 0.16, 5);
    const mat = new THREE.MeshBasicMaterial({ color: '#8a93a0' });
    this.mesh = new THREE.InstancedMesh(geo, mat, MAX);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.frustumCulled = false;
    for (let i = 0; i < MAX; i += 1) {
      this.pos.push(new THREE.Vector3());
      this.vel.push(new THREE.Vector3());
      this.life.push(0);
      this.dummy.position.set(0, -100, 0);
      this.dummy.scale.setScalar(0.001);
      this.dummy.updateMatrix();
      this.mesh.setMatrixAt(i, this.dummy.matrix);
    }
  }

  setActive(v: boolean): void {
    if (this.active === v) return;
    this.active = v;
    if (!v) {
      for (let i = 0; i < MAX; i += 1) {
        this.life[i] = 0;
        this.dummy.position.set(0, -100, 0);
        this.dummy.scale.setScalar(0.001);
        this.dummy.updateMatrix();
        this.mesh.setMatrixAt(i, this.dummy.matrix);
      }
      this.mesh.instanceMatrix.needsUpdate = true;
    }
  }

  update(dt: number, point: THREE.Vector3): void {
    if (this.active) {
      this.acc += dt;
      const interval = 1 / SPAWN_PER_SECOND;
      while (this.acc >= interval) {
        this.acc -= interval;
        this.spawn(point);
      }
    }
    for (let i = 0; i < MAX; i += 1) {
      if (this.life[i] <= 0) continue;
      this.life[i] -= dt;
      if (this.life[i] <= 0) {
        this.life[i] = 0;
        this.dummy.position.set(0, -100, 0);
        this.dummy.scale.setScalar(0.001);
        this.dummy.updateMatrix();
        this.mesh.setMatrixAt(i, this.dummy.matrix);
        continue;
      }
      this.vel[i].y -= 3.0 * dt; // 重力
      this.pos[i].addScaledVector(this.vel[i], dt);
      this.syncInstance(i);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  dispose(): void {
    this.mesh.geometry.dispose();
    (this.mesh.material as THREE.Material).dispose();
  }

  private spawn(point: THREE.Vector3): void {
    let idx = 0;
    let min = this.life[0];
    for (let i = 1; i < MAX; i += 1) {
      if (this.life[i] < min) {
        min = this.life[i];
        idx = i;
      }
    }
    this.pos[idx].set(
      point.x + (Math.random() - 0.5) * 0.24,
      point.y + (Math.random() - 0.5) * 0.1,
      point.z + (Math.random() - 0.5) * 0.24,
    );
    this.vel[idx].set((Math.random() - 0.5) * 0.8, 0.5 + Math.random() * 0.8, (Math.random() - 0.5) * 0.8);
    this.life[idx] = LIFE;
    this.syncInstance(idx);
  }

  private syncInstance(i: number): void {
    const t = 1 - this.life[i] / LIFE;
    this.dummy.position.copy(this.pos[i]);
    this.dummy.scale.setScalar(Math.max(0.001, 1 - t * 0.6));
    this.dummy.rotation.set(t * 3, t * 2, 0);
    this.dummy.updateMatrix();
    this.mesh.setMatrixAt(i, this.dummy.matrix);
  }
}
