import { defineConfig } from "cypress";
import webpack from "webpack"
import webpackPreprocessor from "@cypress/webpack-preprocessor";

export default defineConfig({
  e2e: {
    specPattern: './**/*.spec.ts',
    supportFile: false,
    setupNodeEvents(on, config) {
      const webpackOptions = {
        resolve: {
          extensions: [".ts", ".js", ".wasm"],
          fallback: {
            "stream": require.resolve("stream-browserify"),
            "zlib": false, 
            "querystring": false, 
            "path": false, 
            "fs": false 
          } as const
        },
        module: {
          rules: [
            {
              test: /\.wasm$/,
              type: "asset/resource", // Ensures WebAssembly files are handled correctly
            },
          ],
        },
        experiments: {
          asyncWebAssembly: true, // Enable WebAssembly
          syncWebAssembly: true,  // (Optional) Enable synchronous WASM
        },
        plugins: [
          new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
            process: "process/browser",
          }),
        ]
      };

      const options = {
        webpackOptions,
      };

      on("file:preprocessor", webpackPreprocessor(options));

      return config;
    },
  },
});
