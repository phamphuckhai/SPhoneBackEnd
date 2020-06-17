import { authorize } from "../utils/permission";

const { Router } = require("express");
const router = Router();
const providerController = require("../controllers/providerController");
const { checkAccess } = require("../utils/permission");

//Search, get, get all providers
router.get("/", authorize("read", "providers"), providerController.search);

//route get provider from id
router.get(
  "/:id",
  authorize("read", "providers"),
  providerController.getProviderById
);

//route Put provider
router.put(
  "/:id",
  authorize("update", "providers"),
  providerController.updateProviderById
);

//route delete provider
router.delete(
  "/:id",
  authorize("delete", "providers"),
  providerController.deleteProviderById
);

//route add provider
router.post(
  "/",
  authorize("create", "providers"),
  providerController.addProvider
);

module.exports = router;
