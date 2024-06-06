const { sequelize } = require("../../config/db.connection");

module.exports = (sequelize, DataType) => {
    const Merchant = sequelize.define("merchants", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING(25),
            allowNull: false
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataType.BIGINT(10),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataType.STRING,
            allowNull: false
        }
    }, { timestamps: false });
    return Merchant;
}