const express = require("express");
const conectarDB = require("./src/database");
const cors = require("cors");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;
conectarDB();
app.use(express.json());
app.use(cors());
app.use("/api/crud", require("./src/routes/crud"));

app.listen(PORT, () => {
    console.log(`Listening http://localhost:${PORT}`);
});
