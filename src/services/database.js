import firebase from 'firebase'
import store from '@/store'

// Initialize Firebase
const config = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  databaseURL: 'https://YOUR_PROJECT_ID.firebaseio.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SEND_ID'
};

const database = firebase.initializeApp(config);

database.signIn = async () => {
	try {
		const provider = new firebase.auth.GoogleAuthProvider();

		await firebase.auth().signInWithPopup(provider);

		store.commit('currentUser', firebase.auth().currentUser);

		return true;

	} catch(error) {
		return error;
	}
}

database.signOut = async () => {
	try {
		await firebase.auth().signOut();

		store.commit('currentUser', null);

		return true;

	} catch(error) {
		return error;
	}
}

export default database;
