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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxLength: 12,
    },
    surname: {
        type: String,
        required: true,
        minlength: 3,
        maxLength: 15,
    },
    password: {
        type: String,
        required: true,
        minlenght: 8,
        select: false,
    },
    confirmPassword: {
        type: String,
        required: true,
        select: false,
        minlenght: 8,
    },
    creationDate: {
        default: new Date().getTime(),
        type: Number,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: Number,
    },
    avatar: {
        type: String,
    },
});
UserSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto_1.default.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto_1.default
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // isModified is mongoose function
        if (!this.isModified("password"))
            return next();
        // 12 value stands for how strong encryption will be
        this.password = yield bcryptjs_1.default.hash(this.password, 12);
        this.confirmPassword = "";
        next();
    });
});
UserSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew)
        return next();
    // this.passwordChangedAt = Date.now() -1000;
    next();
});
const UserModel = (0, mongoose_1.model)("Users", UserSchema);
exports.default = UserModel;
