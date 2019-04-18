const todos =  [ 
    {
        'name' : '자바스크립트 공부하기', 
        'tags' : ['programming', 'javascript'],
        'status' : 'todo',
        'id' : 12123123
    },
    {
        'name' : ' 그림 그리기', 
        'tags' : ['picture', 'favorite'],
        'status' : 'doing',
        'id' : 312323
    },
    {
        'name' : '자바스크립트 공부하기', 
        'tags' : ['programming', 'javascript'],
        'status' : 'todo',
        'id' : 12123123
    }
];
/*
pseudo code

CONST DATA = {"TODO" : NAME ARRAY, "DOING": NAME ARRAY, "DONE": MAME ARRAY};

CONST INIT_DATA(DATA)
=> FOR (OBJ OF TODOS)
        IF (OBJ === "TODO")
            THEN OBJ.NAME -> DATA.TODO 
        ELSE IF (OBJ === "DOING")
            THEN OBJ.NAME -> DATA.DOING
        ELSE IF (OBJ === "DONE")
            THEN OBJ.NAME -> DATA.DONE

CONST SHOW(INPUT)
=>  IF (INPUT === "ALL")
        PRINT (STATUS : STATUS.LENGTH)
    
    ELSE IF (INPUT == DATA.KEY)
        PRINT (KEY : NAME ARRAY)
    ELSE
        ERROR HANDLING;
*/

const dataObj = {"todo" :[], "doing": [], "done":[]};

const initData = (todos) => {
    todos.forEach((val) => {
        if (val.status === "todo") dataObj.todo.push(val.name);
        if (val.status === "doing") dataObj.doing.push(val.name);
        if (val.status === "done") dataObj.done.push(val.name);
    });
};

const show = (todosType) => {
    if (todosType === "all")
        console.log(` todo : ${dataObj.todo.length}개, doing : ${dataObj.doing.length}개, done : ${dataObj.todo.length}개`);
    
    else if (Object.keys(dataObj).includes(todosType))
        Object.keys(dataObj).forEach((val) => {
            if (val === todosType) {
                console.log(`todo리스트 :  총 ${dataObj[todosType].length} : ${dataObj[todosType].join()}`);
            };
        })
    
    else 
        throw new Error("데이터 형식이 일치하지 않습니다");
}


initData(todos);
console.log(dataObj);
console.log(show("all"));