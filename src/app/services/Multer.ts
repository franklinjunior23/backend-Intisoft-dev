import multer from "multer";
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "./public/BdConocimiento");
  },
  filename: (_req, file, cb) => {
    cb(
      null,
      `${uuidv4()}&${Date.now()}.${file.originalname.split(".")[
        file.originalname.split(".").length - 1
      ]}`
    );
  },
});

export const upload = multer({ storage });
