<template>
	<div class="theme_box" :class="{'show_theme': showTheme}">
		<a class="back" @click="back()"></a>
		<ul>
			<li>点击切换主题色</li>
			<li>
				<a class="btn" @click="changeTheme('blue')">
					<span class="color" style="background-color:#00b0f0"></span>
					#00b0f0
				</a>
				<a class="btn" @click="changeTheme('orange')">
					<span class="color" style="background-color:#f4b976"></span>
					#f4b976
				</a>
			</li>
			
		</ul>
	</div>	
</template>

<script>
export default {
	data() {
		return {

		}
	},
	props: ['showTheme'],
	computed: {
		getData() {
			return JSON.stringify(this.$store.state.event);
		}
	},
	methods: {
		back() {
			this.$emit('back');
		},
		changeTheme(color) {
			this.$store.dispatch('changeTheme', color);
			this.$emit('close');
		}
	}
}
</script>

<style lang="scss" scoped>
	.theme_box {
		position: fixed;
		top: 70px;
		left: 0;
		bottom: 0;
		width: 250px;
		padding: 20px 30px;
		box-sizing: border-box;
		transform: translateX(-250px);
		transition: transform .3s;
		background-color: #eee;
		font-size: 16px;
		z-index: 9;

		&.show_theme {
			transform: translateX(0);
		}

		.back {
			display: inline-block;
			width: 10px;
			height: 10px;
			border: {
				top: 2px solid #666;
				right: 2px solid #666;
			};
			transform: rotate(-135deg);
			cursor: pointer;
		}

		li {
			list-style-type: none;
			line-height: 60px;
			.btn {
				position: relative;
				width: 100px;
				height: 40px;
				line-height: 40px;
				font-size: 16px;
				text-indent: 35px;
				text-align: left;
				border: 1px solid #c0ccda;

				.color {
					position: absolute;
					left: 10px;
					top: 0;
					bottom: 0;
					margin: auto;
					display: inline-block;
					width: 20px;
					height: 20px;
				}
			}
		}
	}
</style>