class InstructionMemory {
    constructor() {
        this.position = 0;
        this.instructions="";
        this.data = new Map()
        this.data.set('MOV', {id: "00000000", params: 2});
        this.data.set('ADD', {id: "00000001", params: 2});
        this.data.set('SUB', {id: "00000010", params: 2});
        this.data.set('MUL', {id: "00000011", params: 1});
        this.data.set('DIV', {id: "00000100", params: 1});
        this.data.set('AND', {id: "00000101", params: 2});
        this.data.set('OR', {id: "00000110", params: 2});
        this.data.set('XOR', {id: "00000111", params: 2});
        this.data.set('NOT', {id: "00001000", params: 1});
    }

    setInstructions(inst){
        this.instructions = inst;
    }

    getInstructions(){
        return this.instructions;
    }

    getInstruction(value){
        return this.data.get(value);
    }

    getData(){
        return this.data;
    }

    nextInstruction(inst_array){
        if(inst_array.length > this.position){
            //this.showNextInstruction(inst_array[this.position])
            this.highlightNextInstruction(this.position)
            this.position = this.position + 1;
        } else{
            this.showNextInstruction("End of File")
            this.position = this.position + 1;

        }   
    }

    showNextInstruction(instruction) {
        let new_inst = document.createElement("div");
        new_inst.classList.add("row");

        let row = document.createElement("div");
        row.classList.add("col-sm", "border", "border-5");

        let text = document.createElement("span");
        text.appendChild(document.createTextNode(instruction));

        row.appendChild(text);
        new_inst.appendChild(row);

        document.getElementById('inst_memory').appendChild(new_inst)
    }

    highlightNextInstruction(instruction) {
        var id= "inst_"+instruction;
        let inst = document.getElementById(id);
        inst.style.backgroundColor = "#00FF00";
    }
}
