const validator = require('validator');

const userInput = 'example@example.com';
const isEmail = validator.isEmail(userInput);
const sanitizedInput = validator.escape(userInput);

console.log(isEmail); 
console.log(sanitizedInput); 


const userInput2 = '<heejejk>\'ss'
const sanitizedInput2 = validator.escape(userInput2);
console.log(sanitizedInput2);