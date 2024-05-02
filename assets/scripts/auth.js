let userId;

auth.onAuthStateChanged(function(user) {
    if (user) {
      userId = user.uid;
      
      var docRef = db.collection("users").doc(userId);
      document.getElementById("profileEmail").value = user.email;

      var profileImageRef = storageRef.child("profilePictures/" + userId);

      profileImageRef.getDownloadURL().then(function(url) {
      // Set the image URL as the source of the profile image
        console.log("loaded image url" + url);
        document.getElementById('profile-image').src = url;
        document.getElementById('profilePicture').src = url;
      }).catch(function(error) {
      // Handle any errors
      
        document.getElementById('profile-image').src = '/assets/logos/Group 2.png';
        document.getElementById('profilePicture').src = '/assets/logos/Group 2.png';
      
        console.error('Error getting profile image URL: ', error);
      
      
      });

      docRef.get().then(function(doc) {
        if (doc.exists) {
          var data = doc.data();
          console.log(data);
          username = data['username'];
          if(username){
            document.getElementById("profile-username").innerText = 'Welcome! ' + username;
            document.getElementById("username").value = username;
            
          }
          if(data['bio']){
            document.getElementById("profileBio").value = data['bio'];
            document.getElementById("profile-bio").innerText = "Bio: " + data['bio'];
          }
          
        } else {
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    } else {

    }
  });

// Function to get the current user's ID
function getCurrentUserId() {
    return userId; // userId is a global variable set by the authentication logic
}