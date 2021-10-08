// Create a function that takes in a word and returns the word with the first letter capitalized.

// Don't worry about numbers, special characters, or non-string types being passed to the function. The string lengths will be from 1 character up to 10 characters, but will never be empty.

function firstCapitalized(str){
    let newStr = str.replace(str.charAt(0),str.charAt(0).toUpperCase())
    return newStr
    
}

console.log(firstCapitalized('hola'))