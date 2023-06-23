import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import verifyToken from "./middleware/auth.js";
import { register } from "./controllers/auth.js";
import login from "./routes/auth.js";
import users from "./routes/users.js";
import posts from "./routes/posts.js";
import { create } from "./controllers/posts.js";

// Configurations
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets/", express.static(path.join(dirname, "/public/assets")));

// File Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// Routes With File
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), create);

// Routes
app.use("/auth", login);
app.use("/users", users);
app.use("/posts", posts);
// Mongoose Setup
const port = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(port, () => {
        console.log(`Server Port: ${port}`);
    })
}).catch((error) => {
    console.log(error);
});