class SyntaxChecker{
    constructor(ints_memory, data_memory){
        this.inst_memory = ints_memory;
        this.data_memory = data_memory;
        this.instructions;
        this.memory_map = this.inst_memory.getData();
        this.correct = true;
    }

    checkSyntax(){
        this.instructions = this.inst_memory.getInstructions();
        for (var i = 0; i < this.instructions.length-1; i++) {
            var inst = this.instructions[i].toUpperCase();
            var sp = inst.split(/[, ]+/);
            if(sp.lenght <= 1){
                console.log("Incorrect syntax at "+this.instructions[i]);
                this.correct = false; 
                return false
            }
            var memo_inst;

            //TODO: asignaciones de variables
            console.log(sp[0])
            if(/VARIABLE[A-Z]+$/.test(sp[0])){
                let name = "variable"+sp[0].slice(sp[0].length - 1);
                if(!this.data_memory.getData(name)){
                    let value;
                    if(sp[1])
                        value = sp[1]
                    else 
                        value = 0
                    this.data_memory.addVariable(name,value);
                    console.log("New variable added");
                    memo_inst = this.inst_memory.getInstruction("VARIABLE");
                } else {
                    memo_inst = this.inst_memory.getInstruction("VARIABLE");
                }
            } else{
                memo_inst = this.inst_memory.getInstruction(sp[0]);
            }
                
            if(memo_inst == undefined && !(/variable[A-Z]+$/.test(sp[0]))){
                console.log("Incorrect syntax at "+this.instructions[i]);
                this.correct = false;
                return false;
            } else{
                var params = memo_inst.params
                if (params === sp.length-1 ){
                    console.log("Correct syntax");
                } else {
                    console.log("Incorrect syntax at "+this.instructions[i]);
                    this.correct = false;
                    return false;
                }
            }

            
        }
    }
}