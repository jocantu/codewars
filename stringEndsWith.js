function solution(str, ending) {
  if (ending.length == 0) {
    return true;
  }
  if (str.slice(-ending.length) == ending) {
    return true;
  } else {
    return false;
  }
}
