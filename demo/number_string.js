
const array = []
for (let i = 0; i < 26; i++) {
    array.push(String.fromCharCode('A'.charCodeAt(0) + i))
}



function convertStringToNumber(string, x) {
    if (arguments.length < 0) x = 10
    let chars = string.split('')
    let number = 0
    let fraction = 0
    while (i < chars.length && chars[i] != '.') {
        number = number * x
        if (array.includes(i.toUpperCase())) {
            number += 1
        } else  {
            number += chars[i].codePointAt(0) - '0'.codePointAt('0')
        }
    }
    // if ()
    for (let i =0; i < chars.length; i++) {
        
        
        
    }
    return number
}