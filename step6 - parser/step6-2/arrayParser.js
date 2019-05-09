const utils = require('./utils');
const Stack = require('./stack');

const ArrayParser = class {
    constructor(string) {
        this.string = string;
    }

    pushAndResetToken(token, tokenArr) {
        if (token !== ``) {
            tokenArr.push(token);
        }
        return token = ``;
    }

    tokenizer() {
        let token = ``;
        const tokenArr = [];
        const quoteStack = new Stack();

        this.string.split("").forEach((char) => {
            
            switch (char) {
                case '[':
                    tokenArr.push(char);
                    break;
                case ']':
                    token = this.pushAndResetToken(token, tokenArr)
                    tokenArr.push(char);
                    break;
                case '\'':
                    token += char;
                    if (quoteStack.isEmpty()) {
                        quoteStack.push(char);
                    } else {
                        quoteStack.pop();
                        token = this.pushAndResetToken(token, tokenArr)
                    }
                    break;
                case ',':
                    if (quoteStack.isEmpty()) {
                        token = this.pushAndResetToken(token, tokenArr);
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

    lexer() {
        const lexicalObjArr = this.tokenizer().reduce((acc, token) => {
            let tokenObj = {};
            [tokenObj.type, tokenObj.value, tokenObj.child] = [utils.getDataType(token), token, []];
            acc.push(tokenObj);
            return acc;
        }, [])
         return lexicalObjArr;
    }

}

module.exports = ArrayParser;