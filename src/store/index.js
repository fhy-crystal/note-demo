import Vue from 'vue';
import Vuex from 'vuex';

import event from './modules/event'
import theme from './modules/theme'


Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		event,
		theme
	}
})