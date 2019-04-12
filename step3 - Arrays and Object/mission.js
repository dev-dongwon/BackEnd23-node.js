const data = require('./data');

const missionData1 = data.mission1;
const missionData2  = data.mission2;

// 1. 배열 만들기 - 숫자타입으로만 구성된 요소를 뽑아 배열 만들기
// 나도 함수형 하고 싶다!!! ㅜㅜ

const isNumber = (val) => {
    return typeof val == "number";
}

const answer = [];
const missionArray = Object.values(missionData1).forEach(obj => {
    Object.keys(obj).forEach(key => {
        if (isNumber(obj[key])) 
        answer.push(key);
    })
});

console.log(answer);
