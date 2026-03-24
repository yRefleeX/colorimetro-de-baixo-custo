// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Garante que arquivos .cjs sejam resolvidos
config.resolver.sourceExts.push('cjs');

// Desliga a funcionalidade de exports de pacote instável que pode causar conflito
config.resolver.unstable_enablePackageExports = false;

module.exports = config;