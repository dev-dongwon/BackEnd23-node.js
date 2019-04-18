```javascript
function run() {
    console.log(`3초 후 실행`);
}

console.log(`시작`);
setTimeout(run, 3000);
console.log(`끝`);
```

위 함수를 실행시켰을 때
stack, queue, backgroud 에서는 다음과 같은 일이 일어난다

1. 호출 스택에 전역 컨텍스트 main() 함수가 쌓인다
2. 그 다음 setTimeout() 함수가 호출 스택에 쌓인다

현재까지 stack 상태
----------
[setTimeout()]
----------
[main()]
----------
[this is stack]

3. 스택에 쌓인 반대의 순서로 실행되므로, 먼저 setTimeout() 이 실행된다.
4. setTimeout()이 실행되면, 타이머와 함께 run 콜백을 백그라운드로 보낸 후, stack 에서 빠진다
5. 그 다음 실행되는 전역 컨텍스트 main()이 스택에서 빠진다.

----------
[empty]
----------
[empty]
----------
[this is empty stack]


이 와중에 백그라운드에서는 run() 함수의 타이머가 실행되고 있다!

------------
자 세린다 1, 2, 3

run()


------------
this is background stage



3초를 센 후, run 함수를 task queue 로 보낸다

---------------

3초 다 세렸으니까 task queue로 보낸다?
run() 이 빠진다

----------------

--------------------------------------------------
run()이 들어간다
--------------------------------------------------
[this is task queue]


6. event loop는 호출 스택이 비워져있는 것을 보고, task queue 에서 run() 함수를 빼내와서 stack 에 올린다

----------
empty
----------
[run()]
----------
this is stack

7. 자, 스택에서 올려진게 run() 밖에 없지? 이제 run()이 스택에서 빠지면서 실행된다.