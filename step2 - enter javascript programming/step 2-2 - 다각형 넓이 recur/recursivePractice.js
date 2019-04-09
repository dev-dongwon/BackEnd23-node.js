// recursion practice

// imperative
var countdown = (n) => {
    for (var i=n; i>=0; i--) {
        console.log(i);
    }
}
countdown(5);

// recursive
var countdownRecur = (n) => {
    
    console.log(n);
    // 종료 조건을 꼭 써줘야 무한 loop 에 빠지지 않는다
    if (n ==0) return;
    countdownRecur(n-1);

}
countdownRecur(5);

// recursion practice 1 : factorial 구현
const factorial = (n) => {
    // 종료 조건 n < 1
    if (n < 1) return 1;
    // 종료 조건에 수렴하는 케이스 => 여기서는 n - 1
    let result = factorial(n-1) * n;
    console.log(result);
    return result;
}
factorial(6);

// recursion practice 2 : pibonacci 구현
const fibonacci = (n) => {
    if (n <= 1) return 1;
    return fibonacci(n-1) + fibonacci(n-2);
}
fibonacci(4);

// etc : memoization 활용
function fibonacciMemo (n, memo = memo || {}) {
    if (memo[n]) return memo[n];
    if (n <= 1) return 1;

    return memo[n] = fibonacciMemo(n-1, memo) + fibonacciMemo(n-2, memo);
}