const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const usersService = require("../services/users.service");
const Result = require("../models/helpers/result.model");
const nodemailer = require('nodemailer');
const employeeService = require("../services/employees.service");

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

        await usersService.updateStateAndRemainings({
            id_usuario: userexist.id_usuario,
            reintentos: 0,
            estado: userexist.estado
        })

        const token = jwt.sign({username : userexist.usuario}, process.env.SECRET, { expiresIn: process.env.EXPIRATION })

        const result = {
            ...data.dataValues,
            token
        }

        return res.json(new Result(result, true).build());
    } catch (error) {
        console.log(error);
        res.status(500).json(new Result({ statusCode: 500, error: "Algo salió mal." }, false, error).build());
    }
});

router.post("/validate-send-email", async (req, res) => {
    try {
        let docExist = await employeeService.findByNumDoc(req.body.num_documento);
        if (!docExist) {
            return res
                .status(400)
                .json(new Result({ statusCode: 400, error: "No existe un empleado con este documento." }, false).build());
        }

        let mailExist = await employeeService.findByEmail(req.body.correo_electronico);
        if (!mailExist) {
            return res
                .status(400)
                .json(new Result({ statusCode: 400, error: "No existe un empleado con este correo electrónico." }, false).build());
        }

        // Configuración del transporte
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'armoParts4@gmail.com', // dirección de correo electrónico remitente 
                pass: 'iaia kylb smxm wyht' // contraseña de correo electrónico remitente
            }
        });

        // Opciones del correo electrónico
        let mailOptions = {
            from: 'armoParts4@gmail.com', // Dirección de correo electrónico del remitente
            to: req.body.correo_electronico, // Dirección de correo electrónico del destinatario
            subject: 'Recuperación de contraseña', // Asunto del correo electrónico
            text: 'Cordial saludo: \n En respuesta a su solicitud de recuperación de contraseña, se adjunta el siguiente link, ingrese a este link y debe ingresar su nueva contraseña. \n http://localhost:4200/recovery-password?idemployee=' + docExist.id_empleado // Cuerpo del correo electrónico
        };

        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).json(new Result({ statusCode: 500, error: "Error al enviar el correo." }, false, error).build());
            } else {
                return res.json(new Result("Correo enviado con éxito.", true).build());
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json(new Result({ statusCode: 500, error: "Algo salió mal." }, false, error).build());
    }
});

router.put("/recovery-password", async (req, res) => {
    try {
        let exist = await employeeService.findById(req.body.id_empleado);
        if (!exist) {
            return res.status(404).json(new Result({ statusCode: 404, error: "Empleado no existe." }));
        }

        await usersService.updatePassword(req.body);
        return res.json(new Result("Contraseña cambiada con éxito.", true).build());

    } catch (error) {
        console.log(error);
        res.status(500).json(new Result({ statusCode: 500, error: "Algo salió mal." }, false, error).build());
    }
})


module.exports = router;