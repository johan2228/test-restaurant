module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: false,
    commonjs: true,
    es6: true,
  },
  plugins: ["@typescript-eslint", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "indent": ["error", 2, { "ignoredNodes": ["PropertyDefinition"] }],
    "quotes": [2, 'double', { avoidEscape: true, allowTemplateLiterals: true }],
    "no-unexpected-multiline": "error",
    "@typescript-eslint/semi": ["error", "always"],
    "no-mixed-spaces-and-tabs": "error",
  },
  ignorePatterns: [
    "node_modules",
    ".eslintrc.js",
    "src/migrations",
    "coverage",
    "tsconfig.json",
    ".esbuild",
    "build",
    "jest.config.js",
    "package.json",
    "package-lock.json",
    "*.json"
  ],
};