import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCezn1kk5VWX2-HEmq5j4whcGhWEIL9EZU",
  authDomain: "crwn-db-9c96a.firebaseapp.com",
  databaseURL: "https://crwn-db-9c96a.firebaseio.com",
  projectId: "crwn-db-9c96a",
  storageBucket: "crwn-db-9c96a.appspot.com",
  messagingSenderId: "726923644961",
  appId: "1:726923644961:web:3f0c6387a23f20f4361360",
  measurementId: "G-Z89SXV0JSD"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
