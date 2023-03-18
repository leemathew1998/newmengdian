const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// vue.config.js
module.exports = {
  productionSourceMap: false,
  // 打包app时放开该配置
  publicPath: "./",
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
        plugins: "@/plugins",
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@$", resolve("src"))
      .set("@api", resolve("src/api"))
      .set("@assets", resolve("src/assets"))
      .set("@comp", resolve("src/components"))
      .set("@views", resolve("src/views"));

    // 生产环境，开启js\css压缩
    if (process.env.NODE_ENV === "production") {
      config.plugin("compressionPlugin").use(
        new CompressionPlugin({
          test: /\.(js|css|less)$/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
        })
      );
    }

    // 配置 webpack 识别 markdown 为普通的文件
    config.module
      .rule("markdown")
      .test(/\.md$/)
      .use()
      .loader("file-loader")
      .end();

    // 编译vxe-table包里的es6代码，解决IE11兼容问题
    config.module
      .rule("vxe")
      .test(/\.js$/)
      .include.add(resolve("node_modules/vxe-table"))
      .add(resolve("node_modules/vxe-table-plugin-antd"))
      .end()
      .use()
      .loader("babel-loader")
      .end();
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */
          "primary-color": "#1890FF",
          "link-color": "#1890FF",
          "border-radius-base": "4px",
        },
        javascriptEnabled: true,
      },
    },
  },

  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        // target: 'http://10.168.2.150:9001',
        // target: 'http://10.168.4.233:8080',//杜阳阳
        target: "http://25.73.1.171:18080", //张升（远程）
        // target: 'http://10.168.4.153:8080', //魏加锴
        // target: 'http://10.168.4.147:8080', //张升`
        // target: 'http://10.168.4.247:8080',//邢俊豪
        // target: 'http://10.168.4.240:8080',//程传林
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          "/api": "/api",
        },
      },
    },
  },

  lintOnSave: false,
};
