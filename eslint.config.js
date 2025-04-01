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
      "space-in-parens": ["error", "always"], // Enforce spaces inside parentheses
      "react/jsx-uses-react": "off",    // Disable the rule for React 17+
      "react/jsx-indent": ["error", 2], // Enforce 2-space indentation for JSX
      "react/jsx-indent-props": ["error", 2], // Enforce 2-space indentation for JSX props
      "no-multiple-empty-lines": ["error", { "max": 2 }], // Allow at most 2 empty lines
    },
  },
]);
