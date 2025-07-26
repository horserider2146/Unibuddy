module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // This plugin is required for the animation library to work.
      'react-native-reanimated/plugin',
    ],
  };
};
