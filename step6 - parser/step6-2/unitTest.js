const test = require('./testLib');
const ArrayParser  = require('./arrayParser');

const ArrayParserTest = () => {

    const tokenizerTest = () => {
        
        const numberTestCases = [
            "[1,2,3,4,5]",
            "  [1, 2, 3, 4, 5]",
            "[1, 2, 3, 4 ,   5   ]",
        ]
        
        const expectedNumber = ['[', '1', ',', '2', ',', '3', ',', '4', ',', '5', ']'];
        
        const stringTestCases = [
            "['lion', 'tiger', 'crong', 'honux']"
        ]

        numberTestCases.forEach((str) => {
            const arrayParser = new ArrayParser(str);
            test.assertArrayEquals(expectedNumber, arrayParser.tokenizer(), tokenizerTest);
        })
    }

    tokenizerTest();
}


ArrayParserTest();