let generatePassword = require('generate-password');

let password = generatePassword.generate({
	length: 10,
	numbers: true
});

console.log(password)