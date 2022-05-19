var processor;
var fileManager;
var instMemory;
var dataMemory;
var syntaxChecker;

function instantiateAll() {
  processor = new Processor();
  fileManager = new FileManager();
  instMemory = new InstructionMemory();
  dataMemory = new DataMemory(processor);
  syntaxChecker = new SyntaxChecker(instMemory, dataMemory);
  loadDataInfo();
}

function loadFile() {
  var input, file, fr;

  if (typeof window.FileReader !== "function") {
    alert("The file API isn't supported on this browser yet.");
    return;
  }

  input = document.getElementById("fileinput");
  if (!input) {
    alert("Um, couldn't find the fileinput element.");
  } else if (!input.files) {
    alert(
      "This browser doesn't seem to support the `files` property of file inputs."
    );
  } else if (!input.files[0]) {
    alert("Please select a file before clicking 'Load'");
  } else {
    file = input.files[0];
    fr = new FileReader();
    fr.onload = receivedText;
    fr.readAsText(file);
  }

  function receivedText(e) {
    let lines = e.target.result;
    if (lines) {
      alert("Archivo cargado con éxito");
    }
    fileManager.setContent(lines);
    instMemory.setInstructions(fileManager.getContent());
    loadInstructions();
    syntaxChecker.checkSyntax();
    if(syntaxChecker.correct){
      loadDataInfo();
    } else {
      alert("Hay errores en el archivo");
    }
  }
}

function saveFile() {
  if (fileManager != undefined) {
    fileManager.saveFile(fileManager.translateBinary(instMemory.data,dataMemory.data), "result", "txt");
  } else {
    alert("Cargue un documento");
  }
}

function loadDataInfo() {
  var map1 = dataMemory.getAllData();
  var container = document.getElementById("data_memory");
  for (let [key, values] of map1) {
    var div = document.createElement("div");
    div.className = "row";

    var div2 = document.createElement("div");
    div2.className = "col-sm border border-5";

    var span = document.createElement("span");
    span.innerHTML = key;

    var div3 = document.createElement("div");
    div3.className = "col-sm border border-5";

    var span2 = document.createElement("span");
    var id = key + "_value";
    span2.setAttribute("id", id);
    span2.innerHTML = values.value;

    div2.appendChild(span);
    div.appendChild(div2);
    div3.appendChild(span2);
    div.appendChild(div3);
    container.appendChild(div);
  }
}

function loadNewInst() {
  if (fileManager.content.length >= instMemory.position && syntaxChecker.correct){
    instMemory.nextInstruction(fileManager.getContent());
  } else if(!syntaxChecker.correct) {
    alert("Corrija el archivo e inténtelo de nuevo")
  }
}

function loadInstructions() {
  document.getElementById("inst_memory").innerHTML = "";
  var inst = instMemory.getInstructions();

  inst.forEach(function(instruction,idx){
    let new_inst = document.createElement("div");
    new_inst.classList.add("row");

    let row = document.createElement("div");
    row.classList.add("col-sm", "border", "border-5");

    let text = document.createElement("span");
    text.appendChild(document.createTextNode(instruction));

    row.appendChild(text);
    var id= "inst_"+idx;
    new_inst.setAttribute("id", id);
    new_inst.appendChild(row);

    document.getElementById("inst_memory").appendChild(new_inst);
  });
}
