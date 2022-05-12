var fileManager ;
var instMemory ;
var dataMemory ;

function instantiateAll(){
  fileManager = new FileManager();
  instMemory = new InstructionMemory();
  dataMemory = new DataMemory();

  loadDataInfo();

}
function loadFile() {
  var input, file, fr;

  if (typeof window.FileReader !== 'function') {
    alert("The file API isn't supported on this browser yet.");
    return;
  }

  input = document.getElementById('fileinput');
  if (!input) {
    alert("Um, couldn't find the fileinput element.");
  }
  else if (!input.files) {
    alert("This browser doesn't seem to support the `files` property of file inputs.");
  }
  else if (!input.files[0]) {
    alert("Please select a file before clicking 'Load'");
  }
  else {
    file = input.files[0];
    fr = new FileReader();
    fr.onload = receivedText;
    fr.readAsText(file);
  }

  function receivedText(e) {
    let lines = e.target.result;
    if(lines){
      alert("Archivo cargado con éxito")
    }
    fileManager.setContent(lines);
    console.log(fileManager.getContent());
  } 
}

function saveFile(){
  if(fileManager != undefined){
    fileManager.saveFile(fileManager.getContent(),"result","txt");
  } else {
    alert("Cargue un documento")
  }
  
}


function loadDataInfo(){
  var map1 = dataMemory.getAllData()
  var container = document.getElementById("data_memory");
  for (let [key, values] of map1) {
    var div = document.createElement('div');
    div.className = 'row';

    var div2 = document.createElement('div');
    div2.className = 'col-sm border border-5';

    var span = document.createElement('span');
    span.innerHTML = key;

    var div3 = document.createElement('div');
    div3.className = 'col-sm border border-5';

    var span2 = document.createElement('span');
    span2.innerHTML = values.value;

    div2.appendChild(span);
    div.appendChild(div2);
    div3.appendChild(span2);
    div.appendChild(div3);
    container.appendChild(div);
  }
}

function loadNewInst(){
  if(fileManager.content.length >= instMemory.position)
  console.log(fileManager.getContent())
    instMemory.nextInstruction(fileManager.getContent())
}
