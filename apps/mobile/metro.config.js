const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
const appNodeModules = path.resolve(__dirname, "node_modules");
const rootNodeModules = path.resolve(__dirname, "../../node_modules");
const expoRouterNodeModules = path.join(appNodeModules, "expo-router/node_modules");

config.resolver.disableHierarchicalLookup = true;
config.resolver.nodeModulesPaths = [appNodeModules, expoRouterNodeModules, rootNodeModules];
config.resolver.extraNodeModules = {
  "@expo/metro-runtime": path.join(expoRouterNodeModules, "@expo/metro-runtime"),
  react: path.join(appNodeModules, "react"),
  "react-native": path.join(appNodeModules, "react-native")
};

module.exports = withNativeWind(config, { input: "./global.css" });
