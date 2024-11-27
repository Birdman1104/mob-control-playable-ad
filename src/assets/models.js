function importAll(r) {
  let models = {};
  r.keys().forEach((item, index) => {
    models[item.replace("./", "")] = r(item);
  });
  return models;
}

const models = importAll(require.context("./models", false, /\.(glb)$/));

export default models;

