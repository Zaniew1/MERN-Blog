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
exports.resetPassword = exports.editUser = exports.changePassword = exports.forgetPassword = exports.logoutUser = exports.loginUser = exports.createNewUser = exports.getMe = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const userModel_1 = __importDefault(require("../models/userModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const email_1 = __importDefault(require("../utils/email"));
require("dotenv/config");
const helpers_1 = require("../helpers/helpers");
const crypto_1 = __importDefault(require("crypto"));
exports.getMe = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { name, surname, avatar, email } = (yield userModel_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id));
    res.status(200).json({
        status: "success",
        id: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
        name,
        surname,
        email,
        avatar,
    });
}));
exports.createNewUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // validating data
    const { name, surname, email, password, confirmPassword } = req.body;
    if (!email || !password)
        return next(new appError_1.default("There have to be email and password", 400));
    if (!name || !surname)
        return next(new appError_1.default("There have to be name and surname", 400));
    if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
        return next(new appError_1.default("Password needs to contain min. 8 letters, 1 big letter, 1 small letter and 1 special character", 400));
    }
    if (password !== confirmPassword)
        return next(new appError_1.default("Passwords are not the same", 400));
    // we check if email already exists
    const user = yield userModel_1.default.findOne({ email });
    if (user) {
        return next(new appError_1.default("There is user with that email already", 400));
    }
    const newUser = yield userModel_1.default.create({
        name,
        surname,
        email,
        password,
        confirmPassword,
        avatar: "user.jpg",
    });
    // we send email with welcome Card component as welcome message
    yield new email_1.default(email, name).sendWelcome();
    // create jwt token
    (0, helpers_1.createSendToken)(newUser, 201, req, res);
}));
exports.loginUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new appError_1.default("There have to be email and password", 400));
    }
    if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
        return next(new appError_1.default("Password needs to contain min. 8 letters, 1 big, 1 small letter and 1 special character", 400));
    }
    const user = yield userModel_1.default.findOne({ email }).select("+password");
    if (!user) {
        return next(new appError_1.default("User with that email does not exist", 401));
    }
    const isGoodPassword = yield (0, helpers_1.comparePasswords)(password, user.password);
    if (!isGoodPassword) {
        return next(new appError_1.default("Incorrect password", 401));
    }
    (0, helpers_1.createSendToken)(user, 200, req, res);
}));
exports.logoutUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.cookies = "";
    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: "success" });
}));
exports.forgetPassword = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // find an account with that email
    const user = yield userModel_1.default.findOne({ email: req.body.email });
    // check if this account exists
    if (!user)
        return next(new appError_1.default("Użytkownik nie znaleziony", 404));
    const resetToken = user.createPasswordResetToken();
    // we turn off any validation in UserSchema
    yield user.save({ validateBeforeSave: false });
    try {
        const resetURL = `${'https://mern-blog-front-two.vercel.app'}/resetPassword/${resetToken}`;
        yield new email_1.default(req.body.email, resetURL).sendPasswordReset();
        res.status(200).json({
            status: "success",
            message: "Token sent to email !",
            resetToken,
        });
    }
    catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        yield user.save({ validateBeforeSave: false });
        return next(new appError_1.default("No reset token sent", 500));
    }
}));
exports.changePassword = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPass, newPass, confirmNewPass, email } = req.body;
    // const hashedNewPass = crypto.createHash('sha256').update(newPass).digest('hex');
    const user = yield userModel_1.default.findOne({ email }).select("+password");
    if (!user)
        return next(new appError_1.default("User not found", 404));
    const isGoodPassword = yield (0, helpers_1.comparePasswords)(oldPass, user.password);
    if (!isGoodPassword)
        return next(new appError_1.default("Old password that you provided was incorrect", 400));
    if (newPass !== confirmNewPass)
        return next(new appError_1.default("New password and confirm password are not the same", 400));
    user.password = newPass;
    user.confirmPassword = confirmNewPass;
    yield user.save();
    res.status(200).json({
        status: "success",
    });
}));
exports.editUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, surname, avatar } = req.body;
    if (!name || !surname)
        return next(new appError_1.default("Imię i nazwisko jest wymagane", 400));
    if (name.length < 3 || surname.length < 3)
        return next(new appError_1.default("Imię i nazwisko musi mieć przynajmniej 3 znaki", 400));
    if (name.length > 12 || surname.length > 15)
        return next(new appError_1.default("Imię musi mieć max 12 znaków a nazwisko max 15", 400));
    const oldUser = yield userModel_1.default.findOne({ _id: id });
    // if user didint upload new picture, then assign old photo
    if (oldUser && avatar == "") {
        req.body.avatar = oldUser.avatar;
    }
    const user = yield userModel_1.default.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        return next(new appError_1.default("There is no such user", 404));
    }
    else {
        res.status(200).json({
            status: "successfully edited",
            user,
        });
    }
}));
exports.resetPassword = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const hashedToken = crypto_1.default
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    const user = yield userModel_1.default.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user)
        return next(new appError_1.default("User not found", 404));
    user.password = req.body.password;
    user.confirmPassword = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    yield user.save();
    const token = (0, helpers_1.signToken)(user._id);
    res.status(200).json({
        status: "success",
        token,
    });
}));
