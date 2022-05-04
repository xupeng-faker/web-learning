
const _ = require('lodash')
const fp = require('lodash/fp')
/**
 * TODO: compose
 * @description compose simulate
 * @param Array[Function]  function list
 * 1.函数就像管道(pine)，函数组合就是把多个管道组合起来，让数据通过管道
 * 2.函数组合要满足结合律(associativity)
 */

const compose = (...fns) => value => fns.reverse().reduce((data, fn) => fn(data), value)


/**
 * @description tracer function
 */
const trace = _.curry((tag, v) => {
    console.log(`${tag}:${v}`)
    return v
})

const f = compose(_.toUpper, trace('first之后'), compose(_.first, _.reverse))

const arr = ['one', 'two', 'three', 'four', 'five', 'six']

console.log(f(arr))

/**
 * @description fp compose
 */

const fpCompose = compose(fp.join('-'), fp.map(fp.toLower), fp.split(' '))

console.log(fpCompose('NEVER SAY NO'))

exports.compose = compose

