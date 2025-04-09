import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default defineConfig([
  { files: ["app/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { files: ["app/*.{js,mjs,cjs,ts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
  { files: ["app/*.{js,mjs,cjs,ts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{jsx,tsx}"],
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'space-in-parens': ['error', 'always'],
      'no-tabs': 'error',
      'no-whitespace-before-property': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      '@typescript-eslint/no-inferrable-types': 'off',
      'prettier/prettier': 'off',
      'indent': ['error', 2, {
        SwitchCase: 1,
        MemberExpression: 1,
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false
      }],
      'object-curly-spacing': ["error", "always"],
      'quotes': ['error', 'single'],
      'react/prop-types': [ 'off' ],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-curly-spacing': [
        'error',
        {
          when: 'always',
        },
      ],
      'react/jsx-first-prop-new-line': [
        'error',
      ],
      'react/jsx-indent': [
        'error',
        2,
        {
          checkAttributes: false,
          indentLogicalExpressions: true,
        },
      ],
      'react/jsx-indent-props' : [
        'error',
        2,
      ],
      'react/jsx-max-props-per-line': [
        'error',
        {
          maximum: 1,
        },
      ],
      'react-hooks/exhaustive-deps': ['off'],
      'react-hooks/rules-of-hooks': ['off'],
      'radix': 'off',
      'no-empty': ['error', {
        allowEmptyCatch: true,
      }],
      'no-redeclare': 'off',
      'react-native/no-inline-styles': 'off',
      '@typescript-eslint/no-shadow': 'off',
      "no-multiple-empty-lines": ["error", { max: 2 }],
      'react/no-unstable-nested-components': 'off',
      "space-infix-ops": ["error", { "int32Hint": false }],
      "key-spacing": ["error", { "afterColon": true }],
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/array-type": ["error", { "default": "generic" }],
      'no-console': ['error', {'allow': ['warn', 'error', 'info' ] } ]
    },
  },
]);
