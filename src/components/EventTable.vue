<template>
	<div class="table_box" :class="{'show_table': showTable}">
		<div class="content">
			<!-- 编辑输入框 -->
			<div class="edit_box" :class="{'edit_box_show': isEdit}">
				<input type="text" v-model="editInfo.content" ref="editContent">
				<a class="btn confirm_edit" @click="confirmEdit()">确定</a>
			</div>
			<!-- 筛选 -->
			<div class="select_block">
				<div class="select_box" :class="{'active': isSelect}">
					<div class="select_value" @click="isSelect=!isSelect">{{selectInfo.name}}</div>
					<div class="select_body">
						<div v-for="item in typeList" class="option" @click="select(item)">{{item.value}}</div>
					</div>
				</div>
				<input type="text" class="search_input" v-model="searchKey" placeholder="筛选关键词">
			</div>
			<table class="table">
				<thead>
					<tr>
						<th>#</th>
						<th>所有事项</th>
						<th>类型</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in eventList">
						<td>{{index + 1}}</td>
						<td align="left">{{item.content}}</td>
						<td>
							<select disabled v-model="item.type" class="simulate">
								<option v-for="type in typeList" :value="type.key">{{type.value}}</option>
							</select>
						</td>
						<td>
							<a class="btn edit" @click="editData(index)">编辑</a>
							<a class="btn del" @click="deleteBtn(index, item.id)">删除</a>
						</td>
					</tr>
				</tbody>
			</table>

			<a class="btn back" @click="backBtn">返回</a>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			typeList: [{
				key: -1,
				value: '筛选类型'
			}, {
				key: 0,
				value: '未完成'
			}, {
				key: 1,
				value: '已完成'
			}, {
				key: 2,
				value: '已取消'
			}],
			isEdit: false,
			isSelect: false,
			editInfo: {
				content: '',
				id: 0,
				index: 0
			},
			searchKey: '',
			selectInfo: {
				type: -1,
				name: '筛选类型'
			}
		}
	},
	props: ['showTable'],
	computed: {
		eventList() {
			let _this  = this;
			return this.$store.getters.getEventList.filter(function(data) {
				if (_this.selectInfo.type !== -1 && _this.selectKey == '') {
					if (data.type == _this.selectInfo.type) {
						return data;
					}
				} else if(_this.selectInfo.type !== -1 && _this.selectKey !== '') {
					if (data.type == _this.selectInfo.type && data.content.indexOf(_this.searchKey) > -1) {
						return data;
					}
				} else if (_this.selectInfo.type == -1 && _this.searchKey !== '') {
					if (data.content.indexOf(_this.searchKey) > -1) {
						return data
					}
				} else {
					return data;
				}
			});
		}
	},
	methods: {
		select(obj) {
			this.selectInfo.type = obj.key;
			this.selectInfo.name = obj.value;
			this.isSelect = false;
		},
		editData(idx) {
			this.isEdit = true;
			this.editInfo = {
				index : idx,
				content : this.eventList[idx].content,
				id : this.eventList[idx].id
			}
			this.$refs.editContent.focus();
		},
		confirmEdit() {
			this.editInfo.content = this.editInfo.content.trim();
			if (this.editInfo.content) {
				this.$store.dispatch('editEvent', this.editInfo);
				this.isEdit = false;
				this.$toast('修改成功')
			}
		},
		deleteBtn(idx, id) {
			this.$emit('delete', idx, id)
		},
		backBtn() {
			this.$emit('closeTable');
		}
	}
}
</script>

<style lang="scss" scoped>
	.table_box {
		position: absolute;
		top: 70px;
		right: 0;
		bottom: 0;
		left: 0;
		transform: translateX(-100%);
		transition: transform .5s;
		background-color: #fff;
		&.show_table {
			transform: translateX(0);
		}

		.content {
			width: 100%;
			max-width: 1000px;
			margin: 20px auto 70px;

			.edit_box {
				position: fixed;
				top: 0;
				width: 100%;
				display: flex;
				max-width: 1000px;
				margin: auto;
				height: 60px;
				padding: 10px;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				z-index: 10;
				transform: translateY(-260px);
				transition: transform .3s;
				background: #f3f3f3;
				border: 1px solid #eee;
				border-radius: 4px;
				&.edit_box_show{
					transform: translateY(0);
				}
				input[type="text"] {
					flex: auto;
					width: 100%;
					height: 40px;
					padding: 5px 10px;
					-webkit-box-sizing: border-box;
					box-sizing: border-box;
					border: 1px solid #ddd;
				}
				.confirm_edit {
					margin-left: 10px;
					width: 80px;
					height: 38px;
					line-height: 38px;
					color: #fff;
					border: 0;
					font-size: 16px;
				}
			}

			.select_block {
				margin-bottom: 10px;
				display: flex;
				.select_box {
					position: relative;
					margin-right: 10px;
					width: 95px;
					height: 35px;
					padding: 0 10px;
					-webkit-box-sizing: border-box;
					box-sizing: border-box;
					border: 1px solid #eee;
					font-size: 12px;
					color: #999;
					cursor: pointer;

					&:after {
						position: absolute;
						right: 10px;
						top: 12px;
						width: 6px;
						height: 6px;
						content: '';
						border-right: 1px solid #999;
						border-bottom: 1px solid #999;
						-webkit-transform: rotate(45deg);
						transform: rotate(45deg);
					}

					.select_value {
						text-indent: -10px;
						line-height: 35px;
					}

					.select_body {
						position: absolute;
						left: 0;
						top: 35px;
						width: 87px;
						height: 0;
						text-indent: -10px;
						line-height: 30px;
						box-sizing: border-box;
						overflow: hidden;
						z-index: 10;
						box-shadow: none;
						border: 0;
						border-radius: 3px;
						background-color: #fff;
						transition: all .3s;
					}

					&.active {
						.select_body {
							height: 122px;
							border: 1px solid #eee;
							box-shadow: 0 0 1px #ddd;
						}
					}
				}
				.search_input {
					width: 100%;
					height: 35px;
					line-height: 25px;
					padding: 5px 10px;
					-webkit-box-sizing: border-box;
					box-sizing: border-box;
					border: 1px solid #eee;
					font-size: 12px;
					color: #999;
				}
			}

			.table {
				width: 100%;
				border-left: 1px solid #eee;
				border-top: 1px solid #eee;
				border-spacing: 0px;

				td, th {
					height: 40px;
					min-width: 0;
					padding: 5px 10px;
					-webkit-box-sizing: border-box;
					box-sizing: border-box;
					text-overflow: ellipsis;
					vertical-align: middle;
					border-right: 1px solid #eee;
					border-bottom: 1px solid #eee;
				}
				.btn {
					color: #fff;
					border: 0;

					&.del {
						background-color: #f57067;
					}
				}
			}

			.back {
				float: right;
				margin-top: 20px;
				border: 1px solid #c0ccda;
			}
		}
		
	}
</style>