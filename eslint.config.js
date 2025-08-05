import js from "@eslint/js"
import globals from "globals"
import pluginReact from "eslint-plugin-react"
import css from "@eslint/css"
import { defineConfig, globalIgnores } from "eslint/config"
import eslintPluginPrettier from "eslint-plugin-prettier"
import eslintConfigPrettier from "eslint-config-prettier"

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs,jsx}"],
		plugins: {
			js,
			prettier: eslintPluginPrettier,
		},
		extends: ["js/recommended", eslintConfigPrettier],
		rules: {
			...eslintPluginPrettier.configs.recommended.pules,
			"no-console": "warn",
			eqeqeq: "warn",
			curly: "warn",
			"no-else-return": "warn",
			indent: ["error", "tab"],
		},
		languageOptions: { globals: globals.browser },
	},
	pluginReact.configs.flat.recommended,
	{
		files: ["**/*.css"],
		plugins: { css },
		language: "css/css",
		extends: ["css/recommended"],
	},
	globalIgnores(["build/*", "dist/*", "node_modules/*", "plopfile.js"]),
])
