const moment = require('moment');

// Jan 1st 1970 00:00:00 am

// var date = new Date();
// console.log(date.getMonth());

// var date = moment();
// console.log(date.format('MMM Do, YYYY hh:mm a'));


var createdAt = 1234;

var someTimestamp = moment().valueOf();

var date = moment(someTimestamp);
var dateFormatted = date.format('MMM Do, YYYY h:mm a');
console.log(dateFormatted);