module.exports = {
  trailingComma: "all",
  singleQuote: true,
  semi: true,
  tabWidth: 2,
  plugins: ["@trivago/prettier-plugin-sort-imports", "decorators-legacy"],
  importOrder: ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
  importOrderParserPlugins: [
    "classProperties",
    "decorators-legacy",
    "typescript",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
