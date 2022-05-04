enum Status {
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected'
}

class MyPromise {
    // promise 状态
    private static = Status.PENDING
    private value: unknown
    private reason: unknown
    private thenPromise: MyPromise
    #successCallBack: Array<Function> = []
    #failCallBack: Array<Function> = []

    static resolve

    constructor (executor: Function) {
        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }

    resolve: Function = value => {
        if (this.static !== Status.PENDING) return

        this.static = Status.FULFILLED

        this.value = value

        while (this.#successCallBack?.length) this.#successCallBack.shift()()
        // {
        //     const data = this.#successCallBack.shift()(value)
        //     resolvePromise(this.thenPromise, data, this.resolve, this.reject)
        // }
    }

    reject: Function = reason => {
        if (this.static !== Status.PENDING) return

        this.static = Status.REJECTED
        this.reason = reason
        while (this.#failCallBack?.length) this.#failCallBack.shift()()
    }

    then (successCallBack?: Function, failCallBack?: Function) {
        successCallBack ? successCallBack : value => value
        failCallBack ? failCallBack : reason => { throw reason } 
        this.thenPromise = new MyPromise((resolve: Function, reject: Function) => {
            if (this.static === Status.FULFILLED) {
                setTimeout(() => {
                    try {
                        const value = successCallBack(this.value)
                        resolvePromise(this.thenPromise, value, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            } else if (this.static === Status.REJECTED) {
                setTimeout(() => {
                    try {
                        const value = failCallBack(this.reason)
                        resolvePromise(this.thenPromise, value, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            } else {
                this.#successCallBack.push(() => {
                    setTimeout(() => {
                        try {
                            const value = successCallBack(this.value)
                            resolvePromise(this.thenPromise, value, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
                this.#failCallBack.push(() => {
                    setTimeout(() => {
                        try {
                            const value = failCallBack!(this.reason)
                            resolvePromise(this.thenPromise, value, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
            }
        })
        return this.thenPromise
    }

    catch (failCallBack?: Function) {
        failCallBack ? failCallBack : reason => { throw reason }
    }

    static all (arr: Array<unknown | MyPromise>) {
        const result = []
        let index = 0
        return new MyPromise((resolve, reject) => {
            function addData(arr: [number, unknown]) {
                result[arr[0]] = arr[1]
                if (index === arr.length) {
                    resolve(result)
                }
            }
            for (let [index, item] of arr.entries()) {
                if (item instanceof MyPromise) {
                    item.then(value => addData([index, value]), reason => reject(reason))
                } else {
                    addData([index, item])
                }
            }
        })
    }
}

function resolvePromise(promise: MyPromise ,params:any, resolve: Function, reject: Function) {
    if (promise === params) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (params instanceof MyPromise) {
        params.then(resolve, reject)
    } else {
        resolve(params)
    }
}

export default MyPromise
