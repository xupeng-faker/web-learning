/**
 * @description lazy function
 */
// 返回首次调用Date 对象
// 闭包模式
const closure = (function () {
    let date
    return () => {
        if (date) return date
        date = new Date
        return date
    }
})()
// lazy模式
let foo = function () {
    const date = new Date
    foo = function () {
        return date
    }
    return foo
}
// DOM事件添加 兼容现代浏览器和IE浏览器 判断浏览器类型
// simple model
function addEventSimple (type, el, fn) {
    if (window.addEventListener) {
        el.addEventListener(type, fn)
    } else {
        el.attachEvent('on' + type, fn)
    }
}
function addEvent (type, el, fn) {
    if (window.addEventListener) {
        addEvent = function (type, el, fn) {
            el.addEventListener(type, fn)
        }
    } else {
        addEvent = function (type, el, fn) {
            el.attachEvent(`on${type}`, fn)
        }
    }
}
// IIFE model
const addEvent = (function () {
    if (window.addEventListener) {
        return function (type, el, fn) {
            el.addEventListener(type, fn)
        }
    } else {
        return function (type, el, fn) {
            el.attachEvent('on' + type, fn)
        }
    }
})()