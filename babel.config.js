module.exports = function (api) {
  const isWeb = api.caller((caller) => caller && caller.platform === 'web');
  const isTest = api.env('test');
  return {
    presets: ['babel-preset-expo'],
    plugins: isWeb ? [] : isTest ? [] : ['nativewind/babel', 'react-native-reanimated/plugin'],
  };
};
