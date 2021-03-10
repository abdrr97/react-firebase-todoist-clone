import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_authDomain',
  projectId: 'YOUR_projectId',
  storageBucket: 'YOUR_storageBucket',
  messagingSenderId: 'YOUR_messagingSenderId',
  appId: 'YOUR_appId',
}

const firebaseConfig = firebase.initializeApp(config)

export { firebaseConfig as firebase }
