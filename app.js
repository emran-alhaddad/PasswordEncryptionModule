var Password = require('./password');
const prompt = require('prompt-sync')();

console.clear();
var password = new Password(prompt('Please Type Your Password >>>> ').toString());
console.group("--------------------------");
console.log("password: ", password.password);
console.log("Encrypted: ", password.encrypt());
console.log("Decrypted: ", password.decrypt());
console.log("Is Valid : ", password.isValid());
console.groupEnd("--------------------------");