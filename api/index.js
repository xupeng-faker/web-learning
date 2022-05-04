const fs = require('fs');
const axios = require('axios')

function api1 () {
    return axios.get('http://192.168.13.45:8879/v2/api-docs')
}

function api2 () {
    return axios.get('http://192.168.13.45:8086/v2/api-docs')
}

axios.all([api1(), api2()])
    .then(axios.spread(function (...args) {
        // 两个请求现在都执行完成
        args.forEach(res => {
            let path = res.data.paths
            let map = {}
            Object.keys(path).forEach(item => {
                let name = null
                let cur = item.split('/')
                if (item.includes('{id}')) {
                    if (cur.includes('info')) {
                        name = 'infoId'
                    } else if (item.includes('delete') && cur[cur.length - 1].includes('{id}')) {
                        name = 'deleteId'
                    } else {
                        let char = cur[cur.length - 1]
                        let value = char[0].toUpperCase() + char.slice(1)
                        name = `delete${value}Id`
                    }
                } else {
                    name = item.split('/')[item.split('/').length - 1]
                }
                let message = path[item]
                if (message.post) {
                    if (map[message.post.tags[0]]) {
                        map[message.post.tags[0]].push({
                            url: item,
                            method: 'post',
                            comment: message.post.summary + '=>' + message.post.tags[0],
                            name
                        })
                    } else {
                        map[message.post.tags[0]] = [{
                            url: item,
                            method: 'post',
                            title: message.post.tags[0],
                            comment: message.post.summary + '=>' + message.post.tags[0],
                            name
                        }]
                    }
                } else if (message.get) {
                    if (item.includes('{id}')) {
                        item = item.replace('{id}', '${id}')
                    }
                    if (map[message.get.tags[0]]) {
                        map[message.get.tags[0]].push({
                            url: item,
                            method: 'get',
                            title: message.get.tags[0],
                            comment: message.get.summary + '=>' + message.get.tags[0],
                            name
                        })
                    } else {
                        map[message.get.tags[0]] = [{
                            url: item,
                            method: 'get',
                            title: message.get.tags[0],
                            comment: message.get.summary + '=>' + message.get.tags[0],
                            name
                        }]
                    }
                }
            })

            Object.keys(map).forEach(item => {
                let value = map[item]
                let title = '//' + map[item][0].title + '\r\n'

                let api = value.map(cur => {
                    let par = ''
                    if (cur.url.includes('{id}')) {
                        par = 'id'
                    } else if (cur.method == 'post') {
                        par = 'data'
                    }
                    let value = `//${cur.comment}\r\nexport const ${cur.name} = (${par}) => request({ url: \u0060${cur.url}\u0060, method: '${cur.method}'${ par === 'data' ? ', data: data'  : '' }})\r\n\r\n`
                    return value
                })
                let template = `import request from '@/utils/request'\r\n${title}${api.join('')}`
                fs.writeFile(`./apis/${item}.js`, template, { flag: 'a', encoding: 'utf8'}, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log(1)
                })
            })
        })
    }))