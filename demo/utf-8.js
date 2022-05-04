const fs = require('fs')
/**
 *
 * @param {string} value
 */
function transformUTF8 (value) {
  const binary = value.codePointAt(0).toString(2)
  let data = null
  if (binary.length <= 7) {
    data = [parseInt(binary.padStart(8, '0'), 2)]
  } else if (binary.length <= 11) {
    const value = binary.padStart(11, '0')
    const byte1 = parseInt(value.slice(0, 5).padStart(8, '110'), 2)
    const byte2 = parseInt(binary.padStart(11, '0').slice(5, 11).padStart(8, '10'), 2)
    data = [byte1, byte2]
  } else if (binary.length <= 16) {
    const value = binary.padStart(16, '0')
    const byte1 = parseInt(value.slice(0, 4).padStart(8, '1110'), 2)
    const byte2 = parseInt(value.slice(4, 10).padStart(8, '10'), 2)
    const byte3 = parseInt(value.slice(10, 16).padStart(8, '10'), 2)
    data = [byte1, byte2, byte3]
  } else if (binary.length <= 21) {

  }
  return data
}
console.log(transformUTF8('美'))

console.log(Buffer.from('美', 'utf8'))
const buf4 = Buffer.from(transformUTF8('美'))
const fd = fs.openSync('fs1.txt', 'a')// 没有文件创建文件
fs.writeSync(fd, buf4)
fs.closeSync(fd)
