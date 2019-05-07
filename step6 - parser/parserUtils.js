const parserUtils = {
    charType : {
        number : 'number',
        startArray : 'array',
        endArray : 'endArray',
        seperator : 'seperator',
        whitespace : 'whitespace'
    },

    getCharType(token) {

        typeRegexp = {
            number : /\d/,
            startArray : /[\[]/,
            endArray : /[\]]/,
            seperator : /[,]+/,
            whitespace : /\s+/,
        };

        let charType;

        Object.keys(typeRegexp).forEach((key) => {
            if (typeRegexp[key].test(token)) {
                charType = this.charType[key];
            }
        })

        return charType;
    },

    isType(char, type) {
        const charType = this.getCharType(char);
        return charType === type
    }
}

module.exports = parserUtils;