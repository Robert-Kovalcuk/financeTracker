import * as VueRouter from "vue-router"
import routes from "./routes"
import {createWebHistory} from "vue-router"
import authGuard from "@/plugins/router/guards"

const router = VueRouter.createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

authGuard(router)

export default router
