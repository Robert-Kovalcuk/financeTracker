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
