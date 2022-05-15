function filter_list(l) {
  let newArray = [];

  l.forEach((element) => {
    if (Number.isInteger(element)) {
      newArray.push(element);
    }
  });
  return newArray;
}
