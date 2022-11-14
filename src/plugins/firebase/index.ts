import "firebase/firestore"

import {initializeApp} from "firebase/app"
import {getAnalytics} from "firebase/analytics"
import {getFirestore} from "firebase/firestore"

import firebaseConfig from "./firebaseConfig"

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app
