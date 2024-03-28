const { DataTypes } = require("sequelize");

function orderModel(sequelize) {
    const attributes = {
        id_pedido: {
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
        fecha_pedido: { type: DataTypes.DATE, allowNull: false },
        num_pedido: { type: DataTypes.INTEGER, allowNull: false },
        id_autoparte: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Autoparte',
                key: 'id_autoparte'
            }
        },
        cantidad: { type: DataTypes.INTEGER, allowNull: false },
        estado: { type: DataTypes.BOOLEAN, allowNull: false }
    };

    const options = {
        freezeTableName: true,
        timestamps: false
    };
    return sequelize.define("Pedido", attributes, options);
}

module.exports = orderModel;