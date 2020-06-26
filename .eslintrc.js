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
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier", "@typescript-eslint", "react-hooks"],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    "react/jsx-wrap-multilines": ['error', {
      "declaration": "parens",
      "assignment": "parens",
      "return": "parens",
      "arrow": "parens",
      "condition": "ignore",
      "logical": "ignore",
      "prop": "ignore"
    }],
    "react/prop-types": "off"
  },
};