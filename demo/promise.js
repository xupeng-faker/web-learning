const { default: MyPromise } = require("./myPromise")




const promise = new MyPromise((resolve, reject ) => {
    setTimeout(() => {
        resolve(1)
    })
})
const promise2 = new MyPromise((resolve, reject ) => {
    reject(2)
})
promise
    .then((res) => {
        console.log(res)
        return 3
    })
    .then((res) => {
        console.log(res)
        throw 'new Error'
        return 3
    })
const p2 = promise
    .then((res) => {
        console.log(res)
        return p2
    })
p2
    .then(() => {}, err => console.log(err))
promise2
    .then((res) => {
        console.log(res)
    }, (err) => {
        console.log(err)
    })