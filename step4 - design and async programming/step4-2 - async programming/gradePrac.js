/*
프로그램 요구사항
1.함수를 작게 나눠서 프로그래밍 합니다.
2.id는 랜덤하게 고유한(unique) 값을 만드는 방법을 찾아 적용한다.
3.계속 명령을 넣을 수 있게 끝나지 않도록 구현해보세요.
4.배열의 foreach/map/filter 메서드를 올바르게 적극 사용한다.
5.add, delete, update 함수가 실행된 뒤에는 반드시 'show$all' 을 해서 나온 결과가노출된다. 이때 1초 지연후에 실행되어야 한다.
6.Update 처리의 경우, 3초 delay이후 결과가 나온다. 따라서 show$all은 그 1초뒤에 출력된다.
7.문자열을 다루는 방법을 공부하고, 정규표현식을 간단히 배워서 사용하는 것도 상관없음


$  node grade.js

명령하세요 : show$all
현재상태 :  todo: 3개, doing:2개, done:4개

명령하세요 : show$todo
todo리스트 :  총3건 : ' 자바스크립트 공부하기, 1822번' , 'iOS공부하기, 9933번'

명령하세요 : add$sleep$["favorite"]
공부하기 1개가 추가됐습니다.(id : 7788)
현재상태 :  todo: 3개, doing:2개, done:4개

명령하세요 : delete$7788  //id번호
공부하기 todo가 목록에서 삭제됐습니다
현재상태 :  todo: 3개, doing:2개, done:4개

명령하세요 : update$7788$doing
공부하기가 doing으로 상태가 변경됐습니다
현재상태 :  todo: 3개, doing:2개, done:4개
*/

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const setConfigReadline = (readline) => {
    
    if (readline) {
        readline.setPrompt('명령하세요 : ');    
        readline.on('line', function(line){
            if (line == 'goodbye') {
                readline.close();
            }
            console.log(line);
            readline.prompt();
        });
    } else {
        throw new Error("입력을 불러올 수 없습니다");
    }
}

const exitReadline = (readline) => {
    readline.on('close', function() {
        process.exit();
    });
}

const readlineCommand = (line) => {
    
};


function generateRandomNum() {
      return (Math.round((((Math.random()+1) * (Math.random()+1))) * 10000));
};

console.log(generateRandomNum());