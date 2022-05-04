/**
 * @function partial
 * @description partial function
 * 将 n元 函数 转换成 n - x元函数
 */

// bind 实现

const add = (a, b, c, d) => a + b + c + d

const addTwo = add.bind(null, 1, 2)

console.log(addTwo(3, 4))
// partial
const partial = (fn, ...args) => (...args2) => fn( ...args.concat(args2))

const partialAdd = partial(add, 4, 3)

console.log(partialAdd(4, 5))

// unitPartial 支持占位符

const getSum = (a, b, c, d) => a - b + c + d

const unitPartial = (fn, placeholder = '_', ...args) => {
    return (...args2) => {
        let length = args.length
        while (length--) {
            if (args[length] === placeholder) {
                args[length] = args2.shift()
            }
        }
        return fn(...args.concat(args2))
    }
}

console.log(unitPartial(getSum, undefined, 1, '_', 3)(2, 4))


