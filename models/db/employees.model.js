const { DataTypes } = require("sequelize");

function employeesModel(sequelize) {
    const attributes = {
        id_empleado: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        primer_nombre: { type: DataTypes.STRING(200), allowNull: false },
        segundo_nombre: { type: DataTypes.STRING(200), allowNull: true },
        primer_apellido: { type: DataTypes.STRING(200), allowNull: false },
        segundo_apellido: { type: DataTypes.STRING(200), allowNull: true },
        tipo_documento: { type: DataTypes.STRING(200), allowNull: false },
        num_documento: { type: DataTypes.STRING(20), allowNull: false },
        fecha_nacimiento: { type: DataTypes.DATEONLY, allowNull: false },
        direccion: { type: DataTypes.STRING(200), allowNull: false },
        correo_electronico: { type: DataTypes.STRING(200), allowNull: false },
        celular: { type: DataTypes.STRING(20), allowNull: false },
        genero: { type: DataTypes.STRING(50), allowNull: false },
        cargo: { type: DataTypes.STRING(200), allowNull: false },
        id_area: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Areas',
                key: 'id_area'
            }
        }
    };

    const options = {
        freezeTableName: true,
        timestamps: false
    };

    const Empleados = sequelize.define('Empleados', attributes, options);

    Empleados.belongsTo(sequelize.models.Areas, { foreignKey: 'id_area' });

    return Empleados;
}

module.exports = employeesModel;