const db = require("../config/db");

const create = async ({
  id_empleado,
  id_autoparte,
  cantidad
}) => {
  const result = await db.Pedido.create({
    id_empleado,
    id_autoparte,
    cantidad
  });
  return result;
};

const getAll = async (page, pageSize, searchparam) => {

  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  let whereClause = {};

  console.log("searchparam:", searchparam)
  console.log("page:", page)
  console.log("pageSize:", pageSize)
  if (searchparam !== '') {
    whereClause = {
      num_pedido: searchparam
    };
  }

  const { rows, count } = await db.Pedido.findAndCountAll({
    where: whereClause,
    include: [{
      model: db.Autoparte,
      required: false
    }, {
      model: db.Empleados,
      required: false
    }],
    offset: Number(offset),
    limit: Number(limit)
  });

  return { rows, count };
};

module.exports = {

  create,
  getAll
};