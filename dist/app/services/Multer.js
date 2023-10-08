"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "public/BdConocimiento");
    },
    filename: (_req, file, cb) => {
        cb(null, `${(0, uuid_1.v4)()}&${Date.now()}.${file.originalname.split(".")[file.originalname.split(".").length - 1]}`);
    },
});
exports.upload = (0, multer_1.default)({ storage });
