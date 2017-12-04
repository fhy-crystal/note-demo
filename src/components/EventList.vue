<template>
	<div class="content">
		<template v-for="item in eventList">
			<div class="tab">
				{{item.title}}
				<span></span>
			</div>
			<div class="box">
				<ul>
					<li v-for="value in item.list" class="list">
						<input type="checkbox" v-show="item.tag=='toDo'" @click="dealData('doneEvent', value)"> <!-- 未完成 -->
						<input type="checkbox" v-show="item.tag=='done'" @click="dealData('doneTotodo', value)"> <!-- 已完成 -->

						<div :class="{'delete': item.tag=='cancel'}">{{value.content}}</div>

						<span class="time" v-show="item.tag=='done'">{{value.time}}</span> <!-- 已完成时间 -->

						<button class="btn" v-show="item.tag=='toDo'" @click="dealData('cancelEvent', value)">取消</button><!-- 未完成 -->
						<button class="btn" v-show="item.tag=='cancel'" @click="dealData('cancelTotodo', value)">恢复</button><!-- 已取消 -->
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
		}
	},
	methods: {
		dealData(status, obj) {
			this.$store.dispatch(status, obj);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
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
					padding: 0;
					width: 50px;
					height: 30px;
					line-height: 30px;
					background: #fff;
					border: 1px solid #c0ccda;
					border-radius: 4px;
					color: #666;
					font-size: 12px;
					cursor: pointer;
					&:hover {
						border: 1px solid #00b0f0;
						color: #00b0f0;
					}
				}
				.delete {
					text-decoration: line-through;
					color: #999;
				}
			}
		}
	}
</style>
