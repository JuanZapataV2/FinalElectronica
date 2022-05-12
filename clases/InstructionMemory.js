class InstructionMemory {
    constructor() {
        this.position = 0;
        this.instructions="";
    }

    setInstructions(inst){
        this.instructions = inst;
    }

    getInstructions(){
        return this.instructions;
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
