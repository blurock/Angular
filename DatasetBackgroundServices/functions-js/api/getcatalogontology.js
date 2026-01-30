const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Set cors: true to allow all origins (fine for local development)
exports.getActivityCatalog = onRequest({ cors: true }, async (req, res) => {
  const catalogName = req.query.catalogname || "dataset:ActivityThermoCalculationSetup";
  const targetUrl = `http://localhost:8080/cataloginfo?catalogname=${catalogName}`;

  try {
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      throw new Error(`Service at 8080 error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    logger.error("Fetch error:", error.message);
    res.status(500).send({ error: error.message });
  }
});
