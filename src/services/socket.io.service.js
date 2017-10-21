
module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log(`Socket client: ${socket.client[0]} \n Socket id: ${socket.id}`);
        socket.on('disconnect', function () {
            console.log(`user disconnected`);
        });
        socket.on('chat message', function (msg, userName) {
            console.log(`chat message, ${userName}: ${msg}`);
            io.emit('chat message', msg, userName);
        });
    });
};


