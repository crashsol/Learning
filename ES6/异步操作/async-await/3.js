const fs = require('fs')

function readFile(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fs.readFile(name, (err, data) => {
                if (err) reject(err)
                resolve(data)
            })
        }, 2000);
       
    })
}

//顺序执行异步方法 async 
async function test() {
    console.time('begin...')
    let text1 = await readFile('./data/1.txt')
    let text2 = await readFile('./data/2.txt')
    let text3 = await readFile('./data/3.txt')
    console.log(text1.toString(),text2.toString(),text3.toString());
    console.timeEnd('begin...')
}

///并发执行异步方法
async function test2()
{    
    console.time('并发执行...')
    //解构赋值
    let [text1,text2,text3] = await Promise.all([readFile('./data/1.txt'),readFile('./data/2.txt'),readFile('./data/3.txt')])
    console.log(text1.toString(),text2.toString(),text3.toString());
    console.timeEnd('并发执行...')
}

test().then(() =>{

    test2();
})
