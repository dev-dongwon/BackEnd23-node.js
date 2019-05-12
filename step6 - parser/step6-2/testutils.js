const test = {

    logFail(actual, expected, testFunction) {
        // red color
        console.log('\u001b[31m' + `FAIL!! ${testFunction.name} 의 [[ ${actual} ]]이 기대값 ${expected}와 일치하지 않음` + '\u001b[0m')
        return false;
    },
    
    logSuccess(actual, expected, testFunction) {
        // green color
        console.log('\u001b[32m' + `SUCCESS!! ${testFunction.name} 의 [[ ${actual} ]]이 기대값 ${expected}와 일치` + '\u001b[0m')
        return true;
    },

    // 단일 데이터 비교
    assertEquals(expected, actual, testFunction) {
        if (expected === actual) {
            this.logSuccess(actual, expected, testFunction);
        } else {
            this.logFail(actual, expected, testFunction);
        }
    },
    
    // 배열 
    assertArrayEquals(expectedArr, actualArr, testFunction) {

        if (expectedArr.length === 0 && actualArr.length === 0) {
            this.logSuccess(actualArr, expectedArr, testFunction);
        }

        let flag = true;
        expectedArr.forEach((val, index) => {
            if(this.assertEquals(val, actualArr[index], testFunction)) {
                flag = false;
            };
        })

        if(flag) {
            console.log('========================================================')
            this.logSuccess(actualArr, expectedArr, testFunction);
            console.log('========================================================')
            return;
        } else {
            console.log('========================================================')
            this.logFail(actualArr, expectedArr, testFunction);
            console.log('========================================================')
            return;
        }
    },


    assertObjArrEquals(expectedArr, actualArr, testFunction) {

        let flag = true;

        if (expectedArr.length === 0 && actualArr.length === 0) {
            this.logSuccess(actualArr, expectedArr, testFunction);
        } else {
            expectedArr.forEach((obj, index) => {
                Object.keys(obj).forEach((key) => {
                    if (typeof expectedArr[index][key] === 'object') {
                        this.assertObjArrEquals(expectedArr[index][key], actualArr[index][key], testFunction)
                    } else {
                        if(this.assertEquals(expectedArr[index][key], actualArr[index][key], testFunction)) {
                            flag = false;
                        };
                    }
                })
            })
        }

        if(flag) {
            console.log('========================================================')
            this.logSuccess(actualArr, expectedArr, testFunction);
            console.log('========================================================')
            return;
        } else {
            console.log('========================================================')
            this.logFail(actualArr, expectedArr, testFunction);
            console.log('========================================================')
            return;
        }
    }
}

module.exports = test;