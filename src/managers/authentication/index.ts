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
