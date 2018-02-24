// Initialize Firebase
{
  var config = {
      apiKey: "AIzaSyAV7fktp46lTXgtlqIEGIGFxbwsFxskQ-o",
      authDomain: "hubio-e6c40.firebaseapp.com",
      databaseURL: "https://hubio-e6c40.firebaseio.com",
      projectId: "hubio-e6c40",
      storageBucket: "hubio-e6c40.appspot.com",
      messagingSenderId: "28392242924"
  };
  firebase.initializeApp(config);

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          // User is signed in.
          var user = firebase.auth().currentUser;

          if (user != null) {
              user.providerData.forEach(function (profile) {
                  console.log("Sign-in provider: " + profile.providerId);
                  console.log("  Provider-specific UID: " + profile.uid);
                  console.log("  Name: " + profile.displayName);
                  console.log("  Email: " + profile.email);
                  console.log("  Photo URL: " + profile.photoURL);
              });
          }
      } else {
          // No user is signed in.
      }
  });
}

function signIn() {
    firebase.auth().signInWithRedirect(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("signed in");
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log("error signing in");
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
        // ...
    });
}

function signOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("Signed out");
    }).catch(function(error) {
      // An error happened.
      console.log("error signing out");
    });
}
