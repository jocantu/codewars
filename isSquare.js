var isSquare = function(arr){
    console.log(arr)
    if (arr.length === 0) {
      return undefined
    }
    let test = true
    for (let i = 0;i<arr.length;i++) {
        test = (Number.isInteger(Math.sqrt(arr[i])))
        console.log(test)
      if (test === false) {
        return test
      }
    }
    return test
}