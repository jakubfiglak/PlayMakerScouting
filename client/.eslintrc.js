module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  root: true,
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json']
      } 
    }
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true 
    },
    project: './tsconfig.json',
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
    "prettier",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier", "@typescript-eslint", "react-hooks"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-wrap-multilines": ["error", {
      "declaration": "parens",
      "assignment": "parens",
      "return": "parens",
      "arrow": "parens",
      "condition": "ignore",
      "logical": "ignore",
      "prop": "ignore"
    }],
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/jsx-indent": "warn",
    "react/jsx-curly-newline": "warn",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "no-underscore-dangle": ["error", { "allow": ["_id"]}],
    "import/prefer-default-export": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-spreading": "off"
  },
};