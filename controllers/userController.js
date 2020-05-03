const { Router } = require("express");
const route = Router();

route.get("/test", async (req, res) => {
  res.send("Ok");
});

module.exports = route;
