import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB-Wc-894EhgEnY68YvCjlfh-P5vwk-01o',
  authDomain: 'gamifiedcampusengagement-eeb97.firebaseapp.com',
  databaseURL: 'https://gamifiedcampusengagement-eeb97.firebaseio.com',
  projectId: 'gamifiedcampusengagement-eeb97',
  storageBucket: 'gamifiedcampusengagement-eeb97.appspot.com',
  messagingSenderId: '148110984262',
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;
