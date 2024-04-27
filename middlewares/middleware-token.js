const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {

    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Se requiere un token" });
    }

    try {
        jwt.verify(token, process.env.SECRET);
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token no válido" });
    }
}


module.exports = verifyToken;



