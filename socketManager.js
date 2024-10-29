var socketIo = require('socket.io')
var fs = require('fs');
let io;

var connectedSocket = {}

function initSocket(server) {
    io = socketIo(server, { cors: { origin: 'http://localhost:3001', methods: ['GET', 'POST']}})
    io.on('connection', socket => {
        console.log('connected');
        connectedSocket[socket.id] = socket;
        socket.on('login', data => {
            console.log(data.username);
            connectedSocket[data.username] = socket
        })
        socket.on('message', (message, roomName, user) => {
            console.log(message);
          if (roomName) {
            io.to(roomName).emit('message', message);
          } else {
            socket.broadcast.emit('message', message)
          }

          if (message === 'private') {
            console.log(2, message);
            connectedSocket['test1234'].emit('private', {data: 'private data'})
          }
        })
        socket.on('uploadFile', (file) => {
            fs.writeFile(__dirname + '/public/images/' + file.name, file.originFileObj, (err) => {
                if (err) throw err;
                const encoded = file.originFileObj.toString('base64')
    
                // Emit a message to all connected clients
                io.emit('fileUploaded', { data: encoded});
            });
        })
        socket.on('disconnect', () => console.log('Disconnected'))
        socket.on('joinRoom', (roomName) => {
          socket.join(roomName)
        })
    })
}

function emitToAllClients(event, data) {
    if (io) {
        io.sockets.emit(event, data);
    } else {
        console.error('Socket.io is not initialized.');
    }
}

module.exports = {
    initSocket,
    emitToAllClients,
}
// var sockets = {};

// let io;

// sockets.init = function (server) {
//     // socket.io setup
//     io = require('socket.io')(server, { cors: { origin: 'http://localhost:3001', methods: ['GET', 'POST']}});
//     console.log(124);
//     io.on('connection', function (socket) {
//         console.log('socket connected', socket.id);
//         // other logic
//     });

// }

// module.exports = sockets;