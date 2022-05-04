const promise = new Promise((resolve, reject) => {
    reject(1)
})

promise.then(res => {
    console.log(res)
}, res => Promise.reject(1))
    .then()
    .catch()
    .catch(res => console.log(res))