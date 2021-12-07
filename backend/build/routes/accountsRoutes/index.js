"use strict";
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
exports.accountRoute = void 0;
var express_1 = __importDefault(require("express"));
var db_1 = require("../../db");
var checkUserService_1 = __importDefault(require("../../services/checkUserService"));
var passwordHash_1 = __importDefault(require("../../services/passwordHash"));
var mongodb_1 = require("mongodb");
var mailerService_1 = require("../../services/mailerService");
var db = db_1.client.db();
exports.accountRoute = express_1.default.Router();
exports.accountRoute.post('/accountRegister', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email_1, password, userAlreadyExist, passHash, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, name_1 = _a.name, email_1 = _a.email, password = _a.password;
                return [4 /*yield*/, (0, checkUserService_1.default)("login", email_1)];
            case 1:
                userAlreadyExist = _b.sent();
                passHash = (0, passwordHash_1.default)(password);
                if (!passHash)
                    return [2 /*return*/, res.status(400).send({ message: 'Senha não pode ser vazia' }).end()];
                if (!!userAlreadyExist) return [3 /*break*/, 3];
                return [4 /*yield*/, db.collection("login").insertOne({
                        email: email_1,
                        password: passHash,
                        isValidated: false,
                        isLogged: false,
                        token: ''
                    }).then(function (resp) {
                        db.collection("users").insertOne({
                            userId: resp.insertedId,
                            name: name_1,
                            goals: []
                        });
                        var url = String(process.env.NODE_ENV) === 'production' ? "https://mybankk.vercel.app/" + resp.insertedId : "http://localhost:3000/" + resp.insertedId;
                        (0, mailerService_1.sendMail)(email_1, url);
                    })];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(201).send({ message: 'Usuários registrado!' }).end()];
            case 3: return [2 /*return*/, res.status(400).send({ message: 'E-mail já cadastrado' }).end()];
            case 4:
                err_1 = _b.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(404).send({ message: 'inválid fields' }).end()];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.accountRoute.delete('/accountDelete/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                id = req.params.id;
                return [4 /*yield*/, db.collection('login').deleteOne({ _id: new mongodb_1.ObjectId(id) })
                        .then(function (resp) {
                        if (!resp.deletedCount) {
                            return res.status(404).send({ message: 'User not found' }).end();
                        }
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, db.collection('users').deleteOne({ userId: new mongodb_1.ObjectId(id) })];
            case 2:
                _a.sent();
                return [4 /*yield*/, db.collection('transactions').deleteMany({ userId: new mongodb_1.ObjectId(id) })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(204).end()];
            case 4:
                err_2 = _a.sent();
                console.log(err_2);
                return [2 /*return*/, res.status(500).send({ message: 'internal error' }).end()];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.accountRoute.put('/accountUpdate/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, availableFields_1, bodyToArray, cancelLoop_1, index, hashPass, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 11, , 12]);
                id = req.params.id;
                availableFields_1 = ['name', 'email', 'password'];
                bodyToArray = Object.keys(req.body);
                cancelLoop_1 = false;
                bodyToArray.forEach(function (value) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (!availableFields_1.includes(value)) {
                            cancelLoop_1 = true;
                            return [2 /*return*/, res.status(400).send({ message: 'invalid fields' }).end()];
                        }
                        return [2 /*return*/];
                    });
                }); });
                if (!!cancelLoop_1) return [3 /*break*/, 10];
                index = 0;
                _a.label = 1;
            case 1:
                if (!(index < bodyToArray.length)) return [3 /*break*/, 9];
                if (!(bodyToArray[index] === 'name')) return [3 /*break*/, 3];
                return [4 /*yield*/, db.collection('users').updateOne({ userId: new mongodb_1.ObjectId(id) }, { $set: { name: req.body.name } })];
            case 2:
                _a.sent();
                return [3 /*break*/, 8];
            case 3:
                if (!(bodyToArray[index] === 'password')) return [3 /*break*/, 6];
                hashPass = (0, passwordHash_1.default)(req.body.password);
                if (!hashPass) return [3 /*break*/, 5];
                return [4 /*yield*/, db.collection('login').updateOne({ userId: new mongodb_1.ObjectId(id) }, { $set: { password: hashPass } })];
            case 4:
                _a.sent();
                return [3 /*break*/, 8];
            case 5:
                cancelLoop_1 = true;
                return [3 /*break*/, 9];
            case 6: return [4 /*yield*/, db.collection('login').updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { email: req.body.email } })];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                index++;
                return [3 /*break*/, 1];
            case 9:
                if (cancelLoop_1) {
                    return [2 /*return*/, res.status(400).send({ message: 'Senha não pode ficar em branco' }).end()];
                }
                return [2 /*return*/, res.status(200).send({ message: 'Campos atualizados!' }).end()];
            case 10: return [3 /*break*/, 12];
            case 11:
                err_3 = _a.sent();
                console.log(err_3);
                return [2 /*return*/, res.status(400).send({ message: 'invalid fields' }).end()];
            case 12: return [2 /*return*/];
        }
    });
}); });
exports.accountRoute.get('/accountActivate/:userId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                return [4 /*yield*/, db.collection('login').findOne({ _id: new mongodb_1.ObjectId(userId) })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).send({ message: 'Usuário não encontrado' }).end()];
                }
                return [4 /*yield*/, db.collection('login').updateOne({ _id: new mongodb_1.ObjectId(userId) }, { $set: { isValidated: true } })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send({ message: 'Conta ativada!' }).end()];
        }
    });
}); });
