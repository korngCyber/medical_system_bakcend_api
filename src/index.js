require("dotenv").config();
const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoute");
const categoryRoutes = require("./routes/categoryRoute");
const customerRoutes = require("./routes/customerRoute");
const orderRoutes = require("./routes/orderRoute");
const authRoute=require("./routes/authRoute");
const { connectDB } = require("./configs/connectionDB");
const { sequelize } = require("./models/indexModel");
const errorHandler = require("./middlewares/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const path = require("path");

const app = express();


// Use CORS (Adjust origins based on your frontend ports)
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000", // Ensure CORS is set dynamically from environment
  credentials: true,
}));


const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.CORS_ORIGIN_1,
  process.env.CORS_ORIGIN_2,
].filter(Boolean); // Remove any undefined or empty ones

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Middleware
app.use(errorHandler);

// DB Connection and Server
connectDB()
  .then(async () => {
    try {
      // Sync database schema (altering the schema if necessary)
      await sequelize.sync({ alter: true });
      console.log("✅ All tables created successfully!");

      // Routes
      app.use("/api/v1/product", productRoutes);
      app.use("/api/v1/category", categoryRoutes);
      app.use("/api/v1/customer", customerRoutes);
      app.use("/api/v1/order", orderRoutes);
      app.use("/api/v1/auth",authRoute);
      app.use("/upload", express.static(path.join(__dirname, "upload")));
      
      // Enable Swagger UI if needed
      app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () =>
        console.log(`🚀 Server running on http://localhost:${PORT}`)
      );
    } catch (error) {
      console.error("❌ Failed to sync database schema:", error);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database", err);
    process.exit(1);
  });

// Global Error Handlers
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled Rejection:", error);
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("🔌 Server shutting down...");
  sequelize.close().then(() => {
    console.log("✅ Database connection closed.");
    process.exit(0);
  });
});
