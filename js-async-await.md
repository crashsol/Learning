# async await 学习记录
--- 
 - 用 async 标记的 function 默认返回必须是一个promise对象
 - 注意await 关键字只能放到async 函数里面
 - 可以使用Promise.all([action1,action2]) 并发执行多个异步操作
```
let [result1,result2,result3] = await Promise.all([action1,action2,action3])
```
 - await 和 async 并不会阻塞程序
```
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

```
 - https://www.cnblogs.com/SamWeb/p/8417940.html
 