import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import globalErrorHandler from "./controllers/errorController";
import userRouter from "./routes/userRoutes";
import blogRouter from "./routes/blogRoutes";
import utilsRouter from "./routes/utilsRoutes";
import cookieParser from "cookie-parser";

const app = express();
app.listen(process.env.PORT || 3001, () => {
  console.log("Server runs good !");
  mongoose.connect(`${process.env.MONGO_DB_PASS}`).then(() =>
    app.get("/", (req: Request, res: Response) => {
      res.send("Hello, this is your backend!");
    })
  );
});

app.use(cors());
app.options("*", cors());
app.use("/images", express.static(__dirname + "/images"));
app.use(express.json());
app.use(cookieParser());
app.use("/", userRouter);
app.use("/article", blogRouter);
app.use("/", utilsRouter);
app.use(globalErrorHandler);

export default app;
