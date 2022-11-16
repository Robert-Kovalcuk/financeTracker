import {getFirestore, collection, getDocs, query, where, Query, updateDoc} from "firebase/firestore"
import Authentication from "@/managers/authentication/index"
import firebaseApp from "@/plugins/firebase/index"
import AdditionalUserData from "@/data/additionalUserData"

const firestore = getFirestore(firebaseApp)

export default class UserPreferences {
	private static readonly dataCollectionReference = collection(firestore, "userPreferences")

	private static get preferencesQuery(): Query {
		return query(
			this.dataCollectionReference,
			where(
				"userId",
				"==",
				Authentication.state.userCredential!.user.uid
			)
		)
	}

	static async getPreferences(): Promise<AdditionalUserData> {
		const documentDataQuerySnapshot = await getDocs(this.preferencesQuery)

		return AdditionalUserData.fromApi(documentDataQuerySnapshot.docs[0].data())
	}

	static async updateBudget(budget: number): Promise<void> {
		const documentDataQuerySnapshot = await getDocs(this.preferencesQuery)

		return updateDoc(documentDataQuerySnapshot.docs[0].ref, {budget})
	}

	static async updateSavings(savings: number): Promise<void> {
		const documentDataQuerySnapshot = await getDocs(this.preferencesQuery)

		return updateDoc(documentDataQuerySnapshot.docs[0].ref, {savings})
	}
}
