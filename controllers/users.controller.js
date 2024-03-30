const express = require("express");
const router = express.Router();
const usersService = require("../services/users.services");
const Result = require("../models/helpers/result.model");

router.post("/auth", async (req, res) => {
    try {
        let userexist = await usersService.findByUser(req.body);
        if (!userexist) {
            return res.status(404).json(new Result({ statusCode: 404, error: "Usuario no existe." }, false).build());
        }
        if (!userexist.estado) {
            return res.status(404).json(new Result({ statusCode: 404, error: "El usuario está bloqueado. Debe comunicarse con el administrador." }, false).build());
        }
        let data = await usersService.findByUserAndPassword(req.body);
        if (!data) {
            if (userexist.reintentos === 2) {
                await usersService.updateStateAndRemainings({
                    id_usuario: userexist.id_usuario,
                    reintentos: userexist.reintentos + 1,
                    estado: false
                })
                return res.status(404).json(new Result({ statusCode: 404, error: "Superaste el número de intentos fallidos. Tú usuario ha sido bloqueado. Comunicate con el administrador." }, false).build());
            }
            await usersService.updateStateAndRemainings({
                id_usuario: userexist.id_usuario,
                reintentos: userexist.reintentos + 1,
                estado: userexist.estado
            })
            return res.status(404).json(new Result({ statusCode: 404, error: "Contraseña incorrecta." }, false).build());
        }



        return res.json(new Result(data, true).build());
    } catch (error) {
        console.log(error);
        res.status(500).json(new Result({ statusCode: 500, error: "Algo salió mal." }, false, error).build());
    }
});

module.exports = router;