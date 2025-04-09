

require("dotenv").config();
const { Sequelize } = require("sequelize");

if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is not defined in .env file");
    process.exit(1);
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: console.log,
    dialectOptions: {
        ssl: process.env.DB_SSL === "true" ? { require: true, rejectUnauthorized: false } : false,
    },
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully!");
        // await sequelize.sync({force: true});
        await sequelize.sync({});
        console.log("✅ Database schema updated!");
    } catch (error) {
        console.error("❌ Database connection error:", error);
        process.exit(1);
    }
}

module.exports = {
    connectDB,
    sequelize
};