import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import Cannon from "./components/Cannon";
import Ground from "./components/Ground";
import Ocean from "./components/Ocean";
import Tower from "./components/Tower";
import { CannonConfig, TowerConfig } from "./configs/ComponentsConfig";
import Camera from "./essentials/Camera";
import Light from "./essentials/Light";
import Loader from "./essentials/Loader";
import Renderer from "./essentials/Renderer";
import { fitDimension, setTransforms } from "./utils";

export class Main {
  #loader; // Loader

  #scene; // THREE.Scene
  #container; // HTMLDivElement
  #renderer; // Renderer
  #camera; // Camera
  #plane; // Plane
  #ocean; // Ocean
  #light; // Light
  #tower; // Tower
  #cannon; // Cannon

  #canvas; // HTMLCanvasElement

  constructor(container) {
    this.#scene = new THREE.Scene();
    this.#container = container;

    this.#renderer = new Renderer(this.#container);
    this.#camera = new Camera(this.#renderer.threeRenderer);
    this.#loader = new Loader(() => this.#onAssetLoadingComplete());

    this.#container.appendChild(this.#renderer.threeRenderer.domElement);
    this.#loader.load();
  }

  #onAssetLoadingComplete() {
    this.#initComponents();

    this.#camera.camera.lookAt(this.#scene.position);

    this.#canvas = document.getElementById("container");
    if (process.env.NODE_ENV !== "production") {
      this.#initOrbitControls();
    }

    this.#render();
    this.#setEvents();
  }

  #initComponents() {
    this.#initPlane();
    this.#initLight();
    // this.#initOcean();
    this.#initTower();
    this.#initCannon();
  }

  #initPlane() {
    this.#plane = new Ground();
    this.#scene.add(this.#plane);
  }

  #initLight() {
    this.#light = new Light();
    this.#light.addLights(this.#scene);
  }

  #initOcean() {
    this.#ocean = new Ocean();
    this.#ocean.position.y = -1.5;
    this.#scene.add(this.#ocean);
  }

  #initTower() {
    this.#tower = new Tower();
    setTransforms(this.#tower, TowerConfig);
    this.#scene.add(this.#tower);
  }

  #initCannon() {
    this.#cannon = new Cannon();
    setTransforms(this.#cannon, CannonConfig);
    this.#scene.add(this.#cannon);
  }

  #render() {
    requestAnimationFrame(this.#render.bind(this));
    this.#renderer.render(this.#scene, this.#camera.camera);
  }

  #setEvents() {
    window.addEventListener("resize", () => this.#onResize());
  }

  #onResize() {
    const { width: w, height: h } = fitDimension();
    this.#resizeCanvas(w, h);
    this.#camera.resize(this.#renderer.threeRenderer, h);
    this.#renderer.resize(this.#scene, this.#camera.camera);
  }

  #resizeCanvas(width, height) {
    if (!this.#canvas) return;
    const { style } = this.#canvas;
    style.width = `${width}px`;
    style.height = `${height}px`;
  }

  #initOrbitControls() {
    const controls = new OrbitControls(this.#camera.camera, this.#canvas);
    controls.enableDamping = true;
  }
}

