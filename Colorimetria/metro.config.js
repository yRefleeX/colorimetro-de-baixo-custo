// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Adiciona suporte para a extensão de arquivo .stl
config.resolver.assetExts.push('stl');

module.exports = config;