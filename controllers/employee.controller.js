const express = require("express");
const router = express.Router();
const employeeService = require("../services/employees.service");
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
    let data = await employeeService.create(req.body);
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

