function missingTerm(n, littleChouSum) {
    let sum = 0
    let i = 0
    while(sum <= littleChouSum){
      sum = sum + n + i
      i = i + 1
    }
    console.log(sum)
    return sum - littleChouSum
    }