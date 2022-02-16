// Object.defineProperty



class Dep {
    constructor () {
        this.subs = []
    }
    addSub (sub) {
        // Watcher 实例
        this.subs.push(sub)
    }

    notify () {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}
// 配置 Watcher
Dep.target = null

function update (val) {
    // document.querySelector('div').innerText = val
    console.log(val)
}

class Watcher {
    constructor (obj, key, cb) {
        // 将 Dep.target 指向自己
        // 然后触发getter
        // Dep.target 置空
        Dep.target = this
        this.cb = cb
        this.obj = obj
        this.key = key
        this.value = this.obj[this.key]
        Dep.target = null
    }
    update () {
        // 获取新值
        this.value = this.obj[this.key]
        // 更新dom
        this.cb(this.value)
    }
}

function observe (obj) {
    // 判断类型
    if (!obj || typeof obj !== 'object') {
        return
    }

    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}

function defineReactive (obj, key, val) {
    // 递归子属性
    observe(val)
    let dep = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            console.log('get property')
            if (Dep.target) {
                dep.addSub(Dep.target)
            }
            return val
        },
        set: function reactiveSetter (newVal) {
            console.log('value change')
            val = newVal
            dep.notify()
        }
    })
}
var data = { name: 'cxk' }

observe(data)
new Watcher(data, 'name', update)

data.name = 'yyy'

// Proxy
const arrayProto = Array.prototype

const arrayMethods = Object.create(arrayProto)

// hack 这几个函数

const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]

// methodsToPatch.forEach (method => {
//     // 获取源生函数
//     const original = arrayProto[method]

//     def(arrayMethods, method, function mutator (...args) {
//         //调用原生函数
//         const result = original.apply(this, args)
//         const ob = this.__ob__
//         let inserted
//         switch (method) {
//             case 'push' :
//             case 'unshift' :
//                 inserted = args
//                 break
//             case 'splice' :
//                 inserted = args.slice(2)
//                 break
//         }
//         if (inserted) ob.observeArray(inserted)
//         // 触发更新
//         ob.dep.notify()
//         return result

//     })
// })

// Proxy 代理监听
let onWatch = (obj, setBind, getLogger) => {
    let handler = {
        get (target, key, receiver) {
            getLogger(target, key)
            return Reflect.get(target, key, receiver)
        },

        set (target, key, val, receiver) {
            setBind(val)
            return Reflect.set(target, key, val)
        }
    }
    return new Proxy(obj, handler)
}
let obj1 = { a: 1 }
let value
let p = onWatch(obj1, v => value = v, (target, key) => {
    console.log(target, key)
})
p.a = 2
p.a
console.log(value)

