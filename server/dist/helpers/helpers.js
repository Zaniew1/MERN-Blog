"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowCors = exports.sendNewsletter = exports.comparePasswords = exports.createSendToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
require("dotenv/config");
const email_1 = __importDefault(require("../utils/email"));
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const appError_1 = __importDefault(require("../utils/appError"));
const signToken = (id) => {
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
    if (!jwtSecret || !jwtExpiresIn) {
        throw new Error("JWT_SECRET or JWT_EXPIRES_IN environment variables are not defined.");
    }
    return jsonwebtoken_1.default.sign({ id }, jwtSecret, {
        expiresIn: jwtExpiresIn,
    });
};
exports.signToken = signToken;
const createSendToken = (user, statusCode, req, res) => {
    const token = (0, exports.signToken)(user._id);
    const numberOfDaysCookieExpires = process.env.JWT_COOKIE_EXPIRES_IN;
    let expirationTime = 0;
    if (numberOfDaysCookieExpires) {
        expirationTime =
            parseInt(numberOfDaysCookieExpires) * (24 * 60 * 60 * 1000);
    }
    else {
        expirationTime = 2 * (24 * 60 * 60 * 1000);
    }
    const cookieOption = {
        expires: new Date(Date.now() + expirationTime),
        httpOnly: true,
        secure: false,
    };
    // if (process.env.NODE_ENV === "PRODUCTION") cookieOption.secure = true;
    res.cookie("jwt", token);
    user.password = "";
    res.status(statusCode).json({
        status: "success",
        token,
        data: user,
    });
};
exports.createSendToken = createSendToken;
const comparePasswords = function (typedPassword, databasePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        // this function compares two passwords, one password is hashed, one is not,
        // comparizon is made by hashing first password and then comparing both hashed passwords
        return yield bcryptjs_1.default.compare(typedPassword, databasePassword);
    });
};
exports.comparePasswords = comparePasswords;
const sendNewsletter = (title) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.default.join(__dirname, "../cacheData", "newsletter.json");
    fs_1.default.readFile(filePath, "utf8", (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return new appError_1.default("Error reading file:", 404);
        try {
            const existingEmails = JSON.parse(data);
            for (const user of existingEmails) {
                yield new email_1.default(user.email, title).sendNewsletter();
            }
        }
        catch (err) {
            return new appError_1.default("Error:" + err, 404);
        }
    }));
});
exports.sendNewsletter = sendNewsletter;
const allowCors = (fn) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader("Access-Control-Allow-Origin", `${process.env.FRONT_DOMAIN}`);
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }
    return yield fn(req, res);
});
exports.allowCors = allowCors;
