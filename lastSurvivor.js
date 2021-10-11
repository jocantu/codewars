
str = 'abc'
nums = [1,1]

function lastSurvivor(letters, coords) {
    while (coords.length >= 1) {
      console.log(letters)
      console.log(coords[0])
      console.log(letters.charAt(coords[0]))
      letters = letters.slice(0, coords[0]) + letters.slice(coords[0] + 1);
      coords.shift()
    }
    return letters
  }

  lastSurvivor(str,nums)