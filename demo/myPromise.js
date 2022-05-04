"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MyPromise_successCallBack, _MyPromise_failCallBack;
Object.defineProperty(exports, "__esModule", { value: true });
var Status;
(function (Status) {
    Status["PENDING"] = "pending";
    Status["FULFILLED"] = "fulfilled";
    Status["REJECTED"] = "rejected";
})(Status || (Status = {}));
class MyPromise {
    constructor(executor) {
        // promise 状态
        this.static = Status.PENDING;
        _MyPromise_successCallBack.set(this, []);
        _MyPromise_failCallBack.set(this, []);
        this.resolve = value => {
            if (this.static !== Status.PENDING)
                return;
            this.static = Status.FULFILLED;
            this.value = value;
            while (__classPrivateFieldGet(this, _MyPromise_successCallBack, "f")?.length) {
                const data = __classPrivateFieldGet(this, _MyPromise_successCallBack, "f").shift()(value);
                resolvePromise(this.thenPromise, data, this.resolve, this.reject);
            }
        };
        this.reject = reason => {
            if (this.static !== Status.PENDING)
                return;
            this.static = Status.REJECTED;
            this.reason = reason;
            while (__classPrivateFieldGet(this, _MyPromise_failCallBack, "f")?.length)
                __classPrivateFieldGet(this, _MyPromise_failCallBack, "f").shift()(reason);
        };
        try {
            executor(this.resolve, this.reject);
        }
        catch (e) {
            this.reject(e);
        }
    }
    then(successCallBack, failCallBack) {
        this.thenPromise = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                if (this.static === Status.FULFILLED) {
                    try {
                        const value = successCallBack(this.value);
                        resolvePromise(this.thenPromise, value, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }
                else if (this.static === Status.REJECTED) {
                    failCallBack(this.reason);
                }
                else {
                    __classPrivateFieldGet(this, _MyPromise_successCallBack, "f").push(successCallBack);
                    __classPrivateFieldGet(this, _MyPromise_failCallBack, "f").push(failCallBack);
                }
            });
        });
        return this.thenPromise;
    }
}
_MyPromise_successCallBack = new WeakMap(), _MyPromise_failCallBack = new WeakMap();
function resolvePromise(promise, params, resolve, reject) {
    if (promise === params) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
    if (params instanceof MyPromise) {
        params.then(resolve, reject);
    }
    else {
        resolve(params);
    }
}
exports.default = MyPromise;
