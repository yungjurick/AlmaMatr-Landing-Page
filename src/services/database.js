import firebase from 'firebase';
import store from '@/store';

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
    store.commit('setLoading', true);

    const provider = new firebase.auth.GoogleAuthProvider();

    let result = await firebase.auth().signInWithPopup(provider);
    let firebaseUser = firebase.auth().currentUser;

    if (result.additionalUserInfo.isNewUser) {
      const user = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        imageUrl: firebaseUser.photoURL
      };
      database
        .database()
        .ref('users/' + firebaseUser.uid)
        .set(user)
        .then(() => {
          store.dispatch('setUser', user);
          store.commit('setLoading', false);
          console.log('New User Made!');
        })
        .catch(error => {
          store.commit('setLoading', false);
          console.log(error);
        });
    }

    return true;
  } catch (error) {
    store.commit('setLoading', false);
    return error;
  }
};

database.signOut = async () => {
  try {
    await firebase.auth().signOut();
    store.dispatch('logout');
    return true;
  } catch (error) {
    return error;
  }
};

export default database;
