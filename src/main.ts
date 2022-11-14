// Components
import App from "./App.vue"
// Composables
import { createApp } from "vue"

// Plugins
import { registerPlugins } from "@/plugins"
import ROUTER from "@/plugins/router"
import VUETIFY from "./plugins/vuetify"

const app = createApp(App)

registerPlugins()

app
	.use(VUETIFY)
	.use(ROUTER)
	.mount("#app")
