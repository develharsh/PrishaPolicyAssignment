import multer from "multer";
import { v4 } from "uuid";
import path from "path";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (_: Request, file: any, cb: Function) => {
    cb(null, v4() + path.extname(file.originalname));
  },
});

export default multer({ storage });
