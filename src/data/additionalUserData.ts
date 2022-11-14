export default class AdditionalUserData {
	private usersId: unknown
	private budget: number
	private savings: number

	constructor(usersId: unknown, budget: number, savings: number) {
		this.usersId = usersId
		this.budget = budget
		this.savings = savings
	}
}
