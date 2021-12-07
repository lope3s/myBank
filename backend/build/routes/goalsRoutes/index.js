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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.goalRoute = void 0;
var express_1 = __importDefault(require("express"));
var db_1 = require("../../db");
var mongodb_1 = require("mongodb");
var db = db_1.client.db();
exports.goalRoute = express_1.default.Router();
exports.goalRoute.post('/goalRegister', function (req, res, next) {
    var necessaryFields = ['value', 'dueDate', 'name', 'userId'];
    var cancelLoop = false;
    necessaryFields.forEach(function (value) {
        if (!Object.keys(req.body).includes(value)) {
            cancelLoop = true;
        }
    });
    if (cancelLoop)
        return res.status(400).send({ message: "Campos faltando" }).end();
    next();
}, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, value, dueDate, name_1, userId, user, goalDate, goal, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, value = _a.value, dueDate = _a.dueDate, name_1 = _a.name, userId = _a.userId;
                return [4 /*yield*/, db.collection('users').findOne({ userId: new mongodb_1.ObjectId(userId) })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).send({ message: 'Usuário não encontrado' }).end()];
                }
                goalDate = new Date();
                goalDate.setMonth(goalDate.getMonth() + parseFloat(dueDate));
                goal = {
                    goalId: user.goals.length,
                    finalValue: parseFloat(value),
                    dueDate: goalDate,
                    name: name_1,
                    totalValue: 0,
                    creationDate: new Date(),
                    lastDeposit: new Date()
                };
                return [4 /*yield*/, db.collection('users').updateOne({ userId: new mongodb_1.ObjectId(userId) }, { $set: { goals: __spreadArray(__spreadArray([], user.goals, true), [goal], false) } })];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(201).send({ message: 'Meta adicionada' }).end()];
            case 3:
                err_1 = _b.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(400).send({ message: 'invalid fields' }).end()];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.goalRoute.put('/goalUpdate/:userId/:goalId', function (req, res, next) {
    var possibleFields = ['name', 'finalValue', 'dueDate'];
    var cancelLoop = false;
    Object.keys(req.body).forEach(function (value) {
        if (!possibleFields.includes(value)) {
            cancelLoop = true;
        }
    });
    if (cancelLoop || Object.keys(req.body).length === 0)
        return res.status(400).send({ message: "Campos despadronizados" }).end();
    next();
}, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, goalId_1, user, goal_1, goals, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.params, userId = _a.userId, goalId_1 = _a.goalId;
                return [4 /*yield*/, db.collection('users').findOne({ userId: new mongodb_1.ObjectId(userId) })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).send({ message: 'Usuário não encontrado' }).end()];
                }
                goal_1 = user.goals.filter(function (goal) { return goal.goalId === parseInt(goalId_1); })[0];
                if (!goal_1) {
                    return [2 /*return*/, res.status(400).send({ message: 'Meta não encontrada' }).end()];
                }
                Object.keys(req.body).forEach(function (value) {
                    if (value === 'dueDate') {
                        var goalDate = goal_1.dueDate;
                        goalDate.setMonth(goalDate.getMonth() + parseInt(req.body.dueDate));
                        req.body.dueDate = goalDate;
                    }
                    goal_1[value] = req.body[value];
                });
                goals = user.goals.filter(function (goal) { return goal.goalId !== parseInt(goalId_1); });
                goals.push(goal_1);
                return [4 /*yield*/, db.collection('users').updateOne({ userId: new mongodb_1.ObjectId(userId) }, { $set: { goals: goals } })];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).send({ message: 'Meta atualizada!' }).end()];
            case 3:
                err_2 = _b.sent();
                console.log(err_2);
                return [2 /*return*/, res.status(400).send({ message: 'invalid fields' }).end()];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.goalRoute.delete('/goalDelete/:userId/:goalId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, goalId_2, user, goals, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.params, userId = _a.userId, goalId_2 = _a.goalId;
                return [4 /*yield*/, db.collection('users').findOne({ userId: new mongodb_1.ObjectId(userId) })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).send({ message: 'Usuário não encontrado' }).end()];
                }
                return [4 /*yield*/, db.collection("transactions").deleteMany({ userId: new mongodb_1.ObjectId(userId), goalId: parseInt(goalId_2) })];
            case 2:
                _b.sent();
                goals = user.goals.filter(function (goal) { return goal.goalId !== parseInt(goalId_2); });
                return [4 /*yield*/, db.collection('users').updateOne({ userId: new mongodb_1.ObjectId(userId) }, { $set: { goals: goals } })];
            case 3:
                _b.sent();
                return [2 /*return*/, res.status(204).end()];
            case 4:
                err_3 = _b.sent();
                console.log(err_3);
                return [2 /*return*/, res.status(500).send({ message: 'something went wrong' }).end()];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.goalRoute.get('/goalsList/:userId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                return [4 /*yield*/, db.collection('users').findOne({ userId: new mongodb_1.ObjectId(userId) })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).send({ message: 'Usuário não encontrado' }).end()];
                }
                return [2 /*return*/, res.status(200).send({ goals: user.goals }).end()];
            case 2:
                err_4 = _a.sent();
                console.log(err_4);
                return [2 /*return*/, res.status(500).send({ message: 'something went wrong' }).end()];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.goalRoute.get('/goalsList/:userId/:goalId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, goalId_3, user, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.params, userId = _a.userId, goalId_3 = _a.goalId;
                return [4 /*yield*/, db.collection('users').findOne({ userId: new mongodb_1.ObjectId(userId) })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).send({ message: 'Usuário não encontrado' }).end()];
                }
                return [2 /*return*/, res.status(200).send({ goals: user.goals.find(function (value) { return value.goalId === parseInt(goalId_3); }) }).end()];
            case 2:
                err_5 = _b.sent();
                console.log(err_5);
                return [2 /*return*/, res.status(500).send({ message: 'something went wrong' }).end()];
            case 3: return [2 /*return*/];
        }
    });
}); });
