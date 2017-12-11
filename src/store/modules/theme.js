import * as eventType from '../mutation-types';
import { dealTheme, formatDate } from '../../../static/js/public';

const state = dealTheme.get() || {
	theme: 'blue'
};

const getters = {
	getTheme(states) {
		return states.theme
	}
};

const mutations = {
	[eventType.SWITCHTHEME](states, payload) {
		states.theme = payload;
		dealTheme.set(states);
	}
};

const actions = {
	changeTheme({commit}, params) {
		commit(eventType.SWITCHTHEME, params)
	}
};

export default {
	state,
	getters,
	mutations,
	actions,
}

