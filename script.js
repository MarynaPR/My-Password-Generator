// All global var sets
var numbers = '0123456789'.split('');
var lowerCase = 'abcdefghijklmnopqrstuvwxyz'.split('');
var upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
var characters = '`!@#$%^&*+<>?/;:(=)|{~.,'.split('');

function getPasswordOptions() {
    //prompt user to put numbers between 8-128
    var length = parseInt(
        prompt('Choose the lenght for your password. min: 8 max: 128.')
    );
    // if the input less than 8, prompt to input a valid number
    if (length < 8 || length > 128 || isNaN(length) === true) {
        alert('You need to provide a valid answer! Please select a number between 8 and 128');
        getPasswordOptions()
        return;
    }

    // numbers
    var includeNumbers = confirm('Would you like to include number? Click ok to comfirm');
    //console.log(includeNumbers);

    //lowerCase
    var includeLowerCase = confirm('Would you like to include lowercase letters? Click Ok to confirm.');
    //console.log(includeLowerCase);

    //upperCase
    var includeUpperCase = confirm('Would you like to include uppercase letters? Click Ok to confirm.');
    //console.log(includeUpperCase);

    //specialCharacter
    var includeCharacters = confirm('Would you like to include special characters? Click Ok to confirm.');
    //console.log(includeCharacters);

    if (includeNumbers === false && includeLowerCase === false && includeUpperCase === false && includeCharacters === false
    ) {
        alert('Please select at least one type to generate a secure password.');
        return;
    }

    //list of Options to collect user input:
    var passwordOptions = {
        length: length,
        includeNumbers: includeNumbers,
        includeLowerCase: includeLowerCase,
        includeUpperCase: includeUpperCase,
        includeCharacters: includeCharacters
    };
    return passwordOptions;
}
//use Math.random function for password options

function getRandom(arr) {
    var randIndex = Math.floor(Math.random() * arr.length);
    var randElement = arr[randIndex];

    return randElement;
}


//after user input is generated, use function for generating password
function generatePassword() {

    var options = getPasswordOptions();
    var result = [];
    var allPotentialChar = [];
    var allAssuredChar = [];


    //create 4 conditional statments for array: includes-lower/upper/number/character

    //upperCase
    if (options.includeUpperCase) {
        allPotentialChar = allPotentialChar.concat(upperCase);
        allAssuredChar.push(getRandom(upperCase));
    }
    //characters
    if (options.includeCharacters) {
        allPotentialChar = allPotentialChar.concat(characters);
        allAssuredChar.push(getRandom(characters));
    }
    //numbers
    if (options.includeNumbers) {
        allPotentialChar = allPotentialChar.concat(numbers);
        allAssuredChar.push(getRandom(numbers));
    }
    //lowerCase
    if (options.includeLowerCase) {
        allPotentialChar = allPotentialChar.concat(lowerCase);
        allAssuredChar.push(getRandom(lowerCase));
    }
    //passwordLength 
    for (var i = 0; i < options.length; i++) {
        var allPotentialChar = getRandom(allPotentialChar);
        result.push(allPotentialChar);
    }

    // assure at least one of each characters is included
    for (var i = 0; i < allAssuredChar.length; i++) {
        result[i] = allAssuredChar[i];
    }
    // get result from array
    return result.join('');
}

//Get references to the #generate element
var generateBtn = document.querySelector("#generate");

//Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
}

//Add event listener to generate button
generateBtn.addEventListener("click", writePassword);