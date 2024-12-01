export const fitDimension = () => {
  const aspect = 16 / 10;
  let { innerWidth: w, innerHeight: h } = window;

  if (w > h * aspect) {
    w = h * aspect;
  } else {
    w = Math.min(w, h / aspect);
    h = w * aspect;
  }

  return { width: w, height: h };
};

export const callIfExists = (cb) => {
  if (typeof cb === "function") {
    cb();
  }
};

export const setTransforms = (el, transform) => {
  const { position = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0, z: 0 }, scale = { x: 1, y: 1, z: 1 } } = transform;

  el.position.set(position.x ?? 0, position.y ?? 0, position.z ?? 0);
  el.rotation.set(rotation.x ?? 0, rotation.y ?? 0, rotation.z ?? 0);
  el.scale.set(scale.x ?? 1, scale.y ?? 1, scale.z ?? 1);
};

export const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent)) {
    return true;
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return true;
  }

  if (/iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) {
    return true;
  }

  const isTouchCapable = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isLargeScreen = window.innerWidth > 768 || window.innerHeight > 768;

  if (isTouchCapable && isLargeScreen) {
    return true;
  }

  if (/Mobile|Opera Mini|IEMobile|WPDesktop|BlackBerry|PlayBook|BB10|webOS|Windows Phone|Kindle/.test(userAgent)) {
    return true;
  }
  return false;
};

