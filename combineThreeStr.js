// Create a function that will return a string that combines all of the letters of the three inputed strings in groups. Taking the first letter of all of the inputs and grouping them next to each other. Do this for every letter, see example below!

// E.g. Input: "aa", "bb" , "cc" => Output: "abcabc"

// Note: You can expect all of the inputs to be the same length.

const str1 = "ab"
const str2 = "cd"
const str3 = "ef"

function combineTrheeStr(str1,str2,str3) {
    let combined = ''
    for (let i = 0; i< str1.length; i++) {
        combined += str1[i] + str2[i] + str3[i]
    }
    return combined
}

combineTrheeStr(str1,str2,str3)

console.log(combineTrheeStr('aa','bb','cc'),'abcabc')
console.log(combineTrheeStr('ab','cd','ef'),'acebdf')
console.log(combineTrheeStr('14','25','36'),'123456')