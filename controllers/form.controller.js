const express = require("express");
const router = express.Router();
const formService = require("../services/form.service");
const Result = require("../models/helpers/result.model");

router.post("/", async (req, res) => {
  try {

    let registered = await formService.findByEmployeeIdAndOrderId(req.body);

    if(registered){
      return res
        .status(400)
        .json(new Result({ statusCode: 400, error: "Ya registraste el formulario para este pedido." }, false).build());
    }

    let data = await formService.create(req.body);

    res.status(201).json(new Result(data, true).build());
  } catch (error) {
    console.log(error);
    res.status(500).json(new Result({ statusCode: 500, error: "Algo salió mal." }, false, error).build());
  }
});

module.exports = router;