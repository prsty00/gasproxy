const fetch = require("node-fetch");

module.exports = async (req, res) => {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).end();
    return;
  }

  if (req.method === "POST") {
    try {
      const response = await fetch(process.env.GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });

      const data = await response.text();

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(data);
    } catch (error) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(500).send({ error: error.message });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
