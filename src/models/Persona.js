const mongoose = require("mongoose");

const PersonaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
    },
    edad: {
        type: String,
        required: true,
    },
    sexo: {
        type: String,
        required: true,
    },
    viviendaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vivienda",
        autopopulate: true,
    },
});

PersonaSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model("Persona", PersonaSchema);
