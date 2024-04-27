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
        orden: { type: DataTypes.INTEGER, allowNull: false },
        icon_class: { type: DataTypes.STRING(200), allowNull: false }
    };

    const options = {
        freezeTableName: true,
        timestamps: false
    };
    const Areas = sequelize.define("Areas", attributes, options);

    return Areas;
}

module.exports = areasModel;