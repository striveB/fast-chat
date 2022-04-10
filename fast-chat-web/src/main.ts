import { createApp } from 'vue';
import App from './App.vue';
import pinia from './store';
import router from './router';
import bootstrap from './bootstarap';
import Antd from 'ant-design-vue';
import plugins from './plugin';
import '@/theme/index.less';
import 'ant-design-vue/dist/antd.css';
import { message } from 'ant-design-vue';
message.config({
	top: `60px`,
	duration: 2,
	maxCount: 3
});
bootstrap(router);
const app = createApp(App);
app.use(plugins);
app.use(pinia);
app.use(router);
app.use(Antd);
app.mount('#app');
