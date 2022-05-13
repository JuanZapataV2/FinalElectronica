class FileManager {
  constructor() {
    this.content="";
  }

  setContent(file){
    this.content = Array.from(file.split("\r\n"));
    return true;
  }

  getContent() {
    return this.content;
  }

  // Función que guarda y descarga un archivo en el navegador
  saveFile(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob)
      // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else {
      // Others
      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

  translateBinary(instructionMap,dataMap){
    var binaryFile = "";
      this.content.forEach(element => {
        let inst = Array.from(element.split(" "));
        console.log(inst)
        binaryFile += instructionMap.get(inst[0]).id;
        for (let index = 1; index < inst.length; index++) {
          binaryFile += dataMap.get(inst[index].replace(",", "")).id;
        }
      });
      return binaryFile;
  }
  

}
