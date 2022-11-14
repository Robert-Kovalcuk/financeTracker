import {Nameable} from "@/data/base/nameable"

export default class Merchant extends Nameable {
	private location: any // TODO set proper type

	constructor(name: string, location: any) {
		super(name)
		this.location = location
	}
}
