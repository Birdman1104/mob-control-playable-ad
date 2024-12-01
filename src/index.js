import { ThreeApp } from "./main";
import PixiUI from "./pixi-ui/PixiUI";

const showErrorMessage = () => {
  const element = document.createElement("div");
  element.style.fontSize = "36px";
  element.style.textAlign = "center";
  element.style.color = "#000";
  element.style.padding = "1.5em";
  element.style.width = "400px";
  element.style.margin = "auto";

  element.innerHTML = "Seems your device does not support WebGL rendering!";
  document.body.appendChild(element);
};

const init = () => {
  if (!window.WebGLRenderingContext) {
    showErrorMessage();
  } else {
    window.threeApp = new ThreeApp(document.getElementById("container"));

    window.pixiUI = new PixiUI();
    window.pixiUI.init();

    window.addEventListener("resize", () => {
      window.threeApp.resize();
      window.pixiUI.appResize();
    });
  }
};

init();

