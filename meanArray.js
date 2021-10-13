function getAverage(marks){
    let sum = 0
    marks.forEach(el => sum += el)
    return parseInt(sum/marks.length)
  }