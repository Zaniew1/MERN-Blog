import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
// import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorController";
import userRouter from "./routes/userRoutes";
import blogRouter from "./routes/blogRoutes";
import utilsRouter from "./routes/utilsRoutes";
import cookieParser from "cookie-parser";

const app = express();

app.use("/images", express.static(__dirname + "/images"));

const corsOptions = {
  origin: `${process.env.FRONT_DOMAIN}`,
  // origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use("/", userRouter);
app.use("/article", blogRouter);
app.use("/", utilsRouter);
app.options("/article", cors());

// Creating server

// app.all("*", (req: Request, res: Response, next: NextFunction) => {
//   // next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
// });
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", `${process.env.FRONT_DOMAIN}`);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(globalErrorHandler);
app.listen(process.env.PORT || 3001, () => {
  console.log("Server runs good !");
  mongoose
    .connect(`${process.env.MONGO_DB_PASS}`)
    .then(() => console.log("DB connection successful!"));
});
app.get("/", (req, res) => {
  res.send("Hello, this is your backend!");
});
export default app;
