const express = require("express");
const router = express.Router();
const ordersService = require("../services/orders.service");
const formService = require("../services/form.service");
const Result = require("../models/helpers/result.model");

router.post("/", async (req, res) => {
  try {

    let data = await ordersService.create(req.body);

    res.status(201).json(new Result(data, true).build());
  } catch (error) {
    console.log(error);
    res.status(500).json(new Result({ statusCode: 500, error: "Algo salió mal." }, false, error).build());
  }
});

router.get("/", async (req, res) => {
  try {

    let data = await ordersService
      .getAll(
        req.query.page,
        req.query.pagesize,
        req.query.searchparam
      );

    const xd = await Promise.all(data.rows.map(async (item) => {
      const formularios = await formService.findByOrderId(item.id_pedido);
      return {
        ...item.dataValues,
        formularios: formularios
      };
    }));

    data.rows = xd;
    console.log(xd)

    //data.rows = xd;

    //formularios: 'await formService.findByOrderId(x.id_pedido)'

    res.json(new Result(data, true).build());
  } catch (error) {
    console.log(error);
    res.status(500).json(new Result({ statusCode: 500, error: "Algo salió mal." }, false, error).build());
  }
});

module.exports = router;