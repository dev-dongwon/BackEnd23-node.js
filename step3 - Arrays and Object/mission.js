const data = require('./data');

const missionData1 = data.mission1;
const missionData2  = data.mission2;

// 1. 배열 만들기 - 숫자타입으로만 구성된 요소를 뽑아 배열 만들기

const isNumber = (val) => {
    return typeof val == "number";
}

const answer = [];
const functionMission1 = Object.values(missionData1).forEach(obj => {
    Object.keys(obj).forEach(key => {
        if (isNumber(obj[key])) 
        answer.push(key);
    })
});

// 2. 배열결과 출력 - type이 sk인, name으로 구성된 배열만 출력해본다.

const namesArr = [];

// 정답 배열에 insert
const insertArray = (name) => {
    namesArr.push(name);
}

// 타입 체크
const isTypeCheck = (type) => {
    return type === "sk";
}

// 타입 체크 후 배열 insert
const checkAndInsert = (type, name) => {
    if (isTypeCheck(type)) {
        insertArray(name);
    } 
}

const findObj = (arr) => arr.forEach(obj => {
    checkAndInsert(obj.type, obj.name, namesArr)
    if (obj.childnode) findObj(obj.childnode);
});

const functionMission2 = findObj(missionData2);