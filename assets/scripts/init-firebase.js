
    var firebaseConfig = {
    apiKey: "AIzaSyBC9Q3I_K4im23tp8Z0D8NnfbhHoLh1mtI", 
    authDomain: "bkinvest-26b09.firebaseapp.com",
    projectId: "bkinvest-26b09",
    storageBucket: "bkinvest-26b09.appspot.com",
    messagingSenderId: "838704651794",
    appId: "1:838704651794:web:90c97a9b4e309899ae02cb",
    measurementId: "G-NRHCYX6TT8"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
//auth.useEmulator("http://127.0.0.1:9099");




