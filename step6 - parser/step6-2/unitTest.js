const test = require('./testLib');
const ArrayParser  = require('./arrayParser');

const ArrayParserTest = () => {

    const tokenizerTest = () => {
        const testStr = [
            "[1,2,3,4,5]",
            "['hi'']",
            "[true, false]",
            "['1a3',[null,false,['11',[112233],112],55,'99'],33, true]"
        ]
        
        const testCases = testStr.reduce((acc, str) => {
            const arrayParser = new ArrayParser(str);
            acc.push(arrayParser.tokenizer());
            return acc;
        }, [])

        const expectedCases = [
            ['[', '1', '2', '3', '4', '5', ']'],
            ['[', '\'hi\'', '\'', ']'],
            ['[', 'true', 'false', ']'],
            [ '[', '\'1a3\'', '[', 'null', 'false', '[', '\'11\'', '[', '112233', ']', '112', ']', '55', '\'99\'', ']', '33', 'true', ']']
        ]

        testCases.forEach((testCase, index) => {
            test.assertArrayEquals(testCases[index], expectedCases[index], tokenizerTest)
        })
    }

    tokenizerTest();
}

ArrayParserTest();