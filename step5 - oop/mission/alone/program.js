const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const Decoder = require('./decoder.js');

function Program () {
    this.decoder = new Decoder();
};

Program.prototype = {

    runProgram : (readline, decoder) => {
        readline.setPrompt('명령하세요: ');
        readline.prompt();
        readline.on('line', (userInput) => {
            console.log(decoder.__proto__.getCmdList(userInput, decoder.regexpList.seperateUserinput))
        }).on('close', () => {
            console.log("프로그램을 종료합니다.");
            process.exit();
        });
    }
}

const run = (() => {
    const program = new Program();
    program.runProgram(readline, program.decoder);
})();