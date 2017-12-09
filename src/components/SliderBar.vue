<template>
	<div class="tool_box" :class="{'show_tool': showTool}">
		<ul>
			<li>
				<a class="btn">切换主题</a>
			</li>
			<li>
				<a class="btn" @click="download('noteData.txt', getData)">下载数据</a>
			</li>
			<li>
				<a class="btn" @click="upladData()">导入数据</a>
			</li>
			<li>
				<a class="btn" @click="editData">编辑数据</a>
				
			</li>
			<li>
				<a class="btn" @click="clearData()">清空数据</a>
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
	props: ['showTool'],
	computed: {
		getData() {
			return JSON.stringify(this.$store.state.event);
		}
	},
	methods: {
		download(filename, content) {
			let aElement = document.createElement('a');
			let blob = new Blob([content]);
			aElement.download = filename;
			aElement.href = URL.createObjectURL(blob); // 创建一个指向blob对象的URL对象
			aElement.click();
			URL.revokeObjectURL(blob); // 释放URL对象
		},
		upladData() {
			this.$emit('uploadData');
		},
		editData() {
			this.$emit('openTable');
		},
		clearData() {
			this.$emit('clearData');
		}
	}
}
</script>

<style lang="scss" scoped>
	.tool_box {
		position: fixed;
		top: 70px;
		left: 0;
		bottom: 0;
		width: 250px;
		padding: 20px 30px;
		box-sizing: border-box;
		transform: translateX(-250px);
		transition: transform .3s;
		background: rgba(0, 0, 0, .5);
		font-size: 16px;
		z-index: 9;

		&.show_tool {
			transform: translateX(0);
		}

		li {
			list-style-type: none;
			line-height: 60px;
			.btn {
				width: 100px;
				height: 40px;
				line-height: 40px;
				transition: background-color .3s ease-in;
				background-color: #00b0f0;
				border-color: #00b0f0;
				color: #fff;
				font-size: 16px;
			}
		}
	}
</style>