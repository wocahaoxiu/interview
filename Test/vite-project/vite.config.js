import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // server: {
  //   port: "9888",
  //   proxy: {
  //     api: {
  //       target: "https://192.168.2.21:9888/",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""), // 不可以省略rewrite
  //     },
  //   },
  // },
  transpileDependencies: [],
  devServer: {
    proxy: {
      "/api": {
        target: "https://192.168.2.21:9888/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
