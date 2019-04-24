const Utils = function() {};

const instructorUtils = {

    idGenerator : (max, min) => {
        Math.floor(Math.random() * (max - min)) + 1;
    },

}

const commonUtils = {
    
    delay : (time) => {
        return new Promise(function(resolve, reject){
            setTimeout(resolve, time);
        });
    },

    getArrByCondition : (arr, condition) => {
        return arr.reduce((acc, val) => {
            if (condition(val)) acc.push(val);
            return acc;
        }, []);
    },
    
    isDuplicated : (val, key, objArr) => {
        let result = false;
        objArr.forEach((element) => {
            if (val === element[key]) result = true;
        })
        return result;
    }

}

Utils.prototype = {
    instructorUtils,
    commonUtils
}

module.exports = Utils;