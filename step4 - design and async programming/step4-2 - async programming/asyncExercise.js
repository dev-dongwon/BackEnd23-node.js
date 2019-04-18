console.log('kim');
setTimeout(() => {
    console.log('lee');
});
console.log('park');

// 비동기를 이해했다면 다음 결과값을 예상할 수 있겠지?

const sample1 = (() => {
    function plus() {
        let a = 1;
        setTimeout( ()=>console.log(++a), 1000);
        return a;
      }
      const result = plus();
      console.log('result :', result); 
});

// sample1();

  // 1. 스택에 main(), plus() console.log()가 쌓인다
  // 2. 스택의 역순으로 실행되므로 console.log()가 먼저 실행된다
  // 3. console.log()가 plus()를 부르고, plus()가 스택에서 빠지면서 평가된 값인 1이 result에 들어간다

  // 4-1. plus()가 실행되면 settimeout()은 백그라운로 넘어간다, 여기서 1000 ms 를 세리고 테스크 큐로 넘어간다
  // 4. main()까지 stack에서 빠지면 그제서야 이벤트 루프가 태스크 큐에서 console.log(++a)를 꺼내와서 스택에 쌓는다
  // 5. 스택에 console.log(++a) 밖에 없으니까 스택에서 console.log()가 빠지면서 실행된다

  // 예상 결과값 1 찍히고 1000ms 후 2
  // 실제 결과값과 동일하다.
  // 난 제대로 이해하고 있는 것인가!?

// 2. sample2

const sample2 = (() => {
    const baseData = [1,2,3,4,5,6,100];
    const asyncRun = (arr, fn) => {
        for(var i=0; i<arr.length; i++) {
            setTimeout( () => fn(i), 10000);
        }
        console.log("왜 이렇게 만들었을까!!!")
    }
    asyncRun(baseData, idx =>console.log(idx));
})

// sample2();

// 1000ms 의 간격을 두고 arr index 값이 차례대로 찍힐 것을 기대하고 만든 코드겠지만
// 다 마지막 index 값인 7이 찍혀버린다
// 시간을 0으로 두더라도 결과는 동일하다
// 하지만 var와 달리 let은 의도대로 0부터 7까지 예쁘게 찍힌다

// 
/*


1. var일 경우

stack에서 asyncRun이 쌓이고 실행되면서 빠지면 for 문이 돌겠지?
근데 "왜 이렇게 만들었을까!"가 먼저 출력되는 걸 봐서 이미 for 문 안은 다 실행된 상태란 말이야.
이미 settimeout 이 실행되서 background에 idx =>console.log(idx) 이게 넘어가서 실행되고 있는 상태란 거지.
각자 10000ms 시간을 background에서 다 써버리고, 차례대로 task queue에 쌓인다

var였을 떄, 7이 계속 찍히는 거는 task queue 에 이미 7이 들어갔다는 소리니까
background로 넘어올 때 이미 i값이 7인 상태로 넘어왔다는 소리.

큐에는 이미
----------------------------------
7,7,7,7,7,7,7 로 들어감
----------------------------------

var 는 변수 이름값이 같으면 호이스팅으로 계속 값이 씌워지게 되니까 for문을 다 돌았을 때 최종 i 값은 7.
i 값이 이미 7인 상태에서 console.log는 i값을 참조하니까 계속 7이 찍히게 된다.

예를 들어

var i = 0;

for (var i=0; i<10; i++) {
    
}

console.log(i);

라고 했을 때, for 의 i는 이미 전역 레벨 스코프를 가지고 있기 때문에
i 값은 0이 아닌 for에서 다 돈 10이 찍히게 된다.


2. let일 경우
큐에 이렇게 들어갔다는 소린데
----------------------------------------
0, 1, 2, 3, 4, 5, 6 
----------------------------------------
큐는 그냥 settimeout에 걸린 시간이 지났을 때 백그라운드에서 넘어오는 거에 불과하니까,
백그라운드에서 이미 0,1,2,3,4,5,6 으로 넘어왔다는 소리다.

이미 함수 실행할 때 스코프가 블록 레벨 스코프라서, 







*/
// background 와 stack이 서로 영향을 주지 않고 무관하게 실행된다

  // 3. sample3

  const sample3 = (() => {
    const baseData = [1,2,3,4,5,6,100];
    const asyncRun = (arr, fn) => {
       arr.forEach((v,i) => {
         setTimeout( () => fn(i), 1000);
       });
    }
    asyncRun(baseData, idx =>console.log(idx))    
  });

//   sample3();

  // 이건 언뜻 보기에 각 index가 찍힐 때마다 1000ms 의 간격을 두고 표준 출력으로 찍힐 것으로 예상되지만, 과연 그럴까?
  // 



  // 4. sample4

  const sample4 = (() => {
    const baseData = [1,2,3,4,5,6,100];

    function sync() {
      baseData.forEach((v,i) => {
        console.log("sync ", i);
      });
    }
    
    const asyncRun = (arr, fn) => {
       arr.forEach((v,i) => {
         setTimeout( () => fn(i), 1000);
       });
    }
    
    function sync2() {
      baseData.forEach((v,i) => {
        console.log("sync 2 ", i);
      });
    }
    
    asyncRun(baseData, idx =>console.log(idx))
    sync();
    sync2();
    
  })

//   sample4();

/*

생각을 해보자.
스택에서 빠지는 순서는 sync2, sync, asyncRun 이 순서로 빠진다
sync2() 가 실행되면
async2 라는 string과 함께 걍 인덱스 순서인 0,1,2,3,4,5,6,7 이 출력될 것이다.
(배열의 고유 식별값인 index를 그냥 가져오니까?)

그 다음 sync()가 실행되면
sync라는 인덱스와 함께 0,1,2,3,4,5,6,7

*/

// 5. sample5 : 비동기 + 비동기

const sample5 = (() => {
    
    const baseData = [1,2,3,4,5,6,100];
    
    const asyncRun = (arr, fn) => {
       arr.forEach((v,i) => {
         setTimeout(() => {
           setTimeout(() => {
             console.log("cb 2");
             fn(i)
            },10000);
           console.log("cb 1");
         }, 10000);
       });
    }
    
    asyncRun(baseData, idx =>console.log(idx))
})

// sample5();

/*
큐에 뭐가 먼저 들어가느냐를 생각해보자

*/



