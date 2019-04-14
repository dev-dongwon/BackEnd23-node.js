// reduce 구현하기
// Array 의 reduce 메서드처럼 동작하는 myReduce 메서드를 만들자.

const myReduce = (arr, callback, initialValue) => {
    arr.forEach((val) => {
        initialValue = callback(initialValue, val);
    })
    return initialValue;
};

// myReduce 활용

const plusAccum = myReduce([1,2,3], (init,val)=> init+val , 0);
const subAccum = myReduce([1,2,3], (init,val)=> init-val , 10);
const evenArr = myReduce([0,1,2,3,4], (init, val) => {
    if (val % 2 == 0) {
        init.push(val)
    } return init;
}, []);

const plusElemnetInArr = myReduce([1,2,3,4], (init, val) => {
    val += 10;
    init.push(val);
    return init;
}, []);

const objFilter = myReduce([{name:"kim", age:40}, {name:"tuna", age:30}, {name:"mj", age:20}], (init, val) => {
    if (val.age >= 30) {
        init.push(val.age);
    }
    return init;
}, []);

const arrToObj = myReduce([{a: 1, b: 2}, {c: 3, d: 4}, {e: 5, f: 6}], (init, val) => {
    return Object.assign(init, val);
  }, {});

console.log(plusAccum);                 // 6
console.log(subAccum);                  // 4
console.log(evenArr);                   // [0,2,4]
console.log(plusElemnetInArr);          // [11,12,13,14]
console.log(objFilter);                 // [40, 30]
console.log(arrToObj);                  // { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }