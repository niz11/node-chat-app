var moment = require('moment');

//Moment is a great libary-onlt libary for working with time and dates in javascript.
// Great decomentation online
var date = moment();

console.log(date.format());
//Output - 2018-05-03T20:41:12+02:00

console.log(date.format('MMM'));
// output - name of the month - today ---> May

console.log(date.format('MMM YYYY'));
//output - May 2018

console.log(date.format('MMM Do, YYYY'));
//Output - May 3rd, 2018

// To add or subtruct we can use the methods add and subtract

date.add(1,'years');
// 2019
date.add(100,'years');
//2118
date.add(1,'years').subtract('9', 'months');
console.log(date.format('MMM Do, YYYY'));
//Aug 3rd , 2119

// chalange

var date2 = moment();
console.log(date2.format('LT'));
console.log(date2.format('h:mm a'));

// To create a moment object, I just need to throw in the createdAt inside it's ()

var createdAt = new Date().getTime();
var date3 = moment(createdAt);

console.log(date3.format('h:mm a'));
