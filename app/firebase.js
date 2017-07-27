import * as firebase from 'firebase';
// import { readAdminAchievements } from './actions/achievements';

// should go in a secret file
const config = {
  apiKey: 'AIzaSyB-Wc-894EhgEnY68YvCjlfh-P5vwk-01o',
  authDomain: 'gamifiedcampusengagement-eeb97.firebaseapp.com',
  databaseURL: 'https://gamifiedcampusengagement-eeb97.firebaseio.com',
  projectId: 'gamifiedcampusengagement-eeb97',
  storageBucket: 'gamifiedcampusengagement-eeb97.appspot.com',
  messagingSenderId: '148110984262',
};
firebase.initializeApp(config);

// export const achievementsRef = firebase.database().ref('achievements');

// export function syncFirebase(store) {
//   achievementsRef.once('value', (snap) => {
//     store.dispatch(readAdminAchievements(snap.val()));
//   });
// }

export default firebase;
