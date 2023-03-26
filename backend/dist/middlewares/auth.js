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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const user_model_1 = __importDefault(require("../models/user.model"));
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.replace("Bearer ", "");
            const jwtSecret = process.env.JWT_SECRET;
            const payload = (0, jsonwebtoken_1.verify)(token, jwtSecret);
            let User = yield user_model_1.default.findById({ _id: payload._id }).lean();
            if (!User)
                throw { message: "Session expired, Please Log In Again" };
            req.user = User;
            next();
        }
        else
            throw { message: "Session expired, Please Log In Again" };
    }
    catch (error) {
        error.message = ["jwt expired", "invalid signature"].includes(error === null || error === void 0 ? void 0 : error.message)
            ? "Session Expired, Please Log In Again"
            : error.message;
        res.status(401).json({ success: false, message: error.message });
    }
});
exports.isAuthenticated = isAuthenticated;
