import {getFirestore, collection, getDocs} from "firebase/firestore"
import firebaseApp from "@/plugins/firebase/index"
import Day from "@/data/day"

const firestore = getFirestore(firebaseApp)

class Days {
	static async getDay(date: Date) {
		const dataCollectionReference = collection(firestore, "days")
		const documentDataQuerySnapshot = await getDocs(dataCollectionReference)

		documentDataQuerySnapshot.docs.forEach(doc => {
			console.log(doc.data())
		})
	}
}
