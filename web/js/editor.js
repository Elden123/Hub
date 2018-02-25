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

  redirectIfNoUser()
}

function saveCommand() {
  saveFile(editor.getValue())
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
