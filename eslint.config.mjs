import globals from "globals";
import pluginJs from "@eslint/js";
import tsEslint from "@typescript-eslint/eslint-plugin";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser,
      parser: tsEslint.parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
    plugins: {
      js: pluginJs,
      ts: tsEslint,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-redeclare": "error",
      "init-declarations": ["warn", "always"],
      "prefer-const": "warn",
      "semi": ["error", "always"]
    },
  },
  pluginJs.configs.recommended,
];
