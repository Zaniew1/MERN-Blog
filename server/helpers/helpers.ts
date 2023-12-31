import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserSchemaType } from "../types/blogTypes";
import bcrypt from "bcryptjs";
import "dotenv/config";
import Email from "../utils/email";
import "dotenv/config";
import path from "path";
import fs from "fs";
import AppError from "../utils/appError";

export const signToken = (id: string) => {
  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
  if (!jwtSecret || !jwtExpiresIn) {
    throw new Error(
      "JWT_SECRET or JWT_EXPIRES_IN environment variables are not defined."
    );
  }
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });
};
export const createSendToken = (
  user: UserSchemaType,
  statusCode: number,
  req: Request,
  res: Response
) => {
  const token = signToken(user._id);
  const numberOfDaysCookieExpires: string | undefined =
    process.env.JWT_COOKIE_EXPIRES_IN;
  let expirationTime = 0;
  if (numberOfDaysCookieExpires) {
    expirationTime =
      parseInt(numberOfDaysCookieExpires) * (24 * 60 * 60 * 1000);
  } else {
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

export const comparePasswords = async function (
  typedPassword: string,
  databasePassword: string
) {
  // this function compares two passwords, one password is hashed, one is not,
  // comparizon is made by hashing first password and then comparing both hashed passwords
  return await bcrypt.compare(typedPassword, databasePassword);
};

export const sendNewsletter = async (title: string) => {
  const filePath = path.join(__dirname, "../cacheData", "newsletter.json");
  fs.readFile(filePath, "utf8", async (err, data) => {
    if (err) return new AppError("Error reading file:", 404);
    try {
      const existingEmails: { email: string; subscriptionDate: Date }[] =
        JSON.parse(data);
      for (const user of existingEmails) {
        await new Email(user.email, title).sendNewsletter();
      }
    } catch (err) {
      return new AppError("Error:" + err, 404);
    }
  });
};

export const allowCors = (fn) => async (req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Origin", `${process.env.FRONT_DOMAIN}`);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};
