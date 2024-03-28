const { DataTypes } = require("sequelize");

function userModel(sequelize) {
    const attributes = {
        usuario: { type: DataTypes.STRING(15), allowNull: false, unique: true},
        contraseña: { type: DataTypes.STRING(15), allowNull: false },
        id_empleado: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Empleados',
                key: 'id_empleado'
            }
        }
    };

    const options = {
        freezeTableName: true,
        timestamps: false
    };
    return sequelize.define("Usuario", attributes, options);
}

module.exports = userModel;