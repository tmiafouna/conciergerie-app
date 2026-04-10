const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middlewares/errorHandler");

// Importer les modèles pour les enregistrer dans Mongoose
require("./src/models/User");
require("./src/models/Order");

dotenv.config();
connectDB();

const app = express();

app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'https://conciergerie-app.netlify.app'],
  credentials: true
}));
app.use(express.json());

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { success: false, message: "Trop de tentatives, réessayez plus tard" },
  standardHeaders: true,
  legacyHeaders: false,
});

// Routes
app.use("/api/auth", authLimiter, require("./src/routes/authRoutes"));
app.use("/api/orders", require("./src/routes/orderRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));