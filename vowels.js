function getCount(str) {
  var vowelsCount = 0;
  var regex = /[aeiou]/ig;
  var found = str.match(regex);
  console.log(found);

  if (found == null){
    vowelsCount = 0;
  } else {
    vowelsCount = found.length;
  }

  // enter your majic here
