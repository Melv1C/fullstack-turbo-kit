import { ConfigContext, ExpoConfig } from 'expo/config';

function getBundleIdentifier() {
  switch (process.env.EXPO_PUBLIC_NODE_ENV) {
    case 'development':
      return 'com.melv1c.mobile.dev';
    case 'staging':
      return 'com.melv1c.mobile.staging';
    case 'production':
      return 'com.melv1c.mobile';
    default:
      return 'com.melv1c.mobile';
  }
}
function getPackageName() {
  switch (process.env.EXPO_PUBLIC_NODE_ENV) {
    case 'development':
      return 'FullStackTurboKit (Dev)';
    case 'staging':
      return 'FullStackTurboKit (Staging)';
    case 'production':
      return 'FullStackTurboKit';
    default:
      return 'FullStackTurboKit';
  }
}
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getPackageName(),
  slug: 'fullstack-turbo-kit',
  version: '0.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'mobile',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: getBundleIdentifier(),
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: getBundleIdentifier(),
  },
  web: {
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
        dark: {
          backgroundColor: '#000000',
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: '3c5b29ec-5c68-4d21-8209-5ee76a936f3b',
    },
  },
  owner: 'melv1c',
});
