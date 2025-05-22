const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.sourceExts = [
  ...defaultConfig.resolver.sourceExts,
  'ts',
  'tsx',
];

const config = {
  resolver: {
    sourceExts: defaultConfig.resolver.sourceExts,
  },
};

module.exports = mergeConfig(defaultConfig, config);

