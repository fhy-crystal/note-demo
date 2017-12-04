import * as eventType from '../mutation-types';
import { dealEvent, formatDate } from '../../../static/js/public';

const state = dealEvent.get() || {
	event: [{
		title: '未完成',
		tag: 'toDo',
		list: [],
	}, {
		title: '已完成',
		tag: 'done',
		list: [],
	}, {
		title: '已取消',
		tag: 'cancel',
		list: [],
	}],
	count: 0
}

const getters = {
	getEventList(states) {
		return states.event;
	}
}

const mutations = {
	// 事件添加
	[eventType.EVENTADD](states, payload) {
		states.count++;
		payload.id = states.count;
		states.event[0].list.unshift(payload); // 添加到未完成列表
		dealEvent.set(states);
	},

	// 取消事件
	[eventType.EVENTCANCEL](states, payload) {
		for (let i = 0; i < states.event[0].list.length; i++) {
			if (states.event[0].list[i].id == payload.id) {
				states.event[0].list.splice(i, 1); // 从未完成列表删除
			}
		}
		states.event[2].list.unshift(payload); // 添加到取消列表
		dealEvent.set(states);
	},

	// 取消中恢复事件
	[eventType.CANCELTOTODO](states, payload) {
		for (var i = 0; i < states.event[2].list.length; i++) {
			if (states.event[2].list[i].id == payload.id) {
				states.event[2].list.splice(i, 1); // 从取消列表删除
			}
		}
		states.event[0].list.unshift(payload); // 添加到未完成列表
		dealEvent.set(states);
	},
	// 已完成中恢复事件
	[eventType.DONETOTODO](states, payload) {
		for (var i = 0; i < states.event[1].list.length; i++) {
			if (states.event[1].list[i].id == payload.id) {
				states.event[1].list.splice(i, 1); // 从取消列表删除
			}
		}
		states.event[0].list.unshift(payload); // 添加到未完成列表
		dealEvent.set(states);
	},

	// 已完成事件
	[eventType.EVENTDONE](states, payload) {
		for (var i = 0; i < states.event[0].list.length; i++) {
			if (states.event[0].list[i].id == payload.id) {
				states.event[0].list.splice(i, 1); // 从取消列表删除
			}
		}
		payload.time = formatDate();
		states.event[1].list.unshift(payload); // 添加到未完成列表
		dealEvent.set(states);
	},
}

const actions = {
	addEvent({commit}, params) {
		commit(eventType.EVENTADD, params);
	},
	cancelEvent({commit}, params) {
		commit(eventType.EVENTCANCEL, params);
	},
	cancelTotodo({commit}, params) {
		commit(eventType.CANCELTOTODO, params);
	},
	doneTotodo({commit}, params) {
		commit(eventType.DONETOTODO, params);
	},
	doneEvent({commit}, params) {
		commit(eventType.EVENTDONE, params);
	}
}


export default {
	state,
	getters,
	mutations,
	actions,
}