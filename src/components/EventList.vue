<template>
	<div class="content">
		<template v-for="(item, index) in displayList">
			<div class="tab" @click="changeCollapse(index, $event)">
				{{item.title}}
				<span :class="{'close': !item.show}"></span>
			</div>
			<div class="box">
				<ul>
					<li v-for="value in item.list" class="list">
						<!-- 未完成 -->
						<input type="checkbox" :key="value.id" :class="{'test': value.type==0}" v-show="value.type==0" @click="dealData('doneEvent', value)"> 

						<!-- 已完成 -->
						<input type="checkbox" v-show="value.type==1" :key="value.id" :checked="{checked: value.type==1}" @click="dealData('todoEvent', value)"> 

						<div :class="{'delete': value.type==2}">{{value.content}}</div>

						<!-- 已完成时间 -->
						<span class="time" v-show="value.type==1">{{value.time}}</span> 

						<!-- 未完成 -->
						<a class="btn" v-show="value.type==0" @click="dealData('cancelEvent', value)">取消</a>

						<!-- 未完成 -->
						<!-- <a class="btn done" v-show="value.type==0" @click="dealData('doneEvent', value)">完成</a> -->

						<!-- 已取消 -->
						<a class="btn" v-show="value.type==2" @click="dealData('todoEvent', value)">恢复</a>
					</li>
				</ul>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: 'EventList',
	data () {
		return {
			
		}
	},
	computed: {
		eventList() {
			return this.$store.getters.getEventList;
		},
		displayList() {
			return this.$store.getters.getDisplayList;
		}
	},
	methods: {
		dealData(status, obj) {
			this.$store.dispatch(status, obj);
		},
		changeCollapse(idx, target) {
			if (this.displayList[idx].show) {
				this.closeBox(target);
			} else {
				this.openBox(target);
			}
			this.displayList[idx].show = !this.displayList[idx].show;
		},
		openBox(target) {
			let boxElement = target.currentTarget.nextElementSibling,
				ulElement = boxElement.getElementsByTagName('ul')[0];
			boxElement.style.display = 'block';
			boxElement.style.height = ulElement.offsetHeight + 'px';
		},
		closeBox(target) {
			let boxElement = target.currentTarget.nextElementSibling,
				ulElement = boxElement.getElementsByTagName('ul')[0];
			boxElement.style.height = ulElement.offsetHeight + 'px';
			// 实现动画效果，需要先执行长度变化，
			setTimeout(function(){
				boxElement.style.height = '0px';
				setTimeout(function () {
					boxElement.style.display = 'none';
				}, 300)
			}, 100)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.content {
		.tab {
			position: relative;
			padding-left: 20px;
			height: 40px;
			line-height: 40px;
			color: #fff;
			cursor: pointer;
			background-color: #00b0f0;
			border-radius: 4px;
			border-bottom: 1px solid #fff;
			span {
				position: absolute;
				right: 20px;
				top: 0;
				bottom: 0;
				margin: auto;
				width: 10px;
				height: 10px;
				border: {
					top: 2px solid #fff;
					right: 2px solid #fff;
				};
				transform: rotate(135deg);
				transition: transform .3s;
				&.close {
					transform: rotate(45deg);
				}
			}
		}

		.box {
			// transition: display .3s; // 想偷懒没偷成，transition不支持display属性，只能通过height属性模拟手风琴模式
			transition: height .3s;
			overflow: hidden;
			ul {
				margin: 0;
				padding: 0;
			}
			.list {
				position: relative;
				padding: 10px 100px 10px 50px;
				list-style: none;
				min-height: 44px;
				line-height: 25px;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				border-bottom: 1px solid #eee;
				color: #373e40;

				input[type=checkbox] {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 25px;
					margin: auto;
					width: 15px;
					height: 15px;
				}
				.time {
					position: absolute;
					right: 20px;
					top: 0;
					line-height: 44px;
					font-size: 12px;
					color: #aaa;
				}
				.btn {
					position: absolute;
					top: 0;
					bottom: 0;
					right: 20px;
					margin: auto;
				}
				.done {
					right: 85px;
				}
				.delete {
					text-decoration: line-through;
					color: #999;
				}
			}
		}
	}
</style>
