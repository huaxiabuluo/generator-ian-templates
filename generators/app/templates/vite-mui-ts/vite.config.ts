import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import postCssPresetEnv from 'postcss-preset-env';
// import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [['@swc/plugin-emotion', {}]],
    }),
    // legacy({
    //   targets: ['chrome >= 87', 'safari >= 14', 'firefox >= 78'],
    //   polyfills: ['es.promise.finally', 'es/map', 'es/set'],
    //   modernPolyfills: ['es.promise.finally'],
    // }),
  ],
  server: {
    port: 3000,
    open: true,
    // proxy: {
    //   // 字符串简写写法：http://localhost:5173/foo -> http://localhost:4567/foo
    //   '/foo': 'http://localhost:4567',
    //   // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
    //   '/api': {
    //     target: 'http://jsonplaceholder.typicode.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    //   // 代理 websockets 或 socket.io 写法：ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
    //   '/socket.io': {
    //     target: 'ws://localhost:5174',
    //     ws: true,
    //   },
    // },
  },
  resolve: {
    alias: {
      '@': '/src',
      '@public': '/public',
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
    postcss: {
      plugins: [
        autoprefixer(),
        postCssPresetEnv({
          browsers: ['> 1% in CN', 'last 2 versions', 'ios >= 9', 'Android >= 4.4'],
        }),
      ],
    },
  },
});
