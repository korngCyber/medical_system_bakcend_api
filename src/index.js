require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/productRoute");
const categoryRoutes = require("./routes/categoryRoute");
const customerRoutes = require("./routes/customerRoute");
const orderRoutes = require("./routes/orderRoute");
const authRoute=require("./routes/authRoute");
const { connectDB } = require("./configs/connectionDB");
const { sequelize } = require("./models/indexModel"); // Import sequelize instance
const errorHandler = require("./middlewares/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const path = require("path");
const app = express();
const cors = require("cors");


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
app.use(errorHandler);

connectDB()
  .then(async () => {
    try {
      // Sync database schema
      await sequelize.sync({ alter: true }); // Use `alter: true` to update schema without dropping tables
      console.log("✅ All tables created successfully!");

      // Register routes
      app.use("/api/v1/product", productRoutes);
      app.use("/api/v1/category", categoryRoutes);
      app.use("/api/v1/customer", customerRoutes);
      app.use("/api/v1/order", orderRoutes);
      app.use("/api/v1/auth",authRoute);
      app.use("/upload", express.static(path.join(__dirname, "upload")));
      // app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
// Handle uncaught exceptions// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});
// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled Rejection:", error);
  process.exit(1);
});
// Handle SIGINT signal (Ctrl+C)
process.on("SIGINT", () => {
  console.log("🔌 Server shutting down...");
  sequelize.close().then(() => {
    console.log("✅ Database connection closed.");
    process.exit(0);
  });
});