const { DataTypes } = require("sequelize");

function formModel(sequelize) {
    const attributes = {
        id_formulario: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        id_empleado: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Empleados',
                key: 'id_empleado'
            }
        },
        id_pedido: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Pedido',
                key: 'id_pedido'
            }
        },
        entrada: { type: DataTypes.STRING(500), allowNull: false },
        salida: { type: DataTypes.STRING(500), allowNull: false }
    };

    const options = {
        freezeTableName: true,
        timestamps: false
    };
    return sequelize.define("Formulario", attributes, options);
}

module.exports = formModel;