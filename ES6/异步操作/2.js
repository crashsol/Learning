async function timeout(flag)
{
    let result =''
    if(flag)
    {
        return 'ok'
    }
    else
    {
        throw 'exception find'
    }
}

console.log(timeout(true))
console.log(timeout(false))
//使用promise对象的catch方法来捕获异常
timeout(false).catch(err =>{
    console.log(err)
})