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

}

module.exports = utils;