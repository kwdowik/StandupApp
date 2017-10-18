'use strict';

module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('a user connected:\n Socket client: ' + socket.client[0] + ' \n Socket id: ' + socket.id);
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
        socket.on('chat message', function (msg) {
            console.log('chat message: ' + msg);
            io.emit('chat message', msg);
        });
    });
};
//# sourceMappingURL=socket.io.service.js.map