//listens for changes of user file input and updates the src of the image
document.getElementById('fileInput').addEventListener('change', function(event) {
    var photoUploadIcon = document.getElementById('photoUploadIcon');
    const files = event.target.files;
    const maxImages = 4; //max 3 user uploaded files

    for (let i = 0; i < files.length; i++) {
        if (photoUploadIcon.parentElement.childElementCount >= maxImages) {
            alert("You can upload a maximum of 3 images.");
            break;
        }
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const selectedImgSrc = e.target.result;

            // Create a new img tag for the user-selected image
            const selectedImg = document.createElement('img');
            selectedImg.src = selectedImgSrc;
            selectedImg.alt = "Selected Image";
            selectedImg.style.width = "150px";
            selectedImg.style.marginRight = "10px";

            // Append the new img tag next to the existing icon
            photoUploadIcon.parentElement.appendChild(selectedImg);
        }
        reader.readAsDataURL(file);
    }
});

//generate a unique post ID for each post
function generatePostId() {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base36 string
    const randomString = Math.random().toString(36).substring(2, 8); // Generate random string
    return timestamp + randomString; // Combine timestamp and random string
}

//function to upload to unique 
function uploadImage(postId, file) {
    const storageRef = storage.ref(`post-images/${postId}/${file.name}`);
    return storageRef.put(file);
}

// Function to save post data to Firebase Firestore
function savePostData(postId, userId, postData) {
    // Save post data to the "posts" collection
    const postRef = db.collection('posts').doc(postId);
    return postRef.set({ ...postData, userId }); // Include userId in the post data
}

// Function to save post ID under the user's "posts" subcollection
function savePostIdForUser(userId, postId) {
    const userRef = db.collection('users').doc(userId);
    return userRef.collection('posts').doc(postId).set({ postId: true });
}

// Function to handle form submission
function submitForm() {
    const postId = generatePostId(); // Generate unique post ID
    const userId = getCurrentUserId();
    const title = document.getElementById('postTitle').value;
    const article = document.getElementById('postContent').value;
    const referralLink = document.getElementById('referral-link').value;
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

    // Upload images to Firebase Storage
    const uploadPromises = Array.from(files).map(file => uploadImage(postId, file));

    Promise.all(uploadPromises)
        .then(uploadSnapshot => {
            // Get download URLs of uploaded images
            const imageUrls = uploadSnapshot.map(snapshot => snapshot.metadata.fullPath);

            // Save post data to Firestore
            const postData = { title, article, referralLink, imageUrls };
            return savePostData(postId, userId, postData);
        })
        .then(() => {
            // Save post ID under the user's "posts" subcollection
            return savePostIdForUser(userId, postId);
        })
        .then(() => {
            console.log("Post data saved successfully.");
            // Display success alert
            alert("Post successful!");

            // Redirect to user's profile page
            window.location.href = "/profile"; 
            
        })
        .catch(error => {
            console.error("Error uploading images or saving post data:", error);
        });
};

document.getElementById('post-btn').addEventListener('click', submitForm);
