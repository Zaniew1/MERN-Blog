"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
// import AppError from "./utils/appError";
const errorController_1 = __importDefault(require("./controllers/errorController"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const utilsRoutes_1 = __importDefault(require("./routes/utilsRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use("/images", express_1.default.static(__dirname + "/images"));
const corsOptions = {
    origin: `${process.env.FRONT_DOMAIN}`,
    // origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/", userRoutes_1.default);
app.use("/article", blogRoutes_1.default);
app.use("/", utilsRoutes_1.default);
app.options("/article", (0, cors_1.default)());
// Creating server
// app.all("*", (req: Request, res: Response, next: NextFunction) => {
//   // next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
// });
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", `${process.env.FRONT_DOMAIN}`);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use(errorController_1.default);
app.listen(process.env.PORT || 3001, () => {
    console.log("Server runs good !");
    mongoose_1.default
        .connect(`${process.env.MONGO_DB_PASS}`)
        .then(() => console.log("DB connection successful!"));
});
app.get("/", (req, res) => {
    res.send("Hello, this is your backend!");
});
exports.default = app;
