//定义一个异步操作 两秒后返回值的两倍
function doubleNumAfter2seconds(num) {
    return new Promise((resolve, reject) => {
        if (Number.isInteger(num)) {        
            setTimeout(() => {
                resolve(2 * num)
            }, 2000);

        } else {
            reject('num is not interger')
        }

    })
}

async function testResult() {
    let result = await doubleNumAfter2seconds(20)
    console.log(result)
    console.log('在调用结果出来后才会执行')
}

testResult();

async function testResult2() {

    try {
        let num1 = await doubleNumAfter2seconds(10);
        let num2 = await doubleNumAfter2seconds(20);
        let num3 = await doubleNumAfter2seconds(33.1);
        console.log(num1 + num2 + num3)
    } catch (error) {
        console.log(error)
    }

}
testResult2()