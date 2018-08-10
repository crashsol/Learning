const fs = require('fs')

function readFile(name) {
    return new Promise((resolve, reject) => {
        fs.readFile(name, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

//Promise链式调用
readFile('./data/1.txt').then(text1=>{
    console.log(text1.toString())
    //继续调用读取2
    readFile('./data/2.txt').then(text2 =>{
        console.log(text2.toString())
        readFile('./data/3.txt').then(text3 =>{
            console.log(text3.toString())

            console.log(text1.toString(),text2.toString(),text3.toString())
        })
    })
})