"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWebsocketResponseKey = exports.checkHttpMethod = exports.checkHttpVersion = void 0;
const crypto_1 = __importDefault(require("crypto"));
function checkHttpVersion(version) {
    try {
        if (!version)
            throw 'No data passed';
        const toNumber = Number(version);
        if (toNumber >= 1.1) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return error;
    }
}
exports.checkHttpVersion = checkHttpVersion;
function checkHttpMethod(method) {
    if (method !== 'GET') {
        return false;
    }
    return true;
}
exports.checkHttpMethod = checkHttpMethod;
function generateWebsocketResponseKey(key, string) {
    if (!key)
        return false;
    if (!string)
        return false;
    const hash = crypto_1.default.createHash('sha1');
    hash.update(key);
    hash.update(string);
    return hash.digest('base64');
}
exports.generateWebsocketResponseKey = generateWebsocketResponseKey;
