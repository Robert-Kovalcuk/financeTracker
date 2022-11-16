import {getFirestore, collection, getDocs, addDoc, DocumentData, DocumentReference} from "firebase/firestore"
import firebaseApp from "@/plugins/firebase/index"
import Merchant from "@/data/merchant"

const firestore = getFirestore(firebaseApp)

class Merchants {
	private static readonly dataCollectionReference = collection(firestore, "merchants")

	static async getMerchants(): Promise<Merchant[]> {
		const documentDataQuerySnapshot = await getDocs(this.dataCollectionReference)

		if(documentDataQuerySnapshot.empty)
			return []

		return documentDataQuerySnapshot.docs.map(doc => {
			return Merchant.fromApi(doc.data())
		})
	}

	static async addMerchant(merchant: Merchant): Promise<DocumentReference<DocumentData>> {
		return addDoc(this.dataCollectionReference, merchant)
	}
}

export default Merchants
