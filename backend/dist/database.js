"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
(0, mongoose_1.set)("strictQuery", false);
class DBConnection {
    constructor() {
        this.currentEnv = process.env.NODE_ENV;
    }
    connect() {
        var _a;
        // console.log(this.currentEnv);
        if (mongoose_1.connections[0].readyState) {
            console.log("Already connected.");
            return;
        }
        (0, mongoose_1.connect)(`${process.env[`DB_${(_a = this.currentEnv) === null || _a === void 0 ? void 0 : _a.toUpperCase()}`]}/${this.currentEnv}`, (err) => {
            if (err)
                throw err;
            console.log("Connected to mongodb.");
        });
    }
}
exports.default = DBConnection;
