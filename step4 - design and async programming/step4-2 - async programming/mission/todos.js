//todos.js
const originData = require('./todoList.json');
const convertedData = JSON.parse(JSON.stringify(originData)).data;

const status = ['todo', 'doing', 'done'];
const idGenerator = () => Math.floor(Math.random() * (99999)) + 1;

const addDataToObject = (name, tags)=> { 
    let obj = {
        name,
        tags,
        status: 'todo',
        id: idGenerator()
    };
    convertedData.push(obj);
 };

const updateDataToObject = ()=> {  };

const deleteDataToObject = ()=> {  };

const loadData = (data) => {
    
    
    const statusObject = {
        "todo" :[],
        "doing" : [],
        "done" :[]
    };
    

    const makInitObj = (obj) => {
        let data = {
            name : obj.name,
            id : obj.id
        };
        statusObject[obj.status].push(data);
    };
	
    data.forEach((obj) => {
        if (obj.status === "todo") {
            makInitObj(obj);
        } else if (obj.status === "doing") {
            makInitObj(obj);
        } else if (obj.status === "done") {
            makInitObj(obj);
        }
    });
};

const show = (todosType) => {
	loadData(convertedData);
    if (todosType === 'all') {
        console.log(`todo : ${statusObject.todo.length}개, doing : ${statusObject.doing.length}개, done : ${statusObject.todo.length}개`);
    } else if (status.includes(todosType)) {
        let listByStatus = statusObject[todosType];
        let nameListOfStatus = listByStatus.reduce((init, value) => {
            init.push(`'${value.name}, ${value.id}번'`);
            return init;
        },[]);
        

        console.log(`${todosType}리스트 :  총 ${listByStatus.length} : ${nameListOfStatus.join(', ')}`);
    }
};

loadData(convertedData);
show('todo');
addDataToObject('snow', ['snow']);
show('todo');


module.exports = {
    getTodoList : statusObject,
    show,

};