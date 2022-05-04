const _ = require('lodash')
/**
 * @description curry 将多元函数转换成一元函数
 */
const curry = (fn) => {
    if (fn.length <= 1) return fn
    const generator = (...args) => {
        if (fn.length > args.length) return (...args2) => generator(...args.concat(args2))
        return fn(...args)
    }
    return generator
}

const add = (a, b, c, d) => a + b + c + d

const curryAdd = curry(add)

console.log(curryAdd(1)(2, 2)(7,8))

/**
 * @description unitCurry
 */
const unitCurry = (fn, placeholder = '_') => {
    if (fn.length < 1) return fn
    unitCurry.placeholder = placeholder
    const argList = []
    let currentPlaceholderIndex = -1
    const generator = (...args) => {
        args.forEach(item => {
            const placeholderIndex = argList.findIndex(arg => arg === unitCurry.placeholder)
            if (placeholderIndex < 0) {
                currentPlaceholderIndex = argList.push(item) - 1
            } else if (currentPlaceholderIndex !== placeholderIndex) {
                argList[placeholderIndex] = item
            } else {
                argList.push(item)
            }
        })
        const realArray = argList.filter(item => item !== unitCurry.placeholder)
        if (realArray.length === fn.length) {
            return fn(...realArray)
        }
        return generator
    }
    return generator
}



const addCurry = unitCurry(add)

console.log(addCurry('_')(1, '_')(3, 4)(1))