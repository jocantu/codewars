

function validateHello(greetings) {
    console.log(greetings)
    
    res =  /hello|ciao|salut|hallo|hola|ahoj|cZESC/i.test(greetings) 
    return res
  }