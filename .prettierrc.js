/** @type {import("prettier").Config} */
const config = {
	// defaults we might want to change later
	"trailingComma": "all",
	"printWidth": 80,
	"tabWidth": 4,

	"plugins": ["prettier-plugin-svelte"],
	"overrides": [{ "files": "*.svelte", "options": { "parser": "svelte" } }],
}

export default config;