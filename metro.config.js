const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.transformer.assetPlugins = ["expo-asset/tools/hashAssetFiles"];

module.exports = defaultConfig;
