import { PixiGrid } from "@armathai/pixi-grid";
import { Sprite } from "pixi.js";
import { getCanvasBounds, lp } from "../utils";

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
    this.setChild("logo", img);
  }
}

export const getUIGridConfig = () => {
  return lp(getUIGridLandscapeConfig, getUIGridPortraitConfig).call(null);
};

const getUIGridLandscapeConfig = () => {
  const { width, height } = getCanvasBounds();
  const bounds = { x: 0, y: 0, width, height };
  return {
    name: "ui",
    debug: { color: 0xd950ff },
    bounds,
    cells: [
      {
        name: "logo",
        bounds: { x: 0, y: 0, width: 0.21, height: 0.11 },
      },
      {
        name: "timer",
        bounds: { x: 0.85, y: 0, width: 0.15, height: 0.11 },
      },
    ],
  };
};

const getUIGridPortraitConfig = () => {
  const { width, height } = getCanvasBounds();
  const bounds = { x: 0, y: 0, width, height };
  return {
    name: "ui",
    debug: { color: 0xd950ff },
    bounds,
    cells: [
      {
        name: "logo",
        bounds: { x: 0, y: 0, width: 0.21, height: 0.11 },
      },
      {
        name: "timer",
        bounds: { x: 0.85, y: 0, width: 0.15, height: 0.11 },
      },
    ],
  };
};

