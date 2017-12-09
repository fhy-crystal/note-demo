<template>
	<div class="dialog">
		<div class="dialog_box">
			<div class="dialog_header">
				<span>提示</span>
			</div>
			<div v-if="this.msg!=='upload'" class="dialog_content">
				<p>{{msg}}</p>
			</div>
			<!-- 上传 -->
			<div v-else class="dialog_content">
				<input type="file" accept="*.txt" @click="emptyForm($event)" @change="upload($event)">
				<p>只允许上传由侧边栏下载的 noteData.txt 文件</p>
				<p class="success" v-if="up_success">数据读取成功，是否确定导入？</p>
				<p class="error" v-if="up_error">上传失败，只允许 noteData.txt 文件</p>
			</div>
			<div class="dialog_footer">
				<a class="btn btn_cancel" @click="cancel()">取消</a>
				<a class="btn btn_confirm" @click="confirm()" v-if="msg!=='upload'">确定</a>
				<a class="btn btn_confirm" v-else @click="confirmUpload()">确定</a>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			up_success: false,
			up_error: false,
			events: ''
		}
	},
	props: ['msg'],
	methods: {
		// 清除状态
		emptyForm(event) {
			this.up_error = false;
			this.up_success = false;
		},
		// 上传
		upload(event) {
			let self = this,
				reader = new FileReader(),
				files = event.srcElement.files;
			if (files[0] && files[0].name.indexOf('noteData') !== -1) {
				reader.onload = function(data) {
					self.up_error = false;
					self.up_success = true;
					self.events = data.target.result;
				}
				reader.readAsText(files[0]);
			} else {
				self.up_error = true;
				self.up_success = false;
				self.events = '';
			}
		},
		// 取消
		cancel() {
			this.$emit('cancelBtn')
		},
		// 普通确认
		confirm() {
			this.$emit('confirmBtn')
		},
		// 确认导入
		confirmUpload() {
			if (this.up_success) {
				this.$store.dispatch('import', this.events);
				this.cancel();
			} else {
				this.$toast('请选择正确的文件');
			}
			
		}
	}
}
</script>
<style lang="scss" scoped>
	.dialog {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		overflow: auto;
		background: rgba(0, 0, 0, .4);
		z-index: 999;

		.dialog_box {
			position: absolute;
			left: 50%;
			top: 20%;
			width: 100%;
			max-width: 400px;
			transform: translateX(-50%);
			background-color: #fff;
			border-radius: 4px;
			box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
			box-sizing: border-box;
			animation: dialog .5s;

			.dialog_header {
				padding: 15px 20px;
				background-color: #00b0f0;
				color: #fff;
			}
			.dialog_content {
				padding: 15px 20px;
				color: #475669;
				font-size: 14px;
				text-align: center;
				input {
					margin-bottom: 5px;
				}
				p {
				    font-size: 14px;
				    margin-top: 10px;

				    &.success {
				    	color: #26be3a;
				    }
				    &.error {
				    	color: #fe6660;
				    }
				}
			}

			.dialog_footer {
				padding: 0 20px 15px 20px;
				text-align: right;
				.btn_confirm {
					background-color: #00b0f0;
					color: #fff;
					border-color: #00b0f0;
				}
			}
		}
	}

	@keyframes dialog {
	    from{
	        top: 15%;
	    }
	}
</style>