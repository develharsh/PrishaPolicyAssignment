"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
}, { timestamps: true });
// 3. Create a Model.
const Usermodel = mongoose_1.models.User || (0, mongoose_1.model)("User", userSchema);
exports.default = Usermodel;
