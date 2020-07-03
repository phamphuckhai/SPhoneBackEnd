const { Router } = require("express");
const router = Router();
const {readDb, addRole, addGrant, updateGrant,deleteGrant, deleteRole} = require("../controllers/roleController");


router.get("/", readDb);

router.post("/", addRole);

router.post("/:role", addGrant);

router.put("/:role", updateGrant);

router.delete("/:role", deleteGrant);

router.delete("/delete/:role", deleteRole);

module.exports = router;
