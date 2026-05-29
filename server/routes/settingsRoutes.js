const express = require("express");
const Settings = require("../models/Settings");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

async function getSingletonSettings() {
  return (
    (await Settings.findOne()) ||
    Settings.create({
      siteName: "Josh English Academy",
      supportEmail: "contact@joshenglishacademy.in",
      contactPhone: "8759137380",
    })
  );
}

router.get("/", requireAuth, async (_request, response) => {
  response.json(await getSingletonSettings());
});

router.put("/", requireAuth, async (request, response) => {
  const settings = await getSingletonSettings();
  Object.assign(settings, request.body);
  await settings.save();
  response.json(settings);
});

module.exports = router;
