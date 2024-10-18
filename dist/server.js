"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const index_1 = require("./utils/index");
const PORT = '8000';
const server = http_1.default.createServer(function (req, res) {
    var _a;
    try {
        /* TODO
         *  Check all headers/http versions match what they should be and are set (clean it up)
         *  Check if their is anything else to check with the above ^
         *
         * */
        const { host, connection, version, upgrade } = req === null || req === void 0 ? void 0 : req.headers;
        const { httpVersion, method } = req;
        const key = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a['sec-websocket-key'];
        const correctHttpVersion = (0, index_1.checkHttpVersion)(httpVersion);
        const correctHttpMethod = (0, index_1.checkHttpMethod)(method || '');
        if (!correctHttpMethod ||
            !correctHttpVersion ||
            !host ||
            host !== `http://localhost:${PORT}` ||
            !upgrade ||
            upgrade !== 'websocket' ||
            !key ||
            key !== '13' ||
            !connection ||
            connection != 'upgrade' ||
            !version) {
            res.statusCode = 400;
            res.write('Bad request!');
        }
    }
    catch (error) {
        res.statusCode = 500;
        res.write(error);
    }
    res.end();
});
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
