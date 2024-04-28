import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack'
    }
  },
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'http://localhost:4000',
    setupNodeEvents(on, config) {
      config.env.api = process.env.BURGER_API_URL;
      return config;
    },
  },
});
