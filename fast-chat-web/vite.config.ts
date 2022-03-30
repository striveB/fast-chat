import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const { resolve } = require('path');
const srcPath = resolve(__dirname, 'src');
// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: '0.0.0.0',
		proxy: {
			'/socket.io': {
				target: 'http://localhost:3002',
				changeOrigin: true
			}
		}
	},
	//配置路径别名
	resolve: {
		alias: [
			{
				find: '@',
				replacement: srcPath
			}
		]
	},
	css: {
		//css预处理器
		preprocessorOptions: {
			less: {
				charset: true,
				additionalData: '@import "./src/assets/style/global.less";'
			}
		}
	},
	plugins: [vue()]
});
