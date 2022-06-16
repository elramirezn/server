const express = require("express");
const conectarDB = require("./src/database");
const cors = require("cors");
const app = express();

conectarDB();
app.use(express.json());
app.use(cors());
app.use("/api/crud", require("./src/routes/crud"));

app.listen(4000, () => {
    console.log(`Listening http://localhost:${4000}`);
});
