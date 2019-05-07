const test = {

    logFail(obj, testFunction) {
        console.log(`${testFunction.name} 의 [-- ${obj} --] 가 FAIL!!`)
        return false;
    },
    
    logSuccess(obj, testFunction) {
        console.log(`${testFunction.name} 의 [-- ${obj} --]가 SUCCESS!!`)
        return true;
    },
    
    assertEquals(expected, actual, testFunction) {
        if (expected === actual) {
            this.logSuccess(actual, testFunction);
        }
        this.logFail(actual, testFunction);
    },
    
    assertArrayEquals(expectedArr, actualArr, testFunction) {
        expectedArr.forEach((val, index) => {
            if (expectedArr[index] !== actualArr[index]) {
                this.logFail(val, testFunction);
            }
        })
    
        this.logSuccess(actualArr, testFunction);
    }
}

module.exports = test;