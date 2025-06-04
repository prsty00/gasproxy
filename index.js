const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.use(express.json());

const GAS_URL = process.env.GAS_URL; // lebih aman pakai env var

// Tambahkan handler CORS preflight
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(204).send("");
});

// Handler utama POST
app.post("/", async (req, res) => {
  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const result = await response.text(); // gunakan .json() jika GAS kirim JSON
    res.setHeader("Access-Control-Allow-Origin", "*"); // <- KUNCI
    res.setHeader("Content-Type", "application/json");
    res.send(result);
  } catch (error) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).send({ error: error.message });
  }
});

module.exports = app;
