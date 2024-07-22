import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";

import authRoutes from "./routes/authRoute.js";

//Configure Env
dotenv.config();

//Configure DB
connectDB();

// REST Object
const app = express();

//Custom fromat for Morgan
const customFormat = ":method :url :status :response-time ms";

//Rate Limiting Middleware to prevent DDoS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

//Middlewares
app.use(express.json());
app.use(morgan(customFormat));
app.use(limiter);
app.use(helmet());
app.use(cors());

//Routes
app.use("/api/v1/auth", authRoutes);

//REST API
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Task Manager App",
  });
});

//PORT
const PORT = process.env.PORT || 8080;

//Run Listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
