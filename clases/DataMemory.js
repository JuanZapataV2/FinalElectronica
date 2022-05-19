class DataMemory{
    constructor(processor){
        this.processor = processor;
        this.data = new Map()
        this.data.set('EAX', {id: "00000000", value: 0});
        this.data.set('EBX', {id: "00000001", value: 0});
        this.data.set('ECX', {id: "00000010", value: 0});
        this.data.set('EDX', {id: "00000011", value: 0});
        this.data.set('ESI', {id: "00000100", value: 0});
        this.data.set('EDI', {id: "00000101", value: 0});
        this.data.set('ESP', {id: "00000110", value: 0});
        this.data.set('EBP', {id: "00000111", value: 0});
        this.data.set('variableA', {id: "00001000", value: 0});
    }

    getAllData(){
        return this.data;
    }

    getData(name){
        if (this.data.has(name))
            return this.data.get(name)
        else 
            return false
    }

    setData(name,value){
        if (this.data.has(name)){
            this.data.get(name).value = value
            return true
        }
        else 
            return false
    }

    setDataInMemory(name,value){
        this.setData(name,value);
        console.log(name+"_value")
        var container = document.getElementById(name+"_value");
        container.innerHTML = value;
    }

    addVariable(name,value){
        let last  = Array.from(this.data.keys()).pop();
        let last_id = this.data.get(last).id;
        let id = this.processor.addBinary("01",String(last_id));
        this.data.set(name, {id: String(id), value: value});
        console.log(this.getData(name));
        return true
    }

    // INSTR ES UN OBJETO
    // {"instr":"ADD","first_value":"EAX","last_value":"3"}
    chooseInstruction(line){
        let pos_num;
        //Si se paso una posicion y no un numero guarda el valor que haya en esa posicion
        if(isNaN(line.last_value)){
            pos_num = this.data.get(line.last_value).value;
        } else {
            pos_num = parseInt(line.last_value);
        }

        switch(line.instr) {
            case "MOV":
                this.setDataInMemory(this.data.get(line.first_value).value,pos_num)
                break;

            case "ADD":
                let sum = this.data.get(line.first_value).value + pos_num
                this.setDataInMemory(line.first_value,sum)
                break;

            case "SUB":
                let rest = this.data.get(line.first_value).value - pos_num
                this.setDataInMemory(line.first_value,rest)
                break;

            case "MUL":
                let prod = this.data.get("EAX").value * pos_num
                this.setDataInMemory("EDX",prod)
                break;
            case "DIV":
                let div = this.data.get("EAX").value / pos_num
                this.setDataInMemory("EDX",div)
                break;
            case "AND":
              // code block
              break;
            case "OR":
              // code block
              break;
            case "XOR":
              // code block
              break;
            case "NOT":
              // code block
              break;
            default:
              // code block
          }
    }
}