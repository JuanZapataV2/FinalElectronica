class SyntaxChecker{
    constructor(ints_memory){
        this.inst_memory = ints_memory;
        this.instructions;
        this.memory_map = this.inst_memory.getData();
        this.correct = true;
    }

    checkSyntax(){
        this.instructions = this.inst_memory.getInstructions();
        for (var i = 0; i < this.instructions.length; i++) {
            var inst = this.instructions[i].toUpperCase();
            var sp = inst.split(/[, ]+/);
            if(sp.lenght <= 1){
                console.log("Incorrect syntax at "+this.instructions[i]);
                this.correct = false; 
                return false
            }

            var memo_inst = this.inst_memory.getInstruction(sp[0]);
            if(memo_inst == undefined){
                if(/^(variable[a-z0-9])$/.test(sp[0])){
                    console.log("new variable");
                }
                console.log("Incorrect syntax at "+this.instructions[i]);
                this.correct = false;
                return false;
            } 

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