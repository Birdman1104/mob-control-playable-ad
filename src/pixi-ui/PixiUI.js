import { Application, Assets } from "pixi.js";
import Stats from "stats-js";
import assets from "../assets";
import { fitDimension } from "../utils";
import PixiStage from "./MainStage";

export default class PixiUI extends Application {
  #stage;

  constructor() {
    super({
      backgroundColor: 0xffffff,
      backgroundAlpha: 0,
      powerPreference: "high-performance",
      antialias: true,
      resolution: Math.max(window.devicePixelRatio || 1, 2),
      sharedTicker: true,
    });
  }

  async init() {
    this.stage = new PixiStage();

    this.view.classList.add("app");
    document.getElementById("container").appendChild(this.view);

    globalThis.__PIXI_APP__ = this;

    if (process.env.NODE_ENV !== "production") {
      this.#initStats();
    }

    await this.loadAssets();
    this.onLoadComplete();
  }

  appResize() {
    const { clientWidth: w, clientHeight: h } = document.body;
    if (w === 0 || h === 0) return;

    const { width, height } = fitDimension();

    this.resizeCanvas(width, height);
    this.resizeRenderer(width, height);

    this.stage.resize();
  }

  async loadAssets() {
    const { ui } = assets;
    const keys = Object.keys(ui);

    for (const key of keys) {
      Assets.add({ alias: key, src: ui[key] });
      await Assets.load(key);
    }
  }

  onLoadComplete() {
    this.appResize();
    this.stage.start();
  }

  resizeCanvas(width, height) {
    const { style } = this.renderer.view;
    if (!style) return;
    style.width = `${width}px`;
    style.height = `${height}px`;
  }

  resizeRenderer(width, height) {
    this.renderer.resize(width, height);
  }

  // initLego() {
  //   legoLogger.start(lego, Object.freeze({}));
  //   // TODO GAMEINITCOMMAND
  //   // lego.command.execute(onGameInitCommand);
  //   // lego.event.emit(MainGameEvents.Init);
  // }

  #initStats() {
    const stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    stats.dom.style.position = "fixed";
    stats.dom.style.left = "50px";
    stats.dom.style.top = "50px";

    this.ticker.add(() => {
      stats.begin();
      stats.end();
    });
  }
}

