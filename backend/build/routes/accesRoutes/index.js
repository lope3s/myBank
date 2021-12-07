"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessRoute = void 0;
var express_1 = __importDefault(require("express"));
var db_1 = require("../../db");
var uuid_1 = require("uuid");
var passwordHash_1 = __importDefault(require("../../services/passwordHash"));
var accountsRoutes_1 = require("../accountsRoutes");
var bson_1 = require("bson");
var db = db_1.client.db();
exports.accessRoute = express_1.default.Router();
exports.accessRoute.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, id, loggedUser, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, db.collection('login').aggregate([
                        {
                            $match: {
                                email: email,
                                password: (0, passwordHash_1.default)(password),
                            },
                        },
                    ]).toArray()];
            case 1:
                user = _b.sent();
                if (!(user.length > 0)) return [3 /*break*/, 4];
                if (!user[0].isValidated) {
                    return [2 /*return*/, res.status(400).send({ message: "Ative sua conta!" }).end()];
                }
                id = (0, uuid_1.v4)();
                return [4 /*yield*/, db.collection('login').updateOne({ _id: user[0]._id }, { $set: { token: id, isLogged: true } })];
            case 2:
                _b.sent();
                return [4 /*yield*/, db.collection('users').findOne({ userId: user[0]._id })];
            case 3:
                loggedUser = _b.sent();
                delete loggedUser._id;
                return [2 /*return*/, res.status(200).send(__assign({ token: id }, loggedUser)).end()];
            case 4: return [2 /*return*/, res.status(400).send({ message: 'Dados inválidos' }).end()];
            case 5:
                err_1 = _b.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(400).send({ message: 'invalid fields' }).end()];
            case 6: return [2 /*return*/];
        }
    });
}); });
accountsRoutes_1.accountRoute.post('/checkLogin', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, userData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = req.body.token;
                return [4 /*yield*/, db.collection('login').findOne({ token: token })];
            case 1:
                userData = _a.sent();
                if (!userData) {
                    return [2 /*return*/, res.status(400).send({ message: 'Sua sessão expirou' }).end()];
                }
                if (!userData.isLogged) {
                    return [2 /*return*/, res.status(403).send({ message: 'Faça login' }).end()];
                }
                return [2 /*return*/, res.status(200).end()];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(400).send({ message: 'invalid fields' }).end()];
            case 3: return [2 /*return*/];
        }
    });
}); });
accountsRoutes_1.accountRoute.get('/logout/:userId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                return [4 /*yield*/, db.collection('login').findOne({ _id: new bson_1.ObjectId(userId) })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).send({ message: 'user does not exist' }).end()];
                }
                return [4 /*yield*/, db.collection('login').updateOne({ _id: new bson_1.ObjectId(userId) }, { $set: { isLogged: false, token: (0, uuid_1.v4)() } })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(204).end()];
        }
    });
}); });
