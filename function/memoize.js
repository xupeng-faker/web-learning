/**
 * @function memoize
 * @description function memoize arrow function
 */
function memoize (fn, resolve) {
    const memoized = (...args) => {
        const cache = memoized.cache
        const key = resolve ? resolve.apply(this, args) : args[0]
        if (cache.has(key)) {
            return cache.get(key)
        }

        const value = fn.apply(this, args)
        cache.set(key, value)
        return value
    }
    memoized.cache = new Map()

    return memoized
}

function getArea(r) {
    console.log(r, '111111')
    return Math.pow(r, 2) * Math.PI
}
const getCircleArea = memoize(getArea)

console.log(getCircleArea(2))
console.log(getCircleArea(2))


let count = 0
/**
 * @description 斐波那契数列
 */
let fibonacci = (n) => {
    count++
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)
}
//console.log(fibonacci(10), count)

fibonacci = memoize(fibonacci)

for (let i = 0; i <= 10; i++) {
    fibonacci(i)
}


console.log(count)