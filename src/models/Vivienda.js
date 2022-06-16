const mongoose = require("mongoose");

const ViviendaSchema = mongoose.Schema({
    direccion: {
        type: String,
        required: true,
    },
    capacidad: {
        type: String,
    },
    niveles: {
        type: String,
        required: true,
    },
    municipioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Municipio",
        autopopulate: true,
    },
});

ViviendaSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model("Vivienda", ViviendaSchema);
