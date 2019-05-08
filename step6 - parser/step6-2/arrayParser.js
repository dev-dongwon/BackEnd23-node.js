const utils = require('./utils');
const Stack = require('./stack');

const ArrayParser = class {
    constructor(string) {
        this.string = string;
        this.tokenizedArr = this.tokenizer();
    }

    tokenizer() {

        const tokenArr = [];
        const quoteStack = new Stack();
        let token = ``;

        const pushToken = () => {
            if (token !== ``) {
                tokenArr.push(token);
            }
            token = ``;
        }

        this.string.split("").forEach((char) => {
            
            switch (char) {
                case '[':
                    tokenArr.push(char);
                    break;
                case ']':
                    pushToken();
                    tokenArr.push(char);
                    break;
                case '\'':
                    token += char;
                    if (quoteStack.isEmpty()) {
                        quoteStack.push(char);
                    } else {
                        quoteStack.pop();
                        pushToken();
                    }
                    break;
                case ',':
                    if (quoteStack.isEmpty()) {
                        pushToken();
                    } else {
                        token += char;
                    }
                    break;
                case ' ':
                    if (!quoteStack.isEmpty()) {
                        token += char;
                    }
                    break;
                default:
                    token += char;
                    break;
            }
        })
        
        return tokenArr;
    }

}

module.exports = ArrayParser;