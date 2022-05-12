class DataMemory{
    constructor(){
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
            this.data[name].value = value
            return true
        }
        else 
            return false
    }
}