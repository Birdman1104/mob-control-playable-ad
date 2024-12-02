import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import Cannon from "./components/Cannon";
import Ground from "./components/Ground";
import Ocean from "./components/Ocean";
import { Player } from "./components/Player";
import Tower from "./components/Tower";
import { CannonConfig, TowerConfig } from "./configs/componentsConfig";
import Camera from "./essentials/Camera";
import Light from "./essentials/Light";
import Loader from "./essentials/Loader";
import Renderer from "./essentials/Renderer";
import { fitDimension, isMobileDevice, setTransforms } from "./utils";

export class ThreeApp {
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

  #mobs = [];

  #prevTime = 0;
  #player;

  #touchStartX = 0;
  #isTouching = false;

  #isMobile;

  constructor(container) {
    this.#isMobile = isMobileDevice();
    this.#scene = new THREE.Scene();
    this.#container = container;

    this.#renderer = new Renderer(this.#container);
    this.#camera = new Camera(this.#renderer.threeRenderer);
    this.#loader = new Loader();

    this.#container.appendChild(this.#renderer.threeRenderer.domElement);
    this.#loader.load(() => this.#onAssetLoadingComplete());
  }

  resize() {
    const { width: w, height: h } = fitDimension();
    this.#resizeCanvas(w, h);
    this.#camera?.resize(this.#renderer.threeRenderer, h);
    this.#renderer?.resize(this.#scene, this.#camera.camera);

    this.#resetControls();
  }

  #onAssetLoadingComplete() {
    this.#initComponents();

    this.#isMobile ? this.#addTouchControls() : this.#initPointerControls();

    this.#camera.camera.lookAt(this.#scene.position);

    this.#canvas = document.getElementById("container");
    if (process.env.NODE_ENV !== "production") {
      this.#initOrbitControls();
    }

    this.#render();
  }

  #initComponents() {
    this.#initPlane();
    this.#initLight();
    // this.#initOcean();
    this.#initTower();
    this.#initCannon();
    this.#initPlayer();
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

  #initPlayer() {
    this.#player = new Player(this.#scene);
  }

  #render(dt) {
    requestAnimationFrame(this.#render.bind(this));
    this.#cannon?.update(dt);
    this.#player?.update(dt);

    this.#prevTime = dt;
    this.#renderer.render(this.#scene, this.#camera.camera);
  }

  #resetControls() {
    this.#removePointerControls();
    this.#removeTouchControls();
    this.#isMobile = isMobileDevice();
    this.#isMobile ? this.#addTouchControls() : this.#initPointerControls();
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

  #addTouchControls() {
    window.addEventListener("touchstart", (e) => this.#onTouchStart(e));
    window.addEventListener("touchmove", (e) => this.#onTouchMove(e));
    window.addEventListener("touchup", () => this.#onTouchEnd());
    window.addEventListener("touchcancel", (e) => this.#onTouchEnd());
  }

  #removeTouchControls() {
    window.removeEventListener("touchstart", (e) => this.#onTouchStart(e));
    window.removeEventListener("touchmove", (e) => this.#onTouchMove(e));
    window.removeEventListener("touchup", () => this.#onTouchEnd());
    window.removeEventListener("touchcancel", (e) => this.#onTouchEnd());
  }

  #initPointerControls() {
    window.addEventListener("pointerdown", (e) => this.#onPointerDown(e));
    window.addEventListener("pointermove", (e) => this.#onPointerMove(e));
    window.addEventListener("pointerup", () => this.#onTouchEnd());
  }

  #removePointerControls() {
    window.removeEventListener("pointerdown", (e) => this.#onPointerDown(e));
    window.removeEventListener("pointermove", (e) => this.#onPointerMove(e));
    window.removeEventListener("pointerup", () => this.#onTouchEnd());
  }

  #onTouchStart(event) {
    this.#initTouchStart(event.targetTouches[0].clientX);
  }

  #onPointerDown(event) {
    this.#initTouchStart(event.clientX);
  }

  #initTouchStart(clientX) {
    this.#touchStartX = clientX;
    this.#isTouching = true;
  }

  #onTouchMove(event) {
    if (this.#isTouching) {
      this.#initTouchMove(event.targetTouches[0].clientX);
    }
  }

  #onPointerMove(event) {
    if (this.#isTouching) {
      this.#initTouchMove(event.clientX);
    }
  }

  #initTouchMove(clientX) {
    const deltaX = clientX - this.#touchStartX;
    const movementSpeed = 0.01;
    this.#cannon.position.z -= deltaX * movementSpeed;
    this.#cannon.position.z = Math.max(CannonConfig.minZ, Math.min(CannonConfig.maxZ, this.#cannon.position.z));
    this.#touchStartX = clientX;
  }

  #onTouchEnd() {
    this.#isTouching = false;
  }
}

