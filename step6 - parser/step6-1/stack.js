const Stack = class {
    constructor() {
        this.stack = [];
    }

    push(item) {
        this.stack.push(item);
    }

    pop() {
        return this.stack.pop();
    }

    size() {
        return this.stack.length;
    }

    peek() {
        return this.stack[this.stack.length-1];
    }

    isEmpty() {
        if (this.stack.length === 0) {
            return true
        }
            return false;
    }
}

module.exports = Stack;