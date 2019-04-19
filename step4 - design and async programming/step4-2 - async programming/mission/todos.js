//todos.js
const originData = require('./todoList.json');
const convertedData = JSON.parse(JSON.stringify(originData)).data;

const status = ['todo', 'doing', 'done'];
const idGenerator = () => Math.floor(Math.random() * (99999)) + 1;

const searchById = (id) => {
	let resultIndex = null;
	convertedData.forEach((value, index) => {
		if (value.id == id) resultIndex = index;
	});
	return resultIndex;
};

const addData = (name, tags)=> { 
    let obj = {
        name,
        tags,
        status: 'todo',
        id: idGenerator()
    };
    convertedData.push(obj);
	console.log(`${obj.name} 1개가 추가됐습니다.(id : ${obj.id})`);
	setTimeout(() => {
		show("all");
	}, 1000);
};

const deleteData = (id)=> { 
	const targetIndex = searchById(id);
	const targetStatus = convertedData[targetIndex].status;
	const targetName = convertedData[targetIndex].name;
	
	convertedData.splice(targetIndex, 1);
	console.log(`${targetName} ${targetStatus}가 목록에서 삭제됐습니다.`);
	setTimeout(() => {
		show("all");
	}, 1000);
};


const updateData = (id, status)=> { 
	const targetIndex = searchById(id);
	const targetName = convertedData[targetIndex].name;
	
	convertedData[targetIndex].status = status;
	
	setTimeout(() => {
		console.log(`${targetName}가 ${status}로 상태가 변경되었습니다`);
	}, 3000);
	
	setTimeout(() => {
		show("all");
	}, 1000);
};


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
		
        if (obj.status === "todo") { makInitObj(obj);
        } else if (obj.status === "doing") { makInitObj(obj);
        } else if (obj.status === "done") { makInitObj(obj);}
    });
	return statusObject;
};

const show = (todosType) => {
	let statusObject = loadData(convertedData);
    if (todosType === 'all') {
        console.log(`todo : ${statusObject.todo.length}개, doing : ${statusObject.doing.length}개, done : ${statusObject.done.length}개`);
    } else if (status.includes(todosType)) {
        let listByStatus = statusObject[todosType];
        let nameListOfStatus = listByStatus.reduce((init, value) => {
            init.push(`'${value.name}, ${value.id}번'`);
            return init;
        },[]);
		
	console.log(`${todosType}리스트 :  총 ${listByStatus.length} : ${nameListOfStatus.join(', ')}`);
    }
};

module.exports = {
    show,
	"add" : addData,
	"update" : updateData,
	"delete" : deleteData,
};