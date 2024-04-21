const db = require("../config/db");

const findByUserAndPassword = async ({ usuario, contrasena }) => {
    return await db.Usuario.findOne({
        where: {
            usuario: usuario,
            contrasena: contrasena
        },
        include: [{
            model: db.Empleados,
            required: true,
            include: [
                {
                    model: db.Areas,
                    required: false
                }
            ]
        },
       ],
        attributes: [
            "usuario",
            "reintentos",
            "estado",
            "id_usuario"
        ]
    });
};

const create = async ({
    usuario,
    contrasena,
    id_empleado
}) => {
    const result = await db.Usuario.create({
        usuario,
        contrasena,
        id_empleado
    });
    return result;
};

const updateStateAndRemainings = async ({
    id_usuario,
    estado,
    reintentos
}) => {
    await db.Usuario.update(
        {
            estado,
            reintentos
        },
        {
            where: {
                id_usuario: id_usuario,
            },
        }
    );
    return;
};

const findByUser = async ({ usuario }) => {
    return await db.Usuario.findOne({
        where: {
            usuario: usuario
        }
    });
};

const updatePassword = async ({
    contrasena,
    id_empleado
}) => {
    await db.Usuario.update(
        {
            contrasena
        },
        {
            where: {
                id_empleado: id_empleado,
            },
        }
    );
    return;
}

module.exports = {
    findByUserAndPassword,
    create,
    updateStateAndRemainings,
    findByUser,
    updatePassword
};