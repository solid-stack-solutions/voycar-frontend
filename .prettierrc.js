/** @type {import("prettier").Config} */
const config = {
    tabWidth: 4,

    //// defaults we might want to change later
    trailingComma: "all",
    printWidth: 80,
    // https://prettier.io/blog/2018/11/07/1.15.0#whitespace-sensitive-formatting
    htmlWhitespaceSensitivity: "css",

    // plugins and settings for file types
    plugins: ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
    overrides: [
        { files: "*.svelte", options: { parser: "svelte" } },
        { files: "*.svg", options: { parser: "html" } },
        { files: "*.yml", options: { tabWidth: 2 } },
    ],
};

export default config;
