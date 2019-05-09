const Stack = require('./stack');

const utils = {
    
    typesRegexp : {
        startArray : /[\[]/,
        endArray : /[\]]/,
        number : /^[-|+]?\d*[.]?\d+/,
        string : /\S+/,
        boolean : /true|false/,
        null : /null/,
    },
    
    isString(token) {
        const quoteStack = new Stack();
        const charArr = token.split("");

        if (charArr[0] !== '\'') {
            return false;
        }
        
        token.split("").forEach((char) => {
            if (quoteStack.isEmpty()) {
                quoteStack.push(char);
            } else {
                if (char === '\'') {
                    quoteStack.pop();
                }
            }
        });

        return quoteStack.isEmpty();
    },

    getDataType(token) {
        let type = undefined;

        switch (true) {
            case this.typesRegexp.number.test(token):
                type = 'number';
                break;
            case this.isString(token):
                type = 'string';
                break;
            case this.typesRegexp.startArray.test(token):
                type = 'array';
                break;
            case this.typesRegexp.endArray.test(token):
                type = 'endArray';
                break;
            case this.typesRegexp.boolean.test(token):
                type = 'boolean';
                break;
            case this.typesRegexp.null.test(token):
                type = 'null';
                break;
            default:
                break;
        }

        if (type === undefined) {
            throw new Error(`[[  ${token}  ]]은 올바른 데이터 타입이 아닙니다`);
        }

        return type;
    }
}

module.exports = utils;