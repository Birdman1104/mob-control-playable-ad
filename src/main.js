import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import Plane from "./components/Plane";
import Renderer from "./components/Renderer";
import Tower from "./components/Tower";
import Camera from "./essentials/Camera";
import Light from "./essentials/Light";
import Loader from "./essentials/Loader";
import { fitDimension } from "./utils";

export class Main {
  #loader; // Loader

  #scene; // THREE.Scene
  #container; // HTMLDivElement
  #renderer; // Renderer
  #camera; // Camera
  #plane; // Plane
  #ground; // Ground
  #light; // Light
  #tower; // Tower

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
    // this.#initGround();
    this.#initTower();
  }

  #initPlane() {
    this.#plane = new Plane();
    this.#scene.add(this.#plane);
  }

  #initLight() {
    this.#light = new Light();
    this.#light.addLights(this.#scene);
  }

  #initGround() {
    this.#ground = new Ground();
    this.#ground.position.y = -1.5;
    this.#scene.add(this.#ground);
  }

  #initTower() {
    this.#tower = new Tower();
    this.#scene.add(this.#tower);
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

