
// const data = (g => (f => f(f))(self => g( (...args) => self(self).apply(this, args))))(self => n => n > 0 ? self(n - 1) + n : 0)(100)
// console.log(data)
/**
 * 
 * 
 G:\rp\onajqj\maahmq 631
E:\njfgjkcrh 641
C:\co\zk\ao\bxgxjfgrwckfxekeqro 629
D:\mf\si\jmfdahkeffyjjsf 646
E:\wn\arefkiz 633
C:\gpjleb\cinhhx\zjydgr\njfgjkcrh 640
E:\nwrrhx\qyw\bxgxjfgrwckfxekeqro 636
G:\usgsl\ywr\tve\cqekvaxypemktyurn 647
C:\jftbig\arefkiz 650
F:\rgk\cai\arefkiz 640
D:\tvse\vs\dhzrmy\njfgjkcrh 634
E:\coba\qbs\xagq\njfgjkcrh 628
F:\wnfsmf\oxrvbv\njfgjkcrh 632
C:\khqx\nv\jmfdahkeffyjjsf 637
F:\hm\ra\uaxckn\bxgxjfgrwckfxekeqro 647
D:\soq\jmfdahkeffyjjsf 642
F:\moxnw\szxcdhlaytgj 639
E:\avcop\jd\vwtrt\njfgjkcrh 650
E:\hou\vv\szxcdhlaytgj 631
C:\uozkwd\bxgxjfgrwckfxekeqro 650
F:\jmfdahkeffyjjsf 650
E:\hgoxms\nwax\szxcdhlaytgj 633
F:\vylww\zhh\cqekvaxypemktyurn 643
C:\njfgjkcrh 637
F:\bfn\dxwjje\jmfdahkeffyjjsf 632
E:\bxgxjfgrwckfxekeqro 634
G:\gwuusj\ized\qq\szxcdhlaytgj 646
F:\arefkiz 644
G:\zsw\uewu\arefkiz 634
E:\ja\zg\njfgjkcrh 644
D:\gfute\ju\wuy\szxcdhlaytgj 636
C:\mpgcx\kcgi\arefkiz 645
C:\zayn\jmfdahkeffyjjsf 648
F:\kkplu\avvw\hbzmwj\jmfdahkeffyjjsf 648
E:\maahmq 631
E:\hs\xnto\jmfdahkeffyjjsf 645
G:\cqekvaxypemktyurn 633
D:\maahmq 646
E:\jmfdahkeffyjjsf 636
G:\hbvm\szxcdhlaytgj 642
 */
let line = 'A aaAAbc dFgghh: iimM nNn oooos Sttuuuy (2012/8).'
// let obj = { }
//     for (let c of line) {
//         if (obj[c]) {
//             obj[c]++
//         } else {
//             obj[c] = 1
//         }
//     }
//     console
//     let array = Object.entries(obj).sort((a, b) => a[1] - b[1])
//     let flag = array[0][1]
//     for (var i = 0; i < array.length; i++) {
//         if (flag === array[i][1]) {
//             line = line.split(`${array[i][0]}`).join("")
//         }
//     }
// console.log(line)





var arr = []
    var str = []
    var k = 0
    for (var i = 0; i < 26; i++) {
        for (var j = 0; j < line.length; j++) {
            if ((line[j].charCodeAt() - 'a'.charCodeAt() == i) || (line[j].charCodeAt() - 'A'.charCodeAt() == i)) {
                arr.push(line[j]) 
            }
        }
      }
    for (var j = 0; j < line.length; j++) {
            if (line[j] >= 'a' && line[j] <= 'z' || line[j] >= 'A' && line[j] <= 'Z') {
                line[j] = arr[k++]
            }
        }
    
    console.log(line, arr)

const foo = { name: 'foo', age: 20, sex: 'male' }
const bar = Object.create(foo)

class Foo {
    name = 'foo'
    age = 20
    sex = 'male'
}


