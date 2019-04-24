const Utils = require('./utils.js');

function Message() {
}

const utils = new Utils();

Message.prototype = {

    show : (objArr, status) => {

        if (status === 'all') {
            let [numOfTodos, numOfDoings, numOfDones] = [0,0,0];
     
            objArr.forEach((val) => {
                if (val.status === 'todo') numOfTodos++;
                else if (val.status === 'doing') numOfDoings++;
                else if (val.status === 'done') numOfDones++;
            })
            console.log(`현재상태 : todo: ${numOfTodos}개, doing: ${numOfDoings}개, done: ${numOfDones}개`);
     
        } else {
            let result = `${status} 리스트 : 총${objArr.length}건 :`;
            utils.__proto__.commonUtils.getArrByCondition(objArr, (val) => {result += `, '${val.name}, ${val.id}번'`; return true});
            console.log(`${result}`);
        }
    }

}

module.exports = Message;