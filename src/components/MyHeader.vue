<template>
	<header>
		<h1>
			<a class="btn_bar" :class="{'cross': showTool||showTheme}" @click="showMenu()">
				<div class="bar"></div>
				<div class="bar"></div>
				<div class="bar"></div>
			</a>
			记事本
		</h1>
	</header>
</template>

<script>
	export default {
		data() {
			name: 'MyHeader'
			return {
				
			}
		},
		props: ['showTool', 'showTheme'],
		methods: {
			showMenu() {
				this.$emit('parentMenu');
			}
		}
	}
</script>

<style scoped lang="scss">
	header {
		position: relative;
		z-index: 11;
		height: 70px;
		line-height: 70px;
		h1 {
			position: relative;
			max-width: 1000px;
			margin: 0 auto;
			color: #fff;
		}
		.btn_bar {
			position: absolute;
			left: 10px;
			top: 0;
			bottom: 0;
			margin: auto;
			width: 30px;
			height: 30px;
			cursor: pointer;

			.bar:nth-of-type(3) {
				margin-bottom: 0;
			}
			.bar {
				position: relative;
				display: block;
				width: 30px;
				height: 5px;
				margin: 4px auto;
				background-color: #fff;
				border-radius: 10px;
				-webkit-transition: .3s;
				transition: .3s;
			}
		}

		.cross {
			.bar:nth-of-type(1) {
				-webkit-transform: translateY(15px) rotate(-45deg);
				-ms-transform: translateY(15px) rotate(-45deg);
				transform: translateY(15px) rotate(-45deg);
			}
			.bar:nth-of-type(2) {
				opacity: 0;
			}
			.bar:nth-of-type(3) {
				-webkit-transform: translateY(-5px) rotate(45deg);
				-ms-transform: translateY(-5px) rotate(45deg);
				transform: translateY(-5px) rotate(45deg);
			}
		}
	}
</style>