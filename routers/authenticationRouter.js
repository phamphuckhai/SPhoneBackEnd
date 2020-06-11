import {check} from "express-validator";
import {authorize} from "../utils/permission";

const {Router} = require("express");
const router = Router();
const userController = require("../controllers/userController");

//route register
router.post("/register", userController.register);

//login route
router.post("/login", [
    check('name').isString(),
    check('password').isString()
    ], 
    userController.login);


module.exports = router;
