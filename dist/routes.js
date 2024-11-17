"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const websocket_routes_1 = __importDefault(require("./websocket/websocket.routes"));
const routes = (0, express_1.Router)();
routes.use("/websocket", websocket_routes_1.default);
exports.default = routes;
