const moment = require('moment')

var date = moment()

console.log(date.format('MMM'))

console.log(date.format('hh:mm a'))


var someTimeStamp = moment().valueOf()

console.log(someTimeStamp)