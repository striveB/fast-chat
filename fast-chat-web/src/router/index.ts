import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		name: '首页',
		path: '/',
		component: () => import('@/layouts/Root.vue'),
		children: [
			{
				name: '登录',
				path: '',
				component: () => import('@/pages/Login.vue')
			},
			{
				name: '🏹 F-C',
				path: '/weclome',
				component: () => import('@/pages/Weclome.vue')
			},
			{
				name: '聊天面板',
				path: '/chat-panel/:fCode',
				component: () => import('@/pages/chat/ChatPanel.vue')
			}
		]
	}
];

const router = createRouter({
	routes,
	history: createWebHashHistory()
});

export default router;
