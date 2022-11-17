import {RouteRecordRaw} from "vue-router"
import MainView from "@/views/mainView.vue"
import LoginView from "@/views/loginView.vue"
import NotFound from "@/views/notFound.vue"
import HomeView from "@/views/homeView.vue"

export default [
	{
		path: "/",
		name: "home",
		component: MainView,
		meta: {
			requiresAuth: false,
		}
	},
	{
		path: "/main",
		name: "main",
		component: HomeView,
		meta: {
			requiresAuth: true,
		}
	},
	{
		path: "/login",
		name: "login",
		component: LoginView,
		meta: {
			requiresAuth: false,
		}
	},
	{
		path: "/notFound",
		name: "notFound",
		component: NotFound,
		meta: {
			requiresAuth: false,
		}
	}
] as RouteRecordRaw[]
