
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
//auth.useEmulator("http://127.0.0.1:9099");


// signup
const signupForm = document.querySelector("#newUserSignUpForm");
if(signupForm) {
  signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    // get user info
    const email = signupForm['signUpEmail'].value;
    const password = signupForm['signUpPassword'].value;
    const confirmPassword = signupForm['signUpConfirmPassword'].value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      const user = cred.user;
      console.log("User signed up:", user);
    }).then(() => {
        // const modal = document.querySelector('#modal-signup');
        // M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = 'Successfully created your account, please log-in.';
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    });
  });
}


//login
const loginForm = document.querySelector("#signInForm");
if(loginForm){
  loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    //get user info
    const email = loginForm['signInEmail'].value;
    const password = loginForm['signInPassword'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
        //location.replace("/")
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    });
});
}
