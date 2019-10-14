let app = require('express')();
// let server = require('http').Server(app);
let WebSocket = require('ws');

let wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', connection = (ws) => {
    console.log('server: receive connection.');

    ws.on('message', incoming = (message) => {
        console.log('server: received: %s', message);

        if (message === 'yahaha') {
            ws.send('get yahaha');
        }

        // if (typeof message === 'object') {
        //     console.log(JSON.stringify(message));
        // }else{
        //     console.log(typeof message);
        // }
        console.log(JSON.stringify(message));


    });

    ws.send('world');
});

app.get('/', (req, res) => {
    console.log("app.get");
    res.sendfile(__dirname + '/client.html');
});

app.listen(3000);

console.log("server start!");
