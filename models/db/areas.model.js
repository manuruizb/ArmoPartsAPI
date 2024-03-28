const { DataTypes } = require("sequelize");

function areasModel(sequelize) {
    const attributes = {
        id_area: {
            type: DataTypes.UUID, 
            defaultValue: DataTypes.UUIDV4, 
            allowNull: false,
            primaryKey: true
        },
        area: { type: DataTypes.STRING(200), allowNull: false },
        orden: { type: DataTypes.INTEGER, allowNull: false }
    };

    const options = {
        freezeTableName: true,
        timestamps: false
    };
    return sequelize.define("Areas", attributes, options);
}

module.exports = areasModel;