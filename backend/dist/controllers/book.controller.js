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
exports.getFavourites = exports.addRating = exports.toggleFavourite = exports.getSpecific = exports.getAll = exports.add = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = __importDefault(require("../models/book.model"));
const favourite_model_1 = __importDefault(require("../models/favourite.model"));
const rating_model_1 = __importDefault(require("../models/rating.model"));
const functions_1 = require("../utils/functions");
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    let response = { success: true };
    try {
        let body = req.body;
        if (!body.title)
            throw { implicit: true, code: 400, message: "Title is missing" };
        if (!body.author)
            throw { implicit: true, code: 400, message: "Author is missing" };
        if (!body.description)
            throw { implicit: true, code: 400, message: "Description is missing" };
        body.pdfFile = (_c = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.pdfFile) === null || _b === void 0 ? void 0 : _b.at(0)) === null || _c === void 0 ? void 0 : _c.path;
        body.coverFile = (_f = (_e = (_d = req.files) === null || _d === void 0 ? void 0 : _d.coverFile) === null || _e === void 0 ? void 0 : _e.at(0)) === null || _f === void 0 ? void 0 : _f.path;
        body.addedBy = new mongoose_1.Types.ObjectId((_g = req.user) === null || _g === void 0 ? void 0 : _g._id);
        const Book = yield book_model_1.default.create(body);
        response.data = Book;
        response.message = "Added Successfully";
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
exports.add = add;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = { success: true };
    try {
        const Books = yield book_model_1.default.find().populate({
            path: "addedBy",
            select: "_id name email",
        });
        response.data = Books;
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
exports.getAll = getAll;
const getSpecific = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j, _k, _l;
    let response = { success: true };
    try {
        let bookId = req.params._id;
        if (!(0, mongoose_1.isValidObjectId)(bookId))
            throw { code: 400, message: "Invalid Book ID", implicit: true };
        bookId = new mongoose_1.Types.ObjectId(bookId);
        let userId = (_h = req.user) === null || _h === void 0 ? void 0 : _h._id;
        userId = new mongoose_1.Types.ObjectId(userId);
        const Book = yield book_model_1.default.findById(bookId)
            .populate({
            path: "addedBy",
            select: "_id name email",
        })
            .lean();
        if (!Book)
            throw { code: 500, message: "No such Book was found", implicit: true };
        response.data = Book;
        const Favourite = yield favourite_model_1.default.findOne({
            user: userId,
            book: bookId,
        });
        if (!Favourite)
            response.data.inFavourite = false;
        else
            response.data.inFavourite = true;
        let Rating = yield rating_model_1.default.aggregate((0, functions_1.getSpecificBookQuery)(bookId));
        let ratingLiteral = {
            avgRating: 0,
            reviewCount: 0,
            recommendation: 0,
            individualPerc: {
                5: 0,
                4: 0,
                3: 0,
                2: 0,
                1: 0,
            },
        };
        response.data.rating = JSON.parse(JSON.stringify(ratingLiteral));
        try {
            if (Rating.at(0).count.length > 0) {
                let data = Rating.at(0);
                response.data.rating.avgRating = (data.count.at(0).sumOfRating / ((_j = data.count.at(0)) === null || _j === void 0 ? void 0 : _j.count)).toFixed(2);
                response.data.rating.reviewCount = (_k = data.count.at(0)) === null || _k === void 0 ? void 0 : _k.count;
            }
            if (Rating.at(0).recommended.length > 0) {
                let data = Rating.at(0);
                response.data.rating.recommendation = ((((_l = data.recommended.at(0)) === null || _l === void 0 ? void 0 : _l.count) / data.count.at(0).count) *
                    100).toFixed(2);
            }
            if (Rating.at(0).individualCount.length > 0) {
                let data = Rating.at(0);
                data.individualCount.map((each) => {
                    response.data.rating.individualPerc[each._id.toString()] = parseInt(((each.count / data.count.at(0).count) * 100).toString());
                });
            }
        }
        catch (error) {
            console.log("Calc Error", error);
            response.data.rating = ratingLiteral;
        }
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
exports.getSpecific = getSpecific;
const toggleFavourite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _m;
    let response = { success: true };
    try {
        let bookId = req.params._id;
        if (!(0, mongoose_1.isValidObjectId)(bookId))
            throw { code: 400, message: "Invalid Book ID", implicit: true };
        bookId = new mongoose_1.Types.ObjectId(bookId);
        let userId = (_m = req.user) === null || _m === void 0 ? void 0 : _m._id;
        userId = new mongoose_1.Types.ObjectId(userId);
        const document = yield favourite_model_1.default.findOne({
            user: userId,
            book: bookId,
        });
        if (document) {
            response.message = "Removed from favourites";
            document.remove();
        }
        else {
            response.message = "Added to favourites";
            favourite_model_1.default.create({
                user: userId,
                book: bookId,
            });
        }
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
exports.toggleFavourite = toggleFavourite;
const addRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _o;
    let response = { success: true };
    const validNumber = new RegExp(/^[1-5]$/);
    try {
        let body = req.body;
        if (!body.book || !(0, mongoose_1.isValidObjectId)(body.book))
            throw { code: 400, message: "Invalid Book ID", implicit: true };
        if (!validNumber.test(body.rating.toString()))
            throw {
                code: 400,
                message: "Invalid Rating",
                implicit: true,
            };
        body.book = new mongoose_1.Types.ObjectId(body.book);
        body.user = new mongoose_1.Types.ObjectId((_o = req.user) === null || _o === void 0 ? void 0 : _o._id);
        const document = yield rating_model_1.default.findOneAndUpdate({
            user: body.user,
            book: body.book,
        }, {
            user: body.user,
            book: body.book,
            rating: body.rating,
        }, { upsert: true });
        if (document)
            response.message = "Updated Rating";
        else
            response.message = "Added Rating";
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
exports.addRating = addRating;
const getFavourites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _p;
    let response = { success: true };
    try {
        let user = new mongoose_1.Types.ObjectId((_p = req.user) === null || _p === void 0 ? void 0 : _p._id);
        const Books = yield favourite_model_1.default.aggregate((0, functions_1.getFavouritesQuery)(user));
        response.data = Books;
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
exports.getFavourites = getFavourites;
