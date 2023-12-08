"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (errorFunction) => {
    return (req, res, next) => {
        errorFunction(req, res, next).catch(err => next(err));
    };
};
