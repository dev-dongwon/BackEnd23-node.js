//app.js
const Todos = require('./todos');

const readline = require('readline');
const rl = readline.createInterface(process.stdin,process.stdout);

const regexp = () => {
    // [1번째 command, 2번째 command]
    const regexpForPrimaryCommand = /[^\$]+(?=\$)/g;
    // [2번째 command, 3번째 command]
    const regexpForSecondaryCommand = /(?<=\$)[^\$]+/g;
    const regexpObj = {regexpForPrimaryCommand, regexpForSecondaryCommand};
    
    return regexpObj;
};

const getSeperateCommandArray = (command) => {
    let commandArray = [];
    
    const firstCommand = command.match(regexp().regexpForPrimaryCommand)[0];
    const secondCommand = command.match(regexp().regexpForSecondaryCommand)[0];
    const thirdCommand = command.match(regexp().regexpForSecondaryCommand)[1];

    commandArray = [firstCommand, secondCommand];

    if (thirdCommand) {
        commandArray.push(thirdCommand);
    }
    return commandArray;
};


const executeTodoMethod = (firstCommand, secondCommand, thirdCommand) => {
    Todos[firstCommand](secondCommand, thirdCommand);
};

rl.setPrompt('명령하세요: ');
rl.prompt();
rl.on('line', (userInput) => {
    switch(userInput.toLowerCase().trim()){
        case 'exit':
            rl.close();
            break;
        default:
            console.log(`당신의 명령어: ${userInput}`);
			const commandArr = getSeperateCommandArray(userInput);
			
            if (commandArr.length == 2) {
               executeTodoMethod(commandArr[0], commandArr[1]);
			} else {
            	executeTodoMethod(commandArr[0], commandArr[1], commandArr[2]);
            }

            break;
    }
    rl.prompt();
}).on('close', () => {
    console.log("프로그램을 종료합니다.");
    process.exit();
});





// const todos = require('./todos');

// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// const regexp = () => {
//     // [1번째 command, 2번째 command]
//     const regexpForPrimaryCommand = /[^\$]+(?=\$)/g;
//     // [2번째 command, 3번째 command]
//     const regexpForSecondaryCommand = /(?<=\$)[^\$]+/g;
//     const regexpObj = {regexpForPrimaryCommand, regexpForSecondaryCommand};
    
//     return regexpObj;
// }

// const getSeperateCommandArray = (command) => {
//     let commandArray = [];
    
//     const firstCommand = command.match(regexp().regexpForPrimaryCommand)[0];
//     const secondCommand = command.match(regexp().regexpForSecondaryCommand)[0];
//     const thirdCommand = command.match(regexp().regexpForSecondaryCommand)[1];

//     commandArray = [firstCommand, secondCommand];

//     if (thirdCommand) {
//         commandArray.push(thirdCommand);
//     }
//     return commandArray;
// }


// const executeTodoMethod = (firstCommand, secondCommand, thirdCommand) => {
//     todos[firstCommand](secondCommand, thirdCommand);
// }

// const runTodoProgram = () => {

//     readline.setPrompt('명령을 입력하세요 : ');
//     readline.on('line', (command) => {
//         try {
//             const seperateCommandArray = getSeperateCommandArray(command, runTodoProgram);
            
//             if (seperateCommandArray.length == 2) {
                
//                 executeTodoMethod(seperateCommandArray[0], seperateCommandArray[1]);
                
//                 setTimeout(() => {
//                     todos.show("all");
//                 }, 1000);

//             } else {
//                 executeFunc(seperateCommandArray[0], seperateCommandArray[1], seperateCommandArray[2]);
//             }
            
//         } catch (error) {
//             console.log("올바르지 않은 명령어입니다, 다시 입력해주세요")
//             runTodoProgram();
//         }
//     });
// }


// runTodoProgram();