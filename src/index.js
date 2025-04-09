require("dotenv").config();
const express = require("express");
const productRoutes = require('./routes/productRoute');
const { connectDB } = require("./configs/connectionDB");
const errorHandler = require("./middlewares/errorHandler");

const { sequelize } = require("./models/indexModel");


const app = express();

app.use(express.json());

app.use(errorHandler);

connectDB().then(async () => {
    // await sequelize.sync({ force: true }); // Fixed line
    // console.log(sequelize); // or console.log(db)
    // console.log("✅ All tables created successfully!");

    app.use("/api/v1/product", productRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}).catch(err => {
    console.error("❌ Failed to connect to the database", err);
    process.exit(1);
});
