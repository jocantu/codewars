function isNice(arr){
    console.log(arr)
    if (arr.length <= 1) {
      return false
    }
    let test = true
    for (let i = 0;i<arr.length;i++) {
        test = (arr.includes(arr[i]+1)||arr.includes(arr[i]-1))
        console.log(test)
      if (test === false) {
        return test
      }
    }
    return test
  }