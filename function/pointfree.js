const fp = require('lodash/fp')
const { compose } = require('./compose')
/**
 * @description pointfree
 * TODO:
 * 1. 不使用所要处理的值
 * 2.只合成运算过程
 * 3. 需要定义一些辅助函数
 */
// 非pointfree 模式
function f (word) {
    return word.toLowerCase().replace(/\s/g, '_')
}

// pointfree 模式 首字母提取并转化成大写
const firstLetterToUpper = compose( fp.join('. '), fp.map(compose(fp.toUpper ,fp.first)), fp.split(' '))

console.log(firstLetterToUpper('world wind web'))