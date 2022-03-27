import enquireJs from 'enquire.js';
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
