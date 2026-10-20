const { defineConfig, globalIgnores } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  globalIgnores(["dist/*", ".expo/*"]),
  expoConfig,
  {
    files: ["src/hooks/use-color-scheme.web.ts"],
    rules: {
      // This update marks client hydration so the initial server render stays light-mode stable.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);
