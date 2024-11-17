"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// TODO: import handlers
const websocketRoutes = (0, express_1.Router)();
websocketRoutes.get("/", (req, res) => {
    console.log("This is the websocket get route");
    res.send("This is the websocket get route");
});
exports.default = websocketRoutes;
