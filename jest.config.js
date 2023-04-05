// jest.config.js
module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    "roots": [
        "./",
        "/home/some/path/"
      ],
      "modulePaths": [
        "<rootDir>",
        "/home/some/other/path"
      ],
      "moduleDirectories": [
        "node_modules",
        "src"
    ],
    moduleNameMapper: {
      '\\.(css)$': 'identity-obj-proxy',
    },
    testEnvironment: 'jsdom',
  };
  