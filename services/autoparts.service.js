const db = require("../config/db");

const getAll = async () => {
    return await db.Autoparte.findAll();
};

module.exports = {
    getAll
};