// 创建构造函数
function dealData(name) {
	this.get = function() {
		return localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : '';
	}

	this.set = function(params) {
		localStorage.setItem(name, JSON.stringify(params));
	}

	this.clear = function() {
		localStorage.removeItem(name);
	}
}

const dealEvent = new dealData('eventData');

const formatDate = () => {
	let date = new Date(),
		month = parseInt(date.getMonth()) + 1,
		day = date.getDate();
	month = month < 10 ? ('0' + month) : month;
	day = day < 10 ? ('0' + day) : day;
	return date.getFullYear() + '-' + month + '-' + day;
}

export {
	dealEvent,
	formatDate
}