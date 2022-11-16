<template lang="pug">
v-card(elevation="2").loginFormCard.d-flex.flex-column.align-center
	v-card-title.d-flex.justify-center
		h5 Finance manager
	v-card-text.d-flex.flex-column
		input(placeholder="e-mail" v-model="email").input
		input(placeholder="password" v-model="password" ).input
	v-card-actions.d-flex.flex-column
		v-btn( width="18rem" @click="login" :loading="loginStarted").button-login Login
		hr(width="100%").mt-4
		v-btn(color="primary" ).text-lowercase.text-subtitle-2.button-register Register instead
</template>

<script lang="ts" setup>
	import Authentication from "@/managers/authentication/index"
	import UserPreferences from "@/managers/firestore/userPreferences"
	import {ref} from "vue"

	let email = ref("")
	let password = ref("")

	let loginStarted = ref(false)

	const login = () => {
		loginStarted.value = true
		Authentication.login(email.value, password.value).then(_ => {
			UserPreferences.getPreferences().then(data => {
				UserPreferences.updateBudget(89).then(value => {
					console.log(value)
				})
			})
			loginStarted.value = false
		})
	}
</script>

<style scoped>
	.input {
		width: 18rem;
		padding: 6px;
		margin: 4px;
	}
	.input:focus {
		outline: 0;
		border-bottom: 1px solid black;
	}
	.button-login {
		background-color: #408EC6;
		color: whitesmoke;
	}
	.button-register {
		color: #110dbe !important;
		letter-spacing: 1px !important;
		font-size: 12px !important;
	}
	.loginFormCard {
		width: 342px;
		min-height: 182px;
		border: 2px solid #ab8e01;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
