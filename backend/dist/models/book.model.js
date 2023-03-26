"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    addedBy: { type: mongoose_1.Types.ObjectId, required: true, index: true, ref: "User" },
    author: { type: String, required: true },
    description: { type: String, required: true },
    bookReadTime: { type: Number, required: true },
    coverFile: { type: String, required: true },
    pdfFile: { type: String, required: true },
}, { timestamps: true });
const Bookmodel = mongoose_1.models.Book || (0, mongoose_1.model)("Book", bookSchema);
exports.default = Bookmodel;
