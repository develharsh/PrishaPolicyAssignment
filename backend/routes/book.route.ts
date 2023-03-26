import express, { Router } from "express";
import {
  add,
  getAll,
  getSpecific,
  toggleFavourite,
  addRating,
  getFavourites
} from "../controllers/book.controller";
import { isAuthenticated } from "../middlewares/auth";
import multer from "../utils/lib/multer";

const router: Router = express.Router();

router.post(
  "/add",
  isAuthenticated,
  multer.fields([
    { name: "coverFile", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),
  add
);
router.get("/get-all", isAuthenticated, getAll);
router.get("/get/:_id", isAuthenticated, getSpecific);
router.put("/favourite/toggle/:_id", isAuthenticated, toggleFavourite);
router.get("/favourite/get", isAuthenticated, getFavourites);
router.post("/rating/add", isAuthenticated, addRating);

export default router;
