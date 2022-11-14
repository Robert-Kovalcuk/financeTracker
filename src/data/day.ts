import Item from "@/data/item"

export default class Day {
	private date: Date
	private items: Item[]

	constructor(date: Date, items: Item[]) {
		this.date = date
		this.items = items
	}
}
