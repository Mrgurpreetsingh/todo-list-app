const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  resolver: {
    blacklistRE: [
      /node_modules\/@react-native-firebase\/auth\/android\/build\/.*/,
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
