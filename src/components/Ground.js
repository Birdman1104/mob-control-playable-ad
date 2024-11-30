import * as THREE from "three";
import { IMAGES } from "../assets";
import Water from "./Water";

export default class Ground extends THREE.Group {
  constructor() {
    super();

    this.#init();
  }

  #init() {
    const groundGeometry = new THREE.PlaneGeometry(20, 20, 10, 10);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0xe7e7e7 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI * -0.5;
    this.add(ground);

    const map = IMAGES["checkerboard"];
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;
    map.repeat.set(4, 4);
    map.colorSpace = THREE.SRGBColorSpace;
    groundMaterial.map = map;
    groundMaterial.needsUpdate = true;

    // water

    const waterGeometry = new THREE.PlaneGeometry(20, 20);
    const flowMap = IMAGES["flow"];

    const water = new Water(waterGeometry, {
      scale: 2,
      textureWidth: 1024,
      textureHeight: 1024,
      flowMap: flowMap,
      normalMap0: IMAGES["voronoi"],
      normalMap1: IMAGES["water"],
    });

    water.position.y = 1;
    water.rotation.x = Math.PI * -0.5;
    this.add(water);

    // // flow map helper
    // const helperGeometry = new THREE.PlaneGeometry(20, 20);
    // const helperMaterial = new THREE.MeshBasicMaterial({ map: flowMap });
    // const helper = new THREE.Mesh(helperGeometry, helperMaterial);
    // helper.position.y = 1.01;
    // helper.rotation.x = Math.PI * -0.5;
    // helper.visible = false;
    // this.add(helper);
  }
}

