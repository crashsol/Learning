const fs = require('fs')
function readFile(name) {
    return new Promise((resolve, reject) => {
        fs.readFile(name, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}
//定义异步方法 async 
async function test() {
    let text1 = await readFile('./data/1.txt')
    let text2 = await readFile('./data/2.txt')
    let text3 = await readFile('./data/3.txt')
    console.log(text1.toString(),text2.toString(),text3.toString());
}
//调用
test()
console.log('我依然执行在前面，async 和 await 不会阻塞')