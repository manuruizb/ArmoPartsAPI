const express = require("express");
const router = express.Router();
const formService = require("../services/form.service");
const employeeService = require("../services/employees.service")
const Result = require("../models/helpers/result.model");
const verifyToken = require("../middlewares/middleware-token");

router.post("/", verifyToken, async (req, res) => {
  try {

    let registered = await formService.findByEmployeeIdAndOrderId(req.body);

    const forms = await formService.findByOrderId(req.body.id_pedido);

    const currentEmployee = await employeeService.findById(req.body.id_empleado)

    for (let item of forms) {

      if (item.Empleado.id_area === currentEmployee.id_area) {
        return res
          .status(400)
          .json(new Result({ statusCode: 400, error: `Este pedido ya tiene un formulario registrado para el area de ${currentEmployee.Area.area}` }, false).build());
      }
    }

    if (registered) {
      return res
        .status(400)
        .json(new Result({ statusCode: 400, error: "Ya registraste el formulario para este pedido." }, false).build());
    }

    let data = await formService.create(req.body);

    res.status(201).json(new Result(data, true).build());
  } catch (error) {
    res.status(500).json(new Result({ statusCode: 500, error: "Algo salió mal." }, false, error).build());
  }
});

router.get("/:id_pedido", verifyToken, async (req, res) => {
  try {

    const data = await formService.findByOrderId(req.params.id_pedido);

    res.json(new Result(data, true).build());
  } catch (error) {
    res.status(500).json(new Result({ statusCode: 500, error: "Algo salió mal." }, false, error).build());
  }
});

module.exports = router;