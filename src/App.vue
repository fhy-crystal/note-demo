<template>
	<div id="app">
		<MyHeader @parentMenu="sliderMenu" :show-tool="isShowTool"/>
		<section class="container">
			<EventAdd/>
			<EventList/>
			<SliderBar :show-tool="isShowTool" 
						@uploadData="uploadBtn" 
						@clearData="clearMethod"
						@openTable="isShowTool=false;isShowTabel=true" />
		</section>
		<transition name="dialog"> 
			<DialogBox v-show="dialog" @cancelBtn="dialog=false" :msg="tips" @confirmBtn="confirm"/>
		</transition>

		<EventTable :show-table="isShowTabel" @delete="deleteMethod"/>
	</div>
</template>

<script>
import MyHeader from './components/MyHeader'
import EventList from './components/EventList'
import EventAdd from './components/EventAdd'
import EventTable from './components/EventTable'
import SliderBar from './components/SliderBar'
import DialogBox from './components/Dialog'

export default {
	name: 'app',
	data() {
		return {
			dialog: false,
			isShowTool: false,
			isShowTabel: false,
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
		DialogBox
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
			
		}
	}
}
</script>

<style lang="scss">
@import '../static/css/normalize.css';
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
	background-color: #fff;
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
