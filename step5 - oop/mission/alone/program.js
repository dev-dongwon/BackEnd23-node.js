const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const Program = (readline) =>{
    this.readline = readline;   
}

Program.prototype.runProgram = (readline, decoder) => {
    readline.setPrompt('명령하세요: ');
    readline.prompt();
    readline.on('line', (userInput) => {    
        decoder(userInput);
    }).on('close', () => {
        console.log("프로그램을 종료합니다.");
        process.exit();
    });
};

