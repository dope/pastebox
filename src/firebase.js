import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA5RHXKKXwhLgblRyAh0iSPO8GFCbvGig8',
  authDomain: 'pastebox-d0dd8.firebaseapp.com',
  databaseURL: 'https://pastebox-d0dd8-default-rtdb.firebaseio.com',
  projectId: 'pastebox-d0dd8',
  storageBucket: 'pastebox-d0dd8.appspot.com',
  messagingSenderId: '897074938354',
  appId: '1:897074938354:web:23bece6934d7b7359e2b6b'
};

const firebase = Firebase.initializeApp(config);
firebase.firestore();

export { firebase };