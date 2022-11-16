<template lang="pug">
div.container-day-selector
	div(@click="animateContentLeft").container-arrow-base.container-arrow-left
		v-icon mdi-chevron-left
		p previous
	div.container-content
		div.container-content-animation-div
			p.date {{ formattedDate }}
			.div
				v-icon(color="white" @click="toggleCalendar").ma-2.calendar-icon mdi-calendar
				calendar(:class="{hidden: isCalendarHidden}" :month="props.day.getMonth()" :year="props.day.getFullYear()")
	div(@click="animateContentRight").container-arrow-base.container-arrow-right
		p next
		v-icon mdi-chevron-right
</template>

<script lang="ts" setup>
import {computed, ref, defineProps, defineEmits, h} from "vue"
import Calendar from "@/components/mainView/calendar.vue"

const emits = defineEmits(["nextDay", "previousDay"])
const props = defineProps<{ day: Date }>()

let isCalendarHidden = ref(true)

const formattedDate = computed(() => {
	return  props.day!.toLocaleString()
})

function toggleCalendar() {
	isCalendarHidden.value = !isCalendarHidden.value

	if(!isCalendarHidden.value) {
		const listener = (e: Event) => {
			const calendar = document.querySelector(".container-content")

			if(!calendar) {
				document.removeEventListener("click", listener)
				return
			}

			if(!calendar.contains(e.target as Element)) {
				isCalendarHidden.value = true
				removeEventListener("click", listener)
			}
		}

		document.addEventListener("click", listener)
	}
}
function animateContentLeft() {
	emits("previousDay")
	const containerToTransition = document.querySelector(".container-content-animation-div")

	if(!containerToTransition) return

	containerToTransition!.classList.remove("container-content-animated-right")
	containerToTransition!.classList.add("container-content-animated-left")

	let transitionListener = (e: Event) => {
		containerToTransition!.classList.remove("container-content-animated-left")
		removeEventListener("transitionend", transitionListener)
	}

	containerToTransition.addEventListener("transitionend", transitionListener)
}
function animateContentRight() {
	emits("nextDay")
	const containerToTransition = document.querySelector(".container-content-animation-div")

	if(!containerToTransition) return

	containerToTransition!.classList.remove("container-content-animated-left")
	containerToTransition!.classList.add("container-content-animated-right")

	let transitionListener = (e: Event) => {
		containerToTransition!.classList.remove("container-content-animated-right")
		removeEventListener("transitionend", transitionListener)
	}

	containerToTransition.addEventListener("transitionend", transitionListener)
}
</script>

<style scoped>
.container-day-selector {
	overflow: hidden;
	display: flex;
	margin: 2px auto;
	width: 80%;
	height: 4rem;
}
.date {
	position: relative;
}
.date::after {
	position: absolute;
	content: "";
	height: 1px;
	bottom: -1px;
	width: 100%;
	transform: translate(-100%);
	background-color: whitesmoke;
}
/*************************************/
.container-arrow-base {
	position: relative;

	display: flex;
	flex-grow: 2;
	flex-basis: 50px;
	align-items: center;

	font-size: 13px;
	transition-duration: 340ms;

	background-color: lightgrey;
}
.container-arrow-left {
	border-radius: 10% 0 0 10%;
	justify-content: left;
	border-right: 1px solid white;
}
.container-arrow-base:hover {
	transform: scale(0.96);
	background-color: grey;
}
.container-arrow-right {
	border-radius: 0 10% 10% 0;
	justify-content: right;
	border-left: 1px solid white;
}
.container-arrow-right:hover {
	transform: scale(0.96);
	background-color: grey;
}
/*************************************/
.container-content {
	flex-grow: 6;
	background-color: lightgrey;
	overflow: hidden;
}
.container-content-animation-div {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: grey;
	transition-duration: 180ms;
}
.container-content-animated-right {
	position: relative;
	transform: translate(100%);
}
.container-content-animated-left {
	position: relative;
	transform: translate(-100%);
}
</style>
