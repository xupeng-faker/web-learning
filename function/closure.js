/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */


/**
 * @function once
 *@description closure apply
 */
const once = function(fn) {
  let done = false
  return function () {
    if (!done) {
      done = true
      fn.apply(null, arguments)
    }
  }
}
const pay = once(function (money) {
  console.log(money)
})
pay(5)
pay(5)
/**
 * @function makePower
 * @description Math.power sealing
 * @param {number} power
 * @returns {number}
 */
const makePower = power => number => Math.pow(number, power)
const power2 = makePower(2)
power2(5)


function f1 () {
  let n = 1
  add = function () {
    n++
    console.log(n)
  }
  let empty = function () {

  }
  return empty
}

f1()

add() // n = 2