import * as THREE from "three";

export default class Plane extends THREE.Group {
  #road;
  #circle1;
  #circle2;

  constructor() {
    super();
    this.#initPlane();
    this.#initCircles();

    this.rotation.x = Math.PI / 2;
  }

  #initPlane() {
    const roadGeometry = new THREE.BoxGeometry(0.5, 9, 2);
    const roadMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    this.#road = new THREE.Mesh(roadGeometry, roadMaterial);
    this.#road.rotation.x = Math.PI / 2;
    this.#road.rotation.z = Math.PI / 2;
    this.#road.position.set(0, 0, 0);
    this.add(this.#road);
  }

  #initCircles() {
    const circleGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 32);
    const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });

    this.#circle1 = new THREE.Mesh(circleGeometry, circleMaterial);
    this.#circle2 = new THREE.Mesh(circleGeometry, circleMaterial);

    this.#circle1.position.set(-5, 0, 0);
    this.#circle2.position.set(5, 0, 0);
    this.#circle1.rotation.set(Math.PI / 2, 0, 0);
    this.#circle2.rotation.set(Math.PI / 2, 0, 0);

    this.add(this.#circle1);
    this.add(this.#circle2);
  }
}

