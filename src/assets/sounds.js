function importAll(r) {
  let sounds = {};
  r.keys().forEach((item, index) => {
    sounds[item.replace("./", "")] = r(item);
  });
  return sounds;
}

const sounds = importAll(require.context("./sounds", false, /\.(png|jpe?g|svg)$/));

export default sounds;

