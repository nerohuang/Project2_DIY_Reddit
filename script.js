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
  var email = document.getElementById('username').value;
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
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
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


function toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        //console.log(user.email);
        // [END signout]
      } else {
        var email = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
      }
      login_done();
}

function login_done() {
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      var email = user.email;
      //console.log(email);

      $("#log_acount").hide();
      $("#init_acc").show();
      $("#acc_name").text(email);
    }else {
      console.log("not");
    }
  });
}

function logout() {
  firebase.auth().signOut().then(function() {
  console.log('Signed Out');
  $("#init_acc").hide();
  $("#log_acount").show();
}, function(error) {
  console.error('Sign Out Error', error);
});
}

function googlelogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
  login_done();
}

function githublogin() {
  var provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithPopup(provider);
  login_done();
}

window.onload = function() {
//  $("#init_acc").hide();
}


document.getElementById('login').addEventListener('click',toggleSignIn,false);
document.getElementById('register').addEventListener('click', handleSignUp, false);
document.getElementById('google').addEventListener('click', googlelogin, false);
document.getElementById('github').addEventListener('click', githublogin, false);
document.getElementById('logout').addEventListener('click', logout, false);
