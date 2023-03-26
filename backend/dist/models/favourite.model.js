"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const favSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, required: true, index: true, ref: "User" },
    book: { type: mongoose_1.Types.ObjectId, required: true, index: true, ref: "Book" },
});
const Favouritemodel = mongoose_1.models.Favourite || (0, mongoose_1.model)("Favourite", favSchema);
exports.default = Favouritemodel;
