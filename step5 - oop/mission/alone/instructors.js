const originData = require('./todoList.json');
const Utils = require('./utils.js');
const convertedData = JSON.parse(JSON.stringify(originData)).data;

function Instructor() {
    this.utils = new Utils();
}

Instructor.prototype = {

    show : () => {console.log("this is show method")},
    add : () => {},
    delete : () => {},
    update :() => {}
}

module.exports = Instructor;