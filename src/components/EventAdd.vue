<template>
	<div class="add">
		<input type="text" v-model="content" placeholder="待办事项" @keyup.enter="submit">
		<button class="submit" @click="submit">提交</button>
	</div>
</template>

<script>
export default {
	name: 'EventAdd',
	data () {
		return {
			content: ''
		}
	},
	computed: {
		eventList() {
			return this.$store.getters.getEventList;
		}
	},
	methods: {
		submit() {
			let postBody = {
				id: 0,
				content: '',
				time: '',
				type: 0
			}
			if (this.content) {
				postBody.content = this.content.trim();
				this.$store.dispatch('addEvent', postBody);
				this.content = '';
				this.$toast('添加成功')
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.add {
		display: flex;
		padding: 30px 0;
		font-size: 16px;

		input[type=text] {
			flex: auto;
			margin-right: 20px;
			height: 40px;
			padding: 7px 10px;
			line-height: 26px;
			border: 1px solid #c0ccda;
			border-radius: 4px;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
		}

		.submit {
			width: 80px;
			height: 40px;
			line-height: 26px;
			color: #fff;
			background-color: #00b0f0;
			border: 0;
			border-radius: 4px;
			cursor: pointer;
		}
	}
</style>