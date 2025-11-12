import type { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
  name: 'rn-template',
  slug: 'rn-template',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    bundler: 'metro',
    favicon: './assets/images/favicon.png',
  },
  experiments: {
    tsconfigPaths: true,
  },
  plugins: ['expo-secure-store'],
};

export default config;
