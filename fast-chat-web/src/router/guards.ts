import { NavigationGuardWithThis } from 'vue-router';
import { chatStore } from '../store/chat';
import cookie from 'js-cookie';
interface guardsInter {
	beforeEach: NavigationGuardWithThis<undefined>[];
	afterEach: NavigationGuardWithThis<undefined>[];
}

//不需要登录验证的路由
const ignoreRouter = ['/'];
const loginGuard: NavigationGuardWithThis<undefined> = (to, from, next) => {
	const chat = chatStore();
	const isLogin = cookie.get('token');
	if (!ignoreRouter.includes(to.fullPath) || isLogin) {
		if (isLogin) {
			if (to.fullPath === '/') {
				next('/weclome');
				return;
			}
		} else {
			next('/');
			chat.logout();
		}
	}
	next();
};
const guards: guardsInter = {
	beforeEach: [loginGuard],
	afterEach: []
};
export default guards;
