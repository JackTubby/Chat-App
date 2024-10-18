"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHttpMethod = exports.checkHttpVersion = void 0;
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
