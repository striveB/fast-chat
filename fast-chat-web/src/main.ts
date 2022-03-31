import { createApp } from 'vue';
import App from './App.vue';
import pinia from './store';
import router from './router';
import bootstrap from './bootstarap';
import Antd from 'ant-design-vue';
import '@/theme/index.less';
import 'ant-design-vue/dist/antd.css';

bootstrap(router);
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(Antd);
app.mount('#app');
