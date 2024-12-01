import { PixiGrid } from "@armathai/pixi-grid";
import { Sprite } from "pixi.js";
import { lp } from "../utils";

export default class UIView extends PixiGrid {
  constructor() {
    super();
    this.build();
  }

  getGridConfig() {
    return getUIGridConfig();
  }

  rebuild() {
    super.rebuild(this.getGridConfig());
  }

  build() {
    const img = Sprite.from("logo.png");
    this.setChild("score", img);
  }
}

export const getUIGridConfig = () => {
  return lp(getUIGridLandscapeConfig, getUIGridPortraitConfig).call(null);
};

const getUIGridLandscapeConfig = () => {
  const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
  return {
    name: "ui",
    debug: { color: 0xd950ff },
    bounds,
    cells: [
      {
        name: "score",
        bounds: { x: 0, y: 0, width: 0.11, height: 0.11 },
      },
    ],
  };
};

const getUIGridPortraitConfig = () => {
  const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
  return {
    name: "ui",
    debug: { color: 0xd950ff },
    bounds,
    cells: [
      {
        name: "score",
        bounds: { x: 0, y: 0, width: 0.11, height: 0.11 },
      },
    ],
  };
};

