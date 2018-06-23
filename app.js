'use strict';

var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
}

app.on('error', function (error) {
    console.log("Custom Error:" + error);
})

io.on('connection', function (socket) {

    socket.on('parrot-event', function(data) {
        console.log("parrot says: " + JSON.stringify(data));

        //socket.broadcast.emit('parrot-event', { data });   // broadcast to all except sender
        io.sockets.emit('parrot-event', { data }); // broadcast to all including sender
    });

    socket.on('server-event', function(data) {
        console.log("server says: " + JSON.stringify(data));
        
        // broadcast 
        //socket.broadcast.emit('server-event', { data });   // broadcast to all except sender
        io.sockets.emit('server-event', { data }); // broadcast to all including sender
    });

    console.log('connection established');
});

app.listen(8090);

function Event(name, fields) {
    this.name = name;
    this.fields = fields;
}
