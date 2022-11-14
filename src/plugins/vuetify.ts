/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from "vuetify"

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
// Hex codes: Blue #408EC6, Maroon #7A2048, Indigo #1E2761
export default createVuetify({
	theme: {
		themes: {
		  	light: {
				colors: {
					primary: "#1E2761",
					secondary: "#7A2048",
				},
	  		},
		},
	},
})
