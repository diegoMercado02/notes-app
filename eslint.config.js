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
      "react/react-in-jsx-scope": "off", // Disable the rule
      "react/jsx-uses-react": "off",    // Disable the rule for React 17+
      "react/jsx-indent": ["warn", 2], // Enforce 2-space indentation for JSX
      "react/jsx-indent-props": ["warn", 2], // Enforce 2-space indentation for JSX props
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // Warn on unused variables, ignore those prefixed with "_"
      "no-unused-imports/no-unused-imports": "warn" // Warn on unused imports
    },
  },
]);
