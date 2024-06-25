const { compilerOptions } = require("./tsconfig.json");
const { pathsToModuleNameMapper } = require("ts-jest");

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['npm-cache', '.npm'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  coveragePathIgnorePatterns: [
    "node_modules",
    "test-config",
    "interfaces",
    "<rootDir>/migrations/*",
    "<rootDir>/entities/*",
  ],
  moduleFileExtensions: ["js", "ts"],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  rootDir: "lib",
  roots: ["<rootDir>"],
};