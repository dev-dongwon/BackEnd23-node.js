const todosData = require('./todosData');
const data = todosData.data;

const getTodosList = (() => {
    const dataTemplate = {"todo" :[], "doing": [], "done":[]};
    return () => dataTemplate;
})();

const initData = (data) => {
    data.forEach((obj) => {
        if (obj.status === "todo") getTodosList().todo.push(obj.name);
        if (obj.status === "doing") getTodosList().doing.push(obj.name);
        if (obj.status === "done") getTodosList().done.push(obj.name);
    })
}

const isValidType = (todosType) => {
    let result = false;

    Object.keys(getTodosList()).forEach((key) => {
        if (key == todosType) {
            result = true;
        }
    })
    return result;
}

const show = (todosType) => {
    if (todosType === 'all') {
        console.log(` todo : ${getTodosList().todo.length}개, doing : ${getTodosList().doing.length}개, done : ${getTodosList().todo.length}개`)
    } else if (isValidType(todosType)) {
        console.log(`${todosType}리스트 :  총 ${getTodosList()[todosType].length} : ${getTodosList()[todosType].join()}`);
    }
}

initData(data);

module.exports = {
    getTodoList : getTodosList(),
    show,

}