const utils = require('./utils');

const Node = class {
    constructor({type, value, child}) {
        this.type = type;
        this.value = value;
        this.child = child;
    }
}

const ParseTree = class {
    constructor() {
        this.root = null;
    }
}