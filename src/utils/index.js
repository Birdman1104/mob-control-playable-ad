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
