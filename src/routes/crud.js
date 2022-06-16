const express = require("express");
const Persona = require("../models/Persona");
const Vivienda = require("../models/Vivienda");
const { check } = require("express-validator");
const { validationResult } = require("express-validator");
const Municipio = require("../models/Municipio");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const listPersonas = await Persona.find();
        /*listPersonas.map(async (persona) => {
            persona.vivienda = await Vivienda.find(persona.viviendaId);
            persona.municipio = await Municipio.find(persona.vivienda.municipioId);
        });*/
        res.status(200).json({
            msg: "Lista obtenida correctamente",
            listPersonas,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener lista", error });
    }
});
router.get("/viviendas", async (req, res) => {
    try {
        const viviendas = await Vivienda.find();
        res.status(200).json({
            msg: "Lista obtenida correctamente",
            viviendas,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener lista", error });
    }
});
router.get("/municipios", async (req, res) => {
    try {
        const municipios = await Municipio.find();
        res.status(200).json({
            msg: "Lista obtenida correctamente",
            municipios,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener lista", error });
    }
});
router.post(
    "/add",
    [
        check("nombre").not().isEmpty(),
        check("telefono").not().isEmpty(),
        check("edad").not().isEmpty(),
        check("sexo").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }
        try {
            const persona = new Persona(req.body);
            await persona.save();
            res.status(200).json({ msg: "Persona creado correctamente", persona });
        } catch (error) {
            console.log(error);
            res.status(400).json({ msg: "Error al crear persona", error });
        }
    }
);
router.post(
    "/addVivienda",
    [
        check("direccion").not().isEmpty(),
        check("capacidad").not().isEmpty(),
        check("niveles").not().isEmpty(),
        check("municipioId").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }
        try {
            const vivienda = new Vivienda(req.body);
            await vivienda.save();
            res.status(200).json({ msg: "Vivienda creado correctamente", vivienda });
        } catch (error) {
            console.log(error);
            res.status(400).json({ msg: "Error al crear vivienda", error });
        }
    }
);
router.post(
    "/addMunicipio",
    [
        check("nombre").not().isEmpty(),
        check("area").not().isEmpty(),
        check("presupuesto").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }
        try {
            const municipio = new Municipio(req.body);
            await municipio.save();
            res.status(200).json({ msg: "Municipio creado correctamente", municipio });
        } catch (error) {
            console.log(error);
            res.status(400).json({ msg: "Error al crear municipio", error });
        }
    }
);
router.delete("/:id", async (req, res) => {
    try {
        const persona = await Persona.findById(req.params.id);
        if (!persona) {
            return res.status(404).json({ msg: "Persona no encontrada" });
        }
        await persona.remove();
        res.status(200).json({ msg: "Persona eliminada correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al eliminar persona", error });
    }
});

module.exports = router;
