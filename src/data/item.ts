import {EDefaultCategory} from "@/data/enums/eDefaultCategory"
import {Nameable} from "@/data/base/nameable"

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
}
