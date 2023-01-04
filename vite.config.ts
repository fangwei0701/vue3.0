import { ConfigEnv, UserConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from 'vite-plugin-mock';
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {
  TDesignResolver,
  ViewUiResolver,
} from "unplugin-vue-components/resolvers";


export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';

  return {
    build: {
      target: "es2015",
      sourcemap: false,
      chunkSizeWarningLimit: 2000,
      reportCompressedSize: false,
    },
    server: {
      https: false,
      port: 8080,
      host: "0.0.0.0",
      open: false,
      cors: true,
      proxy: {
        '/api': {
          target: '',
          secure: true,
          changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        }
      },
    },
    // 按需加载
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: 'src/auto-imports.d.ts',
        resolvers: [TDesignResolver({ library: "vue-next" }), ViewUiResolver()],
      }),
      Components({
        resolvers: [TDesignResolver({ library: "vue-next" }), ViewUiResolver()],
        dirs: ['src/components'],
        dts: 'src/components.d.ts',
        directoryAsNamespace: false,
        globalNamespaces: [],
        directives: true,
        extensions: ['vue'],
        deep: true,
        include: [/\.vue$/, /\.vue\?vue/],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
      }),
      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: !isBuild,
        prodEnabled: isBuild,
        injectCode: `
          import { setupProdMockServer } from './mock/_mockService';
          setupProdMockServer();
          `,
        }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@utils": resolve(__dirname, "src/utils"),
        "@com": resolve(__dirname, "src/components"),
      },
    }
  }
}

