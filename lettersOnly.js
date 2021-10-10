// Let's assume we need "clean" strings. Clean means a string should only contain letters a-z, A-Z and spaces. We assume that there are no double spaces or line breaks.

// Write a function that takes a string and returns a string without the unnecessary characters.

// https://www.codewars.com/kata/59be6bdc4f98a8a9c700007d/train/javascript

function removeChars(s) {
    try {
      let re = /[A-Za-z ]/g;
      let found = s.match(re);
      console.log(found);
      if (found === null) {
        return ''
      } else {
        found = found.join('')
        return found
      }
      
    } catch (e){
      console.log(e)
    }