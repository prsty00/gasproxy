const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const GAS_URL = "https://script.google.com/macros/s/AKfycbyoGtd5t9xQ2fP8pqALlsYzIXe18fPuNPNZIhen2HgTB1o8HpkBI6XaUSbveX9xaxpydw/exec"; // GANTI dengan URL Web App GAS kamu

app.post("/", async (req, res) => {
  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const result = await response.text(); // bisa juga .json()
    res.setHeader("Content-Type", "application/json");
    res.send(result);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

module.exports = app;
