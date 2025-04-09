const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectionDB");

const Customer = sequelize.sequelize.define(
  "customer",
  {
    cusId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cusName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cusEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cusPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cusAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cusStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    cusPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cusRole: {
      type: DataTypes.STRING,
      defaultValue: "customer",
      allowNull: false,
    },
    cusImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cusBio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "tb_customers",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true,
    deletedAt: "deleted_at",
  }
);

module.exports = Customer;
