"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var passwordHash = function (pass) {
    if (pass) {
        return (0, crypto_1.createHmac)('sha256', process.env.HASH_DATA)
            .update(pass)
            .digest('hex');
    }
    return '';
};
exports.default = passwordHash;
