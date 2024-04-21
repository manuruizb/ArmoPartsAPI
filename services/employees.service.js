const { where } = require("sequelize");
const db = require("../config/db");

const getAll = async (page, pageSize, searchparam) => {

  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  let whereClause = {};

  console.log("Holi:", searchparam)
  if (searchparam !== '') {
    whereClause = {
      num_documento: searchparam
    };
  }

  const { rows, count } = await db.Empleados.findAndCountAll({
    where: whereClause,
    include: [{
      model: db.Areas,
      required: false
    }],
    offset: Number(offset),
    limit: Number(limit)
  });

  return { rows, count };
};

const findById = async (id) => {
  return await db.Empleados.findByPk(id);
};

const create = async ({
  primer_nombre,
  segundo_nombre,
  primer_apellido,
  segundo_apellido,
  tipo_documento,
  num_documento,
  fecha_nacimiento,
  direccion,
  correo_electronico,
  celular,
  genero,
  cargo,
  id_area
}) => {
  const result = await db.Empleados.create({
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    tipo_documento,
    num_documento,
    fecha_nacimiento,
    direccion,
    correo_electronico,
    celular,
    genero,
    cargo,
    id_area
  });
  return result;
};

const update = async ({
  id_empleado,
  primer_nombre,
  segundo_nombre,
  primer_apellido,
  segundo_apellido,
  tipo_documento,
  num_documento,
  fecha_nacimiento,
  direccion,
  correo_electronico,
  celular,
  genero,
  cargo,
  id_area
}) => {
  await db.Empleados.update(
    {
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      tipo_documento,
      num_documento,
      fecha_nacimiento,
      direccion,
      correo_electronico,
      celular,
      genero,
      cargo,
      id_area
    },
    {
      where: {
        id_empleado: id_empleado,
      },
    }
  );
  return "Usuario actualizado con éxito.";
};

const findByNumDoc = async (num_documento) => {
  return await db.Empleados.findOne({
    where: {
      num_documento: num_documento
    },
    include: [{
      model: db.Areas,
      required: false
    }]
  });
};

const findByEmail = async (correo_electronico) => {
  return await db.Empleados.findOne({
    where: {
      correo_electronico: correo_electronico
    }
  });
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  findByNumDoc,
  findByEmail
};