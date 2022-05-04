const _ = require('lodash')
const fp = require('lodash/fp')



/**
 * lodash的fp 模块提供了
 *  不可变 auto-curried iteratee-first data-last的方法
 */

console.log(_.map(['a', 'b', 'c'], _.toUpper))
// => [‘A', 'B', 'C']
console.log(_.map(['a', 'b', 'c']))
// fp module
console.log(fp.map(fp.toUpper, ['a', 'b', 'c']))

console.log(fp.map(fp.toUpper)(['a', 'b', 'c']))

