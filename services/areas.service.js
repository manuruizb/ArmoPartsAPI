const db = require("../config/db");

const getAll = async () => {
    return await db.Areas.findAll({
        order: [
            ['orden', 'ASC']
        ]
    });
};

module.exports = {
    getAll
};