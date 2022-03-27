import { defineStore } from 'pinia';
export const settingStore = defineStore('setting', {
	state() {
		return {
			isMobile: false
		};
	},
	actions: {
		toMobile(res: boolean): void {
			this.isMobile = res;
		}
	}
});
