import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyD_lfxyItNMT3w5TvA5DdyfxbM_yoIuxRY',
  authDomain: 'vue-form-test.firebaseapp.com',
  databaseURL: 'vue-form-test.firebaseio.com',
  projectId: 'vue-form-test',
  storageBucket: 'vue-form-test.appspot.com'
};
firebase.initializeApp(config);
export const functions = firebase.functions();
