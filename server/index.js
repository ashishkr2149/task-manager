import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import "./helpers/passpoertHelper.js";
import { decrypt } from './crypto.js'

import authRoutes from "./routes/authRoute.js";
import taskRoutes from "./routes/taskRoute.js";

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

const allowedOrigins = [process.env.BACKEND_URL, 'http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps, curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

//Middlewares
app.use(express.json());
app.use(morgan(customFormat));
app.use(limiter);
app.use(helmet());
app.use(cors(corsOptions));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/", taskRoutes);

// Google OAuth routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

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
