const utils = require('./parserutils');
const Stack = require('./stack');
const ParseTree = require('./parsetree');

const ArrayParser = class {
    
    constructor(string) {
        this.string = string;
    }

    get parsetree() {
        return new ParseTree({root : null, stack : new Stack()});
    }

    get charType() {
        return {
            tokenArr : [',','[',']'],
            bracketArr : ['[', ']'],
            stringArr : ['\'','\"'],
        }
    }

    pushAndResetToken(token, tokenArr) {
        if (token !== ``) {
            tokenArr.push(token.trim());
        }
        return token = ``;
    }

    isSameQuote(quote, quoteStack) {
        return quote === quoteStack.peek();
    }

    pushQuoteStack(quote, quoteStack, stringPropertyArr) {
        if (stringPropertyArr.includes(quote)) {
            if (quoteStack.isEmpty()) {
                quoteStack.push(quote);
            } else {
                if (this.isSameQuote(quote, quoteStack)) {
                    quoteStack.pop();
                } else {
                    quoteStack.push(quote);
                }
            }
        }
    }

    pushBracket(char, tokenArr, bracketProperty) {
        if (bracketProperty.includes(char)) {
            tokenArr.push(char);
        }
    }

    makeStringToken(stringPropertyArr, tokenArr, token, char) {
        if (stringPropertyArr.includes(token[0])) {
            if (token[0] === (token[token.length-1])) {
                token = this.pushAndResetToken(token, tokenArr);
            } else {
                token+=char;
            }
        } else {
            token = this.pushAndResetToken(token, tokenArr);
        }
        return token;
    }

    tokenizer() {
        let token = ``;
        const tokenArr = [];
        const quoteStack = new Stack();
        
        this.string.split("").forEach((char) => {

            this.pushQuoteStack(char, quoteStack, this.charType.stringArr);
            
            if (this.charType.tokenArr.includes(char) && quoteStack.isEmpty()) {
                token = this.makeStringToken(this.charType.stringArr, tokenArr, token, char);
                this.pushBracket(char, tokenArr, this.charType.bracketArr);
            } else {
                token+=char;
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

    parser() {
        const parsetree = this.parsetree;
        this.lexer().forEach((obj) => {
            parsetree.insert(obj);
        });

        if (!parsetree.stack.isEmpty()) {
            throw new Error('올바른 데이터 형식이 아닙니다 (시작 괄호가 더 많습니다)');
         }
         
        return parsetree.root;
    }
}

module.exports = ArrayParser;