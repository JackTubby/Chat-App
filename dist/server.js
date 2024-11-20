"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = '8000';
const websocket_handle_1 = require("./websocket/websocket.handle");
const app = (0, express_1.default)();
// app.use(routes)
const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});
server.on('upgrade', websocket_handle_1.onSocketUpgrade);
