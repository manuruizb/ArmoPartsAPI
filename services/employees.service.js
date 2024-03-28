const db = require("../config/db");

const getAll = async () => {
  return await db.Empleados.findAll();
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
    { primer_nombre,
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
      id_area},
      {
        where: {
          id_empleado: id_empleado,
        },
      }
      );
      return "Usuario actualizado con éxito.";
};

const findByNumDoc = async (num_documento) => {
  return await db.Empleados.findAll({
    where:{
      num_documento: num_documento
    },
  });
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  findByNumDoc
};