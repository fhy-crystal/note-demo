<template>
	<header>
		<h1>
			记事本
			<a class="btn" @click="showMenu()">
				<div class="bar"></div>
				<div class="bar"></div>
				<div class="bar"></div>
			</a>
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
		methods: {
			showMenu() {
				this.$emit('parentMenu');
			}
		}
	}
</script>

<style scoped lang='scss'>
	header {
		height: 70px;
		line-height: 70px;
		background-color: #00b0f0;
		h1 {
			position: relative;
			max-width: 800px;
			margin: 0 auto;
			color: #fff;
		}
		.btn {
			position: absolute;
			right: 10px;
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