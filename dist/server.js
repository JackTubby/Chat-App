"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const index_1 = require("./utils/index");
const PORT = '8000';
const server = http_1.default.createServer(function (req, res) {
    var _a, _b, _c, _d;
    try {
        /* TODO
         *  Check all headers/http versions match what they should be and are set (clean it up)
         *  Check if their is anything else to check with the above ^
         *
         * */
        if (!req.method || req.method !== 'GET') {
            throw new Error('Not correct HTTP method');
        }
        const httpVersion = req.httpVersion;
        const correctHttpVersion = (0, index_1.checkHttpVersion)(httpVersion);
        const correctHttpMethod = true;
        const host = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.host;
        const connection = (_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.connection;
        const key = (_c = req === null || req === void 0 ? void 0 : req.headers) === null || _c === void 0 ? void 0 : _c['sec-websocket-key'];
        const version = (_d = req === null || req === void 0 ? void 0 : req.headers) === null || _d === void 0 ? void 0 : _d.version;
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
