<template lang="pug">
.calendar-content
	.calendar-header
		p {{ props.year }}
		p {{ monthStringFromValue(props.month) }}
	.calendar-days
		div(v-for="day in getDaysInMonthUTC()" :key="day.getSeconds()").day-wrapper
			p {{day.getDate()}}
</template>

<script lang="ts" setup>
import {monthStringFromValue} from "@/utilities/string"
import {defineProps, onMounted} from "vue"

const props = defineProps<{
	year: Number,
	month: Number
}>()

function mouseEnterOnCalendarDayAnimationListener(e: Event) {
	if(!Array.of(...document.querySelectorAll(".day-wrapper")).some(el => el === (e.target as Element)))
		return

	const element = (e.target as Element)

	element.classList.add("day-wrapper-animation")

	const animationEndListener = (e: Event) => {
		element.classList.remove("day-wrapper-animation")
		e.target.removeEventListener(mouseEnterOnCalendarDayAnimationListener)
	}

	element.addEventListener("animationend", (animationEndListener))
}

onMounted(() => {
	document.querySelectorAll(".day-wrapper").forEach(e => {
		e.addEventListener("mouseenter", mouseEnterOnCalendarDayAnimationListener)
	})
})

function getDaysInMonthUTC(): Date[] {
	let date = new Date(Date.UTC(2022, 11, 1));
	let days: Date[] = [];

	while (date.getUTCMonth() === 11) {
		days.push(new Date(date));
		date.setUTCDate(date.getUTCDate() + 1);
	}
	return days;
}
</script>

<style scoped>
.hidden {
	visibility: hidden !important;
}
.calendar-content {
	background-color: grey;
	max-width: 20rem;
	height: fit-content;
	position: absolute;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
.calendar-header {
	height: 3.5rem;
	width: 100%;
	background-color: lightgrey;
	margin-bottom: 0.4rem;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
}
.calendar-days {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
.day-wrapper {
	width: 50px;
	padding: 12px;
	background-color: whitesmoke;
	border-radius: 50%;
	margin: 1px;
	display: flex;
	justify-content: center;
}
.day-wrapper-animation {
	animation-name: color-ease-out;
	animation-duration: 800ms;
}
@keyframes color-ease-out {
	from {background-color: whitesmoke}
	to {background-color: #484242; color: white}
}

.day-wrapper:hover {
	background-color: lightgrey;
}

</style>
