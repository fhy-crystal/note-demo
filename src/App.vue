<template>
	<div id="app" :class="[theme]">
		<MyHeader @parentMenu="sliderMenu" :show-tool="isShowTool" :show-theme="isShowTheme"/>
		<section class="container">
			<EventAdd/>
			<EventList/>
			<SliderBar :show-tool="isShowTool" 
						@uploadData="uploadBtn" 
						@clearData="clearMethod"
						@openTable="isShowTool=false;isShowTabel=true"
						@themeSlider="isShowTool=false;isShowTheme=true" />
			<Theme :show-theme="isShowTheme" @close="isShowTheme=false" @back="isShowTool=true;isShowTheme=false"/>
		</section>
		<transition name="dialog"> 
			<DialogBox v-show="dialog" @cancelBtn="dialog=false" :msg="tips" @confirmBtn="confirm"/>
		</transition>

		<EventTable :show-table="isShowTabel" @delete="deleteMethod" @closeTable="closeTable" />
	</div>
</template>

<script>
import MyHeader from './components/MyHeader'
import EventList from './components/EventList'
import EventAdd from './components/EventAdd'
import EventTable from './components/EventTable'
import SliderBar from './components/SliderBar'
import Theme from './components/Theme'
import DialogBox from './components/Dialog'

export default {
	name: 'app',
	data() {
		return {
			dialog: false,
			isShowTool: false,
			isShowTabel: false,
			isShowTheme: false,
			tips: '',
			dialog_type: '',
			delInfo: {
				index: '',
				id: ''
			}
		}
	},
	components: {
		MyHeader,
		EventList,
		EventAdd,
		EventTable,
		SliderBar,
		Theme,
		DialogBox
	},
	computed: {
		theme() {
			return this.$store.getters.getTheme;
		}
	},
	methods: {
		sliderMenu() {
			this.isShowTool = !this.isShowTool;
			
		},
		uploadBtn() {
			this.dialog = true;
			this.isShowTool = false;
			this.tips = 'upload';
			this.dialog_type = 'upload';
		},
		clearMethod() {
			this.dialog = true;
			this.isShowTool = false;
			this.tips = '清空后无法恢复，确认清空吗？';
			this.dialog_type = 'clear'
		},
		confirm() {
			if (this.dialog_type == 'clear') {
				this.$store.dispatch('clearData');
				this.dialog = false;
			} else if (this.dialog_type == 'del') {
				this.$store.dispatch('deleteEvent', this.delInfo);
				this.dialog = false;
			}
		},
		deleteMethod(idx, id) {
			this.dialog = true;
			this.dialog_type = 'del';
			this.tips = '删除后无法恢复，确认删除吗？';
			this.delInfo = {
				index: idx,
				id: id
			}
		},
		// 关闭表格
		closeTable() {
			this.isShowTabel = false;
		}
	}
}
</script>

<style lang="scss">
@import '../static/css/normalize.css';
@import '../static/css/theme.scss';
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
.container {
	padding: 0 10px;
	max-width: 800px;
	margin: auto;
	text-align: left;
}
.btn {
	display: inline-block;
	width: 50px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	border-radius: 4px;
	color: #666;
	font-size: 12px;
	cursor: pointer;
}

select.simulate {
	border: 0;
	height: 20px;
	line-height: 20px;
	-webkit-appearance: none;
	-moz-appearance: none;
	-o-appearance: none;
	background-color: inherit;
	color: #2c3e50;
}

// dialog动画样式
.dialog-enter-active, .dialog-leave-active {
	transition: opacity .3s;
}
.dialog-enter, .dialog-leave-to{
	opacity: 0;
}
</style>
