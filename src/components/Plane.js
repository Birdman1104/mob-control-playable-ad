import * as THREE from "three";

export default class Plane extends THREE.Group {
  #road;
  #circle1;
  #circle2;
  #material;

  constructor() {
    super();
    this.#initMaterial();
    this.#initPlane();
    this.#initCircles();

    this.rotation.x = Math.PI / 2;
  }

  #initMaterial() {
    this.#material = new THREE.MeshBasicMaterial({ color: 0x00ffff, side: THREE.DoubleSide });
  }

  #initPlane() {
    const roadGeometry = new THREE.BoxGeometry(0.5, 9, 2);
    this.#road = new THREE.Mesh(roadGeometry, this.#material);
    this.#road.rotation.x = Math.PI / 2;
    this.#road.rotation.z = Math.PI / 2;
    this.#road.position.set(0, 0, 0);
    this.add(this.#road);
  }

  #initCircles() {
    const circleGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 32);

    this.#circle1 = new THREE.Mesh(circleGeometry, this.#material);
    this.#circle2 = new THREE.Mesh(circleGeometry, this.#material);

    this.#circle1.position.set(-5, 0, 0);
    this.#circle2.position.set(5, 0, 0);
    this.#circle1.rotation.set(Math.PI / 2, 0, 0);
    this.#circle2.rotation.set(Math.PI / 2, 0, 0);

    this.add(this.#circle1);
    this.add(this.#circle2);
  }
}

