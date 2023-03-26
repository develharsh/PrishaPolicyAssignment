"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const auth_1 = require("../middlewares/auth");
const multer_1 = __importDefault(require("../utils/lib/multer"));
const router = express_1.default.Router();
router.post("/add", auth_1.isAuthenticated, multer_1.default.fields([
    { name: "coverFile", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
]), book_controller_1.add);
router.get("/get-all", auth_1.isAuthenticated, book_controller_1.getAll);
router.get("/get/:_id", auth_1.isAuthenticated, book_controller_1.getSpecific);
exports.default = router;
