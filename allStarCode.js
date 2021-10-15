function strCount(str, letter){ 
    const regex =  new RegExp(letter,'g')
    let count = str.match(regex).length
    console.log(count)
    if (count === null) {return 0} else {
       return str.match(regex).length
    }
  }