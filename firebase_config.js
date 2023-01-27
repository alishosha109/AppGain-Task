const firebase = require('firebase')

const firebaseConfig = {

    apiKey: "AIzaSyB_ELixflbVnn7o223EELwiaJpYgLSSc9U",
  
    authDomain: "appgain-eeb83.firebaseapp.com",
  
    projectId: "appgain-eeb83",
  
    storageBucket: "appgain-eeb83.appspot.com",
  
    messagingSenderId: "13348385652",
  
    appId: "1:13348385652:web:78c8ad050ca624f5497221"
  
  };
  

  firebase.initializeApp(firebaseConfig)
  const db = firebase.firestore()
  module.exports = db
