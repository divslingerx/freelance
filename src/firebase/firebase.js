import * as firebase from 'firebase';
import * as expensesActions from '../actions/expenses'



 const config = {
    apiKey: "AIzaSyB1fZ_hwZZMqRrOFDEWLXEllixK6LETuh4",
    authDomain: "lance-alot-68dc1.firebaseapp.com",
    databaseURL: "https://lance-alot-68dc1.firebaseio.com",
    projectId: "lance-alot-68dc1",
    storageBucket: "lance-alot-68dc1.appspot.com",
    messagingSenderId: "747310391489"
  };

  firebase.initializeApp(config);

  firebase.database().ref.set({
      name: "Taylor O'Reilly"
  })