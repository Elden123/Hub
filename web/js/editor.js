// Initialize CodeMirror
var code = $(".codemirror-textarea")[0];
var editor = CodeMirror.fromTextArea(code, {
  mode: "python",
  theme: "monokai",
  indentUnit: 4,
  lineNumbers: true
});

function callOnLoad() {
  initialize()

  console.log(isUserLoggedIn())
  if(!isUserLoggedIn()) {
    console.log("Noooopppeee still dumb");
    alert("You are not signed in. You will now be redirected back to the homepage.");
    window.location.href = "index.html";
  }
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
function saveFile() {

  var user = firebase.auth().currentUser;
  var userToken;

  if (user != null) {
    user.getIdToken().then(function(data) {
      userToken = data;
      userToken = userToken.substring(0,60);
      console.log(userToken);
      finishSaving(userToken);
      });
  }
}
/*
 * Called by saveFile() when it is done getting userToken
 */
function finishSaving(userToken) {

  var fileName = document.getElementById("fileName").value; //NOTE spaces are allowed
  var storageRef = firebase.storage().ref();
  var fileRef = storageRef.child(userToken + "/" + fileName +".txt");

  var text = editor.getValue();
  var file = new Blob([text], {type: "text/plain;charset=utf-8"});

  fileRef.put(file).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
  });
}

/*
 * Used for skulpt
 */
function outf(text) {
  var mypre = document.getElementById("output");
  mypre.innerHTML = mypre.innerHTML + text;
}

/*
 * Used for skulpt
 */
function builtinRead(x) {
  if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
      throw "File not found: '" + x + "'";
  return Sk.builtinFiles["files"][x];
}

/*
 * Used for skulpt
 */
function runit() {
   var prog = editor.getValue();
   var mypre = document.getElementById("output");
   mypre.innerHTML = '';
   Sk.pre = "output";
   Sk.configure({output:outf, read:builtinRead});
   (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
   var myPromise = Sk.misceval.asyncToPromise(function() {
     return Sk.importMainWithBody("<stdin>", false, prog, true);
   });
   myPromise.then(function(mod) {
     console.log('success');
   },
     function(err) {
     $("#output").text(err.toString());
     console.log(err.toString());
   });
}

/**
* Retrieves the question from the text area and submits it to the databaseURL
* @author Eric Higgins
**/
function submitQuestion() {
  var text = document.getElementById("questionArea").value;

  putQuestion("Eric Higgins", new Date(), text)
}

document.onkeypress = function(e) {
  e || window.event

  if(e.keyCode == 13) {
    submitQuestion()
  }
}
