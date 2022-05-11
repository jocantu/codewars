// An isogram is a word that has no repeating letters, consecutive or non-consecutive. Implement a function that determines whether a string that contains only letters is an isogram. Assume the empty string is an isogram. Ignore letter case.

// "Dermatoglyphics" --> true
// "aba" --> false
// "moOse" --> false (ignore letter case)

function isIsogram(str) {
  str = str.toLowerCase();
  str.length == 0 ? true : false;

  for (let i = 0; i <= str.length; i++) {
    if (str.split(str[i]).length - 1 > 1) {
      return false;
    }
  }
  return true;
}
