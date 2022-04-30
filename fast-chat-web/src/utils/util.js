import enquireJs from 'enquire.js';
import cookie from 'js-cookie';
export function enquireScreen(call) {
	const handler = {
		match: function () {
			call && call(true);
		},
		unmatch: function () {
			call && call(false);
		}
	};
	enquireJs.register('only screen and (max-width: 920px)', handler);
}
// export function checkLogin() {
// 	let token = cookie.get('token');
// 	console.log(token);
// 	return true;
// }
