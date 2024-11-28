const importAll = (r) => {
  let sounds = {};
  r.keys().forEach((item) => {
    sounds[item.replace("./", "")] = r(item);
  });
  return sounds;
};

const sounds = importAll(require.context("./sounds", false, /\.(mp3)$/));

export default sounds;

