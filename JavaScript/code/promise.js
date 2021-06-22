
async function fn() {
    console.log('1')

    await new Promise(resolve => resolve())
    console.log('2')
}

new Promise(resolve => (console.log('3'), resolve()))
    .then(() => (
        console.log('4'), new Promise(resolve => resolve())
    ))
    .then(() => console.log('5'))
setTimeout(() => {
    console.log('6')
    Promise.resolve()
        .then(() => {
            console.log('7')
        })
})
fn()
new Promise(resolve => (console.log('8'), resolve()))
    .then(() => (
        console.log('9'), new Promise(resolve => resolve())
    ))
    .then(() => console.log('10'))

// 3 1 8 4 2 9 5 10 6 7