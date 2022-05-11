class InstructionMemory {
    constructor() {

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
}
