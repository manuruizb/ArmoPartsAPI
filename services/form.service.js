const db = require("../config/db");

const create = async ({
    id_empleado,
    id_pedido,
    entrada,
    salida
}) => {
    const result = await db.Formulario.create({
        id_empleado,
        id_pedido,
        entrada,
        salida
    });
    return result;
};

const findByEmployeeIdAndOrderId = async ({ id_empleado, id_pedido }) => {
    return await db.Formulario.findOne({
        where: {
            id_empleado: id_empleado,
            id_pedido: id_pedido
        }
    });
};

const findByOrderId = async (id_pedido) => {
    return await db.Formulario.findAll({
        where: {
            id_pedido: id_pedido
        }
    });
};


module.exports = {
    create,
    findByEmployeeIdAndOrderId,
    findByOrderId
};