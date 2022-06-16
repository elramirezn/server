const mongoose = require("mongoose");

const MunicipioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    area: {
        type: String,
    },
    presupuesto: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Municipio", MunicipioSchema);
