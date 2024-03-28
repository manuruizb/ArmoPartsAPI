const { DataTypes } = require("sequelize");

function autopartModel(sequelize) {
    const attributes = {
        id_autoparte: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        nombre_autoparte: { type: DataTypes.STRING(200), allowNull: false }
    };

    const options = {
        freezeTableName: true,
        timestamps: false
    };
    return sequelize.define("Autoparte", attributes, options);
}

module.exports = autopartModel;