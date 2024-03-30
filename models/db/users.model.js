const { DataTypes } = require("sequelize");

function userModel(sequelize) {
    const attributes = {
        id_usuario: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        usuario: { type: DataTypes.STRING(15), allowNull: false, unique: true},
        contrasena: { type: DataTypes.STRING(15), allowNull: false },
        estado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
        reintentos: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
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

    const Usuario = sequelize.define('Usuario', attributes, options);

    Usuario.belongsTo(sequelize.models.Empleados, { foreignKey: 'id_empleado' });

    return Usuario;
}

module.exports = userModel;