import { Container } from "pixi.js";
import UIView from "./UIView";

class PixiStage extends Container {
  #uiView;

  constructor() {
    super();
  }

  resize() {
    this.#uiView?.rebuild();
  }

  start() {
    this.#uiView = new UIView();
    this.addChild(this.#uiView);
  }
}

export default PixiStage;

