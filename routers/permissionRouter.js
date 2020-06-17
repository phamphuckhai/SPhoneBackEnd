const { Router } = require("express");
const router = Router();
const { getPermissions } = require("../utils/permission");

router.get("/", (req, res) => {
  let permissions = getPermissions();
  res.send(permissions);
});

module.exports.permissionRouter = router;
