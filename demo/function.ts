/**
 * @description first class function
 */
const fn = function name(params: Function) {
    return params
}
/**
 * @description Callback function
 */
function callback(params: Function) {
    
}
/**
 * @description Higher-Order Function
 */
function higher(params: Function) {
    return params
}
/**
 * @function myFilter
 * @description filter
 */
const myFilter = function (fn: Function, context: Array<unknown>) {
    const array: Array<unknown> = Array.prototype.slice.call(this)
    const filterArray = []
    for (let key of array.keys()) {
        if (!Object.prototype.hasOwnProperty.call(array, key)) continue
        fn.call(context, array[key], key, this) && filterArray.push(array[key])
    }
    return filterArray
}
/**
 * @function myForEach
 * @description forEach
 */
const myForEach = function (fn: Function, context: Array<unknown>) {
    const array: Array<unknown> = Array.prototype.slice.call(this)
    for (let key of array.keys()) {
        if (!Object.prototype.hasOwnProperty.call(array, key)) continue
        fn.call(context, array[key], key, this)
    }
}
/**
 * @function mySome
 * @description some
 */
const mySome = function (fn: Function, context: Array<unknown>) {
    const array: Array<unknown> = Array.prototype.slice.call(this)
    let flag = false
    for (let key of array.keys()) {
        if (!Object.prototype.hasOwnProperty.call(array, key)) continue
        flag = fn.call(context, array[key], key, this)
        if (flag) break
    }
    return flag
}
/**
 * @function myEvery
 * @description every
 */
const myEvery = function (fn: Function, context: Array<unknown>) {
    const array: Array<unknown> = Array.prototype.slice.call(this)
    let flag = true
    for (let key of array.keys()) {
        if (!Object.prototype.hasOwnProperty.call(array, key)) continue
        flag = fn.call(context, array[key], key, this)
        if (!flag) break
    }
    return flag
}
/**
 * @function myFind
 * @description find
 */
const myFind = function (fn: Function, context: Array<unknown>) {
    const array: Array<unknown> = Array.prototype.slice.call(this)
    const random = Math.random().toString()
    let findValue: unknown = Symbol.for(random)
    for (let key of array.keys()) {
        if (!Object.prototype.hasOwnProperty.call(array, key)) continue
        findValue = fn.call(context, array[key], key, array) && array[key]
        if (findValue !== Symbol.for(random)) break
    }
    return findValue === Symbol.for(random) ? undefined : findValue
}
/**
 * @function myFindIndex
 * @description findIndex
 */
const myFindIndex = function (fn: Function, context: Array<unknown>) {
    const array: Array<unknown> = Array.prototype.slice.call(this)
    let findIndex
    for (let key of array.keys()) {
        if (!Object.prototype.hasOwnProperty.call(array, key)) continue
        findIndex = fn.call(context, array[key], key, array) && key
        if (typeof findIndex === 'number') break
    }
}
/**
 * @function myMap
 * @description map
 */
const myMap = function (fn: Function, context: Array<unknown>) {
    const array: Array<unknown> = Array.prototype.slice.call(this)
    const mapArray = []
    for (let key of array.keys()) {
        if (!Object.prototype.hasOwnProperty.call(array, key)) continue
        mapArray.push(fn.call(context, array[key], key, array))
    }
    return mapArray
}
/**
 * @function myReduce
 * @description reduce
 */
const myReduce = function (fn: Function, initialValue: unknown) {
    const array: Array<unknown> = Array.prototype.slice.call(this)
    let res
    if (typeof initialValue === 'undefined') {
        res = array[findRealIndex(array)]
        for (let i = 0; i < array.length - 1; i++) {
            if (!Object.prototype.hasOwnProperty.call(array, i)) continue
            let realElementIndex = findRealIndex(array, i+1)
            res = fn.call(null, res, array[realElementIndex], realElementIndex, this)
        }
    } else {
        res = initialValue
        for (let [key, value] of array.entries()) {
            if (!Object.prototype.hasOwnProperty.call(array, key)) continue
            res = fn.call(null, res, value, key, array)
        }
    }
    return res
}
/**
 * @function findRealIndex
 * @description 寻找非empty元素下标
 * @param arr
 * @param initIndex
 * @returns 真实元素下标
 */
const findRealIndex = function (arr: Array<unknown>, initIndex?: number): number {
    let index
    for (let key = initIndex || 0; key < arr.length; key++) {
        if (!Object.prototype.hasOwnProperty.call(arr, key)) continue
        index = key
        break
    }
    return index
}
/**
 * @function myReduceFilter
 * @description reduce 模拟 filter
 */
const myReduceFilter = function (fn: Function, context: Array<unknown>) {
    const array: Array<unknown> = Array.prototype.slice.call(this)
    const filter = []
    return Array.prototype.reduce.call(array, (pre, cur, index) => fn.call(context, cur, index, array) ? [ ...pre, cur ] : [...pre], [])
}
/** 
 * @function myReduceMap
 * @description reduce 模拟 map
*/
const myReduceMap = function (fn: Function, context: Array<unknown>) {
    const array: Array<unknown> = Array.prototype.slice.call(this)
    return Array.prototype.reduce.call(array, (pre, cur, index) => [...pre, fn.call(context, cur, index, this)], [])
}
/**
 * @function myReduceFlat
 * @description reduce 模拟 flat
 */
const myFlat = function (depth = 1) {
    const array: Array<unknown> = Array.prototype.slice.call(this)
    if (!depth || depth <= 0) return array
    return array.reduce((pre: Array<unknown>, cur) => {
        if (Array.isArray(cur)) {
            return [ ...pre, ...myFlat.call(cur, depth - 1) ]
        } else {
            return [ ...pre, cur ]
        }
    }, [])
}
/**
 * @function myReduceFlatMap
 * @description reduce 模拟 flatMap flat 一次
 */
const myReduceFlatMap = function (fn: Function, context: Array<unknown>) {
    const array: Array<unknown> = Array.prototype.slice.call(this)
    return array.reduce((pre: Array<unknown>, cur, index) => {
        const mapItem = fn.call(context, cur, index, this)
        if (Array.isArray(mapItem)) {
            return [ ...pre, ...mapItem]
        } else {
            return [ ...pre, mapItem ]
        }
    }, [])
}