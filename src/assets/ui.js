const importAll = (r) => {
  let ui = {};
  r.keys().forEach((item) => {
    ui[item.replace("./", "")] = r(item);
  });
  return ui;
};

const ui = importAll(require.context("./ui", false, /\.(png|jpg)$/));

export default ui;

