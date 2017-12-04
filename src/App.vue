<template>
	<div id="app">
		<MyHeader @parentMenu="sliderMenu"/>
		<section class="container">
			<EventAdd/>
			<EventList/>
		</section>
	</div>
</template>

<script>
import MyHeader from './components/MyHeader'
import EventList from './components/EventList'
import EventAdd from './components/EventAdd'

export default {
	name: 'app',
	components: {
		MyHeader,
		EventList,
		EventAdd
	},
	methods: {
		sliderMenu() {
			console.log(1)
		}
	}
}
</script>

<style>
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
</style>
