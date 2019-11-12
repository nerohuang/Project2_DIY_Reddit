// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBBCqy1OyAPC9fDwN-l9aw6V3E3SFJhGo8",
  authDomain: "diy-reddit-e68db.firebaseapp.com",
  databaseURL: "https://diy-reddit-e68db.firebaseio.com",
  projectId: "diy-reddit-e68db",
  storageBucket: "diy-reddit-e68db.appspot.com",
  messagingSenderId: "787308605872",
  appId: "1:787308605872:web:b43ee0063485f9ef4ba675"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function handleSignUp() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  if (username.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Sign in with email and pass.
  // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END createwithemail]
}

document.getElementById('register').addEventListener('click', handleSignUp, false);
//$("#register").click(function() {
  //var username=("#username").val();
  //var password=("#password").val();
  //handleSignUp(username, password);
//});
