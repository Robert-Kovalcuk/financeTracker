import Item from "@/data/item"

export default class Day {
	public date: Date
	public items: Item[]

	constructor(date: Date, items: Item[]) {
		this.date = date
		this.items = items
	}
}
