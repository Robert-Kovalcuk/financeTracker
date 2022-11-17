<template lang="pug">
v-layout
	v-col(cols="8")
		v-row.ma-auto
			day-slider(
				:day="day.date"
				@nextDay="nextDay"
				@previousDay="previousDay"
				)
			items-list
	v-col(cols="4")
		v-row.ma-auto
			v-card(width="70%" ).ma-auto
				v-card-title Day Summary
				v-card-subtitle budget left: 5200£
				v-card-item(v-for="i in 5" :key="i.toString()") {{ i }}
</template>

<script lang="ts" setup>
import DaySlider from "@/components/mainView/daySlider.vue"
import ItemsList from "@/components/mainView/itemsList.vue"
import Day from "@/data/day"
import {reactive} from "vue"

let day = reactive(new Day(new Date(Date.now()), []))

function nextDay() {
	day.date = new Date(day.date.setDate(day.date.getDate() + 1))
}
function previousDay() {
	day.date = new Date(day.date.setDate(day.date.getDate() - 1))
}
</script>

<style scoped>

</style>
