import * as THREE from "three";

export default class Zone {
  constructor() {
    this.multiplier = 2;

    const geometry = new THREE.PlaneGeometry(5, 5);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    this.zoneMesh = new THREE.Mesh(geometry, material);
    this.zoneMesh.rotation.x = Math.PI / 2;
    scene.add(this.zoneMesh);
  }

  checkCollision(mob) {
    if (mob.multiplied) return;
    const mobPosition = mob.body.position;
    const zoneBounds = new THREE.Box3().setFromObject(this.zoneMesh);
    if (zoneBounds.containsPoint(mobPosition)) {
      mob.multiplied = true;
    }
  }
}

