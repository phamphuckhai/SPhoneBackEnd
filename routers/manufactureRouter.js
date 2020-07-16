
import {
    searchManufacture,
} from "../controllers/manufactureController";

const { Router } = require("express");
const router = Router();

router.get("/", searchManufacture);


module.exports = router;
