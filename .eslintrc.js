module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true 
    },
    project: './tsconfig.json'
  },
  settings: {
    react: {
      version: "detect" 
    }
  },
  extends: [
    "airbnb-typescript",
    // "plugin:react/recommended",
    // "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  rules: {
  },
};