"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const crypto_1 = __importDefault(require("crypto"));
const PORT = '8000';
const MAGICKEY = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const SEVEN_BITS_INT_MARKER = 125;
const SIXTEEN_BITS_INT_MARKER = 126;
const SIXTY_FOUR_BITS_INT_MARKER = 127;
const server = (0, http_1.createServer)((req, res) => {
    res.writeHead(200);
    res.end('Hello');
}).listen(PORT, () => console.log(`Server listening on port ${PORT}`));
server.on('upgrade', onSocketUpgrade);
function onSocketUpgrade(req, socket, head) {
    try {
        const { 'sec-websocket-key': webClientSocketKey } = req.headers;
        console.log(`${webClientSocketKey} connected!`);
        const headers = prepareHandshakeHeaders(webClientSocketKey);
        socket.write(headers);
        socket.on('readable', () => onSocketReadable(socket));
    }
    catch (error) {
        console.error('Error onSocketUpgrade', error);
    }
}
function onSocketReadable(socket) {
    if (!socket || typeof socket.read !== 'function') {
        console.error('Socket is not readable');
        return;
    }
    const opcode = socket.read(1); // consume opcode
    if (!opcode) {
        console.error('No opcode found');
        return;
    }
    const [markerAndPayloadLength] = socket.read(1);
    console.log('markerAndPayloadLength', markerAndPayloadLength);
    const lengthIndicator = markerAndPayloadLength - 128;
    console.log('lengthIndicator', lengthIndicator);
    let messageLength = 0;
}
function prepareHandshakeHeaders(id) {
    const acceptKey = createSocketAccept(id);
    const headers = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        `Sec-WebSocket-Accept: ${acceptKey}`,
        ''
    ]
        .map((line) => line.concat('\r\n'))
        .join('');
    return headers;
}
function createSocketAccept(id) {
    const encryption = crypto_1.default.createHash('sha1');
    encryption.update(id + MAGICKEY);
    return encryption.digest('base64');
}
;
['uncaughtException', 'unhandledRejection'].forEach((e) => {
    process.on(e, (err) => {
        console.error(`Something went wrong: ${e}`, `message: ${err.stack || err}`);
    });
});
