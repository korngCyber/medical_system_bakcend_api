require("dotenv").config();
const express = require("express");
const productRoutes = require('./routes/productRoute');
const CategoryRoutes = require('./routes/categoryRoute');
const CustomerRoutes = require('./routes/customerRoute');
const OrderRoutes = require('./routes/orderRoute');
const { connectDB } = require("./configs/connectionDB");
const errorHandler = require("./middlewares/errorHandler");

// const { sequelize } = require("./models/indexModel");


const app = express();

app.use(express.json());

app.use(errorHandler);

connectDB().then(async () => {
    // await sequelize.sync({ force: true }); // Fixed line
    // console.log(sequelize); // or console.log(db)
    // console.log("✅ All tables created successfully!");

    app.use("/api/v1/product", productRoutes);
    app.use("/api/v1/category", CategoryRoutes);
    app.use("/api/v1/customer", CustomerRoutes); 
    app.use("/api/v1/order", OrderRoutes);


    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}).catch(err => {
    console.error("❌ Failed to connect to the database", err);
    process.exit(1);
});
