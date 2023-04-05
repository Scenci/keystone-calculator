// jest.config.js
module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
      "moduleDirectories": [
        "node_modules",
        "src"
    ],
    moduleNameMapper: {
      '\\.(css)$': 'identity-obj-proxy',
    },
    testEnvironment: 'jsdom',
  };
  