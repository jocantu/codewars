function toFreud(string) {
    if (string === '' || !string) {
      return ''
    } else {
      console.log(string)
      string = string.split(' ')
      for (let i=0;i<string.length;i++){
        string[i] = 'sex'
      }
      return string.join(' ')
    }
   }