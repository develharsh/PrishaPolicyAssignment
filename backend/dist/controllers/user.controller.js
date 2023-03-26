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
exports.session = exports.login = exports.signup = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = { success: true };
    let emailValidate = new RegExp(/^\S+@\S+\.\S+$/);
    try {
        let body = req.body;
        if (!body.name)
            throw { implicit: true, code: 400, message: "Name is missing" };
        if (!body.email || !emailValidate.test(body.email))
            throw { implicit: true, code: 400, message: "Email is invalid" };
        if (!body.password)
            throw { implicit: true, code: 400, message: "Password is missing" };
        let emailExists = yield user_model_1.default.findOne({ email: body.email });
        if (emailExists)
            throw { code: 500, message: "Email already registered" };
        const rounds = 12;
        body.password = yield (0, bcrypt_1.hash)(body.password, rounds);
        const User = yield user_model_1.default.create(body);
        const jwtSecret = process.env.JWT_SECRET;
        const token = (0, jsonwebtoken_1.sign)({ _id: User._id }, jwtSecret, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        delete User.password;
        response.data = User;
        response.message = "Registered Successfully";
        response.token = token;
        res.status(201).json(response);
    }
    catch (error) {
        console.log(error);
        response = { success: false };
        error.code = error.implicit ? error.code : 500;
        response.message =
            error.implicit || error.message ? error.message : "Something went wrong";
        if (error.detail)
            response.detail = error.detail;
        res.status(error.code).json(response);
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = { success: true };
    try {
        let body = req.body;
        if (!body.email)
            throw { implicit: true, code: 400, message: "Email is missing" };
        if (!body.password)
            throw { implicit: true, code: 400, message: "Password is missing" };
        let User = yield user_model_1.default.findOne({ email: body.email }).lean();
        if (!User)
            throw { code: 500, message: "No such user found" };
        const matchedPassword = yield (0, bcrypt_1.compare)(body.password, User.password);
        if (!matchedPassword)
            throw { code: 500, message: "No such user found" };
        const jwtSecret = process.env.JWT_SECRET;
        const token = (0, jsonwebtoken_1.sign)({ _id: User._id }, jwtSecret, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        delete User.password;
        response.data = User;
        response.message = "Logged In Successfully";
        response.token = token;
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        response = { success: false };
        error.code = error.implicit ? error.code : 500;
        response.message =
            error.implicit || error.message ? error.message : "Something went wrong";
        if (error.detail)
            response.detail = error.detail;
        res.status(error.code).json(response);
    }
});
exports.login = login;
const session = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = { success: true };
    try {
        const User = req.user;
        User === null || User === void 0 ? true : delete User.password;
        res.status(200).json({ success: true, data: User });
    }
    catch (error) {
        console.log(error);
        response = { success: false };
        error.code = error.implicit ? error.code : 500;
        response.message =
            error.implicit || error.message ? error.message : "Something went wrong";
        if (error.detail)
            response.detail = error.detail;
        res.status(error.code).json(response);
    }
});
exports.session = session;
// export const signup = async (req: Request, res: Response): Promise<any> => {
//   let response: ResponseJSON = { success: true };
//   try {
//     res.status(200).json({ success: true, data: "yes" });
//   } catch (error: any) {
//     console.log(error);
//     response = { success: false };
//     error.code = error.implicit ? error.code : 500;
//     response.message =
//       error.implicit || error.message ? error.message : "Something went wrong";
//     if (error.detail) response.detail = error.detail;
//     res.status(error.code).json(response);
//   }
// };
