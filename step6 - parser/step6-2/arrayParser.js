const ArrayParser = class {
    constructor(string) {
        this.string = string;
    }

    tokenizer() {
        const tokenArr = [];

        this.string.split("").filter((val) => val !== " ")
        
    }
}

module.exports = ArrayParser;