import {Nameable} from "@/data/base/nameable"
import {DocumentData} from "firebase/firestore"

export default class Merchant extends Nameable {
	private location: any // TODO set proper type

	constructor(name: string, location: any) {
		super(name)
		this.location = location
	}

	static fromApi(data: DocumentData): Merchant {
		return new Merchant(data["name"], data["location"])
	}
}
