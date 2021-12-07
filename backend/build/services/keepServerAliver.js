"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var https_1 = __importDefault(require("https"));
var keepServerAlive = function (url) {
    https_1.default.get(url);
    return;
};
exports.default = keepServerAlive;
