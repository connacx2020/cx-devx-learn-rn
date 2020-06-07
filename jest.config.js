module.exports = {
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    preset: '@testing-library/react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [`/node_modules/(?!)`],
    "setupFiles": [
        "./jest/jestSetup.js",
        "./node_modules/react-native-gesture-handler/jestSetup.js"
      ],
  };

