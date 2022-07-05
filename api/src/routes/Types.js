const axios = require("axios");
const { Router } = require("express");
const { getType } = require("../controllers/getTypes.js");

const router = Router();

router.get("/", async (req, res, next) => {
  const data = await getType();
  res.json(data)
});


module.exports = router;
