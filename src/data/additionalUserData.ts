import {DocumentData} from "firebase/firestore"

export default class AdditionalUserData {
	private userId: unknown
	private budget: number
	private savings: number

	constructor(userId: unknown, budget: number, savings: number) {
		this.userId = userId
		this.budget = budget
		this.savings = savings
	}

	public static fromApi(data: DocumentData) {
		return new AdditionalUserData(data["userId"], data["budget"], data["savings"])
	}
}
