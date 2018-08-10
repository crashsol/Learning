
async function timeout() {
    return 'hello world'
}

//timeout();
console.log(timeout())
console.log('虽然在后面，但是我在前面执行')

timeout().then(result =>{
    console.log(result);
})

console.log('这样调用依然不会被阻止，因为timeout中没有使用await')


