const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/ai.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("AI Code Reviewer API Running...");
});

app.use("/ai", aiRoutes);

module.exports = app;