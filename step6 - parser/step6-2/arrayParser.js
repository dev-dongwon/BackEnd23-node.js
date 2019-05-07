const ArrayParser = class {
    constructor(string) {
        this.string = string;
    }

    tokenizer() {
        return this.string.split("").filter((val) => val !== " ");
    }
}

module.exports = ArrayParser;