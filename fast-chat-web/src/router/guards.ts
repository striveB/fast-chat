import { NavigationGuardWithThis } from 'vue-router';
import { chatStore } from '../store/chat';
interface guardsInter {
	beforeEach: NavigationGuardWithThis<undefined>[];
	afterEach: NavigationGuardWithThis<undefined>[];
}

const ignoreRouter = ['/'];
const loginGuard: NavigationGuardWithThis<undefined> = (to, from, next) => {
	const chat = chatStore();
	const isLogin = JSON.parse(localStorage.getItem('userInfo'));
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
