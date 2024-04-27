const express = require("express");
const router = express.Router();
const areasService = require("../services/areas.service");
const Result = require("../models/helpers/result.model");

router.get("/", async (req, res) => {
  try {
    let data = await areasService.getAll();
    res.json(new Result(data, true).build());
  } catch (error) {
    console.log(error);
    res.status(500).json(new Result({ statusCode: 500, error: "Something went wrong" }, false, error).build());
  }
});

module.exports = router;