/** @type {import("prettier").Config} */
const config = {
    tabWidth: 4,

    //// defaults we might want to change later
    trailingComma: "all",
    printWidth: 80,
    // https://prettier.io/blog/2018/11/07/1.15.0#whitespace-sensitive-formatting
    htmlWhitespaceSensitivity: "css",

    // plugins and settings for file types
    plugins: ["prettier-plugin-svelte"],
    overrides: [
        { files: "*.svelte", options: { parser: "svelte" } },
        { files: "*.svg", options: { parser: "html" } },
    ],
};

export default config;
