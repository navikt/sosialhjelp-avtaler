import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  js.configs.recommended,
  ...tsPlugin.configs["flat/recommended"],
  reactPlugin.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  eslintConfigPrettier,
  {
    settings: {
      react: { version: "19" },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-useless-escape": "off",
    },
  },
  globalIgnores(["**/dist/**", "**/.husky/**"]),
]);
