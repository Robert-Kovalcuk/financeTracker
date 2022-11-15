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
