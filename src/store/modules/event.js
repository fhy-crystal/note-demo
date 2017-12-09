import * as eventType from '../mutation-types';
import { dealEvent, formatDate } from '../../../static/js/public';

const displayList = [{
		title: '未完成',
		tag: 'toDo',
		show: true,
		list: []
	}, {
		title: '已完成',
		tag: 'done',
		show: true,
		list: []
	}, {
		title: '已取消',
		tag: 'cancel',
		show: true,
		list: []
	}];
const initState = {
	event: [],
	display: [],
	count: 0
}
initState.event = dealEvent.get() || [];
initState.display = JSON.parse(JSON.stringify(displayList));// 深拷贝，取消旧数据影响

const state = initState;

const getters = {
	getEventList(states) {
		return states.event;
	},
	getDisplayList(states) {
		states.display = JSON.parse(JSON.stringify(displayList));// 深拷贝，取消旧数据影响
		for (let i = 0; i < states.event.length; i++) {
			if (states.event[i].type == 0) {
				states.display[0].list.unshift(states.event[i])
			} else if (states.event[i].type == 1) {
				states.display[1].list.unshift(states.event[i])
			} else {
				states.display[2].list.unshift(states.event[i])
			}
		}
		return states.display;
	},
	getToDo(states) {
		return states.event.filter(function(data) {
			if (data.type == 0) {
				return data;
			}
		})
	},
	getDone(states) {
		return states.event.filter(function(data) {
			if (data.type == 1) {
				return data;
			}
		})
	},
	getCancel(states) {
		return states.event.filter(function(data) {
			if (data.type == 2) {
				return data;
			}
		})
	}
}
// 0: 未完成 1：已完成 2：已取消
const mutations = {
	// 事件添加
	[eventType.EVENTADD](states, payload) {
		states.count++;
		payload.id = states.count;
		states.event.unshift(payload);
		dealEvent.set(states.event);
	},

	// 取消事件
	[eventType.EVENTCANCEL](states, payload) {
		let newItem = '';
		for (let i = 0; i < states.event.length; i++) {
			if (states.event[i].id == payload.id) {
				states.event[i].type = 2; // 修改type为已取消
				newItem = states.event[i];
				states.event.splice(i, 1);
			}
		}
		states.event.unshift(newItem);
		dealEvent.set(states.event);
	},

	// 未完成事件
	[eventType.EVENTTODO](states, payload) {
		let newItem = '';
		for (var i = 0; i < states.event.length; i++) {
			if (states.event[i].id == payload.id) {
				states.event[i].type = 0; // 修改type为未完成
				newItem = states.event[i];
				states.event.splice(i, 1);
			}
		}
		states.event.unshift(newItem);
		dealEvent.set(states.event);
	},

	// 已完成事件
	[eventType.EVENTDONE](states, payload) {
		let newItem = '';
		for (var i = 0; i < states.event.length; i++) {
			if (states.event[i].id == payload.id) {
				states.event[i].type = 1; // 修改type为已完成
				states.event[i].time = formatDate();
				newItem = states.event[i];
				states.event.splice(i, 1);
			}
		}
		states.event.unshift(newItem); // 添加到完成列表
		dealEvent.set(states.event);
	},

	// 导入
	[eventType.IMPORT](states, payload) {
		payload = JSON.parse(payload);
		states.event = payload.event;
		states.count = payload.count;
		dealEvent.set(states.event);
	},

	// 清除
	[eventType.CLEAR](states) {
		states.event = [];
		dealEvent.clear();
	},

	// 编辑
	[eventType.EDIT](states, payload) {
		if (states.event[payload.index].id == payload.id) {
			states.event[payload.index].content = payload.content;
		} else {
			states.event.filter(function(data) {
				if (data.id == payload.id) {
					data.content = payload.content;
				}
			})
		}
		dealEvent.set(states.event);
	},

	// 删除
	[eventType.DELETE](states, payload) {
		if (states.event[payload.index].id == payload.id) {
			states.event.splice(payload.index, 1);
		} else {
			states.event.filter(function(data, i) {
				if (data.id == payload.id) {
					states.event.splice(i, 1);
				}
			})
		}
		dealEvent.set(states.event);
	}
}

const actions = {
	addEvent({commit}, params) {
		commit(eventType.EVENTADD, params);
	},
	cancelEvent({commit}, params) {
		commit(eventType.EVENTCANCEL, params);
	},
	todoEvent({commit}, params) {
		commit(eventType.EVENTTODO, params);
	},
	doneEvent({commit}, params) {
		commit(eventType.EVENTDONE, params);
	},
	import({commit}, params) {
		commit(eventType.IMPORT, params)
	},
	clearData({commit}) {
		commit(eventType.CLEAR);
	},
	editEvent({commit}, params) {
		commit(eventType.EDIT, params);
	},
	deleteEvent({commit}, params) {
		commit(eventType.DELETE, params)
	}
}


export default {
	state,
	getters,
	mutations,
	actions,
}