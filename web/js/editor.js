// Initialize CodeMirror
var code = $(".codemirror-textarea")[0];
var editor = CodeMirror.fromTextArea(code, {
  mode: "python",
  theme: "monokai",
  indentUnit: 4,
  lineNumbers: true
});

/**
* Called when this script loads. Initializes firebase and redirects if no user is logged in
* @author Eric Higgins
**/
function callOnLoad() {
  initialize();

  redirectIfNoUser();
}

/**
* Called when the save button is pressed to save the javascript
* @author Eric Higgins
**/
function saveCommand() {
  saveFile(editor.getValue());
}

/**
* Called when the load button is pressed. Displays available files for the user to select from
* @author Eric Higgins
**/
function loadCommand() {
  showFileList();
}

/*
 * @NOTE DO NOT EDIT
 * Used for skulpt
 */
function outf(text) {
  var mypre = document.getElementById("output");
  mypre.innerHTML = mypre.innerHTML + text;
}

/*
 * @NOTE DO NOT EDIT
 * Used for skulpt
 */
function builtinRead(x) {
  if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
      throw "File not found: '" + x + "'";
  return Sk.builtinFiles["files"][x];
}

/*
 * @NOTE DO NOT EDIT
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

  putQuestion("Eric Higgins", new Date(), text);
}

document.onkeypress = function(e) {
  if(e.keyCode == 13) {
    submitQuestion();
  }
}
