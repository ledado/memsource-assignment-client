// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname),
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    'vuetify/lib(.*)': '<rootDir>/node_modules/vuetify/es5$1',
  },
  modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.*\\.vue$': 'vue-jest',
  },
  setupFiles: ['./setup.js'],
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(vuetify)/)'],
};
