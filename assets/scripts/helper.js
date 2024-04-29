auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User
      var uid = user.uid;
      var email = user.email;
      console.log("Signed-in user has email: ", email);
      setupUI(user);
    } else {
      setupUI();
    }
  });


const loggedInLinks  = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const setupUI = (user) => {
  if (user) {
    loggedInLinks.forEach(item => item.style.display = 'inline');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'inline');
  }
}