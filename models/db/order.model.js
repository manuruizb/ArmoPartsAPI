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
        fecha_pedido: {
            type: DataTypes.DATE,
            allowNull: false, defaultValue:
                DataTypes.NOW,
        },
        num_pedido: { type: DataTypes.INTEGER, allowNull: true },
        id_autoparte: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Autoparte',
                key: 'id_autoparte'
            }
        },
        cantidad: { type: DataTypes.INTEGER, allowNull: false },
        estado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
    };

    const options = {
        freezeTableName: true,
        timestamps: false
    };

    const Pedido = sequelize.define('Pedido', attributes, options);

    Pedido.belongsTo(sequelize.models.Autoparte, { foreignKey: 'id_autoparte' });
    Pedido.belongsTo(sequelize.models.Empleados, { foreignKey: 'id_empleado' });
    
    return Pedido;

}

module.exports = orderModel;