const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: (config) => {
    config.performance.maxEntrypointSize(400000).maxAssetSize(400000);
  },
});
