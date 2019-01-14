#使用 ws，请求数据数据

```
const WebSocket = require("ws");
let ws = new WebSocket("ws://wapapp.dy4g.cn:8160/ws");

ws.on("open", function () {
    console.log("1");
    ws.send("81fe82s8w");
    console.log(2);
    ws.send(JSON.stringify({
        "action": 'bind',
        "data": 1
    }));
    setInterval(() => {
        console.log(new Date());
        ws.send(JSON.stringify({
            "action": "ping",
            "data": new Date().getTime()
        }));
    }, 3000);
})
ws.onerror = function (e) {
    console.log(e);
};
ws.onclose = function (e) {
    console.log(e);
}
ws.onmessage = function (e) {
    var msg = JSON.parse(e.data);
    var action = msg.action;
    var data = msg.data;
    console.log(msg.action);
};
```
