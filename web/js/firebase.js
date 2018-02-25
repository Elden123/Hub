var questions
var provider

// Initialize Firebase
function initialize(){
  var config = {
      apiKey: "AIzaSyAV7fktp46lTXgtlqIEGIGFxbwsFxskQ-o",
      authDomain: "hubio-e6c40.firebaseapp.com",
      databaseURL: "https://hubio-e6c40.firebaseio.com",
      projectId: "hubio-e6c40",
      storageBucket: "hubio-e6c40.appspot.com",
      messagingSenderId: "28392242924"
  };
  firebase.initializeApp(config);

  provider = new firebase.auth.GoogleAuthProvider()
  questions = firebase.database().ref().child("questions")
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

/**
* Save a message to the database with a unique key.
* NOTE: Saves UTC time
* @author Eric Higgins
* @param sender The sender's Name
* @param time A Date object representing the time the message was representing
* @param question The question to be saved (limit 10 MB)
**/
function putQuestion(sender, time, question) {
  questions.push().set({
    sender: sender,
    date: time.getUTCDate(),
    day: time.getUTCDay(),
    month: time.getUTCMonth(),
    year: time.getUTCFullYear(),
    hour: time.getUTCHours(),
    minute: time.getUTCMinutes(),
    second: time.getUTCSeconds(),
    question: question
  })
}

var list = []
var getFinished = false

/**
* Get a page of questions from the database and put them on the webpage
* This isn't really ideal, but Firebase fetches data asynchronously... :/
* @author Eric Higgins
* @param page The page number to retrieve (starts at 0)
* @param size The size of one page
**/
function getQuestions(page, size) {
  var count = 0

  questions.once("value").then(function(data) {
    data.forEach(function(question) {
      if(count >= page * size && count < (page+1) * size) {
        list.push({
          question: question.child("message").val(),
          sender: question.child("sender").val(),
          date: question.child("date").val(),
          day: question.child("day").val(),
          month: question.child("month").val(),
          year: question.child("year").val(),
          hour: question.child("hour").val(),
          minute: question.child("minute").val(),
          second: question.child("second").val()
        })
      }
      else if(count > (page+1) * size) {
        return true;
      }
      count += 1
    })
    getFinished = true;
  })
}

/**
* Gets whether any user is logged in
* @author Eric Higgins
* @return Whether a user is logged in
**/
function isUserLoggedIn() {
  var user = firebase.auth().currentUser;
  console.log(user != null)
  return (user != null)
}
