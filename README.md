## AUTHENTICATION STATE HANDLED BY VUE REACTIVE
```
import {UserCredential} from "firebase/auth"
import {reactive, watch} from "vue"

import signUpService from "@/managers/authentication/signUpService"
import signInService from "@/managers/authentication/signInService"

class Authentication {
	private readonly _state: AuthState

	public constructor() {
		this._state = reactive({
			status: Status.NotAuthenticated,
			userCredential: null
		})
	}

	public get state(): AuthState {
		return this._state
	}

	public async currentAuthStatus(): Promise<boolean> {
		switch (this._state.status) {
			case Status.Authenticated:
				return true
			case Status.NotAuthenticated:
				return false
			case Status.Pending:
				return new Promise<boolean>(resolve => {
					watch(() => this._state.status, value => resolve(this._state.status === Status.Authenticated))
				})
		}
	}

	public login(email: string, password: string): Promise<UserCredential> {
		return signInService.login(email, password).then(user => {
			this._state.userCredential = user
			this._state.status = Status.Authenticated
			return user
		})
	}

	public logout(): Promise<void> {
		return signInService.logout().then() // swallow response
	}

	public registerViaEmail(email: string, password: string): Promise<UserCredential> {
		return signUpService.registerViaEmail(email, password)
	}
}

interface AuthState {
	status: Status,
	userCredential: UserCredential | null
}

enum Status {
	Authenticated,
	NotAuthenticated,
	Pending
}

export default new Authentication()
```

## ADD META ATTRIBUTE TO VUE ROUTE
```

import 'vue-router'

declare module 'vue-router' {
	interface RouteMeta {
		requiresAuth: boolean
	}
}

```
## ROUTER AUTH GUARD
```

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
```
## EXAMPLE DATA
```
import {EDefaultCategory} from "@/data/enums/eDefaultCategory"
import {Nameable} from "@/data/base/nameable"
import {DocumentData} from "firebase/firestore"

export default class Item extends Nameable {
	private price: number
	private created: Date
	private category: EDefaultCategory

	constructor(name: string, price: number, created: Date, category: EDefaultCategory) {
		super(name)

		this.price = price
		this.created = created
		this.category = category
	}

	static fromApi(data: DocumentData): Item {
		return new Item(data["name"], data["number"], new Date(data["date"]), data["category"])
	}
}
```
## EXAMPLE GET SET DATA
```import {getFirestore, collection, getDocs, addDoc, DocumentData, DocumentReference} from "firebase/firestore"
import firebaseApp from "@/plugins/firebase/index"
import Merchant from "@/data/merchant"

const firestore = getFirestore(firebaseApp)

class Merchants {
	private static readonly dataCollectionReference = collection(firestore, "merchants")

	static async getMerchants(): Promise<Merchant[]> {
		const documentDataQuerySnapshot = await getDocs(this.dataCollectionReference)

		if(documentDataQuerySnapshot.empty)
			return []

		return documentDataQuerySnapshot.docs.map(doc => {
			return Merchant.fromApi(doc.data())
		})
	}

	static async setMerchant(merchant: Merchant): Promise<DocumentReference<DocumentData>> {
		return addDoc(this.dataCollectionReference, merchant)
	}
}

export default Merchants
```
## EXAMPLE TOGGLING CALENDAR COMPONENT ON ICON CLICK AND OUTSIDE CALENDAR CLICK
```
![image](https://user-images.githubusercontent.com/118119299/202057659-567d852f-c144-4615-9064-36301515838f.png)
```
```
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
```
