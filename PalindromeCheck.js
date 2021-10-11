// Write a function that checks if a given string (case insensitive) is a palindrome.

function isPalindrome(x) {
    let strReverse = x.toLowerCase().split('').reverse().join('')
    return x.toLowerCase() === strReverse
}