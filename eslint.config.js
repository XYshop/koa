// eslint.config.js
import js from "@eslint/js";
import parserTs from "@typescript-eslint/parser";
import pluginTs from "@typescript-eslint/eslint-plugin";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": pluginTs,
    },
    rules: {
      ...pluginTs.configs.recommended.rules,

      // 你自己的规则
      // "@typescript-eslint/no-explicit-any": "off",
      // "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];
