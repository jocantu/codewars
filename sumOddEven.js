function oddOrEven(array) {
    let sum = 0
    console.log(array)
     const map1 = array.map(x => sum = sum + x);
    console.log(sum)
    if (sum%2 == 0) {
      return 'even'
    } else {
      return 'odd'
    }
  }