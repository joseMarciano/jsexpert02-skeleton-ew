const server = require('http').createServer((req, res) => {
    res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    });

    res.end('hey there!');
});

const socketIo = require('socket.io');
const io = socketIo(server, {
    cors: {
        origin: '*',
        credentials: false
    }
});

io.on('connection', socket => { //QUando tem uma nova conexão, eu tenho um novo socket;
    console.log('connection', socket.id);
    socket.on('join-room', (roomId, userId) => { /* Quando um usuário se conectar, ele vai precisar entrar em uma sala
                                                    Recebendo do front o evento 'join-room'
                                                  */

        //Adiciona os usuários na mesma sala
        socket.join(roomId);
        //Quando um usuário se conecta, lanço um evento para toda a sala dizendo que ele está conectado
        socket.to(roomId).broadcast.emit('user-connected', userId);

        //Quando o usuário for desconectado, notica a rede toda que o usuário se desconectou
        socket.on('disconnect', () => {
            console.log('Disconnected!!', roomId, userId);
            socket.to(roomId).broadcast.emit('user-disconnected', userId);
        });
    });
});

const startServer = () => {
    const { address, port } = server.address();
    console.info(`App is running at ${address}:${port}`);
};


server.listen(process.env.PORT || 3000, startServer);