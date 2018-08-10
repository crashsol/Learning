const fs = require('fs')
function readFile(name)
{
    return Promise((resole,reject)=>{
        fs.readFile(name,(err,data)=>{
            if(err) reject(err)
            resole(data)
        })
    })    
}

readFile('./data/1.txt').then((data)=>{
    console.log(data.toString())
})