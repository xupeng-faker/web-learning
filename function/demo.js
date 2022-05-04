/**
给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。


示例 1：

输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

示例 2：

输入：nums = [0]
输出：[[],[0]]


 */


function fn (arr) {
    let res = [[]]
    let map = {}
    if (!Array.isArray(arr)) {
        return []
    } else {
        let length = arr.length
        for (let i = 0; i < length; i++) {
            let item = res.map(value => {
                let current = value.concat([])
                current.push(arr[i])
                return current
            })
            res = res.concat(item)
        }

    }
    return res
}
let a = fn ([1,2,3, 4])
console.log(a, a.length);

let arr = [1,2,3, 4]
let length = arr.length
let res = [[]]


function parse (flag = 0) {
    let data = []
    for (let i = 0; i < res.length; i++) {
        data.push(res[i].concat([arr[flag]]))
    }
    res = [...res, ...data]
    flag++
    if (flag >= length) {
        return
    }
    return parse(flag)
}
parse()
console.log(res, res.length)
