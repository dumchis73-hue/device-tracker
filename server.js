const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
    const ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;
    
    socket.on('device_info', (data) => {
        console.log('--- 실시간 접속 정보 ---');
        console.log(`IP: ${ip}`);
        console.log(`기기: ${data.model}`);
        console.log(`OS: ${data.os}`);
        console.log(`브라우저: ${data.browser}`);
        console.log('-----------------------');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
