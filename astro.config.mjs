import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://hkmotors.netlify.app",
  output: "static",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
});
