"use strict";

function flattenAndSort(array) {
  let newArr = []
  array.forEach(el => {
    el.forEach(i => {
      newArr.push(i)
  })
  })
  console.log(newArr.sort((a, b) => a - b))
  return newArr.sort((a, b) => a - b);
}