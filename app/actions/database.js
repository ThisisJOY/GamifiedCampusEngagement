import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyD4K7b_v2LPOhLjPgUgmxZnHtPGWSIYEP4',
  authDomain: 'gamifiedcampusengagement-f6ff7.firebaseapp.com',
  databaseURL: 'https://gamifiedcampusengagement-f6ff7.firebaseio.com',
  projectId: 'gamifiedcampusengagement-f6ff7',
  storageBucket: '',
  messagingSenderId: '878998964972',
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;
