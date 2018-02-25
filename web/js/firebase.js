//Reference to the questions database
var questions

//Authentication provider
var provider

//Reference to the file storage
var storage

//Reference to the database storing all files
var storageListing

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
  storage = firebase.storage().ref();
  storageListing = firebase.database().ref().child("storage")

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
* Redirects to index if no user is logged in
* @author Eric Higgins
**/
function redirectIfNoUser() {

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
        console.log("Noooopppeee still dumb");
        alert("You are not signed in. You will now be redirected back to the homepage.");
        window.location.href = "index.html";      }
  });
}


/*
 * Saves the code textfile to the users account
 * This will eventually call finishSaving()
 * The saving process is split into two funcitons...
 * ... becasuse user.getIdToken() takes a long time to do
 *
 * NOTE userToken is is a very long string that is unique...
 *		... to each user (I think) and it is used to organize...
 *		... firebase storage, giving each user their own 'folder'...
 *      ... however, only the first 60 characters are used
 */
function saveFile(script) {

  var user = firebase.auth().currentUser;
  var userToken;

  if (user != null) {
    user.getIdToken().then(function(data) {
      userToken = data.substring(0, 60);

      var fileName = document.getElementById("fileName").value; //NOTE spaces are allowed
      var fileRef = storage.child(userToken + "/" + fileName + ".txt");
      storageListing.child(userToken + "/" + fileName).set(fileName + ".txt")
      var file = new Blob([script], {type: "text/plain;charset=utf-8"});

      fileRef.put(file).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
      });
    });
  }
}

/**
* Show the list of files for the user to select once
* @author Eric Higgins
**/
function showFileList() {
  var user = firebase.auth().currentUser;
  var userToken;

  if (user != null) {
    user.getIdToken().then(function(data) {
      userToken = data.substring(0, 60);

      var userFiles = storageListing.child(userToken);

      userFiles.once("value", function(data){
        var fileList = document.getElementById("fileList");
        data.forEach(function(e){
          var file = document.createElement("p");
          file.innerHTML = e.val();
          file.onclick = displayFile;
          file.id = "fileName";
          fileList.appendChild(file)
        });
      });
    });
  }
}

/**
* Displays a file in the editor when a user selects it
* @author Eric Higgins
* @param The click event
**/
function displayFile(e) {
  var fileName = e.toElement.innerHTML;
  var user = firebase.auth().currentUser;

  user.getIdToken().then(function(data) {
    storage.child(data.substring(0, 60) + "/" + fileName).getDownloadURL().then(function(url){
      var request = new XMLHttpRequest();
      request.onload = function(event) {
        editor.setValue(request.responseText);
      };
      request.open('GET', url);
      request.send();
    });
  });
}
