"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ratingSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, required: true, index: true, ref: "User" },
    book: { type: mongoose_1.Types.ObjectId, required: true, index: true, ref: "Book" },
    rating: { type: Number, required: true },
});
const Ratingmodel = mongoose_1.models.Rating || (0, mongoose_1.model)("Rating", ratingSchema);
exports.default = Ratingmodel;
