function take(arr, n) {
    let res = []
    if (arr.length < n) { n = arr.length}
    for (let i=0;i<n;i++){
      res.push(arr[i])
    }
    return res
  }