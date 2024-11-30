import * as THREE from "three";
import { GroundConfig } from "../configs/ComponentsConfig";
import { setTransforms } from "../utils";

export default class Ground extends THREE.Group {
  #road;
  #circle1;
  #circle2;
  #material;

  constructor() {
    super();
    this.#initMaterial();
    this.#initPlane();
    this.#initCircles();
  }

  #initMaterial() {
    this.#material = new THREE.MeshBasicMaterial({ color: GroundConfig.color, side: THREE.DoubleSide });
  }

  #initPlane() {
    const { roadSize, road } = GroundConfig;
    const roadGeometry = new THREE.BoxGeometry(roadSize.x, roadSize.y, roadSize.z);
    this.#road = new THREE.Mesh(roadGeometry, this.#material);

    setTransforms(this.#road, road);
    this.add(this.#road);
  }

  #initCircles() {
    const { circleSize, circle1, circle2 } = GroundConfig;

    const circleGeometry = new THREE.CylinderGeometry(
      circleSize.radius,
      circleSize.radius,
      circleSize.height,
      circleSize.segments
    );

    this.#circle1 = new THREE.Mesh(circleGeometry, this.#material);
    this.#circle2 = new THREE.Mesh(circleGeometry, this.#material);

    setTransforms(this.#circle1, circle1);
    setTransforms(this.#circle2, circle2);

    this.add(this.#circle1);
    this.add(this.#circle2);
  }
}

