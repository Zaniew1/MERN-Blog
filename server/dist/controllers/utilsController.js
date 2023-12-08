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
exports.newsletter = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.newsletter = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email)
        return next(new appError_1.default("There is no email", 404));
    const newMail = {
        email,
        subscriptionDate: new Date(),
    };
    const filePath = path_1.default.join(__dirname, "../cacheData", "newsletter.json");
    fs_1.default.readFile(filePath, "utf8", (err, data) => {
        if (err)
            return next(new appError_1.default("Error reading file:", 404));
        try {
            const existingEmails = JSON.parse(data);
            const containsEmail = existingEmails.some((obj) => obj.email === newMail.email);
            if (!containsEmail) {
                existingEmails.push(newMail);
                const updatedData = JSON.stringify(existingEmails, null, 2);
                fs_1.default.writeFile(filePath, updatedData, "utf8", (err) => {
                    if (err) {
                        return next(new appError_1.default("Error writing file:" + err, 404));
                    }
                    res.status(200).json({
                        status: "success",
                        email,
                    });
                });
            }
            else
                return next(new appError_1.default("This email already exsits", 404));
        }
        catch (parseError) {
            return next(new appError_1.default(`${parseError}`, 404));
        }
    });
}));
