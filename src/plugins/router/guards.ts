import Authentication from "@/managers/authentication/index"
import {
	isNavigationFailure,
	NavigationFailureType,
	RouteLocationNamedRaw,
	RouteLocationNormalized,
	Router
} from "vue-router"
import {watch} from "vue"

const canAccessRoute = async function(to: RouteLocationNormalized): Promise<RouteLocationNamedRaw | null> {
	const needsAuth = to.matched.some(e => e.meta.requiresAuth)
	const isAuthed = await Authentication.currentAuthStatus()

	if(needsAuth && !isAuthed) {
		return {
			name: "login",
			query: {
				redirect: to.fullPath
			}
		}
	}
	else if(!needsAuth && isAuthed){
		return {
			name: "main"
		}
	}

	return null
}

export default function (router: Router): void {
	router.beforeEach((to, from, next) => {
		canAccessRoute(to).then(location => {
			if(!location)
				next()
			else next({name: location.name})
		}).catch(reason => {
			if (!isNavigationFailure(reason, NavigationFailureType.cancelled))
				throw reason
		})
	})

	watch(() => Authentication.currentAuthStatus(), (status) => {
		canAccessRoute(router.currentRoute.value).then(location => {
			if(!location)
				throw "navigation failure in watcher"
			return router.push(location)
		})
	})
}
