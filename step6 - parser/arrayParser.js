const ArrayParser = class {
    constructor(str) {
        this.str = str;
    }

    tokenizer() {

        const charArr = this.str.split("").filter((char) => !parserutils.isType(char, parserutils.dataType.whitespace));
        const tokenArr = charArr.reduce((acc, val, index) => {
            
            let numberCount = 0;
            
            if (parserutils.isType(val, parserutils.dataType.number)) {
                let [numberElement, idx] = [``, index];

                while (parserutils.isType(charArr[idx], parserutils.dataType.number)) {
                    [numberElement, idx, numberCount] = [numberElement+charArr[idx], idx+1, numberCount+1]
                }
                acc.push(numberElement);

            } else {
                acc.push(val);
            }

            charArr.splice(index, numberCount-1);
            return acc;

        }, []);

        return tokenArr;
    }

    lexer() {
        const lexicalObjArr = this.tokenizer().filter((char) => !parserutils.isType(char, parserutils.dataType.seperator))
        .reduce((acc, token) => {
                let tokenObj = {};
                [tokenObj.type, tokenObj.value] = [parserutils.getDataType(token), token];
                acc.push(tokenObj);
                return acc;
            }, [])

        return lexicalObjArr;
    }

    parser() {
        this.lexer().forEach((obj) => {
            this.parseTree.insert(obj, this.stack);
        });

        if (!this.stack.isEmpty()) throw new Error('올바른 데이터 형식이 아닙니다 (시작 괄호가 더 많습니다)');

        return this.parseTree;
    }
}



const str = '[1, [123, [234]], 123, [2]]'
const arrayParser = new ArrayParser(str);
console.log(JSON.stringify(arrayParser.parser(), null, 4));