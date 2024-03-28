const db = require("../config/db");

const getAll = async () => {
    return await db.Areas.findAll();
};

module.exports = {
    getAll
};