let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
]


const getChildren = (data, result, pid) => {
    for (const item of data) {
        if (item.pid === pid) {
            const newItem = { ...item, children: [] }
            result.push(newItem)
            getChildren(data, newItem.children, newItem.id)
        }
    }
}



const arrayToTree = (data, pid) => {
    const result = []
    getChildren(data, result, pid)
    return result
}

console.time('recursion')
console.dir(JSON.stringify(arrayToTree(arr, 0)))
console.timeEnd('recursion')



const arrayToTree1 = (data, pid) => {
    const mapData = {}
    const getChildren = (data, array, pid) => {
        for (const item of data) {
            const id = item.id
            if (!mapData[id]) {
                mapData[id] = {
                    ...item, children: []
                }
            }
            if (mapData[id].pid === pid) {
                const newItem = { ...item, children: [] }
                array.push(newItem)
                getChildren(data, newItem.children, item.id)
            }
        }
    }
    const result = []
    getChildren(data, result, pid)
    return result
}


console.time('recursion1')
console.log(JSON.stringify(arrayToTree1(arr, 0)))
console.timeEnd('recursion1')

const arrayToTree5 = (data, pid) => {
    const mapData = {}
    const getChildren = (data, array, pid) => {
        for (const item of data) {
            const id = item.id
            const currentPid = item.pid
            if (!mapData[id]) {
                mapData[id] = {
                    children: []
                }
            }
            
            if (currentPid === 0) {
                array.push(mapData[id])
            } else {
                if (pid) {

                }
                array.push
                getChildren(data, mapData[id].children, id)
            }
        }
    }
    const result = []
    getChildren(data, result, pid)
    return result
}

// console.time('recursion5')
// console.log(JSON.stringify(arrayToTree5(arr, 0)))
// console.timeEnd('recursion5')



const arrayToTree2 = (data) => {
    const map = {}
    const result = []
    for (const item of data) {
        map[item.id] = { ...item, children: [] }
    }

    for (const item of data) {
        const id = item.id
        const pid = item.pid
        const treeItem = map[id]
        if (pid === 0) {
            result.push(treeItem)
        } else {
            if (!map[pid]) {
                map[pid] = {
                    children: []
                }
            }
            map[pid].children.push(treeItem)
        }
    }
    return result
}



console.time('1')
console.log(JSON.stringify(arrayToTree2(arr)))
console.timeEnd('1')

const arrayToTree3 = (data) => {
    const map = {}
    const result = []
    for (const item of data) {
        const id = item.id
        const pid = item.pid
        if (!map[id]) {
            map[id] = {
                children: []
            }
        }
        map[id] = {
            ...item, children: map[id].children
        }

        const treeItem = map[id]

        if (pid === 0) {
            result.push(treeItem)
        } else {
            if (map[pid]) {
                map[pid].children.push(map[id])
            } else {
                map[pid] = {
                    children: []
                }
            }
        }
    }
    return result
}

console.time('2')
console.log(JSON.stringify(arrayToTree2(arr)))
console.timeEnd('2')