function reverseWords(str) {
  let words = str.split(" ");
  words = words.map((word) => {
    word = word.split("");
    word = word.reverse();
    word = word.join("");
    return word;
  });
  return words.join(" ");
}
