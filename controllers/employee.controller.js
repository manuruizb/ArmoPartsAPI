const express = require("express");
const router = express.Router();
const employeeService = require("../services/employees.service");
const userService = require("../services/users.service");
const Result = require("../models/helpers/result.model");

router.get("/", async (req, res) => {
  try {
    let data = await employeeService.getAll();
    res.json(new Result(data, true).build());
  } catch (error) {
    console.log(error);
    res.status(500).json(new Result({ statusCode: 500, error: "Algo salió mal." }, false, error).build());
  }
});

router.post("/", async (req, res) => {
  try {
    let docExist = await employeeService.findByNumDoc(req.body.num_documento);
    if(docExist){
      return res
        .status(400)
        .json(new Result({ statusCode: 400, error: "Ya existe un empleado con este documento." }, false).build());
    }

    let mailExist = await employeeService.findByEmail(req.body.correo_electronico);
    if(mailExist){
      return res
        .status(400)
        .json(new Result({ statusCode: 400, error: "Ya existe un empleado con este correo electrónico." }, false).build());
    }

    let userExist = await userService.findByUser({usuario: req.body.usuario});
    if(userExist){
      return res
        .status(400)
        .json(new Result({ statusCode: 400, error: "Ya existe un empleado con este nombre de usuario." }, false).build());
    }

    let data = await employeeService.create(req.body);
    await userService.create({
      usuario: req.body.usuario,
      contrasena: req.body.contrasena,
      id_empleado: data.id_empleado
    })
    res.status(201).json(new Result(data, true).build());
  } catch (error) {
    console.log(error);
    res.status(500).json(new Result({ statusCode: 500, error: "Algo salió mal." }, false, error).build());
  }
});

router.get("/:id", async (req, res) => {
  try {
    let data = await employeeService.findById(req.params.id);
    if (!data) {
      return res
        .status(404)
        .json(new Result({ statusCode: 404, error: "Empleado no existe." }, false).build());
    }
    return res.json(new Result(data, true).build());
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Algo salió mal." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let exist  = await employeeService.findById(req.params.id);
    if(!exist){
      return res.status(404).json(new Result({statusCode: 404, error: "Empleado no existe."}));
    }
    let update = await employeeService.update(req.body);
    return res.json(new Result(update, true).build());  
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Algo salió mal." });
  }
});

router.get("/getByDocument/:numDocument", async (req, res) => {
  try {
    let data = await employeeService.findByNumDoc(req.params.numDocument);
    if (!data || data.length === 0) {
      return res
        .status(404)
        .json(new Result({ statusCode: 404, error: "Empleado no existe." }, false).build());
    }
    return res.json(new Result(data, true).build());
  } catch (error) {
    console.log(error);
    res.status(500).json(new Result({ statusCode: 500, error: "Algo salió mal." }, false, error).build());
  }
});

module.exports = router;

