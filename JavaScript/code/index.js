// 判定 对象 类型

const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target)
const isArray = isType('Array')

console.log(isArray([]))
// 实现 map数组方法
const selfMap = function (fn, context) {
    const arr = Array.prototype.slice.call(this) 
    const mapArr = []
    for (const index of arr.keys()) {
        if (!Object.prototype.hasOwnProperty.call(arr, index)) continue //处理稀疏数组
        mapArr.push(fn.call(context, arr[index], index, arr))
    }
    return mapArr
}
const newArr = selfMap.call([1,2,3, undefined], (value, index, arr) => console.log(value, index))

// 使用 reduce 实现 map 方法

const selfMapReduce = function(fn, context) {
    const arr = Array.prototype.slice.call(this)
    return Array.prototype.reduce.call(arr ,(pre, cur, index) => {
        return [ ...pre, fn.call(context, cur, index, this)]
    }, [])
}
selfMapReduce.call([1,2,3], (value, index, arr) => console.log(value, index))

// 实现 数组filter 方法

const selfFilter = function(fn, context) {
    const arr = Array.prototype.slice.call(this)
    const filter = []
    for (const [index, value] of arr.entries()) {
        if (!Object.prototype.hasOwnProperty.call(arr, index)) continue
        fn.call(context, value, index, arr) && filter.push(value)
    }
    console.log(filter)
    return filter
}
console.group()
console.groupCollapsed('ddd')
console.log(selfFilter.call([1,4,3], (value, index, arr) => value === 1))
console.groupEnd()
//5. 使用reduce 实现 filter

const selfFilterReduce = function(fn, context) {
    const arr = Array.prototype.slice.call(this)
    const filter = []
    return Array.prototype.reduce.call(arr, (pre, cur, index) => fn.call(context, cur, index, arr) ? [ ...pre, cur] : [  ...pre ], [])
}
console.log(selfFilterReduce.call([1, 4.5, 5, undefined], (item, index) => item > 1))
// 实现数组 some 方法
const selfSome = function (fn, context) {
    const arr = Array.prototype.slice.call(this)
    if (!arr.length) return false
    let flag = false
    for (const [index, value] of arr.entries()) {
        if (!Object.prototype.hasOwnProperty.call(arr, index)) continue
        const res = fn.call(context, value, index, this)
        if (res) {
            flag = true
            break
        }
    }
    return flag
}
console.log(selfSome.call([1, 1.2], (item, index) => item > 1 ))
// 实现 数组的 reduce 方法
const findRealElementIndex = function (arr, initIndex) {
    let index
    for (const i = initIndex || 0; i < arr.length; i++) {
        if (!Object.prototype.hasOwnProperty.call(arr, i)) continue
        index = i
        break
    }
    return index
}
const selfReduce = function(fn, initialValue) {
    const arr = Array.prototype.slice.call(this)
    let res
    if (initialValue === undefined) {
        res = arr[findRealElementIndex(arr)]
        for (let i = 0; i < arr.length - 1; i++) {
            if (!Object.prototype.hasOwnProperty.call(arr, i)) continue
            const realElementIndex = findRealElementIndex(arr, i + 1)
            res = fn.call(null, res, arr[realElementIndex], realElementIndex, this)
        }
        
    } else {
        res = initialValue
        for (const [index, value] of arr.entries()) {
            if (!Object.prototype.hasOwnProperty.call(arr, index)) continue
            res = fn.call(null, res, value, index, this)
        }
    }
    return res
}
console.log(selfReduce.call([1,2,3], (pre, cur, index) => pre + cur))
// 8.使用reduce 实现 数组flat方法
const selfFlat = function(depth = 1) {
    const arr = Array.prototype.slice.call(this)
    if (depth === 0) return arr
    return arr.reduce((pre, cur) => {
        if (Array.isArray(cur)) {
            return [ ...pre, ...selfFlat.call(cur, depth - 1)]
        } else {
            return [ ...pre, cur ]
        }
    }, [])
}
console.log(selfFlat.call([1, [1,3], Infinity], Infinity))
// 9. 实现 ES6的 class语法
function inherit(subType, superType) {
    subType.prototype = Object.create(superType.prototype, {
        constructor: {
            enumerable: false,
            configurable: true,
            writable: true,
            value: superType.constructor
        }
    })
    // 继承函数
    Object.setPrototypeOf(subType, superType)
}
// 10. 函数柯里化 Currying
function curry(fn) {
    if (fn.length <= 1) return fn
    const generator = (...args) => {
        if (fn.length === args.length) {
            return fn(...args)
        } else {
            return (...args2) => generator(...args, ...args2)
        }
    }
    return generator
}
const add = (a, b, c, d) => a + b + c + d
const curriedAdd = curry(add)
console.log(curriedAdd(5)(6)(7)(8))
console.log(curriedAdd(5, 6)(5, 6))
// 柯里化封装
function progressCurring(fn, args) {
    const _this = this
    const len = fn.length
    const args2 = args || []
    return function () {
        const _args = Array.prototype.slice.call(arguments)
        Array.prototype.push.apply(args, _args)
        if (_args.length < len) return progressCurring.call(_this, fn, _args)
        return fn.apply(this, _args)
    }
}
// 占位符 curry
const unitCurry = (fn, placeholder = '_') => {
    unitCurry.placeholder = placeholder
    if (fn.length <= 1) return fn
    const argsList = []
    const generator = (...args) => {
        let currentPlaceholderIndex = -1
        args.forEach(arg => {
            let placeholderIndex = argsList.findIndex(arg => arg === unitCurry.placeholder)
            if (placeholderIndex < 0) {
                currentPlaceholderIndex = argsList.push(arg) - 1
            } else if(placeholderIndex !== currentPlaceholderIndex) {
                argsList[placeholderIndex] = arg
            } else {
                argsList.push(arg)
            }
        })
        let realArgList = argsList.filter(arg => arg !== unitCurry.placeholder)
        if (realArgList.length === fn.length) {
            return fn(...argsList)
        } else if (realArgList.length > fn.length) {
            throw new Error('超出初始函数参数最大值')
        } else {
            return generator
        }
    }
    return generator
}
const unitCurry1 = (fn, placeholder = '_') => {

    if (fn.length <= 1) return fn
    const currentPlaceholderIndex = -1
    const argsList = []
    const generator = (...args) => {
        args.forEach(arg => {
            const placeholderIndex = argsList.findIndex(arg => arg === placeholder )
            if (placeholderIndex < 0) {
                currentPlaceholderIndex = argsList.push(arg) - 1
            } else if (placeholderIndex !== currentPlaceholderIndex) {
                argsList[placeholderIndex] = arg
            } else {
                argsList.push(arg)
            }
        })
    }
}
const unitAddCurry =  unitCurry((a, b, c, d) => a + b + c + d)
unitAddCurry(8, '_')('_', 1)(7)(8)

// 偏函数
const partialFunc = (fn, ...args) => {
    let placeholderNum = 0
    return (...args2) => {
        args2.forEach(arg => {
            const index = args.findIndex(item => item === '_')
            if (index < 0) return
            args[index] = arg
            placeholderNum ++
        })
        if (placeholderNum < args.length) {

        }
        return fn.apply(this, [...args, ...args2])
    }
}
const partialAdd = (add, '1', '2')

const data = () => { return what = () => {  } }
// compose 组合
const initials = function (name) {
    return name.split(' ').map
}

// 私有变量的实现
const proxy = function(obj) {
    return new Proxy(obj, {
        get(target, key) {
            if (key.startsWith('_')) throw new Error('private key')
            return Reflect.get(target, key)
        },
        ownKeys(target) {
            return Reflect.ownKeys(target).filter(key => !key.startsWith('_'))
        }
    })
}

class Person {
    constructor(name) {
        let __name = name
        this.getName = function () {
            return __name
        }
    }
}

const object = {

}
const symbol = Symbol('active')
Object.defineProperties(object, {
    'active': {
        get () {
            return this[symbol]
        },
        set (value) {
            return this[symbol] = value
        }
    },
    [symbol]: {
        enumerable: false,
        writable: true,
        configurable: false,
        value: 1
    }
})

const Person = (function() {
    let wp = new WeakMap()
    class Person {
        constructor (name) {
            wp.set(this, {name})
        }
        getName () {
            return wp.get(this).name
        }
    }
    return Person
})()
// Symbol的值 Symbol.for 可以生成相同的Symbol值
const s1 = Symbol.for('s11')
const s2 = Symbol.for('s11')
const s3 = Symbol('s11')
const s4 = Symbol('s11')
console.log(s1 === s2, s3 === s4)

// 防抖  在触发n秒 中只执行一次，触发后重新计算
function debounce(fn, wait) {
    let time = null
    return function()  {
        clearTimeout(time)
        time = globalThis.setTimeout(() => {
            fn.apply(this, arguments)
        }, wait ?? 500 )
    }
}
// 触发后立即执行
function debounceTwo(fn, wait) {
    let timeout = null
    return function () {
        clearTimeout(timeout)
        let callNow = !timeout
        timeout = globalThis.setTimeout(() => {
            timeout = null
        }, wait ?? 500)
        if (callNow) fn.apply(this, arguments)
    }
}
// 节流 每段时间内触发一次
// 时间戳版
function throttle(fn, wait) {
    let previous = 0
    return function () {
        const date = Date.now()
        if (date - previous >= wait) {
            fn.apply(this, arguments)
            previous = date
        }
    }
}
// 定时器版
function throttle(fn, wait) {
    let timeout = null
    return function () {
        if (!timeout) {
            globalThis.setTimeout(() => {
                fn.apply(this, arguments)
                timeout = null
            }, wait ?? 500)
        }
    }
}

// 菲波那契数列及其优化
const fibonacci1 = function (n) {
    if (n < 1) throw new Error('参数有误')
    if (n === 1 || n === 2) return 1
    return fibonacci1(n - 1) + fibonacci1(n - 2)
} 
const memory = function (fn) {
    let obj = {}
    return function (n) {
        if (!obj[n]) obj[n] = fn(n)
        return obj[n]
    }
}
console.time('未函数记忆')
fibonacci1(50)
console.timeEnd('未函数记忆')
console.time('函数记忆')
memory(fibonacci1)(50)
console.timeEnd('函数记忆')

// CO模块
function run (generatorFunc) {
    let it = generatorFunc()
    let result = it.next()
    return new Promise((resolve, reject) => {
        const next = function (result) {
            if (result.done) {
                resolve(result.value)
            }
            result.value = Promise.resolve(result.value)
            result.value
                .then(res => {
                    let result = it.next(res)
                    next(result)
                })
                .catch(err => {
                    reject(err)
                })
        }
        next(result)
    })
}