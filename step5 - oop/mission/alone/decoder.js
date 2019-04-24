function Decoder() {
    this.regexpList = {
        seperateUserinput : /[^\$]+/g,
    };
}

Decoder.prototype = {
    getCmdList : (userInput, regexp) => {
        return userInput.match(regexp);
    },
    executeCmd : (cmdList) =>{
        if (arguments.length != 1) return;

        if (cmdList.length == 2) {
            instruction[cmdList[0]](commandArr[1]);
        } else if (cmdList.length == 3) {
            instruction[cmdList[0]](cmdList[1], cmdList[2]);
        }
    },
}

module.exports = Decoder;
