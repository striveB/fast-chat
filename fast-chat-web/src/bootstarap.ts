import { Router } from 'vue-router';
import Guards from './router/guards';
//初始化路由守卫
function initGuard(router: Router) {
	const { beforeEach, afterEach } = Guards;
	beforeEach.forEach((fun: any) => {
		if (fun && typeof fun === 'function') {
			router.beforeEach((to, from, next) => fun(to, from, next));
		}
	});
	afterEach.forEach((fun: any) => {
		if (fun && typeof fun === 'function') {
			router.afterEach((to, from, next) => fun(to, from, next));
		}
	});
}
const bootstrap = (router: Router): void => {
	initGuard(router);
};
export default bootstrap;
