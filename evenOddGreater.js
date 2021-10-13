function evenOrOdd(str) {
    nums = str.split('').map(el => parseInt(el))
    let evenSum = 0
    let oddSum = 0
    nums.forEach(el => {
      if (el%2 === 0) {
        evenSum += el
      } else {
        oddSum += el
      }
    })
    if (evenSum > oddSum) { return "Even is greater than Odd"} 
    else if (oddSum > evenSum) {
      return 'Odd is greater than Even'
    } else {
      return 'Even and Odd are the same'
    }
  }