const express = require("express");
const Content = require("../models/Content");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

async function getSingletonContent() {
  return (await Content.findOne()) || Content.create({});
}

router.get("/public", async (_request, response) => {
  response.json(await getSingletonContent());
});

router.get("/", requireAuth, async (_request, response) => {
  response.json(await getSingletonContent());
});

router.put("/", requireAuth, async (request, response) => {
  const current = await getSingletonContent();
  Object.assign(current, request.body);
  await current.save();
  response.json(current);
});

module.exports = router;
