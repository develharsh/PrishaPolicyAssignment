import express, { Router } from "express";
import userRoute from "./user.route";
import bookRoute from "./book.route";

const router: Router = express.Router();
router.use("/user", userRoute);
router.use("/book", bookRoute);

export default router;
